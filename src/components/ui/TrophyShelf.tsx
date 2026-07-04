"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const TROPHIES = [
  { emoji: "🥇", label: "1ST — MELBOURNEHACK 2025", accent: "#ffb800" },
  { emoji: "🥉", label: "3RD — FOUNDERSHACK 2025", accent: "#ff2a6d" },
  { emoji: "🏆", label: "TOP 5 — UNIHACK ANZ 2026 · 183 TEAMS", accent: "#ffb800" },
  { emoji: "📦", label: "REACT-LIQUID-GLASS — NPM", accent: "#00f0ff" },
  { emoji: "🏨", label: "HOTELIER AT 23", accent: "#00f0ff" },
  { emoji: "🌏", label: "35+ COUNTRIES", accent: "#adff2f" },
];

/**
 * The Trophy Shelf — awards as tossable chips with spring physics.
 * Drag them, fling them; they stay where you leave them.
 */
export default function TrophyShelf() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        className="flex items-center"
        style={{ gap: "12px", marginBottom: "18px" }}
      >
        <span
          className="mono-label"
          style={{ color: "#ff2a6d", fontSize: "9px" }}
        >
          ▸
        </span>
        <span className="mono-label" style={{ fontSize: "10px" }}>
          TROPHY CACHE
        </span>
        <div className="hairline" style={{ flex: 1 }} />
        <span className="mono-label-dim" style={{ fontSize: "8.5px" }}>
          PHYSICS ENABLED — DRAG THEM
        </span>
      </div>
      <div
        ref={containerRef}
        className="chamfer panel-scan"
        style={{
          position: "relative",
          border: "1px solid rgba(0,240,255,0.16)",
          background: "rgba(0,240,255,0.02)",
          padding: "28px 24px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          justifyContent: "center",
          overflow: "hidden",
          minHeight: "120px",
        }}
      >
        {TROPHIES.map((trophy, i) => (
          <motion.div
            key={trophy.label}
            drag
            dragConstraints={containerRef}
            dragElastic={0.12}
            dragTransition={{
              bounceStiffness: 380,
              bounceDamping: 18,
              power: 0.35,
            }}
            whileDrag={{ scale: 1.12, zIndex: 5, cursor: "grabbing" }}
            whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            data-cursor="grab"
            className="chamfer-sm"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              cursor: "grab",
              userSelect: "none",
              touchAction: "none",
              whiteSpace: "nowrap",
              background: "rgba(4,4,10,0.85)",
              border: `1px solid ${trophy.accent}55`,
              boxShadow: `0 0 12px ${trophy.accent}22`,
            }}
          >
            <span style={{ fontSize: "15px" }}>{trophy.emoji}</span>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "9.5px",
                fontWeight: 400,
                letterSpacing: "0.1em",
                color: trophy.accent,
              }}
            >
              {trophy.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
