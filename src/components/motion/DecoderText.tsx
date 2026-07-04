"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useInView } from "framer-motion";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ANAM";

/**
 * Decoder text — characters scramble through glyph noise before locking
 * into place, left to right. The cyberpunk answer to a fade-in.
 */
export default function DecoderText({
  children,
  className,
  style,
  delay = 0,
  speed = 28,
  as: Tag = "span",
}: {
  children: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  speed?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(children);
      return;
    }

    let frame = 0;
    let rafId: number;
    let started = false;

    const timeout = setTimeout(() => {
      started = true;
      const tick = () => {
        frame++;
        const lockedCount = Math.floor(frame / 2.2);
        let out = "";
        for (let i = 0; i < children.length; i++) {
          if (children[i] === " ") {
            out += " ";
          } else if (i < lockedCount) {
            out += children[i];
          } else if (i < lockedCount + Math.ceil(speed / 6)) {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          } else {
            out += " ";
          }
        }
        setDisplay(out);
        if (lockedCount <= children.length) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDisplay(children);
        }
      };
      rafId = requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (started) cancelAnimationFrame(rafId);
    };
  }, [inView, children, delay, speed]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} className={className} style={style} aria-label={children}>
      <span aria-hidden style={{ whiteSpace: "pre-wrap" }}>
        {display || " "}
      </span>
    </Tag>
  );
}
