"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Chamfered HUD panel with corner brackets — the cyberpunk surface
 * primitive that replaces the old liquid-glass card.
 */
export default function CyberPanel({
  children,
  className = "",
  style,
  corners = true,
  scan = false,
  accent = "cyan",
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  corners?: boolean;
  scan?: boolean;
  accent?: "cyan" | "magenta" | "amber";
}) {
  const accentColor =
    accent === "magenta"
      ? "rgba(255,42,109,0.7)"
      : accent === "amber"
        ? "rgba(255,184,0,0.7)"
        : "rgba(0,240,255,0.7)";

  return (
    <div
      className={`cyber-panel chamfer ${scan ? "panel-scan" : ""} ${className}`}
      style={{ ...style }}
    >
      {corners && (
        <>
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "14px",
              height: "14px",
              borderTop: `1px solid ${accentColor}`,
              borderLeft: `1px solid ${accentColor}`,
              pointerEvents: "none",
            }}
          />
          <span
            aria-hidden
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: "14px",
              height: "14px",
              borderBottom: `1px solid ${accentColor}`,
              borderRight: `1px solid ${accentColor}`,
              pointerEvents: "none",
            }}
          />
        </>
      )}
      {children}
    </div>
  );
}
