"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Shared normalized pointer — canvas sits behind content with
   pointer-events: none, so we track the mouse at window level. */
const pointer = { x: 0, y: 0 };

function usePointerTracking() {
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
}

/* ─── Neon wireframe city ─── */
function City({ count, narrow }: { count: number; narrow: boolean }) {
  const group = useRef<THREE.Group>(null);

  // Phones see a much narrower frustum — pull the tower banks inward so
  // the city stays in frame instead of flanking empty space.
  const canyonHalfWidth = narrow ? 1.6 : 3.2;
  const bankDepth = narrow ? 7 : 16;

  const buildings = useMemo(() => {
    const rng = mulberry32(20261999);
    const list: {
      geo: THREE.EdgesGeometry;
      pos: [number, number, number];
      color: string;
      opacity: number;
    }[] = [];
    for (let i = 0; i < count; i++) {
      const w = 0.6 + rng() * 1.4;
      const h = 0.8 + rng() * 5.2;
      const d = 0.6 + rng() * 1.4;
      // two receding banks of towers, a canyon down the middle
      const side = rng() > 0.5 ? 1 : -1;
      const x = side * (canyonHalfWidth + rng() * bankDepth);
      const z = -3 - rng() * 30;
      const hot = rng() < 0.14;
      list.push({
        geo: new THREE.EdgesGeometry(new THREE.BoxGeometry(w, h, d)),
        pos: [x, h / 2 - 2.4, z],
        color: hot ? "#ff2a6d" : "#00f0ff",
        opacity: hot ? 0.55 : 0.16 + rng() * 0.2,
      });
    }
    return list;
  }, [count, canyonHalfWidth, bankDepth]);

  useEffect(() => {
    return () => buildings.forEach((b) => b.geo.dispose());
  }, [buildings]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y = pointer.x * 0.05 + Math.sin(t * 0.05) * 0.02;
    group.current.position.y = pointer.y * 0.18;
  });

  return (
    <group ref={group}>
      {buildings.map((b, i) => (
        <lineSegments key={i} geometry={b.geo} position={b.pos}>
          <lineBasicMaterial
            color={b.color}
            transparent
            opacity={b.opacity}
          />
        </lineSegments>
      ))}
    </group>
  );
}

/* ─── Grid floor ─── */
function GridFloor() {
  const mat = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uCyan: { value: new THREE.Color("#00f0ff") },
      uMagenta: { value: new THREE.Color("#ff2a6d") },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (mat.current) mat.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, -12]}>
      <planeGeometry args={[90, 70, 1, 1]} />
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          varying vec3 vPos;
          void main() {
            vUv = uv;
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uCyan;
          uniform vec3 uMagenta;
          varying vec2 vUv;
          varying vec3 vPos;

          float gridLine(float coord, float width) {
            float d = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
            return 1.0 - min(d * width, 1.0);
          }

          void main() {
            // scrolling grid — the floor drives toward the camera
            float gx = gridLine(vPos.x / 1.6, 1.2);
            float gy = gridLine((vPos.y + uTime * 1.2) / 1.6, 1.2);
            float g = max(gx, gy);

            // distance fade from center-front
            float distFade = 1.0 - smoothstep(0.0, 0.55, distance(vUv, vec2(0.5, 0.85)));

            // cyan core bleeding magenta at the horizon edges
            vec3 col = mix(uCyan, uMagenta, smoothstep(0.3, 1.0, abs(vUv.x - 0.5) * 2.0));
            float alpha = g * distFade * 0.4;
            if (alpha < 0.003) discard;
            gl_FragColor = vec4(col, alpha);
          }
        `}
      />
    </mesh>
  );
}

/* ─── Floating data shards ─── */
function Shards({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);

  const shards = useMemo(() => {
    const rng = mulberry32(777);
    return Array.from({ length: count }, () => ({
      pos: [
        (rng() - 0.5) * 16,
        rng() * 4 - 0.5,
        -2 - rng() * 12,
      ] as [number, number, number],
      scale: 0.12 + rng() * 0.3,
      speed: 0.2 + rng() * 0.5,
      phase: rng() * Math.PI * 2,
      magenta: rng() < 0.3,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const s = shards[i];
      child.rotation.x = t * s.speed;
      child.rotation.y = t * s.speed * 0.7;
      child.position.y = s.pos[1] + Math.sin(t * 0.5 + s.phase) * 0.4;
    });
  });

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <mesh key={i} position={s.pos} scale={s.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={s.magenta ? "#ff2a6d" : "#00f0ff"}
            wireframe
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Particle field ─── */
function Particles({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const rng = mulberry32(4242);
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const cyan = new THREE.Color("#00f0ff");
    const magenta = new THREE.Color("#ff2a6d");
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rng() - 0.5) * 40;
      pos[i * 3 + 1] = (rng() - 0.5) * 18;
      pos[i * 3 + 2] = -rng() * 34;
      const c = rng() < 0.25 ? magenta : cyan;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.y = clock.elapsedTime * 0.008;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Camera drift ─── */
function CameraRig() {
  useFrame(({ clock, camera }) => {
    const t = clock.elapsedTime;
    camera.position.x += (pointer.x * 0.9 - camera.position.x) * 0.03;
    camera.position.y +=
      (0.4 + pointer.y * 0.4 + Math.sin(t * 0.1) * 0.15 - camera.position.y) *
      0.03;
    camera.lookAt(0, 0.4, -10);
  });
  return null;
}

/* Deterministic PRNG so SSR/CSR and rebuilds agree */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function supportsWebGL(): boolean {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * CSS-only fallback when WebGL is unavailable — a static perspective grid
 * with neon glows, so the substrate never reads as dead black.
 */
function CssGridFallback() {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: "-30%",
          right: "-30%",
          top: "52%",
          bottom: 0,
          transform: "perspective(420px) rotateX(62deg)",
          transformOrigin: "50% 0%",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,240,255,0.16) 0px, rgba(0,240,255,0.16) 1px, transparent 1px, transparent 44px)," +
            "repeating-linear-gradient(90deg, rgba(0,240,255,0.16) 0px, rgba(0,240,255,0.16) 1px, transparent 1px, transparent 44px)",
          maskImage:
            "linear-gradient(180deg, transparent 0%, black 30%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(180deg, transparent 0%, black 30%, black 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "40%",
          height: "24%",
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, rgba(0,240,255,0.1) 0%, transparent 70%)",
        }}
      />
    </>
  );
}

export default function CyberBackground() {
  usePointerTracking();

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 640px)").matches;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const webglOK = useMemo(
    () => typeof window !== "undefined" && supportsWebGL(),
    [],
  );

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {webglOK ? (
        <Canvas
          dpr={[1, 1.6]}
          frameloop={reduced ? "demand" : "always"}
          camera={{ position: [0, 0.4, 9], fov: 60, near: 0.1, far: 80 }}
          gl={{
            antialias: !isMobile,
            alpha: true,
            // "high-performance" makes some constrained environments refuse
            // to create a context at all — only request it on desktop.
            powerPreference: isMobile ? "default" : "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
        >
          <fog attach="fog" args={["#04040a", 10, 42]} />
          <CameraRig />
          <City count={isMobile ? 34 : 72} narrow={isMobile} />
          <GridFloor />
          <Shards count={isMobile ? 6 : 14} />
          <Particles count={isMobile ? 250 : 700} />
        </Canvas>
      ) : (
        <CssGridFallback />
      )}
      {/* Horizon glow */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "48%",
          height: "22%",
          background:
            "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(0,240,255,0.07) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
