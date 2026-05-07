import { TYPE_COLORS } from "@/lib/typeColors";

export default function TypeBadge({ type }: { type: string }) {
  const colors = TYPE_COLORS[type] ?? { bg: "bg-gray-400", text: "text-white" };
  return (
    <span
      className={`${colors.bg} ${colors.text} text-xs font-semibold px-2 py-0.5 rounded-full capitalize`}
    >
      {type}
    </span>
  );
}
