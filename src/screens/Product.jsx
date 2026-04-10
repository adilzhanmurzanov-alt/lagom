import { useParams, useNavigate, Navigate } from "react-router-dom";
import PhoneFrame from "../components/PhoneFrame";
import { getProductById, useApp } from "../context/AppContext";
import { BackIcon, CartIcon, HeartIcon } from "../components/icons";

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites, cartCount } = useApp();

  const product = getProductById(id);
  if (!product) return <Navigate to="/home" replace />;

  const isFav = favorites.includes(product.id);

  return (
    <PhoneFrame>
      {/* Hero image */}
      <div className="relative h-[52%] shrink-0 bg-cream-50">
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-50" />

        {/* Top controls */}
        <div className="relative h-full flex items-start justify-between px-6 pt-11">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Назад"
            className="h-11 w-11 rounded-full bg-cream-50 ring-1 ring-ink/15 flex items-center justify-center text-ink hover:ring-ink/35 transition-colors"
          >
            <BackIcon />
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label="В избранное"
              className="h-11 w-11 rounded-full bg-cream-50 ring-1 ring-ink/15 flex items-center justify-center text-ink hover:ring-ink/35 transition-colors"
            >
              <HeartIcon filled={isFav} />
            </button>
            <button
              type="button"
              onClick={() => navigate("/cart")}
              aria-label="Корзина"
              className="relative h-11 w-11 rounded-full bg-cream-50 ring-1 ring-ink/15 flex items-center justify-center text-ink hover:ring-ink/35 transition-colors"
            >
              <CartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-ink text-cream-50 text-[10px] font-medium flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-7 pt-1 pb-4">
        <div className="text-[11px] uppercase tracking-[0.22em] text-ink/50">
          {product.categoryLabel}
        </div>
        <h1 className="font-display text-[32px] leading-[1.05] text-ink mt-2 tracking-tight">
          {product.name}
        </h1>

        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-1 text-[13px] text-ink/80">
            <span>★</span>
            <span>4.8</span>
          </div>
          <div className="text-[13px] text-ink/40">342 отзыва</div>
        </div>

        <p className="text-[14px] leading-[1.55] text-ink/70 mt-5">
          Лаконичная форма, натуральные материалы и ручная сборка. Каркас из
          массива бука, обивка из плотной шерсти. Доставка за 7–14 дней.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {["Натуральные материалы", "Гарантия 5 лет", "Сборка в подарок"].map(
            (tag) => (
              <span
                key={tag}
                className="text-[11px] px-3 py-1.5 rounded-full ring-1 ring-ink/15 text-ink/70"
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      {/* Sticky buy bar */}
      <div className="shrink-0 px-6 py-4 border-t border-ink/10 bg-cream-50 flex items-center gap-4">
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink/50">
            Цена
          </div>
          <div className="font-display text-[22px] text-ink leading-tight truncate">
            {product.price}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            addToCart(product.id);
            navigate("/cart");
          }}
          className="h-14 px-7 rounded-full bg-ink text-cream-50 text-[13px] font-medium tracking-wide uppercase hover:scale-[1.02] active:scale-95 transition-transform"
        >
          В корзину
        </button>
      </div>
    </PhoneFrame>
  );
}
