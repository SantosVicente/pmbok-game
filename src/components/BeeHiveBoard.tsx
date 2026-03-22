import gsap from "gsap";
import { useEffect, useMemo, useRef } from "react";

type BeeHiveBoardProps = {
  mandatoryLetter: string;
  outerLetters: [string, string, string, string, string, string];
  disabled: boolean;
  onPickLetter: (letter: string) => void;
};

export function BeeHiveBoard({
  mandatoryLetter,
  outerLetters,
  disabled,
  onPickLetter,
}: BeeHiveBoardProps) {
  const boardRef = useRef<HTMLDivElement | null>(null);

  const positions = useMemo(
    () => [
      { left: "50%", top: "8%" },
      { left: "77%", top: "25%" },
      { left: "77%", top: "59%" },
      { left: "50%", top: "76%" },
      { left: "23%", top: "59%" },
      { left: "23%", top: "25%" },
    ],
    [],
  );

  useEffect(() => {
    if (!boardRef.current) return;

    gsap.fromTo(
      boardRef.current.querySelectorAll(".bee-outer-letter"),
      { y: 20, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.45,
        stagger: 0.05,
        ease: "power2.out",
      },
    );

    gsap.fromTo(
      boardRef.current.querySelector(".bee-center-letter"),
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.45,
        delay: 0.15,
        ease: "back.out(1.6)",
      },
    );
  }, [mandatoryLetter, outerLetters]);

  return (
    <div ref={boardRef} className="bee-hive-wrap mx-auto mt-4 mb-3">
      {outerLetters.map((letter, index) => (
        <button
          key={`${letter}-${index}`}
          type="button"
          disabled={disabled}
          className="bee-letter bee-outer-letter font-mono"
          style={{ left: positions[index].left, top: positions[index].top }}
          onClick={() => onPickLetter(letter)}
        >
          {letter}
        </button>
      ))}

      <button
        type="button"
        disabled={disabled}
        className="bee-letter bee-center-letter font-mono"
        onClick={() => onPickLetter(mandatoryLetter)}
      >
        {mandatoryLetter}
      </button>
    </div>
  );
}
