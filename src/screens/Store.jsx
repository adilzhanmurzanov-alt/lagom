import { useParams, useNavigate, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../components/PhoneFrame";
import ElasticScroll from "../components/ElasticScroll";
import { CATEGORIES } from "../data/store";
import { useApp } from "../context/AppContext";
import { HeartIcon } from "../components/icons";

const ease = [0.22, 1, 0.36, 1];

function pluralize(n, [one, few, many]) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function Icon({ size = 22, children }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export default function Store() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleFavorite, favorites, cartCount } = useApp();
  const cat = CATEGORIES[category];

  if (!cat) return <Navigate to="/home" replace />;

  return (
    <PhoneFrame>
      {/* Top bar */}
      <div className="flex items-center justify-between px-7 pt-11 pb-5 shrink-0">
        <button
          type="button"
          aria-label="Назад"
          onClick={() => navigate(-1)}
          className="text-ink/85 active:scale-95 transition-transform"
        >
          <Icon>
            <path d="M15 6l-6 6 6 6" />
          </Icon>
        </button>

        <span className="font-display text-[18px] tracking-tight text-ink">
          {cat.label}
        </span>

        <button
          type="button"
          aria-label="Корзина"
          onClick={() => navigate("/cart")}
          className="relative text-ink/85 active:scale-95 transition-transform"
        >
          <Icon>
            <circle cx="9" cy="20" r="1.2" />
            <circle cx="17" cy="20" r="1.2" />
            <path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20.5 8H6" />
          </Icon>
          <AnimatePresence>
            {cartCount > 0 && (
              <motion.span
                key={cartCount}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="absolute -top-1 -right-2 h-[18px] min-w-[18px] px-1 rounded-full bg-ink text-cream-50 text-[10px] font-medium flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Small meta row */}
      <div className="px-7 pb-4 flex items-center justify-between shrink-0">
        <span className="text-[12px] text-ink/55">
          {cat.products.length}{" "}
          {pluralize(cat.products.length, ["товар", "товара", "товаров"])}
        </span>
        <button
          type="button"
          className="text-[12px] text-ink/55 hover:text-ink/85 transition-colors flex items-center gap-1"
        >
          <Icon size={14}>
            <path d="M3 6h18" />
            <path d="M6 12h12" />
            <path d="M10 18h4" />
          </Icon>
          Фильтры
        </button>
      </div>

      {/* Products grid */}
      <ElasticScroll className="flex-1 min-h-0 px-5 pb-8">
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: { staggerChildren: 0.07, delayChildren: 0.15 },
            },
          }}
        >
          {cat.products.map((p) => {
            const isFav = favorites.includes(p.id);
            return (
              <motion.article
                key={p.id}
                variants={{
                  initial: { opacity: 0, y: 20, scale: 0.96 },
                  animate: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.55, ease },
                  },
                }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/product/${p.id}`)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-cream-50 ring-1 ring-ink/15 group-hover:ring-ink/35 transition-colors">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    animate={
                      isFav
                        ? { scale: [1, 1.25, 1] }
                        : { scale: 1 }
                    }
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    type="button"
                    aria-label="В избранное"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(p.id);
                    }}
                    className={
                      isFav
                        ? "absolute top-3 right-3 h-8 w-8 rounded-full bg-ink text-cream-50 flex items-center justify-center"
                        : "absolute top-3 right-3 h-8 w-8 rounded-full bg-cream-50 ring-1 ring-ink/15 text-ink/80 hover:text-ink hover:ring-ink/40 flex items-center justify-center transition-colors"
                    }
                  >
                    <HeartIcon size={15} filled={isFav} />
                  </motion.button>
                </div>
                <div className="mt-3 px-1 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="font-display text-[17px] leading-tight text-ink truncate">
                      {p.name}
                    </div>
                    <div className="text-[12px] text-ink/55 mt-0.5">
                      {p.price}
                    </div>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    whileHover={{ scale: 1.08 }}
                    type="button"
                    aria-label="В корзину"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p.id);
                    }}
                    className="shrink-0 h-9 w-9 rounded-full bg-ink text-cream-50 flex items-center justify-center"
                  >
                    <Icon size={15}>
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </Icon>
                  </motion.button>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </ElasticScroll>
    </PhoneFrame>
  );
}
