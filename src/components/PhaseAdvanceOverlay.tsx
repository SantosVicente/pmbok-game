import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type PhaseAdvanceOverlayProps = {
  onNextPhase: () => void;
};

export function PhaseAdvanceOverlay({ onNextPhase }: PhaseAdvanceOverlayProps) {
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
      { scale: 0.6, opacity: 0, rotation: -6 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.5)",
      },
      "-=0.05",
    );
  }, []);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        ref={cardRef}
        className="glass rounded-3xl p-7 sm:p-10 text-center max-w-sm mx-4"
        style={{
          border: "1.5px solid rgba(139,92,246,0.6)",
          boxShadow: "0 0 80px rgba(139,92,246,0.4)",
        }}
      >
        <div style={{ fontSize: 56 }}>🚀</div>
        <h2 className="text-3xl font-extrabold text-white mt-5 mb-1">Boa!</h2>
        <p className="text-white/60 text-sm pb-3">
          Fase 2 concluida. Vamos para a última fase.
        </p>
        <button
          onClick={onNextPhase}
          className="btn-primary rounded-xl px-6 py-3 text-sm"
          type="button"
        >
          Ir para Fase 3
        </button>
      </div>
    </div>
  );
}
