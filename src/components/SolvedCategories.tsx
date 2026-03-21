import { ALL_ITEMS, COLORS } from "../game/data";
import type { CategoryId, CategoryMeta } from "../game/types";

type SolvedCategoriesProps = {
  solved: CategoryId[];
  categoryMeta: CategoryMeta[];
};

export function SolvedCategories({
  solved,
  categoryMeta,
}: SolvedCategoriesProps) {
  return (
    <div className="relative z-10 w-full max-w-3xl px-4 flex flex-col gap-2 mb-3">
      {categoryMeta
        .filter((category) => solved.includes(category.id))
        .map((category) => {
          const color = COLORS[category.color];
          return (
            <div
              key={category.id}
              className={`float-badge rounded-2xl p-3 glow-${category.color}`}
              style={{
                background: color.bg,
                border: `1.5px solid ${color.border}`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span>{category.emoji}</span>
                <span
                  className="font-bold text-sm"
                  style={{ color: color.text }}
                >
                  {category.label}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ALL_ITEMS.filter((item) => item.category === category.id).map(
                  (item) => (
                    <span
                      key={item.id}
                      className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                      style={{
                        background: `${color.border}22`,
                        color: color.text,
                        border: `1px solid ${color.border}44`,
                      }}
                    >
                      {item.text}
                    </span>
                  ),
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}
