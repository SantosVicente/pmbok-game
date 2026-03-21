import { useEffect, useRef } from "react";
import gsap from "gsap";

type GameFeedbackProps = {
  feedback: string;
  hasLost: boolean;
  targetWords: [string, string, string, string];
};

export function GameFeedback({
  feedback,
  hasLost,
  targetWords,
}: GameFeedbackProps) {
  const feedbackRef = useRef<HTMLParagraphElement>(null);
  const lossMessageRef = useRef<HTMLParagraphElement>(null);

  // Animação do feedback
  useEffect(() => {
    if (!feedbackRef.current) return;

    if (feedback) {
      gsap.fromTo(
        feedbackRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    } else {
      gsap.to(feedbackRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [feedback]);

  // Animação quando perde
  useEffect(() => {
    if (!hasLost || !lossMessageRef.current) return;

    gsap.fromTo(
      lossMessageRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" },
    );
  }, [hasLost]);

  return (
    <>
      {feedback && (
        <p ref={feedbackRef} className="text-xs text-amber-300 pt-2">
          {feedback}
        </p>
      )}

      {hasLost && (
        <p ref={lossMessageRef} className="text-sm text-red-300 mt-4">
          Tentativas esgotadas. Palavras: {targetWords[0]} e {targetWords[1]}.
          Clique em Reiniciar para tentar outra rodada.
        </p>
      )}
    </>
  );
}
