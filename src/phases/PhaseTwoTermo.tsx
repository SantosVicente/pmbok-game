import type { GuessEvaluation } from "./utils";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { FinishOverlay } from "../components/FinishOverlay";
import { LossOverlay } from "../components/LossOverlay";
import { GuessGrid } from "../components/GuessGrid";
import { GameControls } from "../components/GameControls";
import { GameFeedback } from "../components/GameFeedback";
import {
  MAX_ATTEMPTS,
  WORD_LENGTH,
  getRandomWords,
  evaluateGuess,
} from "./utils";

type PhaseTwoTermoProps = {
  onRestartFromPhaseOne: () => void;
};

export function PhaseTwoTermo({ onRestartFromPhaseOne }: PhaseTwoTermoProps) {
  const [targetWords, setTargetWords] = useState(() => getRandomWords());
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState<GuessEvaluation[]>([]);
  const [feedback, setFeedback] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const guessRowsRef = useRef<Map<string, HTMLDivElement>>(new Map());

  const solvedAtIndex1 = useMemo(
    () => guesses.findIndex((entry) => entry.guess === targetWords[0]),
    [guesses, targetWords],
  );
  const solvedAtIndex2 = useMemo(
    () => guesses.findIndex((entry) => entry.guess === targetWords[1]),
    [guesses, targetWords],
  );
  const solvedAtIndex3 = useMemo(
    () => guesses.findIndex((entry) => entry.guess === targetWords[2]),
    [guesses, targetWords],
  );
  const solvedAtIndex4 = useMemo(
    () => guesses.findIndex((entry) => entry.guess === targetWords[3]),
    [guesses, targetWords],
  );

  const hasFirstSolved = solvedAtIndex1 !== -1;
  const hasSecondSolved = solvedAtIndex2 !== -1;
  const hasThirdSolved = solvedAtIndex3 !== -1;
  const hasFourthSolved = solvedAtIndex4 !== -1;
  const hasWon =
    hasFirstSolved && hasSecondSolved && hasThirdSolved && hasFourthSolved;
  const hasLost = guesses.length >= MAX_ATTEMPTS && !hasWon;

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
    );

    gsap.fromTo(
      headerRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        delay: 0.2,
        ease: "elastic.out(1, 0.5)",
      },
    );
  }, []);

  useEffect(() => {
    if (guesses.length === 0) return;

    const lastGuessIndex = guesses.length - 1;
    const columnKeys = ["one", "second", "third", "fourth"];

    columnKeys.forEach((colKey) => {
      const rowKey = `${colKey}-${lastGuessIndex}`;
      const element = guessRowsRef.current.get(rowKey);
      if (element) {
        gsap.fromTo(
          element,
          { rotationY: 90, opacity: 0 },
          {
            rotationY: 0,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.2)",
            perspective: 1000,
          },
        );

        const letters = element.querySelectorAll(
          "div > div:nth-child(n+1):nth-child(-n+5)",
        );
        gsap.fromTo(
          letters,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            delay: 0.2,
            ease: "elastic.out(1, 0.5)",
          },
        );
      }
    });
  }, [guesses.length]);

  useEffect(() => {
    if (!hasWon) return;

    const columnKeys = ["one", "second", "third", "fourth"];
    const solvedIndices = [
      solvedAtIndex1,
      solvedAtIndex2,
      solvedAtIndex3,
      solvedAtIndex4,
    ];

    columnKeys.forEach((colKey, colIdx) => {
      const solvedIndex = solvedIndices[colIdx];
      if (solvedIndex !== -1) {
        const rowKey = `${colKey}-${solvedIndex}`;
        const element = guessRowsRef.current.get(rowKey);
        if (element) {
          const letters = element.querySelectorAll("div > div");
          gsap.to(letters, {
            scale: 1.1,
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.6)",
            duration: 0.8,
            repeat: 2,
            yoyo: true,
            stagger: 0.1,
            ease: "sine.inOut",
          });
        }
      }
    });
  }, [hasWon, solvedAtIndex1, solvedAtIndex2, solvedAtIndex3, solvedAtIndex4]);

  const submitGuess = () => {
    if (hasWon || hasLost) return;

    const normalized = input.trim().toUpperCase();

    if (normalized.length !== WORD_LENGTH) {
      setFeedback(`A palavra precisa ter ${WORD_LENGTH} letras.`);
      return;
    }

    const states1 = evaluateGuess(normalized, targetWords[0]);
    const states2 = evaluateGuess(normalized, targetWords[1]);
    const states3 = evaluateGuess(normalized, targetWords[2]);
    const states4 = evaluateGuess(normalized, targetWords[3]);

    const next: GuessEvaluation = {
      guess: normalized,
      states1,
      states2,
      states3,
      states4,
    };

    setGuesses((prev) => [...prev, next]);
    setInput("");

    const nextFirstSolved = hasFirstSolved || normalized === targetWords[0];
    const nextSecondSolved = hasSecondSolved || normalized === targetWords[1];
    const nextThirdSolved = hasThirdSolved || normalized === targetWords[2];
    const nextFourthSolved = hasFourthSolved || normalized === targetWords[3];

    if (
      nextFirstSolved &&
      nextSecondSolved &&
      nextThirdSolved &&
      nextFourthSolved
    ) {
      setFeedback("Perfeito! Voce acertou as quatro palavras.");
      return;
    }

    if (normalized === targetWords[0]) {
      setFeedback("Boa! Voce acertou a primeira palavra.");
      return;
    }

    if (normalized === targetWords[1]) {
      setFeedback("Boa! Voce acertou a segunda palavra.");
      return;
    }

    if (normalized === targetWords[2]) {
      setFeedback("Boa! Voce acertou a terceira palavra.");
      return;
    }

    if (normalized === targetWords[3]) {
      setFeedback("Boa! Voce acertou a quarta palavra.");
      return;
    }

    setFeedback("");
  };

  const reset = () => {
    setTargetWords(getRandomWords());
    setInput("");
    setGuesses([]);
    setFeedback("");
  };

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full max-w-7xl px-4 pt-8 pb-10"
    >
      <div className="text-center mb-5">
        <h1
          ref={headerRef}
          className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2"
          style={{ textShadow: "0 0 40px rgba(139,92,246,0.6)" }}
        >
          <span className="text-purple-400">Play</span>MBoK
        </h1>
      </div>

      <GuessGrid
        guesses={guesses}
        solvedAtIndex1={solvedAtIndex1}
        solvedAtIndex2={solvedAtIndex2}
        solvedAtIndex3={solvedAtIndex3}
        solvedAtIndex4={solvedAtIndex4}
        hasFirstSolved={hasFirstSolved}
        hasSecondSolved={hasSecondSolved}
        hasThirdSolved={hasThirdSolved}
        hasFourthSolved={hasFourthSolved}
        hasLost={hasLost}
        maxAttempts={MAX_ATTEMPTS}
        wordLength={WORD_LENGTH}
        guessRowsRef={guessRowsRef}
        gridRef={gridRef}
      />

      <div className="mt-4">
        <GameControls
          input={input}
          onChange={setInput}
          onSubmit={submitGuess}
          onReset={reset}
          disabled={hasWon || hasLost}
          wordLength={WORD_LENGTH}
        />

        <GameFeedback feedback={feedback} />
      </div>

      {hasLost && (
        <LossOverlay targetWords={targetWords} onRestartPhase={reset} />
      )}

      {hasWon && (
        <FinishOverlay onRestartFromPhaseOne={onRestartFromPhaseOne} />
      )}
    </div>
  );
}
