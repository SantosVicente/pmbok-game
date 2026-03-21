export type LetterState = "correct" | "present" | "absent";

export type GuessEvaluation = {
  guess: string;
  states1: LetterState[];
  states2: LetterState[];
  states3: LetterState[];
  states4: LetterState[];
};

export const TERMO_WORDS = [
  "RISCO",
  "PRAZO",
  "CUSTO",
  "TEMPO",
  "PLANO",
  "MARCO",
  "DATAS",
  "GERIR",
  "ETAPA",
];
export const MAX_ATTEMPTS = 9;
export const WORD_LENGTH = TERMO_WORDS[0].length;

export function getRandomWords(): [string, string, string, string] {
  const first = TERMO_WORDS[Math.floor(Math.random() * TERMO_WORDS.length)];
  let second = TERMO_WORDS[Math.floor(Math.random() * TERMO_WORDS.length)];
  while (second === first) {
    second = TERMO_WORDS[Math.floor(Math.random() * TERMO_WORDS.length)];
  }
  let third = TERMO_WORDS[Math.floor(Math.random() * TERMO_WORDS.length)];
  while (third === first || third === second) {
    third = TERMO_WORDS[Math.floor(Math.random() * TERMO_WORDS.length)];
  }
  let fourth = TERMO_WORDS[Math.floor(Math.random() * TERMO_WORDS.length)];
  while (fourth === first || fourth === second || fourth === third) {
    fourth = TERMO_WORDS[Math.floor(Math.random() * TERMO_WORDS.length)];
  }
  return [first, second, third, fourth];
}

export function evaluateGuess(guess: string, target: string): LetterState[] {
  const result: LetterState[] = Array.from(
    { length: target.length },
    () => "absent",
  );
  const targetLetters = target.split("");
  const guessLetters = guess.split("");

  guessLetters.forEach((letter, index) => {
    if (letter === targetLetters[index]) {
      result[index] = "correct";
      targetLetters[index] = "#";
      guessLetters[index] = "*";
    }
  });

  guessLetters.forEach((letter, index) => {
    if (letter === "*") return;

    const foundIndex = targetLetters.indexOf(letter);
    if (foundIndex >= 0) {
      result[index] = "present";
      targetLetters[foundIndex] = "#";
    }
  });

  return result;
}
