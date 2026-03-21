import gsap from "gsap";

type GameControlsProps = {
  input: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  disabled: boolean;
  wordLength: number;
};

export function GameControls({
  input,
  onChange,
  onSubmit,
  onReset,
  disabled,
  wordLength,
}: GameControlsProps) {
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.currentTarget, {
      borderColor: "rgba(168, 85, 247, 0.8)",
      duration: 0.3,
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    gsap.to(e.currentTarget, {
      borderColor: "rgba(255, 255, 255, 0.1)",
      duration: 0.3,
    });
  };

  const handleSubmitEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      gsap.to(e.currentTarget, {
        scale: 1.05,
        duration: 0.2,
      });
      setTimeout(() => {
        gsap.to(e.currentTarget, {
          scale: 1,
          duration: 0.2,
        });
      }, 200);
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        value={input}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        maxLength={wordLength}
        disabled={disabled}
        className="flex-1 rounded-xl bg-white/5 border border-white/15 px-4 py-2.5 text-sm text-white outline-none focus:border-purple-400 transition-all"
        placeholder="Digite seu palpite"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <button
        type="submit"
        disabled={disabled}
        className="btn-primary rounded-xl px-5 py-2.5 text-sm transition-all hover:scale-105 active:scale-95"
        onClick={handleSubmitEnter}
        onMouseEnter={
          !disabled
            ? (e) => {
                gsap.to(e.currentTarget, {
                  scale: 1.05,
                  duration: 0.2,
                });
              }
            : undefined
        }
        onMouseLeave={
          !disabled
            ? (e) => {
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.2,
                });
              }
            : undefined
        }
      >
        Enviar
      </button>
      <button
        type="button"
        onClick={onReset}
        className="btn-ghost rounded-xl px-5 py-2.5 text-sm transition-all hover:scale-105 active:scale-95"
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.2,
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.2,
          });
        }}
      >
        Reiniciar
      </button>
    </form>
  );
}
