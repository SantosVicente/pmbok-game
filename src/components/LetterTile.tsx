import { useEffect, useRef } from "react";
import gsap from "gsap";

type LetterState = "correct" | "present" | "absent";

type LetterTileProps = {
  letter: string;
  state?: LetterState;
  hasSolved?: boolean;
};

export function LetterTile({ letter, state, hasSolved }: LetterTileProps) {
  const tileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tileRef.current) return;
  }, []);

  const getStateClass = () => {
    if (hasSolved) return "bg-purple-600/60 border-purple-400";
    if (state === "correct") return "bg-green-600/60 border-green-400";
    if (state === "present") return "bg-yellow-600/60 border-yellow-400";
    if (state === "absent") return "bg-white/10 border-white/10";
    return "bg-white/5 border-white/10";
  };

  const handleMouseEnter = () => {
    gsap.to(tileRef.current, {
      scale: 1.15,
      duration: 0.2,
      boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(tileRef.current, {
      scale: 1,
      duration: 0.2,
      boxShadow: "none",
    });
  };

  return (
    <div
      ref={tileRef}
      className={`h-11 rounded-xl border flex items-center justify-center text-2xl  leading-tight transition-all duration-200 cursor-default hover:scale-110 hover:shadow-lg ${getStateClass()}`}
      style={{
        perspective: "1000px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {letter}
    </div>
  );
}
