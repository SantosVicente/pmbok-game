type BeeProgressPanelProps = {
  mandatoryLetter: string;
  foundCount: number;
  totalWords: number;
  requiredHits: number;
};

export function BeeProgressPanel({
  mandatoryLetter,
  foundCount,
  totalWords,
  requiredHits,
}: BeeProgressPanelProps) {
  const progress = Math.min((foundCount / requiredHits) * 100, 100);

  return (
    <div className="glass rounded-2xl p-4 mb-4">
      <div className="grid grid-cols-3 gap-2 text-center mb-3">
        <div className="rounded-xl bg-white/5 border border-white/10 py-3">
          <p className="text-[11px] uppercase tracking-wide text-white/60">
            Obrigatoria
          </p>
          <p className="text-2xl font-extrabold text-amber-300">
            {mandatoryLetter}
          </p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 py-3">
          <p className="text-[11px] uppercase tracking-wide text-white/60">
            Encontradas
          </p>
          <p className="text-2xl font-extrabold text-white">{foundCount}</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 py-3">
          <p className="text-[11px] uppercase tracking-wide text-white/60">
            Meta
          </p>
          <p className="text-2xl font-extrabold text-green-300">
            {requiredHits}
          </p>
        </div>
      </div>

      <div className="w-full h-3 rounded-full bg-black/30 border border-white/10 overflow-hidden">
        <div
          className="progress-bar h-full"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #f59e0b, #22c55e)",
          }}
        />
      </div>

      <p className="text-xs text-white/65 mt-2">
        {foundCount}/{totalWords} no banco de palavras
      </p>
    </div>
  );
}
