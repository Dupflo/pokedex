import Link from "next/link";
import Image from "next/image";
import { PokemonListItem } from "@/lib/pokeapi";
import { TYPE_BG_CARD } from "@/lib/typeColors";
import TypeBadge from "./TypeBadge";

export default function PokemonCard({ pokemon }: { pokemon: PokemonListItem }) {
  const bgCard = TYPE_BG_CARD[pokemon.types[0]] ?? "bg-gray-50";

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div
        className={`${bgCard} rounded-2xl p-4 flex flex-col items-center gap-2 hover:scale-105 hover:shadow-lg transition-all duration-200 cursor-pointer border border-white/60`}
      >
        <span className="text-xs text-gray-400 font-mono self-end">
          #{String(pokemon.id).padStart(3, "0")}
        </span>
        <Image
          src={pokemon.sprite}
          alt={pokemon.name}
          width={96}
          height={96}
          className="pixelated drop-shadow-md"
          unoptimized
        />
        <p className="capitalize font-semibold text-gray-800 text-sm">
          {pokemon.name}
        </p>
        <div className="flex gap-1 flex-wrap justify-center">
          {pokemon.types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
      </div>
    </Link>
  );
}
