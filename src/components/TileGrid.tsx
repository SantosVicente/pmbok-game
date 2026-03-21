import type { CategoryId, GameItem } from "../game/types";

type TileGridProps = {
  tiles: GameItem[];
  selected: GameItem[];
  solved: CategoryId[];
  flash: CategoryId | null;
  onToggle: (item: GameItem) => void;
};

export function TileGrid({
  tiles,
  selected,
  solved,
  flash,
  onToggle,
}: TileGridProps) {
  return (
    <div className="relative z-10 w-full max-w-3xl px-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {tiles
          .filter((tile) => !solved.includes(tile.category))
          .map((item) => {
            const isSelected = selected.some(
              (selectedItem) => selectedItem.id === item.id,
            );
            const isFlashing = flash !== null && item.category === flash;

            return (
              <button
                key={item.id}
                onClick={() => onToggle(item)}
                className={`tile-card ${isSelected ? "selected-tile tile-selected" : ""}`}
                type="button"
                style={{
                  borderRadius: 16,
                  padding: "12px 10px",
                  minHeight: "clamp(66px, 11vw, 84px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: "clamp(11px, 1.8vw, 13px)",
                  fontWeight: 700,
                  lineHeight: 1.3,
                  letterSpacing: "0.02em",
                  color: isSelected ? "#fff" : "rgba(255,255,255,0.75)",
                  background: isFlashing
                    ? "rgba(139,92,246,0.5)"
                    : isSelected
                      ? "rgba(139,92,246,0.35)"
                      : "rgba(255,255,255,0.04)",
                  border: isSelected
                    ? "1.5px solid rgba(139,92,246,0.9)"
                    : "1px solid rgba(255,255,255,0.07)",
                  backdropFilter: "blur(12px)",
                  boxShadow: isSelected
                    ? "0 0 20px rgba(139,92,246,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"
                    : "none",
                  transform: isSelected
                    ? "translateY(-4px) scale(1.04)"
                    : "none",
                }}
              >
                {item.text}
              </button>
            );
          })}
      </div>
    </div>
  );
}
