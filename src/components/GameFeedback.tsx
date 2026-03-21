import { useEffect, useRef } from "react";
import gsap from "gsap";

type GameFeedbackProps = {
  feedback: string;
};

export function GameFeedback({ feedback }: GameFeedbackProps) {
  const feedbackRef = useRef<HTMLParagraphElement>(null);

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

  return (
    <>
      {feedback && (
        <p ref={feedbackRef} className="text-xs text-amber-300 pt-2">
          {feedback}
        </p>
      )}
    </>
  );
}
