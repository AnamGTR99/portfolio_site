"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

function labelFor(pathname: string): string {
  if (pathname === "/") return "HOME";
  const seg = pathname.split("/").filter(Boolean);
  const leaf = seg[seg.length - 1].replace(/-/g, "_");
  return leaf.toUpperCase();
}

/**
 * Route transition — three horizontal glitch slices snap shut then rip
 * open with an RGB flash. Fast (450ms) and violent.
 */
export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [done, setDone] = useState(false);

  const slices = [0, 1, 2];

  return (
    <>
      {!done && (
        <div
          className="fixed inset-0 z-[95]"
          style={{ pointerEvents: "none" }}
        >
          {slices.map((i) => (
            <motion.div
              key={i}
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.08 + i * 0.06,
                ease: [0.76, 0, 0.24, 1],
              }}
              onAnimationComplete={
                i === slices.length - 1 ? () => setDone(true) : undefined
              }
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${(i * 100) / 3}%`,
                height: `${100 / 3 + 0.5}%`,
                background: "#04040a",
                transformOrigin: i % 2 === 0 ? "left" : "right",
                borderBottom:
                  i < 2 ? "1px solid rgba(0,240,255,0.25)" : "none",
              }}
            />
          ))}
          <motion.span
            className="mono-label"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "12px",
              color: "#00f0ff",
              textShadow: "0 0 12px rgba(0,240,255,0.6)",
            }}
          >
            /{labelFor(pathname)}
          </motion.span>
        </div>
      )}
      {children}
    </>
  );
}
