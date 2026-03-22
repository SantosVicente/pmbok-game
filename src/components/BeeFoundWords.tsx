type BeeFoundWordsProps = {
  words: string[];
};

export function BeeFoundWords({ words }: BeeFoundWordsProps) {
  return (
    <div className="glass rounded-2xl p-4 h-max">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Palavras encontradas</h3>
        <span className="text-xs text-white/60">{words.length}</span>
      </div>

      <div className="min-h-70 max-h-70 overflow-auto pr-1">
        {words.length === 0 ? (
          <p className="text-sm text-white/45">Nenhuma palavra valida ainda.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {words.map((word) => (
              <span
                key={word}
                className="bee-found-word rounded-lg px-2.5 py-1.5 text-xs font-semibold bg-emerald-500/15 border border-emerald-400/30 text-emerald-200"
              >
                {word}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
