"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroOverlay({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [phase, setPhase] = useState<"dot" | "expand" | "done">("dot");

  useEffect(() => {
    // Dot holds, then expands into portal
    const expandTimer = setTimeout(() => setPhase("expand"), 700);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1900);

    return () => {
      clearTimeout(expandTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "#0A0A0A" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Central glow dot */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === "dot"
                ? { scale: 1, opacity: 1 }
                : { scale: 60, opacity: 0 }
            }
            transition={
              phase === "dot"
                ? { duration: 0.5, ease: "easeOut" }
                : { duration: 1, ease: [0.16, 1, 0.3, 1] }
            }
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.9)",
              boxShadow: `
                0 0 20px 8px rgba(255, 255, 255, 0.3),
                0 0 60px 20px rgba(255, 255, 255, 0.15),
                0 0 120px 40px rgba(255, 255, 255, 0.05)
              `,
            }}
          />

          {/* Ring that expands outward */}
          {phase === "expand" && (
            <motion.div
              className="absolute"
              initial={{ scale: 0, opacity: 0.8 }}
              animate={{ scale: 40, opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.4)",
                boxShadow: "0 0 30px 4px rgba(255, 255, 255, 0.1)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
