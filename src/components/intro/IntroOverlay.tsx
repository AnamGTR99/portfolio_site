"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const BOOT_LINES = [
  "> ANAM.SYS v3.0 — MEL/HKG/CMB",
  "> NEURAL LINK ............ OK",
  "> RENDERER: WEBGL ........ OK",
  "> ACCESS GRANTED",
];

const LINE_INTERVAL = 170;
const HOLD = 260;
const EXIT = 350;

/**
 * Boot intro — rapid terminal boot sequence, flash, hard cut.
 * Total ~1.4s. Click anywhere to skip.
 */
export default function IntroOverlay({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [lines, setLines] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (exiting) return;
    const lineTimer = setInterval(() => {
      setLines((n) => Math.min(n + 1, BOOT_LINES.length));
    }, LINE_INTERVAL);
    const exitTimer = setTimeout(
      () => setExiting(true),
      BOOT_LINES.length * LINE_INTERVAL + HOLD,
    );
    return () => {
      clearInterval(lineTimer);
      clearTimeout(exitTimer);
    };
  }, [exiting]);

  useEffect(() => {
    if (!exiting) return;
    const doneTimer = setTimeout(() => {
      setDone(true);
      onComplete();
    }, EXIT);
    return () => clearTimeout(doneTimer);
  }, [exiting, onComplete]);

  if (done) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "#04040a", cursor: "pointer" }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: EXIT / 1000, ease: "easeOut" }}
      onClick={() => setExiting(true)}
    >
      {/* Flash on exit */}
      {exiting && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: "rgba(0,240,255,0.18)" }}
        />
      )}

      <div style={{ minWidth: "min(420px, 84vw)" }}>
        {BOOT_LINES.slice(0, lines).map((line, i) => (
          <div
            key={i}
            className="mono-label"
            style={{
              fontSize: "12px",
              letterSpacing: "0.12em",
              lineHeight: 2.1,
              color:
                i === BOOT_LINES.length - 1
                  ? "#00f0ff"
                  : "rgba(0,240,255,0.5)",
              textShadow:
                i === BOOT_LINES.length - 1
                  ? "0 0 12px rgba(0,240,255,0.6)"
                  : "none",
            }}
          >
            {line}
          </div>
        ))}
        {lines < BOOT_LINES.length && (
          <span
            className="blink"
            style={{
              display: "inline-block",
              width: "8px",
              height: "14px",
              background: "#00f0ff",
              verticalAlign: "middle",
            }}
          />
        )}
      </div>

      <span
        className="mono-label-dim"
        style={{ position: "absolute", bottom: "24px", right: "24px" }}
      >
        [ CLICK TO SKIP ]
      </span>
    </motion.div>
  );
}
