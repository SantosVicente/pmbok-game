import { useMemo, useState } from "react";
import "./App.css";
import { ParticleCanvas } from "./components/ParticleCanvas";
import { PhaseOneConexo } from "./phases/PhaseOneConexo";
import { PhaseTwoTermo } from "./phases/PhaseTwoTermo";

export default function App() {
  const [currentPhase, setCurrentPhase] = useState(1);

  const phaseLabel = useMemo(() => {
    if (currentPhase === 1) return "Fase 1 de 2";
    return "Fase 2 de 2";
  }, [currentPhase]);

  const nextPhase = () => {
    setCurrentPhase((prev) => Math.min(2, prev + 1));
  };

  const restartFromPhaseOne = () => {
    setCurrentPhase(1);
  };

  return (
    <div
      className="min-h-screen bg-[#0a0a12] w-full relative overflow-hidden flex flex-col items-center justify-start pb-16"
      style={{ fontFamily: "'Syne', 'Space Grotesk', sans-serif" }}
    >
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <ParticleCanvas />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[38rem] h-[20rem] md:w-[45rem] md:h-[24rem] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mt-6">
        <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4 text-xs text-purple-300 font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          {phaseLabel}
        </span>
      </div>

      {currentPhase === 1 && <PhaseOneConexo onNextPhase={nextPhase} />}
      {currentPhase === 2 && (
        <PhaseTwoTermo onRestartFromPhaseOne={restartFromPhaseOne} />
      )}
    </div>
  );
}
