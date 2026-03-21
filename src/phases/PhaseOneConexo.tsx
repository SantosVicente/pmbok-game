import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ActionButtons } from "../components/ActionButtons";
import { GameHeader } from "../components/GameHeader";
import { HintPanel } from "../components/HintPanel";
import { LegendPanel } from "../components/LegendPanel";
import { SolvedCategories } from "../components/SolvedCategories";
import { StatusPanel } from "../components/StatusPanel";
import { TileGrid } from "../components/TileGrid";
import { WinOverlay } from "../components/WinOverlay";
import { ALL_ITEMS, CATEGORY_META, HINT_BANK, shuffle } from "../game/data";
import type { CategoryId, GameItem, HintEntry } from "../game/types";

type PhaseOneGameProps = {
  onNextPhase: () => void;
};

export function PhaseOneConexo({ onNextPhase }: PhaseOneGameProps) {
  const [tiles, setTiles] = useState<GameItem[]>(() => shuffle(ALL_ITEMS));
  const [selected, setSelected] = useState<GameItem[]>([]);
  const [solved, setSolved] = useState<CategoryId[]>([]);
  const [attempts, setAttempts] = useState(0);
  const [flash, setFlash] = useState<CategoryId | null>(null);
  const [won, setWon] = useState(false);
  const [hintLog, setHintLog] = useState<HintEntry[]>([]);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      titleRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.4)" },
    )
      .fromTo(
        subtitleRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3",
      )
      .fromTo(
        ".tile-card",
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.2",
      );
  }, []);

  useEffect(() => {
    if (!won) return;
    gsap.fromTo(
      ".win-banner",
      { scale: 0.5, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "elastic.out(1, 0.5)",
      },
    );
  }, [won]);

  const toggle = (item: GameItem) => {
    if (won || solved.includes(item.category)) return;

    if (selected.find((s) => s.id === item.id)) {
      setSelected((prev) => prev.filter((s) => s.id !== item.id));
      return;
    }

    if (selected.length >= 4) return;
    setSelected((prev) => [...prev, item]);
  };

  const submit = () => {
    if (won || selected.length !== 4) return;

    const cats = selected.map((s) => s.category);
    const allSame = cats.every((c) => c === cats[0]);

    setAttempts((a) => a + 1);

    if (allSame) {
      const catId = cats[0];
      setFlash(catId);
      setTimeout(() => setFlash(null), 700);

      setSolved((prev) => {
        const next = [...prev, catId];
        if (next.length === 4) {
          setTimeout(() => setWon(true), 600);
        }
        return next;
      });

      setSelected([]);
      return;
    }

    gsap.fromTo(
      ".selected-tile",
      { x: 0 },
      {
        keyframes: [
          { x: -12 },
          { x: 12 },
          { x: -8 },
          { x: 8 },
          { x: -4 },
          { x: 4 },
          { x: 0 },
        ],
        duration: 0.5,
        ease: "power1.inOut",
      },
    );
  };

  const showHint = () => {
    if (won) return;

    const unsolved = CATEGORY_META.filter((c) => !solved.includes(c.id));
    if (unsolved.length === 0) return;

    const used = new Set(hintLog.map((h) => h.id));
    const available: HintEntry[] = [];

    unsolved.forEach((category) => {
      HINT_BANK[category.id].clues.forEach((detail, index) => {
        available.push({
          id: `${category.id}-${index}`,
          title: HINT_BANK[category.id].title,
          detail,
        });
      });
    });

    const fresh = available.filter((h) => !used.has(h.id));
    const pool = fresh.length > 0 ? fresh : available;
    const pick = pool[Math.floor(Math.random() * pool.length)];

    if (!pick) return;

    setHintLog((prev) =>
      prev.some((h) => h.id === pick.id) ? prev : [pick, ...prev],
    );
  };

  const resetGame = () => {
    setTiles(shuffle(ALL_ITEMS));
    setSelected([]);
    setSolved([]);
    setAttempts(0);
    setWon(false);
    setFlash(null);
    setHintLog([]);

    setTimeout(() => {
      gsap.fromTo(
        ".tile-card",
        { scale: 0.85, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          stagger: 0.03,
          ease: "power2.out",
        },
      );
    }, 50);
  };

  const isHintDisabled = () => {
    if (won) return true;

    const unsolved = CATEGORY_META.filter((c) => !solved.includes(c.id));
    const used = new Set(hintLog.map((h) => h.id));
    const available: HintEntry[] = [];

    unsolved.forEach((category) => {
      HINT_BANK[category.id].clues.forEach((detail, index) => {
        available.push({
          id: `${category.id}-${index}`,
          title: HINT_BANK[category.id].title,
          detail,
        });
      });
    });

    const fresh = available.filter((h) => !used.has(h.id));
    return fresh.length === 0;
  };

  return (
    <>
      <GameHeader titleRef={titleRef} subtitleRef={subtitleRef} />
      <StatusPanel
        attempts={attempts}
        solvedCount={solved.length}
        totalCategories={CATEGORY_META.length}
      />
      <SolvedCategories solved={solved} categoryMeta={CATEGORY_META} />
      <TileGrid
        tiles={tiles}
        selected={selected}
        solved={solved}
        flash={flash}
        onToggle={toggle}
      />
      <HintPanel hintLog={hintLog} />
      <ActionButtons
        selectedCount={selected.length}
        won={won}
        onShowHint={showHint}
        onClear={() => setSelected([])}
        onSubmit={submit}
        onReset={resetGame}
        isHintDisabled={isHintDisabled()}
      />
      <LegendPanel categoryMeta={CATEGORY_META} solved={solved} />
      {won && <WinOverlay attempts={attempts} nextPhase={onNextPhase} />}
    </>
  );
}
