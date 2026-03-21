import type { HintEntry } from "../game/types";

type HintPanelProps = {
  hintLog: HintEntry[];
};

export function HintPanel({ hintLog }: HintPanelProps) {
  return (
    <div className="relative z-10 w-full max-w-3xl px-4 mt-4">
      <div className="glass rounded-2xl p-4 border border-yellow-500/20">
        <div className="flex items-center justify-between gap-3 mb-3">
          <p className="text-xs text-yellow-200/90 font-semibold uppercase tracking-widest">
            Dicas desbloqueadas
          </p>
          <span className="text-[11px] text-white/35">
            Permanecem até o fim
          </span>
        </div>
        {hintLog.length === 0 ? (
          <p className="text-sm text-white/50">
            Use o botão de dica para revelar pistas progressivas.
          </p>
        ) : (
          <div className="flex flex-col gap-2 max-h-48 overflow-auto pr-1">
            {hintLog.map((hint) => (
              <div
                key={hint.id}
                className="rounded-xl px-3 py-2 text-sm border border-yellow-500/20 bg-yellow-500/8"
              >
                <span className="text-yellow-300 font-semibold">
                  {hint.title}:
                </span>{" "}
                <span className="text-yellow-100/90">{hint.detail}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
