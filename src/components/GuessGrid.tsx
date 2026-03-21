import { useEffect } from "react";
import gsap from "gsap";
import { WordColumn } from "./WordColumn";

type LetterState = "correct" | "present" | "absent";

type GuessEvaluation = {
  guess: string;
  states1: LetterState[];
  states2: LetterState[];
  states3: LetterState[];
  states4: LetterState[];
};

type GuessGridProps = {
  guesses: GuessEvaluation[];
  solvedAtIndex1: number;
  solvedAtIndex2: number;
  solvedAtIndex3: number;
  solvedAtIndex4: number;
  hasFirstSolved: boolean;
  hasSecondSolved: boolean;
  hasThirdSolved: boolean;
  hasFourthSolved: boolean;
  hasLost: boolean;
  maxAttempts: number;
  wordLength: number;
  guessRowsRef: React.MutableRefObject<Map<string, HTMLDivElement>>;
  gridRef: React.RefObject<HTMLDivElement | null>;
};

export function GuessGrid({
  guesses,
  solvedAtIndex1,
  solvedAtIndex2,
  solvedAtIndex3,
  solvedAtIndex4,
  hasFirstSolved,
  hasSecondSolved,
  hasThirdSolved,
  hasFourthSolved,
  hasLost,
  maxAttempts,
  wordLength,
  guessRowsRef,
  gridRef,
}: GuessGridProps) {
  useEffect(() => {
    if (!hasLost || !gridRef.current) return;

    const timeline = gsap.timeline();
    timeline.to(gridRef.current, {
      x: -5,
      duration: 0.1,
      repeat: 5,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, [hasLost, gridRef]);

  return (
    <div className="glass rounded-2xl p-4 sm:p-5" ref={gridRef}>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <WordColumn
          columnKey="one"
          title="Palavra 1"
          guesses={guesses}
          stateIndex={0}
          solvedAtIndex={solvedAtIndex1}
          maxAttempts={maxAttempts}
          wordLength={wordLength}
          hasSolved={hasFirstSolved}
          guessRowsRef={guessRowsRef}
        />

        <WordColumn
          columnKey="second"
          title="Palavra 2"
          guesses={guesses}
          stateIndex={1}
          solvedAtIndex={solvedAtIndex2}
          maxAttempts={maxAttempts}
          wordLength={wordLength}
          hasSolved={hasSecondSolved}
          guessRowsRef={guessRowsRef}
        />

        <WordColumn
          columnKey="third"
          title="Palavra 3"
          guesses={guesses}
          stateIndex={2}
          solvedAtIndex={solvedAtIndex3}
          maxAttempts={maxAttempts}
          wordLength={wordLength}
          hasSolved={hasThirdSolved}
          guessRowsRef={guessRowsRef}
        />

        <WordColumn
          columnKey="fourth"
          title="Palavra 4"
          guesses={guesses}
          stateIndex={3}
          solvedAtIndex={solvedAtIndex4}
          maxAttempts={maxAttempts}
          wordLength={wordLength}
          hasSolved={hasFourthSolved}
          guessRowsRef={guessRowsRef}
        />
      </div>
    </div>
  );
}
