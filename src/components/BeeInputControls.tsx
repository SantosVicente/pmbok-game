import gsap from "gsap";

type BeeInputControlsProps = {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onBackspace: () => void;
  onClear: () => void;
  onShuffleLetters: () => void;
};

export function BeeInputControls({
  value,
  disabled,
  onChange,
  onSubmit,
  onBackspace,
  onClear,
  onShuffleLetters,
}: BeeInputControlsProps) {
  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        value={value}
        onChange={(event) => onChange(event.target.value.toUpperCase())}
        maxLength={9}
        disabled={disabled}
        className="rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-base text-white text-center tracking-[0.35em] outline-none focus:border-purple-400 transition-all"
        placeholder="DIGITE"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          type="submit"
          disabled={disabled}
          className="btn-primary rounded-xl px-4 py-2.5 text-sm"
          onMouseEnter={!disabled ? animateHoverIn : undefined}
          onMouseLeave={!disabled ? animateHoverOut : undefined}
        >
          Enviar
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={onBackspace}
          className="btn-ghost rounded-xl px-4 py-2.5 text-sm"
          onMouseEnter={!disabled ? animateHoverIn : undefined}
          onMouseLeave={!disabled ? animateHoverOut : undefined}
        >
          Apagar
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={onClear}
          className="btn-ghost rounded-xl px-4 py-2.5 text-sm"
          onMouseEnter={!disabled ? animateHoverIn : undefined}
          onMouseLeave={!disabled ? animateHoverOut : undefined}
        >
          Limpar
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={onShuffleLetters}
          className="btn-ghost rounded-xl px-4 py-2.5 text-sm"
          onMouseEnter={!disabled ? animateHoverIn : undefined}
          onMouseLeave={!disabled ? animateHoverOut : undefined}
        >
          Misturar
        </button>
      </div>
    </form>
  );
}

function animateHoverIn(event: React.MouseEvent<HTMLButtonElement>) {
  gsap.to(event.currentTarget, {
    scale: 1.04,
    duration: 0.2,
    ease: "power2.out",
  });
}

function animateHoverOut(event: React.MouseEvent<HTMLButtonElement>) {
  gsap.to(event.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
}
