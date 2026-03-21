type WinOverlayProps = {
  attempts: number;
  nextPhase: () => void;
};

export function WinOverlay({ attempts, nextPhase }: WinOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className="win-banner glass rounded-3xl p-7 sm:p-10 text-center max-w-sm mx-4"
        style={{
          border: "1.5px solid rgba(139,92,246,0.6)",
          boxShadow: "0 0 80px rgba(139,92,246,0.4)",
        }}
      >
        <div style={{ fontSize: 60 }}>🏆</div>
        <h2 className="text-3xl font-extrabold text-white mt-5 mb-1">
          Parabéns!
        </h2>
        <p className="text-white/50 text-sm mb-2">
          Você acertou todas as categorias
        </p>
        <p className="text-purple-300 font-semibold text-sm mb-6">
          {attempts === 0
            ? "Perfeito — sem erros! 🌟"
            : `Com ${attempts} tentativa${attempts > 1 ? "s" : ""}`}
        </p>
        <div className="flex gap-3 justify-center mt-4">
          <button
            onClick={nextPhase}
            className="btn-primary rounded-xl px-6 py-3 text-sm"
            type="button"
          >
            Próxima Fase
          </button>
        </div>
      </div>
    </div>
  );
}
