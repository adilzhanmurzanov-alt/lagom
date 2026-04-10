import { useParams, useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../components/PhoneFrame";
import { getProductById, useApp } from "../context/AppContext";
import { BackIcon, CartIcon, HeartIcon } from "../components/icons";

const ease = [0.22, 1, 0.36, 1];

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
      <div className="relative h-[52%] shrink-0 bg-cream-50 overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.name}
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease }}
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
            <motion.button
              whileTap={{ scale: 0.9 }}
              animate={isFav ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              type="button"
              onClick={() => toggleFavorite(product.id)}
              aria-label="В избранное"
              className="h-11 w-11 rounded-full bg-cream-50 ring-1 ring-ink/15 flex items-center justify-center text-ink hover:ring-ink/35 transition-colors"
            >
              <HeartIcon filled={isFav} />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={() => navigate("/cart")}
              aria-label="Корзина"
              className="relative h-11 w-11 rounded-full bg-cream-50 ring-1 ring-ink/15 flex items-center justify-center text-ink hover:ring-ink/35 transition-colors"
            >
              <CartIcon />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                    className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-ink text-cream-50 text-[10px] font-medium flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Details */}
      <motion.div
        className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-7 pt-1 pb-4"
        initial="initial"
        animate="animate"
        variants={{
          animate: {
            transition: { staggerChildren: 0.08, delayChildren: 0.25 },
          },
        }}
      >
        {[
          <div
            key="cat"
            className="text-[11px] uppercase tracking-[0.22em] text-ink/50"
          >
            {product.categoryLabel}
          </div>,
          <h1
            key="title"
            className="font-display text-[32px] leading-[1.05] text-ink mt-2 tracking-tight"
          >
            {product.name}
          </h1>,
          <div key="rating" className="flex items-center gap-3 mt-3">
            <div className="flex items-center gap-1 text-[13px] text-ink/80">
              <span>★</span>
              <span>4.8</span>
            </div>
            <div className="text-[13px] text-ink/40">342 отзыва</div>
          </div>,
          <p
            key="desc"
            className="text-[14px] leading-[1.55] text-ink/70 mt-5"
          >
            Лаконичная форма, натуральные материалы и ручная сборка. Каркас из
            массива бука, обивка из плотной шерсти. Доставка за 7–14 дней.
          </p>,
          <div key="tags" className="mt-5 flex flex-wrap gap-2">
            {[
              "Натуральные материалы",
              "Гарантия 5 лет",
              "Сборка в подарок",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-3 py-1.5 rounded-full ring-1 ring-ink/15 text-ink/70"
              >
                {tag}
              </span>
            ))}
          </div>,
        ].map((child, i) => (
          <motion.div
            key={i}
            variants={{
              initial: { opacity: 0, y: 14 },
              animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
            }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>

      {/* Sticky buy bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease, delay: 0.5 }}
        className="shrink-0 px-6 py-4 border-t border-ink/10 bg-cream-50 flex items-center gap-4"
      >
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.18em] text-ink/50">
            Цена
          </div>
          <div className="font-display text-[22px] text-ink leading-tight truncate">
            {product.price}
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={() => {
            addToCart(product.id);
            navigate("/cart");
          }}
          className="h-14 px-7 rounded-full bg-ink text-cream-50 text-[13px] font-medium tracking-wide uppercase"
        >
          В корзину
        </motion.button>
      </motion.div>
    </PhoneFrame>
  );
}
