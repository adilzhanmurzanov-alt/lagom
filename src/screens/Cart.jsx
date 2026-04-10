import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PhoneFrame from "../components/PhoneFrame";
import TopHeader from "../components/TopHeader";
import {
  useApp,
  getProductById,
  parsePrice,
  formatPrice,
} from "../context/AppContext";
import { CartIcon, MinusIcon, PlusIcon } from "../components/icons";

const ease = [0.22, 1, 0.36, 1];

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateQty, removeFromCart } = useApp();

  const items = cart
    .map((i) => ({ ...i, product: getProductById(i.id) }))
    .filter((i) => i.product);

  const subtotal = items.reduce(
    (s, i) => s + parsePrice(i.product.price) * i.qty,
    0
  );
  const shipping = items.length > 0 ? 1500 : 0;
  const total = subtotal + shipping;

  return (
    <PhoneFrame>
      <TopHeader title="Корзина" onBack={() => navigate(-1)} />

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
          <div className="h-20 w-20 rounded-full ring-1 ring-ink/15 flex items-center justify-center text-ink/80">
            <CartIcon size={26} />
          </div>
          <h2 className="font-display text-[24px] text-ink mt-5">
            Корзина пуста
          </h2>
          <p className="text-[13px] text-ink/55 mt-2 max-w-[260px]">
            Добавьте сюда что-нибудь из каталога — там есть отличные диваны.
          </p>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="mt-6 h-12 px-6 rounded-full bg-ink text-cream-50 text-[13px] font-medium"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <>
          <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 pt-1 pb-4">
            <AnimatePresence initial={false}>
            {items.map(({ product, qty }, index) => (
              <motion.article
                key={product.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease, delay: index * 0.05 } }}
                exit={{ opacity: 0, x: 40, transition: { duration: 0.3, ease } }}
                className="flex gap-4 py-4 border-b border-ink/10 last:border-0"
              >
                <button
                  type="button"
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="h-24 w-24 rounded-2xl overflow-hidden bg-cream-50 ring-1 ring-ink/15 shrink-0"
                >
                  <img
                    src={product.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="font-display text-[17px] text-ink leading-tight truncate">
                    {product.name}
                  </div>
                  <div className="text-[12px] text-ink/55 mt-0.5">
                    {formatPrice(parsePrice(product.price))}
                  </div>
                  <div className="mt-auto flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateQty(product.id, qty - 1)}
                      className="h-8 w-8 rounded-full ring-1 ring-ink/15 flex items-center justify-center text-ink/80 hover:ring-ink/35"
                      aria-label="Меньше"
                    >
                      <MinusIcon size={14} />
                    </button>
                    <span className="w-6 text-center text-[14px] text-ink">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(product.id, qty + 1)}
                      className="h-8 w-8 rounded-full ring-1 ring-ink/15 flex items-center justify-center text-ink/80 hover:ring-ink/35"
                      aria-label="Больше"
                    >
                      <PlusIcon size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="ml-auto text-[11px] uppercase tracking-[0.12em] text-ink/45 hover:text-ink/80 transition-colors"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
            </AnimatePresence>
          </div>

          {/* Summary + checkout */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease, delay: 0.2 }}
            className="shrink-0 px-6 pt-4 pb-6 border-t border-ink/10"
          >
            <div className="space-y-1.5 text-[13px]">
              <div className="flex justify-between text-ink/70">
                <span>Товары</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink/70">
                <span>Доставка</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-ink font-medium pt-2 border-t border-ink/10 mt-2">
                <span>Итого</span>
                <span className="font-display text-[18px]">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => navigate("/checkout")}
              className="mt-4 w-full h-14 rounded-full bg-ink text-cream-50 text-[13px] font-medium tracking-wide uppercase"
            >
              Оформить заказ
            </motion.button>
          </motion.div>
        </>
      )}
    </PhoneFrame>
  );
}
