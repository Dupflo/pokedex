const STAT_LABELS: Record<string, string> = {
  hp: "HP",
  attack: "Attaque",
  defense: "Défense",
  "special-attack": "Att. Spé.",
  "special-defense": "Déf. Spé.",
  speed: "Vitesse",
};

export default function StatBar({ name, value }: { name: string; value: number }) {
  const label = STAT_LABELS[name] ?? name;
  const pct = Math.min((value / 255) * 100, 100);
  const color =
    value >= 100 ? "bg-green-500" : value >= 60 ? "bg-yellow-400" : "bg-red-400";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-20 shrink-0 text-right">{label}</span>
      <span className="text-sm font-semibold w-8 text-right">{value}</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
