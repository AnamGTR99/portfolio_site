"use client";

import type { CSSProperties } from "react";

/**
 * RGB-split glitch text — clean most of the time, violently sliced for a
 * few frames on a loop. Pass the same string as children.
 */
export default function GlitchText({
  children,
  className = "",
  style,
}: {
  children: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={`glitch ${className}`} data-text={children} style={style}>
      {children}
    </span>
  );
}
