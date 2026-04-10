import { BackIcon } from "./icons";

export default function TopHeader({ title, onBack, right = null }) {
  return (
    <div className="flex items-center justify-between px-7 pt-11 pb-5 shrink-0">
      <button
        type="button"
        aria-label="Назад"
        onClick={onBack}
        className="text-ink/85 active:scale-95 transition-transform w-7 flex items-center"
      >
        {onBack ? <BackIcon /> : null}
      </button>

      <span className="font-display text-[18px] tracking-tight text-ink text-center flex-1">
        {title}
      </span>

      <div className="w-7 flex items-center justify-end">{right}</div>
    </div>
  );
}
