import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PhoneFrame from "../components/PhoneFrame";
import { asset } from "../utils/asset";

const HERO_IMG = asset("hero-chair.png");

const ease = [0.22, 1, 0.36, 1];

const headlineContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const headlineLine = {
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease },
  },
};

export default function GetStarted() {
  const navigate = useNavigate();

  return (
    <PhoneFrame>
      {/* Top brand row */}
      <motion.div
        className="flex items-center justify-between px-8 pt-10 shrink-0"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
      >
        <span className="font-display text-[19px] tracking-tight text-ink/85">
          lagom
        </span>
        <span className="text-[11px] uppercase tracking-[0.22em] text-ink/40">
          С 2026
        </span>
      </motion.div>

      {/* Headline */}
      <motion.div
        className="px-8 pt-6 shrink-0"
        variants={headlineContainer}
        initial="initial"
        animate="animate"
      >
        <h1 className="font-display font-light text-ink text-[38px] sm:text-[44px] leading-[1.05] tracking-[-0.02em]">
          <motion.span variants={headlineLine} className="block">
            Простая
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            элегантная
          </motion.span>
          <motion.span variants={headlineLine} className="block">
            мебель<span className="text-ink/60">.</span>
          </motion.span>
        </h1>
      </motion.div>

      {/* Hero image */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center px-6 py-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
          className="relative h-full aspect-[5/6] max-w-full rounded-[28px] overflow-hidden ring-1 ring-black/5 shadow-[0_30px_60px_-20px_rgba(40,20,0,0.35)]"
        >
          <img
            src={HERO_IMG}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </motion.div>
      </div>

      {/* Bottom row */}
      <motion.div
        className="px-8 pb-14 pt-4 flex items-center justify-between gap-6 shrink-0"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.85 }}
      >
        <p className="text-[14px] leading-[1.5] text-ink/55 max-w-[190px]">
          Доступная мебель и&nbsp;идеи
          <br />
          для вашего дома.
        </p>

        <motion.button
          type="button"
          onClick={() => navigate("/home")}
          aria-label="Начать"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          animate={{
            boxShadow: [
              "0 16px 34px -10px rgba(0,0,0,0.55)",
              "0 20px 44px -10px rgba(0,0,0,0.65)",
              "0 16px 34px -10px rgba(0,0,0,0.55)",
            ],
          }}
          transition={{
            boxShadow: {
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="group shrink-0 h-[84px] w-[84px] rounded-full bg-ink text-cream-50 flex items-center justify-center"
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
        </motion.button>
      </motion.div>
    </PhoneFrame>
  );
}
