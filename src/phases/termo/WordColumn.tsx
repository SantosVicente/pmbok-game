import { LetterTile } from "./LetterTile";

type LetterState = "correct" | "present" | "absent";

type GuessEvaluation = {
  guess: string;
  states1: LetterState[];
  states2: LetterState[];
  states3: LetterState[];
  states4: LetterState[];
};

type WordColumnProps = {
  columnKey: string;
  title: string;
  guesses: GuessEvaluation[];
  stateIndex: number; // 0 = states1, 1 = states2, 2 = states3, 3 = states4
  solvedAtIndex: number;
  maxAttempts: number;
  wordLength: number;
  hasSolved: boolean;
  guessRowsRef: React.MutableRefObject<Map<string, HTMLDivElement>>;
};

export function WordColumn({
  columnKey,
  title,
  guesses,
  stateIndex,
  solvedAtIndex,
  maxAttempts,
  wordLength,
  hasSolved,
  guessRowsRef,
}: WordColumnProps) {
  const getStates = (row: GuessEvaluation | undefined): LetterState[] => {
    const states = [row?.states1, row?.states2, row?.states3, row?.states4];
    return (states[stateIndex] as LetterState[]) || [];
  };

  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-white/40 pb-2 text-center">
        {title}
      </p>
      <div className="grid gap-2">
        {Array.from({ length: maxAttempts }).map((_, rowIndex) => {
          const row = guesses[rowIndex];
          const isSolvedRowOrAfter = hasSolved && rowIndex > solvedAtIndex;
          const letters = isSolvedRowOrAfter
            ? Array.from({ length: wordLength }, () => "")
            : row
              ? row.guess.split("")
              : Array.from({ length: wordLength }, () => "");

          const states = getStates(row);

          return (
            <div
              key={`${columnKey}-${rowIndex}`}
              ref={(el) => {
                if (el)
                  guessRowsRef.current.set(`${columnKey}-${rowIndex}`, el);
              }}
              className="grid grid-cols-5 gap-2"
            >
              {letters.map((letter, colIndex) => (
                <LetterTile
                  key={`${columnKey}-${rowIndex}-${colIndex}`}
                  letter={letter}
                  state={states[colIndex]}
                  hasSolved={hasSolved}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
