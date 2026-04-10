import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

/**
 * A scrollable container that adds a rubber-band / elastic stretch effect
 * when the user overscrolls at the top or bottom.
 *
 * Works on touch, wheel and keyboard scrolling.
 *
 * Uses a regular native scroll (so scrollbars, keyboard, accessibility and
 * momentum all stay intact) plus a `y` offset applied to an inner wrapper
 * when we detect an overscroll event.
 */
export default function ElasticScroll({
  className = "",
  children,
  maxStretch = 60,
  stiffness = 320,
  damping = 28,
}) {
  const scrollRef = useRef(null);
  const stretchY = useMotionValue(0);
  const springY = useSpring(stretchY, { stiffness, damping });

  const clamp = useCallback(
    (v) => Math.max(-maxStretch, Math.min(maxStretch, v)),
    [maxStretch]
  );

  const applyDelta = useCallback(
    (deltaY) => {
      const el = scrollRef.current;
      if (!el) return false;
      const atTop = el.scrollTop <= 0;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const current = stretchY.get();

      // Only stretch when we're already at an edge AND the user is trying to
      // scroll further in that direction.
      if ((atTop && deltaY < 0) || current > 0) {
        // Dampened accumulation
        const next = clamp(current - deltaY * 0.35);
        stretchY.set(next);
        return true;
      }
      if ((atBottom && deltaY > 0) || current < 0) {
        const next = clamp(current - deltaY * 0.35);
        stretchY.set(next);
        return true;
      }
      return false;
    },
    [stretchY, clamp]
  );

  const releaseStretch = useCallback(() => {
    animate(stretchY, 0, {
      type: "spring",
      stiffness,
      damping,
    });
  }, [stretchY, stiffness, damping]);

  // Touch handling — track deltas between events
  const touchStartY = useRef(0);
  const onTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const onTouchMove = (e) => {
    const y = e.touches[0].clientY;
    const delta = touchStartY.current - y;
    touchStartY.current = y;
    if (applyDelta(delta)) {
      // consume the event only if we're actually stretching
      e.preventDefault?.();
    }
  };
  const onTouchEnd = () => releaseStretch();

  // Wheel handling (desktop)
  const wheelReleaseTimer = useRef(null);
  const onWheel = (e) => {
    if (applyDelta(e.deltaY)) {
      e.preventDefault();
    }
    if (wheelReleaseTimer.current) clearTimeout(wheelReleaseTimer.current);
    wheelReleaseTimer.current = setTimeout(() => releaseStretch(), 140);
  };

  return (
    <div
      ref={scrollRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      onWheel={onWheel}
      className={`overflow-y-auto no-scrollbar overscroll-contain ${className}`}
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <motion.div style={{ y: springY }}>{children}</motion.div>
    </div>
  );
}
