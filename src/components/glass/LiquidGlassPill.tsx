"use client";

import { useRef, useEffect } from "react";

interface LiquidGlassPillProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltMax?: number;
  shineSize?: number;
  borderRadius?: string;
}

export default function LiquidGlassPill({
  children,
  className = "",
  onClick,
  tiltMax = 3,
  shineSize = 200,
  borderRadius = "9999px",
}: LiquidGlassPillProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const rimRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, inside: false });
  const smoothRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    function tick() {
      const container = containerRef.current;
      const shine = shineRef.current;
      const rim = rimRef.current;
      const glow = glowRef.current;
      if (!container || !shine || !rim || !glow) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const lerp = mouseRef.current.inside ? 0.1 : 0.04;
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * lerp;
      smoothRef.current.y += (mouseRef.current.y - smoothRef.current.y) * lerp;

      const sx = smoothRef.current.x;
      const sy = smoothRef.current.y;

      const tiltX = (sy - 0.5) * -tiltMax;
      const tiltY = (sx - 0.5) * tiltMax;
      container.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      const shineX = sx * 100;
      const shineY = sy * 100;
      const shineOpacity = mouseRef.current.inside ? 1 : 0;
      shine.style.background = `radial-gradient(${shineSize}px circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 30%, transparent 65%)`;
      shine.style.opacity = String(shineOpacity);

      const glowX = 100 - shineX;
      const glowY = 100 - shineY;
      glow.style.background = `radial-gradient(ellipse at ${glowX}% ${glowY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;

      const rimAngle = Math.atan2(sy - 0.5, sx - 0.5) * (180 / Math.PI) + 90;
      rim.style.background = `conic-gradient(from ${rimAngle}deg, rgba(255,255,255,0.35) 0deg, transparent 50deg, transparent 310deg, rgba(255,255,255,0.35) 360deg)`;

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tiltMax, shineSize]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
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

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`relative overflow-hidden ${onClick ? "cursor-pointer select-none" : ""} ${className}`}
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(3px) saturate(130%)",
        WebkitBackdropFilter: "blur(3px) saturate(130%)",
        border: "1px solid rgba(255, 255, 255, 0.10)",
        borderRadius,
        boxShadow: `
          0 4px 20px rgba(0, 0, 0, 0.25),
          0 1px 4px rgba(0, 0, 0, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.12),
          inset 0 -1px 0 rgba(255, 255, 255, 0.05)
        `,
        willChange: "transform",
      }}
    >
      {/* Rim light */}
      <div
        ref={rimRef}
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "inherit",
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
          opacity: 0.4,
        }}
      />

      {/* Specular shine */}
      <div
        ref={shineRef}
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "inherit",
          opacity: 0,
          transition: "opacity 0.5s ease",
          mixBlendMode: "overlay",
        }}
      />

      {/* Inner refraction glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: "inherit",
          mixBlendMode: "overlay",
        }}
      />

      {/* Top-edge highlight */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.3) 50%, transparent 90%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
