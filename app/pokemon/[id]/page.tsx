import { getPokemonDetail } from "@/lib/pokeapi";
import { TYPE_BG_CARD } from "@/lib/typeColors";
import TypeBadge from "@/components/TypeBadge";
import StatBar from "@/components/StatBar";
import Image from "next/image";
import Link from "next/link";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemonDetail(Number(id));
  const bgCard = TYPE_BG_CARD[pokemon.types[0]] ?? "bg-gray-50";

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-red-600 shadow-md">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="text-white hover:text-red-200 transition-colors text-sm font-medium flex items-center gap-1"
          >
            ← Retour
          </Link>
          <div className="w-6 h-6 bg-white rounded-full border-4 border-gray-800 shadow-inner" />
          <h1 className="text-white text-xl font-bold">Pokédex</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className={`${bgCard} rounded-3xl p-6 shadow-sm border border-white/60`}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-400 font-mono text-sm">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
            <Image
              src={pokemon.spriteOfficial}
              alt={pokemon.name}
              width={200}
              height={200}
              className="drop-shadow-xl"
              unoptimized
            />
            <h2 className="capitalize text-3xl font-bold text-gray-800">
              {pokemon.name}
            </h2>
            {pokemon.genus && (
              <p className="text-gray-500 text-sm italic">{pokemon.genus}</p>
            )}
            <div className="flex gap-2 mt-1">
              {pokemon.types.map((t) => (
                <TypeBadge key={t} type={t} />
              ))}
            </div>
          </div>

          {pokemon.description && (
            <p className="mt-6 text-gray-600 text-sm text-center leading-relaxed">
              {pokemon.description}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-white/70 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Taille</p>
              <p className="font-semibold text-gray-800">
                {(pokemon.height / 10).toFixed(1)} m
              </p>
            </div>
            <div className="bg-white/70 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Poids</p>
              <p className="font-semibold text-gray-800">
                {(pokemon.weight / 10).toFixed(1)} kg
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white/70 rounded-xl p-4">
            <h3 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">
              Statistiques
            </h3>
            <div className="flex flex-col gap-3">
              {pokemon.stats.map((s) => (
                <StatBar key={s.name} name={s.name} value={s.value} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          {pokemon.id > 1 && (
            <Link
              href={`/pokemon/${pokemon.id - 1}`}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors capitalize"
            >
              ← #{String(pokemon.id - 1).padStart(3, "0")}
            </Link>
          )}
          {pokemon.id < 151 && (
            <Link
              href={`/pokemon/${pokemon.id + 1}`}
              className="text-sm text-gray-500 hover:text-red-600 transition-colors capitalize ml-auto"
            >
              #{String(pokemon.id + 1).padStart(3, "0")} →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
