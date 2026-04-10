import { useNavigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { useApp } from "../context/AppContext";
import { CartIcon, HeartIcon } from "../components/icons";
import { asset } from "../utils/asset";

const HERO = asset("chairs2.jpg");

const TILE_IMG = {
  sofa: asset("tiles/sofa.jpg"),
  lamp: asset("tiles/lamp.jpg"),
  chair: asset("tiles/chair.jpg"),
  table: asset("tiles/table.jpg"),
  armchair: asset("tiles/armchair.jpg"),
  more: asset("tiles/more.jpg"),
};

function ArrowIcon({ className = "" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function Tile({ label, image, onClick, className = "", children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[26px] bg-cream-50 ring-1 ring-ink/15 hover:ring-ink/35 transition-colors text-left ${className}`}
    >
      {image && (
        <>
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Top gradient so the label stays readable on any photo */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-ink/55 via-ink/20 to-transparent" />
        </>
      )}

      {children}

      {label && (
        <div className="absolute inset-x-0 top-0 p-4 flex items-start justify-between pointer-events-none">
          <span className="text-[11px] uppercase tracking-[0.2em] text-cream-50 drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            {label}
          </span>
          <ArrowIcon className="text-cream-50/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      )}
    </button>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const { cartCount, favoritesCount } = useApp();

  return (
    <PhoneFrame>
      {/* Hero section */}
      <div className="relative h-[42%] min-h-[300px] shrink-0 bg-cream-100">
        <img
          src={HERO}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-50" />
        <div className="relative h-full flex items-start justify-between px-7 pt-11">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="font-display text-[24px] tracking-tight text-cream-50 drop-shadow-[0_2px_10px_rgba(0,0,0,0.55)] hover:opacity-85 transition-opacity"
          >
            lagom
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => navigate("/favorites")}
              aria-label="Избранное"
              className="relative h-10 w-10 rounded-full bg-cream-50 ring-1 ring-ink/15 flex items-center justify-center text-ink hover:ring-ink/35 transition-colors"
            >
              <HeartIcon size={16} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 h-[18px] min-w-[18px] px-1 rounded-full bg-ink text-cream-50 text-[10px] font-medium flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/cart")}
              aria-label="Корзина"
              className="relative h-10 w-10 rounded-full bg-cream-50 ring-1 ring-ink/15 flex items-center justify-center text-ink hover:ring-ink/35 transition-colors"
            >
              <CartIcon size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-[18px] min-w-[18px] px-1 rounded-full bg-ink text-cream-50 text-[10px] font-medium flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Body — AI consultant + bento grid */}
      <div className="flex-1 min-h-0 flex flex-col px-5 pb-7 pt-1 gap-3">
        {/* AI consultant pill */}
        <button
          type="button"
          onClick={() => navigate("/assistant")}
          className="group w-full h-[58px] shrink-0 rounded-full bg-cream-50 ring-1 ring-ink/15 hover:ring-ink/35 transition-colors flex items-center px-5 gap-3"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-ink/60"
          >
            <path d="M12 3l1.9 4.8L18.8 9.7l-4.9 1.9L12 16.5l-1.9-4.9L5.2 9.7l4.9-1.9z" />
            <path d="M19 14.5l0.7 1.8 1.8 0.7-1.8 0.7-0.7 1.8-0.7-1.8-1.8-0.7 1.8-0.7z" />
          </svg>
          <span className="text-[14px] text-ink/70 font-medium">
            ИИ-консультант
          </span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-auto text-ink/45 group-hover:translate-x-0.5 transition-transform"
          >
            <path d="M5 12h14" />
            <path d="M13 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bento grid */}
        <div className="flex-1 min-h-0 flex flex-col gap-3">
          {/* Row 1: Диваны (wide with photo) + Торшеры */}
          <div className="flex gap-3 flex-1 min-h-0">
            <Tile
              label="ДИВАНЫ"
              image={TILE_IMG.sofa}
              onClick={() => navigate("/store/sofas")}
              className="flex-[2.1]"
            />
            <Tile
              label="ТОРШЕРЫ"
              image={TILE_IMG.lamp}
              onClick={() => navigate("/store/lamps")}
              className="flex-1"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            <Tile
              label="СТУЛЬЯ"
              image={TILE_IMG.chair}
              onClick={() => navigate("/store/chairs")}
            />
            <Tile
              label="СТОЛЫ"
              image={TILE_IMG.table}
              onClick={() => navigate("/store/tables")}
            />
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            <Tile
              label="КРЕСЛА"
              image={TILE_IMG.armchair}
              onClick={() => navigate("/store/armchairs")}
            />
            <Tile
              label="ЕЩЁ"
              image={TILE_IMG.more}
              onClick={() => navigate("/store/all")}
            />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
