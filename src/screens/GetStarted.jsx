import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { asset } from "../utils/asset";

const HERO_IMG = asset("hero-chair.png");

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      {/* Top brand row */}
      <div className="flex items-center justify-between px-8 pt-10">
        <span className="font-display text-[19px] tracking-tight text-ink/85">
          lagom
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-ink/40">
          С 2026
        </span>
      </div>

      {/* Headline */}
      <div className="px-8 pt-7">
        <h1 className="font-display font-light text-ink text-[44px] leading-[1.04] tracking-[-0.02em]">
          Простая
          <br />
          элегантная
          <br />
          мебель<span className="text-ink/60">.</span>
        </h1>
      </div>

      {/* Hero image — rounded via wrapper so nothing can escape the clip */}
      <div className="relative flex-1 flex items-center justify-center min-h-0 px-6 pt-4 pb-2">
        <div className="relative w-full max-w-[320px] aspect-[5/6] rounded-[28px] overflow-hidden ring-1 ring-black/5 shadow-[0_30px_60px_-20px_rgba(40,20,0,0.35)]">
          <img
            src={HERO_IMG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Bottom row: tagline + CTA */}
      <div className="px-8 pb-14 pt-4 flex items-center justify-between gap-6">
        <p className="text-[14px] leading-[1.5] text-ink/55 max-w-[190px]">
          Доступная мебель и&nbsp;идеи
          <br />
          для вашего дома.
        </p>

        <button
          type="button"
          onClick={() => navigate("/home")}
          aria-label="Начать"
          className="group shrink-0 h-[84px] w-[84px] rounded-full bg-ink text-cream-50 flex items-center justify-center transition-transform active:scale-95 hover:scale-[1.03] shadow-[0_16px_34px_-10px_rgba(0,0,0,0.55)]"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path d="M5 12h14" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </PhoneFrame>
  );
}
