"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HKSkyline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
    >
      <motion.div
        className="w-[320%] sm:w-[110%]"
        style={{ opacity, y, maxWidth: "1600px", position: "relative" }}
      >
        <svg
          viewBox="0 0 1200 340"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-[0.14] sm:opacity-[0.16]"
          style={{
            width: "100%",
            height: "auto",
          }}
        >
          <defs>
            {/* Tron sweep gradient */}
            <linearGradient id="tron-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" stopOpacity="0" />
              <stop offset="35%" stopColor="white" stopOpacity="0" />
              <stop offset="45%" stopColor="white" stopOpacity="0.6" />
              <stop offset="50%" stopColor="white" stopOpacity="1" />
              <stop offset="55%" stopColor="white" stopOpacity="0.6" />
              <stop offset="65%" stopColor="white" stopOpacity="0" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
              <animateTransform
                attributeName="gradientTransform"
                type="translate"
                values="-1 0; 1 0"
                dur="3.5s"
                repeatCount="indefinite"
              />
            </linearGradient>

            {/* Glow filter */}
            <filter id="skyline-blur">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ═══ Victoria Peak ridge ═══ */}
          <path
            d="M0 240 Q100 170 200 190 Q350 130 500 155 Q580 115 650 100 Q720 115 800 155 Q950 130 1050 170 Q1150 150 1200 200"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1"
          />

          {/* ═══ Peak Tower (the wok) on top of the mountain ═══ */}
          {/* Two angled support legs */}
          <line x1="635" y1="100" x2="630" y2="80" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
          <line x1="665" y1="100" x2="670" y2="80" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
          {/* The wok dish — clean arc */}
          <path
            d="M618 80 Q635 62 650 58 Q665 62 682 80"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Flat base of the dish */}
          <line x1="622" y1="80" x2="678" y2="80" stroke="rgba(255,255,255,0.75)" strokeWidth="1.2" />
          {/* Antenna mast */}
          <line x1="650" y1="58" x2="650" y2="44" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />

          {/* ═══ Water line ═══ */}
          <line
            x1="0"
            y1="310"
            x2="1200"
            y2="310"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.6"
          />

          {/* ═══ BUILDINGS (base layer — brighter strokes) ═══ */}

          {/* Convention & Exhibition Centre — swooping wing roof */}
          <path
            d="M280 305 L280 295 Q320 274 360 268 Q400 274 440 295 L440 305"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Central Plaza — pointed spire */}
          <path
            d="M200 305 L200 180 L210 175 L215 130 L218 130 L220 175 L230 180 L230 305"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* The Center — rectangular tower */}
          <path
            d="M470 305 L470 185 L472 183 L498 183 L500 185 L500 305"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* One IFC — shorter tower with tapered crown */}
          <path
            d="M510 305 L510 195 L514 190 L517 187 L520 185 L522 185 L525 187 L528 190 L532 195 L532 305"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <line x1="517" y1="187" x2="516" y2="181" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1="521" y1="185" x2="521" y2="178" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1="525" y1="187" x2="526" y2="181" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />

          {/* Two IFC — tallest, with crown fins */}
          <path
            d="M545 305 L545 123 L549 117 L553 113 L557 110 L560 110 L564 113 L568 117 L572 123 L572 305"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <line x1="553" y1="113" x2="551" y2="105" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <line x1="558" y1="110" x2="558" y2="101" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
          <line x1="564" y1="113" x2="566" y2="105" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />

          {/* Cheung Kong Center */}
          <path
            d="M620 305 L620 195 L650 195 L650 305"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* HSBC Building — exposed trusses */}
          <path
            d="M680 305 L680 220 L720 220 L720 305"
            stroke="rgba(255,255,255,0.75)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <line x1="680" y1="240" x2="700" y2="220" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1="700" y1="220" x2="720" y2="240" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1="680" y1="260" x2="700" y2="240" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1="700" y1="240" x2="720" y2="260" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1="680" y1="280" x2="700" y2="260" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1="700" y1="260" x2="720" y2="280" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1="680" y1="240" x2="720" y2="240" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />
          <line x1="680" y1="260" x2="720" y2="260" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />
          <line x1="680" y1="280" x2="720" y2="280" stroke="rgba(255,255,255,0.5)" strokeWidth="0.6" />

          {/* Bank of China Tower — clean prism with asymmetric slash */}
          {/* Main body — straight vertical walls, angled top */}
          <path
            d="M762 305 L762 150 L785 120 L808 150 L808 305"
            stroke="rgba(255,255,255,0.8)"
            strokeWidth="1.4"
            strokeLinejoin="miter"
            fill="none"
          />
          {/* Signature diagonal bracing — clean X shapes */}
          <line x1="762" y1="230" x2="808" y2="150" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" />
          <line x1="808" y1="230" x2="762" y2="150" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" />
          <line x1="762" y1="305" x2="808" y2="230" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" />
          <line x1="808" y1="305" x2="762" y2="230" stroke="rgba(255,255,255,0.55)" strokeWidth="0.9" />
          {/* Horizontal divider */}
          <line x1="762" y1="230" x2="808" y2="230" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
          {/* Twin antenna masts */}
          <line x1="780" y1="120" x2="778" y2="105" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />
          <line x1="790" y1="120" x2="792" y2="105" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" />

          {/* Filler buildings */}
          <path d="M150 305 L150 235 L170 235 L170 305" stroke="rgba(255,255,255,0.6)" strokeWidth="0.9" strokeLinejoin="round" />
          <path d="M240 305 L240 225 L260 225 L260 305" stroke="rgba(255,255,255,0.6)" strokeWidth="0.9" strokeLinejoin="round" />
          <path d="M830 305 L830 225 L855 225 L855 305" stroke="rgba(255,255,255,0.6)" strokeWidth="0.9" strokeLinejoin="round" />
          <path d="M870 305 L870 245 L895 245 L895 305" stroke="rgba(255,255,255,0.6)" strokeWidth="0.9" strokeLinejoin="round" />
          <path d="M910 305 L910 255 L930 255 L930 305" stroke="rgba(255,255,255,0.6)" strokeWidth="0.9" strokeLinejoin="round" />
          <path d="M950 305 L950 265 L970 265 L970 305" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinejoin="round" />
          <path d="M100 305 L100 265 L130 265 L130 305" stroke="rgba(255,255,255,0.5)" strokeWidth="0.8" strokeLinejoin="round" />
          <path d="M50 305 L50 275 L75 275 L75 305" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" strokeLinejoin="round" />
          <path d="M990 305 L990 275 L1010 275 L1010 305" stroke="rgba(255,255,255,0.4)" strokeWidth="0.7" strokeLinejoin="round" />

          {/* ═══ TRON SWEEP LAYER ═══ */}
          <g stroke="url(#tron-sweep)" filter="url(#skyline-blur)">
            {/* Peak Tower */}
            <path d="M618 80 Q635 62 650 58 Q665 62 682 80" strokeWidth="2.5" fill="none" />
            <line x1="622" y1="80" x2="678" y2="80" strokeWidth="2" />
            <line x1="635" y1="100" x2="630" y2="80" strokeWidth="1.5" />
            <line x1="665" y1="100" x2="670" y2="80" strokeWidth="1.5" />
            {/* Mountain ridge */}
            <path
              d="M0 240 Q100 170 200 190 Q350 130 500 155 Q580 115 650 100 Q720 115 800 155 Q950 130 1050 170 Q1150 150 1200 200"
              strokeWidth="1.5"
              fill="none"
            />
            {/* Convention Centre */}
            <path d="M280 305 L280 295 Q320 274 360 268 Q400 274 440 295 L440 305" strokeWidth="2.5" fill="none" />
            {/* Central Plaza */}
            <path d="M200 305 L200 180 L210 175 L215 130 L218 130 L220 175 L230 180 L230 305" strokeWidth="2.5" fill="none" />
            {/* The Center */}
            <path d="M470 305 L470 185 L472 183 L498 183 L500 185 L500 305" strokeWidth="2.5" fill="none" />
            {/* One IFC */}
            <path d="M510 305 L510 195 L514 190 L517 187 L520 185 L522 185 L525 187 L528 190 L532 195 L532 305" strokeWidth="2" fill="none" />
            {/* Two IFC */}
            <path d="M545 305 L545 123 L549 117 L553 113 L557 110 L560 110 L564 113 L568 117 L572 123 L572 305" strokeWidth="3" fill="none" />
            {/* Cheung Kong */}
            <path d="M620 305 L620 195 L650 195 L650 305" strokeWidth="2.5" fill="none" />
            {/* HSBC */}
            <path d="M680 305 L680 220 L720 220 L720 305" strokeWidth="2.5" fill="none" />
            <line x1="680" y1="240" x2="700" y2="220" strokeWidth="1.5" />
            <line x1="700" y1="220" x2="720" y2="240" strokeWidth="1.5" />
            <line x1="680" y1="260" x2="700" y2="240" strokeWidth="1.5" />
            <line x1="700" y1="240" x2="720" y2="260" strokeWidth="1.5" />
            {/* Bank of China — clean prism */}
            <path d="M762 305 L762 150 L785 120 L808 150 L808 305" strokeWidth="3" fill="none" />
            <line x1="762" y1="230" x2="808" y2="150" strokeWidth="1.5" />
            <line x1="808" y1="230" x2="762" y2="150" strokeWidth="1.5" />
            <line x1="762" y1="305" x2="808" y2="230" strokeWidth="1.5" />
            <line x1="808" y1="305" x2="762" y2="230" strokeWidth="1.5" />
            {/* Filler buildings */}
            <path d="M150 305 L150 235 L170 235 L170 305" strokeWidth="1.5" fill="none" />
            <path d="M240 305 L240 225 L260 225 L260 305" strokeWidth="1.5" fill="none" />
            <path d="M830 305 L830 225 L855 225 L855 305" strokeWidth="1.5" fill="none" />
            <path d="M870 305 L870 245 L895 245 L895 305" strokeWidth="1.5" fill="none" />
            <path d="M910 305 L910 255 L930 255 L930 305" strokeWidth="1.5" fill="none" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
