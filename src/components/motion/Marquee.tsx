"use client";

import { Fragment } from "react";

/**
 * Neon marquee — outlined display type with magenta diamonds, edge-faded.
 */
export default function Marquee({
  items,
  fontSize = "clamp(48px, 9vw, 120px)",
}: {
  items: string[];
  fontSize?: string;
}) {
  const sequence = (
    <>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span
            className="display"
            style={{
              fontSize,
              lineHeight: 1.1,
              whiteSpace: "nowrap",
              padding: "0.1em 0",
              color: "transparent",
              WebkitTextStroke: "1px rgba(0,240,255,0.5)",
            }}
          >
            {item}
          </span>
          <span
            aria-hidden
            style={{
              fontSize: `calc(${fontSize} * 0.3)`,
              lineHeight: 1.1,
              color: "rgba(255,42,109,0.7)",
              padding: "0 0.8em",
              display: "flex",
              alignItems: "center",
              textShadow: "0 0 12px rgba(255,42,109,0.5)",
            }}
          >
            ◆
          </span>
        </Fragment>
      ))}
    </>
  );

  return (
    <div
      aria-hidden
      style={{
        overflow: "hidden",
        width: "100%",
        maskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="marquee-track" style={{ alignItems: "center" }}>
        {sequence}
        {sequence}
      </div>
    </div>
  );
}
