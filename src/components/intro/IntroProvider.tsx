"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import IntroOverlay from "./IntroOverlay";

export default function IntroProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showIntro, setShowIntro] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Only play intro once per session
    const played = sessionStorage.getItem("intro-played");
    if (!played) {
      setShowIntro(true);
    } else {
      setContentReady(true);
    }
  }, []);

  const handleIntroComplete = useCallback(() => {
    sessionStorage.setItem("intro-played", "1");
    setShowIntro(false);
    setContentReady(true);
  }, []);

  return (
    <>
      {showIntro && <IntroOverlay onComplete={handleIntroComplete} />}
      <motion.div
        initial={false}
        animate={contentReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
