import { getPokemonList } from "@/lib/pokeapi";
import PokemonCard from "@/components/PokemonCard";

export default async function HomePage() {
  const pokemons = await getPokemonList();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full border-4 border-gray-800 shadow-inner" />
          <h1 className="text-white text-2xl font-bold tracking-wide">Pokédex</h1>
          <span className="text-blue-200 text-sm ml-auto">151 Pokémon</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </div>
    </main>
  );
}
