"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  animate,
} from "framer-motion";

// ---------------------------------------------------------------------------
// Trail config — spring-physics cursor trail
// ---------------------------------------------------------------------------

const TRAIL_SEGMENTS = 10;
const TRAIL_SPRING_STIFFNESS = 150;
const TRAIL_SPRING_DAMPING = 20;

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

// ---------------------------------------------------------------------------
// Particle config
// ---------------------------------------------------------------------------

interface Particle {
  baseX: number;
  baseY: number;
  size: number;
  rotation: number;
  driftPhaseX: number;
  driftPhaseY: number;
  driftSpeedX: number;
  driftSpeedY: number;
  driftAmplitudeX: number;
  driftAmplitudeY: number;
  attractStrength: number;
  baseOpacity: number;
  lightness: number;
}

const DESKTOP_PARTICLE_COUNT = 80;
const MOBILE_PARTICLE_COUNT = 40;
const ATTRACT_RADIUS = 0.6;

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    baseX: Math.random(),
    baseY: Math.random(),
    size: 3 + Math.random() * 6,
    rotation: Math.random() * 360,
    driftPhaseX: Math.random() * Math.PI * 2,
    driftPhaseY: Math.random() * Math.PI * 2,
    driftSpeedX: 0.2 + Math.random() * 0.5,
    driftSpeedY: 0.2 + Math.random() * 0.5,
    driftAmplitudeX: 30 + Math.random() * 60,
    driftAmplitudeY: 30 + Math.random() * 60,
    attractStrength: 0.25 + Math.random() * 0.35,
    baseOpacity: 0.15 + Math.random() * 0.3,
    lightness: 60 + Math.random() * 30, // 60-90% white/grey range
  }));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function AuroraBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef({ x: 0.5, y: 0.5 });
  const cursorPxRef = useRef({ x: 0, y: 0 });
  const smoothCursorRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const isMobileRef = useRef(false);

  // Detect mobile on mount
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    isMobileRef.current = mq.matches;
    const count = mq.matches ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
    particlesRef.current = generateParticles(count);
  }, []);

  // Trail points — spring-simulated chain
  const trailPointsRef = useRef<TrailPoint[]>(
    Array.from({ length: TRAIL_SEGMENTS }, () => ({
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
    }))
  );

  // Cursor glow
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 25, mass: 1.5 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 25, mass: 1.5 });

  // Breathing glow intensity
  const glowIntensity = useMotionValue(0.12);

  useEffect(() => {
    const controls = animate(glowIntensity, [0.08, 0.15, 0.1, 0.14, 0.08], {
      duration: 16,
      repeat: Infinity,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [glowIntensity]);

  const glowBackground = useMotionTemplate`
    radial-gradient(
      700px circle at calc(${springX} * 100%) calc(${springY} * 100%),
      rgba(255, 255, 255, ${glowIntensity}) 0%,
      rgba(255, 255, 255, 0.04) 40%,
      transparent 70%
    )
  `;

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      cursorRef.current = { x, y };
      cursorPxRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Combined animation loop — particles + trail
  const tick = useCallback(() => {
    const dt = 0.016;
    timeRef.current += dt;
    const t = timeRef.current;

    // --- Smooth cursor for particles ---
    const lerp = 0.07;
    smoothCursorRef.current.x +=
      (cursorRef.current.x - smoothCursorRef.current.x) * lerp;
    smoothCursorRef.current.y +=
      (cursorRef.current.y - smoothCursorRef.current.y) * lerp;
    const cx = smoothCursorRef.current.x;
    const cy = smoothCursorRef.current.y;

    // --- Trail: spring-physics chain ---
    const trail = trailPointsRef.current;
    const target = cursorPxRef.current;

    for (let i = 0; i < TRAIL_SEGMENTS; i++) {
      const point = trail[i];
      const leader = i === 0 ? target : trail[i - 1];

      const dx = point.x - leader.x;
      const dy = point.y - leader.y;
      const fx =
        -TRAIL_SPRING_STIFFNESS * dx - TRAIL_SPRING_DAMPING * point.vx;
      const fy =
        -TRAIL_SPRING_STIFFNESS * dy - TRAIL_SPRING_DAMPING * point.vy;

      point.vx += fx * dt;
      point.vy += fy * dt;
      point.x += point.vx * dt;
      point.y += point.vy * dt;
    }

    // --- Render trail segments (monochrome white) ---
    for (let i = 0; i < TRAIL_SEGMENTS; i++) {
      const el = trailRefs.current[i];
      if (!el) continue;

      const point = trail[i];
      const leader = i === 0 ? target : trail[i - 1];

      const tdx = point.x - leader.x;
      const tdy = point.y - leader.y;
      const angle = Math.atan2(tdy, tdx) * (180 / Math.PI);

      const segDist = Math.sqrt(tdx * tdx + tdy * tdy);
      const baseLen = 20 + segDist * 0.8;
      const len = Math.min(baseLen, 60);

      const breathPhase = t * 3.5 + i * 0.7;
      const breathFactor = 0.5 + 0.5 * Math.sin(breathPhase);

      const width = len;
      const height = 2 + breathFactor * 3.5;
      const opacity = 0.1 + breathFactor * 0.18 - i * 0.02;

      const mx = (point.x + leader.x) / 2;
      const my = (point.y + leader.y) / 2;

      // Monochrome: white with decreasing lightness down the chain
      const l = 90 - i * 4;

      el.style.transform = `translate(${mx - width / 2}px, ${my - height / 2}px) rotate(${angle}deg)`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.opacity = String(Math.max(opacity, 0));
      el.style.backgroundColor = `hsl(0, 0%, ${l}%)`;
    }

    // --- Particles (monochrome white/grey) ---
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const el = particleRefs.current[i];
      if (!el) continue;

      const p = particles[i];

      const driftX =
        Math.sin(t * p.driftSpeedX + p.driftPhaseX) * p.driftAmplitudeX;
      const driftY =
        Math.cos(t * p.driftSpeedY + p.driftPhaseY) * p.driftAmplitudeY;
      const rot = p.rotation + t * 8;

      const pdx = cx - p.baseX;
      const pdy = cy - p.baseY;
      const dist = Math.sqrt(pdx * pdx + pdy * pdy);

      const attractFactor = Math.max(0, 1 - dist / ATTRACT_RADIUS);
      const eased = attractFactor * attractFactor * attractFactor;

      const pullX = pdx * eased * p.attractStrength * 1200;
      const pullY = pdy * eased * p.attractStrength * 1200;

      const opacity = p.baseOpacity + eased * 0.4;

      el.style.transform = `translate(${driftX + pullX}px, ${driftY + pullY}px) rotate(${rot}deg)`;
      el.style.opacity = String(Math.min(opacity, 0.65));
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  // Generate particle count for SSR safety — use desktop count as default
  const particleCount =
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 640px)").matches
        ? MOBILE_PARTICLE_COUNT
        : DESKTOP_PARTICLE_COUNT
      : DESKTOP_PARTICLE_COUNT;

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Cursor-following glow */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: glowBackground }}
      />

      {/* Particle field */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: particleCount }, (_, i) => {
          const p = particlesRef.current[i];
          const lightness = p ? p.lightness : 70 + Math.random() * 20;
          const size = p ? p.size : 4;
          const baseX = p ? p.baseX : Math.random();
          const baseY = p ? p.baseY : Math.random();
          const baseOpacity = p ? p.baseOpacity : 0.2;

          return (
            <div
              key={i}
              ref={(el) => {
                particleRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                left: `${baseX * 100}%`,
                top: `${baseY * 100}%`,
                width: `${size * 2.2}px`,
                height: `${size * 0.5}px`,
                borderRadius: "2px",
                backgroundColor: `hsl(0, 0%, ${lightness}%)`,
                opacity: baseOpacity,
                willChange: "transform, opacity",
              }}
            />
          );
        })}
      </div>

      {/* Cursor trail — spring-physics chain (monochrome) */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: TRAIL_SEGMENTS }, (_, i) => (
          <div
            key={`trail-${i}`}
            ref={(el) => {
              trailRefs.current[i] = el;
            }}
            className="absolute left-0 top-0"
            style={{
              width: "20px",
              height: "3px",
              borderRadius: "2px",
              backgroundColor: `hsl(0, 0%, ${90 - i * 4}%)`,
              opacity: 0,
              willChange: "transform, opacity, width, height",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
