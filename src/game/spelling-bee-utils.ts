export type SpellingBeeRound = {
  id: string;
  mandatoryLetter: string;
  outerLetters: [string, string, string, string, string, string];
  words: string[];
};

export const BEE_MIN_LENGTH = 4;
export const BEE_MAX_LENGTH = 9;
export const BEE_WIN_RATIO = 0.7;

export const SPELLING_BEE_ROUNDS: SpellingBeeRound[] = [
  {
    id: "pmbok-geral",
    mandatoryLetter: "E",
    outerLetters: ["R", "C", "U", "S", "O", "P"],
    words: [
      "ESCOPO",
      "PROCESSO",
      "RECURSO",
      "PERCURSO",
      "SUCESSO",
      "PRECO",
      "RECESSO",
      "POSSE",
      "PESOS",
      "ERROS",
    ],
  },
];

export type ValidationResult =
  | { ok: true; normalized: string }
  | { ok: false; message: string };

export function pickRandomRound(): SpellingBeeRound {
  return SPELLING_BEE_ROUNDS[
    Math.floor(Math.random() * SPELLING_BEE_ROUNDS.length)
  ];
}

export function getAllLetters(round: SpellingBeeRound): string[] {
  return [round.mandatoryLetter, ...round.outerLetters];
}

export function getRequiredHits(totalWords: number): number {
  return Math.ceil(totalWords * BEE_WIN_RATIO);
}

export function normalizeWord(rawWord: string): string {
  return rawWord
    .trim()
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function validateAttempt(
  rawWord: string,
  round: SpellingBeeRound,
  foundWords: Set<string>,
): ValidationResult {
  const word = normalizeWord(rawWord);

  if (word.length < BEE_MIN_LENGTH || word.length > BEE_MAX_LENGTH) {
    return {
      ok: false,
      message: `Use palavras entre ${BEE_MIN_LENGTH} e ${BEE_MAX_LENGTH} letras.`,
    };
  }

  if (!word.includes(round.mandatoryLetter)) {
    return {
      ok: false,
      message: `A letra obrigatoria e ${round.mandatoryLetter}.`,
    };
  }

  const allowedLetters = new Set(getAllLetters(round));
  const invalidLetter = word
    .split("")
    .find((letter) => !allowedLetters.has(letter));

  if (invalidLetter) {
    return {
      ok: false,
      message: `A letra ${invalidLetter} nao faz parte da rodada.`,
    };
  }

  if (foundWords.has(word)) {
    return {
      ok: false,
      message: "Essa palavra ja foi encontrada.",
    };
  }

  if (!round.words.includes(word)) {
    return {
      ok: false,
      message: "Palavra fora do banco desta rodada.",
    };
  }

  return { ok: true, normalized: word };
}
