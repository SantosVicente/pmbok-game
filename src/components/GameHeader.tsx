import type { RefObject } from "react";

type GameHeaderProps = {
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
};

export function GameHeader({ titleRef, subtitleRef }: GameHeaderProps) {
  return (
    <div className="relative z-10 w-full max-w-3xl px-4 pb-4 text-center">
      <h1
        ref={titleRef}
        className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2"
        style={{ textShadow: "0 0 40px rgba(139,92,246,0.6)" }}
      >
        <span className="text-purple-400">Play</span>MBoK
      </h1>
      <p ref={subtitleRef} className="text-sm text-center text-white/40 w-full">
        Agrupe os 4 conceitos que pertencem à mesma área do conhecimento do
        PMBoK.
      </p>
    </div>
  );
}
