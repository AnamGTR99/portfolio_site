"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center">
      {/* Hero content */}
      <div className="flex flex-col items-center gap-5 px-6">
        <h1
          className="glass-text-hero"
          style={{
            fontSize: "clamp(52px, 12vw, 96px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
          }}
        >
          Anam
        </h1>
        <p
          className="text-center"
          style={{
            fontSize: "clamp(15px, 2.5vw, 19px)",
            fontWeight: 300,
            color: "rgba(245,245,245,0.55)",
            letterSpacing: "0.01em",
          }}
        >
          Software, hospitality, and the spaces between.
        </p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 flex flex-col items-center gap-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span
          style={{
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "rgba(245,245,245,0.25)",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "1px",
            height: "28px",
            background:
              "linear-gradient(180deg, rgba(245,245,245,0.3) 0%, transparent 100%)",
          }}
        />
      </motion.div>
    </main>
  );
}
