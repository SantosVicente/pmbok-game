import { COLORS } from "../game/data";
import type { CategoryId, CategoryMeta } from "../game/types";

type LegendPanelProps = {
  categoryMeta: CategoryMeta[];
  solved: CategoryId[];
};

export function LegendPanel({ categoryMeta, solved }: LegendPanelProps) {
  return (
    <div className="relative z-10 w-full max-w-3xl px-4 mt-8">
      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-white/30 text-center font-semibold uppercase tracking-widest pb-2">
          Categorias ocultas
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {categoryMeta.map((category) => {
            const color = COLORS[category.color];
            const isSolved = solved.includes(category.id);
            return (
              <div
                key={category.id}
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{
                  background: isSolved ? color.bg : "rgba(255,255,255,0.02)",
                  border: `1px solid ${isSolved ? color.border : "rgba(255,255,255,0.06)"}`,
                  opacity: isSolved ? 1 : 0.5,
                }}
              >
                <span>{category.emoji}</span>
                <span
                  className="text-xs font-semibold"
                  style={{
                    color: isSolved ? color.text : "rgba(255,255,255,0.4)",
                  }}
                >
                  {isSolved ? category.label : "???"}
                </span>
                {isSolved && <span className="ml-auto text-xs">✓</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
