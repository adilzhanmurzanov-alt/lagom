import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PhoneFrame from "../components/PhoneFrame";
import { useApp } from "../context/AppContext";

const ease = [0.22, 1, 0.36, 1];

export default function Checkout() {
  const navigate = useNavigate();
  const { clearCart } = useApp();

  const orderNumber = useMemo(
    () => "LGM-" + (Math.floor(Math.random() * 90000) + 10000),
    []
  );

  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PhoneFrame>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        {/* Animated check badge */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 18,
            delay: 0.1,
          }}
          className="h-24 w-24 rounded-full bg-ink text-cream-50 flex items-center justify-center"
        >
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease, delay: 0.5 }}
            />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.8 }}
          className="font-display text-[32px] text-ink mt-6 tracking-tight"
        >
          Заказ оформлен
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.95 }}
          className="text-[14px] text-ink/60 mt-3 max-w-[300px] leading-[1.5]"
        >
          Мы отправили подтверждение на вашу почту. Курьер свяжется с вами в
          ближайшие 24 часа.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 1.1 }}
          className="mt-8 w-full max-w-[300px] rounded-[22px] ring-1 ring-ink/15 bg-cream-50 p-5 text-left"
        >
          <div className="text-[10px] uppercase tracking-[0.2em] text-ink/50">
            Номер заказа
          </div>
          <div className="font-display text-[22px] text-ink mt-1">
            #{orderNumber}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 1.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={() => navigate("/home")}
          className="mt-8 h-14 px-8 rounded-full bg-ink text-cream-50 text-[13px] font-medium tracking-wide uppercase"
        >
          На главную
        </motion.button>
      </div>
    </PhoneFrame>
  );
}
