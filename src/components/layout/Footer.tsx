"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/motion/Magnetic";
import LocalTime from "@/components/motion/LocalTime";
import GlitchText from "@/components/motion/GlitchText";

const socials = [
  {
    label: "LINKEDIN",
    href: "https://www.linkedin.com/in/sheik-anam-milfer-9aa15b213/",
  },
  { label: "INSTAGRAM", href: "https://instagram.com/sheivault" },
  { label: "DEVPOST", href: "https://devpost.com/AnamGTR99" },
  { label: "GITHUB", href: "https://github.com/anamgtr99" },
];

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (
      window as unknown as {
        __lenis?: { scrollTo: (t: number, o?: object) => void };
      }
    ).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(0,240,255,0.14)",
        padding: "0 0 28px",
        overflow: "hidden",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(0,240,255,0.03) 100%)",
      }}
    >
      {/* Status strip */}
      <div
        style={{
          borderBottom: "1px solid rgba(0,240,255,0.1)",
          padding: "12px 24px",
        }}
      >
        <div
          className="flex flex-wrap items-center justify-between"
          style={{ maxWidth: "1280px", margin: "0 auto", gap: "12px" }}
        >
          <span className="mono-label flex items-center" style={{ gap: "8px" }}>
            <span
              className="live-dot"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#adff2f",
                boxShadow: "0 0 8px rgba(173,255,47,0.7)",
                display: "inline-block",
              }}
            />
            STATUS: BUILDING AT ELENO — MELBOURNE
          </span>
          <span className="mono-label-dim">
            SYS.TIME <LocalTime />
          </span>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px 0" }}>
        {/* Monumental glitch name */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -5% 0px" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{ marginBottom: "clamp(28px, 5vw, 48px)" }}
        >
          <span
            className="display"
            aria-hidden
            style={{
              display: "block",
              fontSize: "clamp(72px, 17vw, 230px)",
              lineHeight: 0.85,
              userSelect: "none",
              color: "rgba(230,248,255,0.08)",
              WebkitTextStroke: "1px rgba(0,240,255,0.35)",
            }}
          >
            <GlitchText>ANAM</GlitchText>
          </span>
        </motion.div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between"
          style={{
            gap: "16px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(0,240,255,0.1)",
          }}
        >
          <span className="mono-label-dim" style={{ fontSize: "9px" }}>
            © {new Date().getFullYear()} ANAM — ALL RIGHTS RESERVED
          </span>

          <div className="flex flex-wrap items-center justify-center" style={{ gap: "8px" }}>
            {socials.map((s) => (
              <Magnetic key={s.label} strength={0.3}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={s.label.toLowerCase()}
                  className="mono-label chamfer-sm"
                  style={{
                    display: "inline-block",
                    padding: "8px 14px",
                    fontSize: "9px",
                    border: "1px solid rgba(0,240,255,0.18)",
                    color: "rgba(0,240,255,0.6)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#04040a";
                    e.currentTarget.style.background = "#00f0ff";
                    e.currentTarget.style.boxShadow =
                      "0 0 16px rgba(0,240,255,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(0,240,255,0.6)";
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {s.label} ↗
                </a>
              </Magnetic>
            ))}
          </div>

          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              data-cursor="top"
              className="mono-label chamfer-sm"
              style={{
                background: "rgba(255,42,109,0.06)",
                border: "1px solid rgba(255,42,109,0.35)",
                padding: "9px 18px",
                cursor: "pointer",
                color: "rgba(255,42,109,0.85)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#ff2a6d";
                e.currentTarget.style.color = "#04040a";
                e.currentTarget.style.boxShadow =
                  "0 0 16px rgba(255,42,109,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,42,109,0.06)";
                e.currentTarget.style.color = "rgba(255,42,109,0.85)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              ▲ RETURN
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
