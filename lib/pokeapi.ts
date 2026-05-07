const BASE_URL = "https://pokeapi.co/api/v2";

export interface PokemonListItem {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  spriteOfficial: string;
  height: number;
  weight: number;
  stats: { name: string; value: number }[];
  description: string;
  genus: string;
}

export async function getPokemonList(): Promise<PokemonListItem[]> {
  const res = await fetch(`${BASE_URL}/pokemon?limit=151`, {
    cache: "force-cache",
  });
  const data = await res.json();

  const pokemons = await Promise.all(
    data.results.map(async (_: { name: string }, index: number) => {
      const id = index + 1;
      const detail = await fetch(`${BASE_URL}/pokemon/${id}`, {
        cache: "force-cache",
      });
      const p = await detail.json();
      return {
        id,
        name: p.name,
        types: p.types.map((t: { type: { name: string } }) => t.type.name),
        sprite: p.sprites.front_default,
      };
    })
  );

  return pokemons;
}

export async function getPokemonDetail(id: number): Promise<PokemonDetail> {
  const [pokemonRes, speciesRes] = await Promise.all([
    fetch(`${BASE_URL}/pokemon/${id}`, { cache: "force-cache" }),
    fetch(`${BASE_URL}/pokemon-species/${id}`, { cache: "force-cache" }),
  ]);

  const p = await pokemonRes.json();
  const s = await speciesRes.json();

  const description =
    s.flavor_text_entries
      .find(
        (e: { language: { name: string }; version: { name: string } }) =>
          e.language.name === "fr"
      )
      ?.flavor_text?.replace(/\f|\n/g, " ") ??
    s.flavor_text_entries
      .find((e: { language: { name: string } }) => e.language.name === "en")
      ?.flavor_text?.replace(/\f|\n/g, " ") ??
    "";

  const genus =
    s.genera.find((g: { language: { name: string } }) => g.language.name === "fr")
      ?.genus ??
    s.genera.find((g: { language: { name: string } }) => g.language.name === "en")
      ?.genus ??
    "";

  return {
    id,
    name: p.name,
    types: p.types.map((t: { type: { name: string } }) => t.type.name),
    sprite: p.sprites.front_default,
    spriteOfficial:
      p.sprites.other?.["official-artwork"]?.front_default ?? p.sprites.front_default,
    height: p.height,
    weight: p.weight,
    stats: p.stats.map((s: { stat: { name: string }; base_stat: number }) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
    description,
    genus,
  };
}
