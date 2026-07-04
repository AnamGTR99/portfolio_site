"use client";

import { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
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
function City({ count }: { count: number }) {
  const group = useRef<THREE.Group>(null);

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
      const x = side * (3.2 + rng() * 16);
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
  }, [count]);

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

export default function CyberBackground() {
  usePointerTracking();

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 640px)").matches;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      <Canvas
        dpr={[1, 1.6]}
        frameloop={reduced ? "demand" : "always"}
        camera={{ position: [0, 0.4, 9], fov: 60, near: 0.1, far: 80 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#04040a", 10, 42]} />
        <CameraRig />
        <City count={isMobile ? 34 : 72} />
        <GridFloor />
        <Shards count={isMobile ? 6 : 14} />
        <Particles count={isMobile ? 250 : 700} />
      </Canvas>
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
