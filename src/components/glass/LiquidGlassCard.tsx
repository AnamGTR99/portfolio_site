"use client";

import { useRef, useCallback, useEffect } from "react";

interface LiquidGlassCardProps {
  children: React.ReactNode;
  className?: string;
  tiltMax?: number;
  shineSize?: number;
}

export default function LiquidGlassCard({
  children,
  className = "",
  tiltMax = 2.5,
  shineSize = 280,
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, inside: false });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });

  const tick = useCallback(() => {
    const card = cardRef.current;
    const shine = shineRef.current;
    const rim = rimRef.current;
    if (!card || !shine || !rim) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }

    const lerp = mouseRef.current.inside ? 0.08 : 0.04;
    smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * lerp;
    smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * lerp;

    const sx = smoothRef.current.x;
    const sy = smoothRef.current.y;

    const tiltX = (sy - 0.5) * -tiltMax;
    const tiltY = (sx - 0.5) * tiltMax;

    card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    const shineX = sx * 100;
    const shineY = sy * 100;
    const shineOpacity = mouseRef.current.inside ? 1 : 0;
    shine.style.background = `radial-gradient(${shineSize}px circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0) 70%)`;
    shine.style.opacity = String(shineOpacity);

    const rimAngle =
      Math.atan2(sy - 0.5, sx - 0.5) * (180 / Math.PI) + 90;
    rim.style.background = `conic-gradient(from ${rimAngle}deg, rgba(255,255,255,0.35) 0deg, rgba(255,255,255,0.0) 60deg, rgba(255,255,255,0.0) 300deg, rgba(255,255,255,0.35) 360deg)`;

    rafRef.current = requestAnimationFrame(tick);
  }, [tiltMax, shineSize]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        inside: true,
      };
    };

    const handleLeave = () => {
      mouseRef.current = {
        ...mouseRef.current,
        inside: false,
        x: 0.5,
        y: 0.5,
      };
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(24px) saturate(120%)",
        WebkitBackdropFilter: "blur(24px) saturate(120%)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.3),
          0 1px 3px rgba(0, 0, 0, 0.2),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          inset 0 -1px 0 rgba(255, 255, 255, 0.05)
        `,
        willChange: "transform",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Rim light */}
      <div
        ref={rimRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          opacity: 0.5,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Specular shine */}
      <div
        ref={shineRef}
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          opacity: 0,
          transition: "opacity 0.5s ease",
          mixBlendMode: "soft-light",
        }}
      />

      {/* Top edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-[inherit]"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.4) 50%, transparent 90%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
