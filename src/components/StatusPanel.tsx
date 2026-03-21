type StatusPanelProps = {
  attempts: number;
  solvedCount: number;
  totalCategories: number;
};

export function StatusPanel({
  attempts,
  solvedCount,
  totalCategories,
}: StatusPanelProps) {
  return (
    <div className="relative z-10 w-full max-w-3xl px-4 mb-5">
      <div className="glass rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-white/40 font-semibold mr-1">
            TENTATIVAS
          </span>
          <span className="text-lg font-bold font-mono">{attempts}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-xs text-white/30 mb-1">
            <span>Progresso</span>
            <span>
              {solvedCount}/{totalCategories} categorias
            </span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              className="progress-bar h-full rounded-full"
              style={{
                width: `${(solvedCount / totalCategories) * 100}%`,
                background: "linear-gradient(90deg, #7c3aed, #8b5cf6, #a78bfa)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
