import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { BeeFoundWords } from "../components/BeeFoundWords";
import { BeeHiveBoard } from "../components/BeeHiveBoard";
import { BeeInputControls } from "../components/BeeInputControls";
import { BeeProgressPanel } from "../components/BeeProgressPanel";
import { FinishOverlay } from "../components/FinishOverlay";
import {
  BEE_MAX_LENGTH,
  getRequiredHits,
  pickRandomRound,
  validateAttempt,
  type SpellingBeeRound,
} from "../game/spelling-bee-utils";

type PhaseThreeSpellingBeeProps = {
  onRestartFromPhaseOne: () => void;
};

export function PhaseThreeSpellingBee({
  onRestartFromPhaseOne,
}: PhaseThreeSpellingBeeProps) {
  const [round, setRound] = useState<SpellingBeeRound>(() => pickRandomRound());
  const [outerLetters, setOuterLetters] = useState(round.outerLetters);
  const [input, setInput] = useState("");
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [feedback, setFeedback] = useState(
    "Monte palavras relacionadas ao tema.",
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const inputWrapRef = useRef<HTMLDivElement | null>(null);

  const requiredHits = useMemo(
    () => getRequiredHits(round.words.length),
    [round.words.length],
  );
  const hasWon = foundWords.length >= requiredHits;

  const foundSet = useMemo(() => new Set(foundWords), [foundWords]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      titleRef.current,
      { y: -18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.55, ease: "back.out(1.3)" },
    );

    gsap.fromTo(
      containerRef.current.querySelectorAll(".bee-entry"),
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" },
    );
  }, []);

  useEffect(() => {
    if (foundWords.length === 0) return;

    const chips = containerRef.current?.querySelectorAll(".bee-found-word");
    if (!chips || chips.length === 0) return;

    const latestChip = chips[chips.length - 1] as HTMLElement;

    gsap.fromTo(
      latestChip,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.6)" },
    );
  }, [foundWords.length]);

  const handleSubmit = () => {
    if (hasWon) return;

    const result = validateAttempt(input, { ...round, outerLetters }, foundSet);

    if (!result.ok) {
      setFeedback(result.message);

      if (inputWrapRef.current) {
        gsap.fromTo(
          inputWrapRef.current,
          { x: 0 },
          {
            keyframes: [{ x: -8 }, { x: 8 }, { x: -5 }, { x: 5 }, { x: 0 }],
            duration: 0.35,
            ease: "power1.inOut",
          },
        );
      }
      return;
    }

    setFoundWords((prev) => [...prev, result.normalized]);
    setInput("");
    setFeedback(`Boa! ${result.normalized} entrou no banco.`);
  };

  const handlePickLetter = (letter: string) => {
    if (hasWon || input.length >= BEE_MAX_LENGTH) return;
    setInput((prev) => `${prev}${letter}`);
  };

  const handleBackspace = () => {
    if (hasWon) return;
    setInput((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    if (hasWon) return;
    setInput("");
  };

  const shuffleLetters = () => {
    if (hasWon) return;

    const shuffled = shuffleOuterLetters(outerLetters);
    setOuterLetters(shuffled);

    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll(".bee-outer-letter"),
        { rotate: 0 },
        { rotate: "+=360", duration: 0.55, ease: "power2.out" },
      );
    }
  };

  const resetRound = () => {
    const nextRound = pickRandomRound();
    setRound(nextRound);
    setOuterLetters(nextRound.outerLetters);
    setInput("");
    setFoundWords([]);
    setFeedback("Nova rodada carregada. Vamos de novo.");
  };

  return (
    <div
      ref={containerRef}
      className="relative z-10 w-full max-w-7xl px-4 pt-8 pb-10"
    >
      <div className="text-center mb-6 bee-entry">
        <h1
          ref={titleRef}
          className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-2"
          style={{ textShadow: "0 0 40px rgba(245,158,11,0.35)" }}
        >
          <span className="text-purple-400">Play</span>MBoK
        </h1>
        <p className="text-sm md:text-base text-white/70 w-full text-center px-40">
          Use as 7 letras para formar palavras do banco da rodada. A letra
          central e obrigatoria. Voce vence ao encontrar 75% das palavras.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-4">
        <section className="glass rounded-2xl p-4 sm:p-5 bee-entry">
          <BeeHiveBoard
            mandatoryLetter={round.mandatoryLetter}
            outerLetters={outerLetters}
            disabled={hasWon}
            onPickLetter={handlePickLetter}
          />

          <div ref={inputWrapRef} className="max-w-xl mx-auto mt-4">
            <BeeInputControls
              value={input}
              onChange={setInput}
              onSubmit={handleSubmit}
              onBackspace={handleBackspace}
              onClear={handleClear}
              onShuffleLetters={shuffleLetters}
              disabled={hasWon}
            />
          </div>

          <p className="text-center text-sm text-white/75 mt-4 min-h-5">
            {feedback}
          </p>

          <div className="mt-4 flex justify-center">
            <button
              type="button"
              onClick={resetRound}
              className="btn-ghost rounded-xl px-5 py-2.5 text-sm"
            >
              Trocar rodada
            </button>
          </div>
        </section>

        <aside className="space-y-4 bee-entry">
          <BeeProgressPanel
            mandatoryLetter={round.mandatoryLetter}
            foundCount={foundWords.length}
            totalWords={round.words.length}
            requiredHits={requiredHits}
          />
          <BeeFoundWords words={foundWords} />
        </aside>
      </div>

      {hasWon && (
        <FinishOverlay onRestartFromPhaseOne={onRestartFromPhaseOne} />
      )}
    </div>
  );
}

function shuffleOuterLetters(
  letters: [string, string, string, string, string, string],
): [string, string, string, string, string, string] {
  const next = [...letters];

  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }

  return [next[0], next[1], next[2], next[3], next[4], next[5]];
}
