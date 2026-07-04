"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

const emptySubscribe = () => () => {};
const finePointerNoReducedMotion = () =>
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Targeting-reticle cursor — a crosshair that locks onto interactive
 * elements ([data-cursor]) with an expanding bracket + label readout.
 * Renders nothing on touch devices.
 */
export default function CustomCursor() {
  const enabled = useSyncExternalStore(
    emptySubscribe,
    finePointerNoReducedMotion,
    () => false,
  );
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 900, damping: 55, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 900, damping: 55, mass: 0.25 });

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("cursor-none-desktop");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
      setLabel(target?.getAttribute("data-cursor") ?? null);
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      document.documentElement.classList.remove("cursor-none-desktop");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const locked = label && label !== "hide";
  const size = locked ? 44 : 20;
  const color = locked ? "#ff2a6d" : "#00f0ff";

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        zIndex: 200,
        pointerEvents: "none",
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      {/* Reticle */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 44 44"
        animate={{
          width: size,
          height: size,
          rotate: locked ? 45 : 0,
          scale: pressed ? 0.75 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          display: "block",
          filter: `drop-shadow(0 0 6px ${color})`,
        }}
      >
        {/* corner brackets */}
        <g stroke={color} strokeWidth="2.4" fill="none">
          <path d="M2 12 V2 H12" />
          <path d="M32 2 H42 V12" />
          <path d="M42 32 V42 H32" />
          <path d="M12 42 H2 V32" />
        </g>
        {/* center dot */}
        <circle cx="22" cy="22" r="2.2" fill={color} />
      </motion.svg>

      {/* Label readout */}
      <AnimatePresence>
        {locked && (
          <motion.span
            key={label}
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="mono-label"
            style={{
              position: "absolute",
              left: "calc(100% + 12px)",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "10px",
              color: "#ff2a6d",
              textShadow: "0 0 8px rgba(255,42,109,0.6)",
              whiteSpace: "nowrap",
              background: "rgba(4,4,10,0.75)",
              padding: "4px 8px",
              border: "1px solid rgba(255,42,109,0.35)",
            }}
          >
            [{label}]
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
