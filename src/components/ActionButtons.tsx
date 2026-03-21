type ActionButtonsProps = {
  selectedCount: number;
  won: boolean;
  onShowHint: () => void;
  onClear: () => void;
  onSubmit: () => void;
  onReset: () => void;
  isHintDisabled: boolean;
};

export function ActionButtons({
  selectedCount,
  won,
  onShowHint,
  onClear,
  onSubmit,
  onReset,
  isHintDisabled,
}: ActionButtonsProps) {
  return (
    <div className="relative z-10 w-full max-w-3xl px-4 mt-5 flex flex-wrap gap-2 sm:gap-3 justify-center">
      <button
        onClick={onShowHint}
        disabled={isHintDisabled}
        className={`btn-ghost ${isHintDisabled ? "cursor-not-allowed!" : "cursor-pointer!"} rounded-xl px-4 sm:px-5 py-2.5 text-sm min-w-[120px]`}
        type="button"
      >
        💡 Dica
      </button>
      <button
        onClick={onClear}
        className="btn-ghost rounded-xl px-4 sm:px-5 py-2.5 text-sm min-w-[120px]"
        disabled={selectedCount === 0}
        type="button"
      >
        Limpar
      </button>
      <button
        onClick={onSubmit}
        className="btn-primary rounded-xl px-6 sm:px-8 py-2.5 text-sm min-w-[150px]"
        disabled={selectedCount !== 4 || won}
        type="button"
      >
        Confirmar ({selectedCount}/4)
      </button>
      <button
        onClick={onReset}
        className="btn-ghost rounded-xl px-4 sm:px-5 py-2.5 text-sm min-w-[120px]"
        type="button"
      >
        🔄
      </button>
    </div>
  );
}
