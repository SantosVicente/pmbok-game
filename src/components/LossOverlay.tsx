import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type LossOverlayProps = {
  targetWords: [string, string, string, string];
  onRestartPhase: () => void;
};

export function LossOverlay({ targetWords, onRestartPhase }: LossOverlayProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!backdropRef.current || !cardRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: "power2.out" },
    ).fromTo(
      cardRef.current,
      { scale: 0.6, opacity: 0, rotation: 4 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.65,
        ease: "back.out(1.6)",
      },
      "-=0.05",
    );
  }, []);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={cardRef}
        className="glass rounded-3xl p-7 sm:p-10 text-center max-w-md mx-4"
        style={{
          border: "1.5px solid rgba(248,113,113,0.6)",
          boxShadow: "0 0 80px rgba(248,113,113,0.32)",
        }}
      >
        <div style={{ fontSize: 54 }}>💥</div>
        <h2 className="text-3xl font-extrabold text-white mt-4 mb-2">
          Derrota
        </h2>
        <p className="text-white/70 text-sm mb-4">
          As tentativas acabaram. As palavras eram:
        </p>
        <p className="text-red-200 font-bold tracking-wide text-sm mb-6">
          {targetWords.join(" • ")}
        </p>

        <button
          onClick={onRestartPhase}
          className="rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
          style={{
            background:
              "linear-gradient(135deg, rgba(239,68,68,0.9), rgba(220,38,38,0.9))",
            boxShadow: "0 8px 22px rgba(239,68,68,0.35)",
          }}
          type="button"
        >
          Reiniciar fase
        </button>
      </div>
    </div>
  );
}
