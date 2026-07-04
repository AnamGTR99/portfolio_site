"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import CyberPanel from "@/components/ui/CyberPanel";
import DecoderText from "@/components/motion/DecoderText";
import TrophyShelf from "@/components/ui/TrophyShelf";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function AboutPage() {
  const paragraphs = personal.bio.split("\n\n").filter((p) => p.trim());

  return (
    <div style={{ paddingTop: "110px", paddingBottom: "140px" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>
        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: "34px" }}>
          <div
            className="flex items-center"
            style={{ gap: "14px", marginBottom: "12px" }}
          >
            <span className="mono-label" style={{ color: "#ff2a6d" }}>
              SYS.IDENTITY
            </span>
            <span className="mono-label-dim">{"//"}</span>
            <div className="hairline" style={{ flex: 1 }} />
            <span className="mono-label-dim">CLEARANCE: PUBLIC</span>
          </div>
          <DecoderText
            as="h1"
            className="display"
            style={{
              fontSize: "clamp(44px, 9vw, 100px)",
              color: "#e6f8ff",
              textShadow: "0 0 32px rgba(0,240,255,0.2)",
            }}
          >
            OPERATIVE
          </DecoderText>
        </div>

        {/* ═══ ID Card ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          style={{ marginBottom: "44px" }}
        >
          <CyberPanel scan>
            <div className="flex flex-col sm:flex-row">
              {/* Photo */}
              <div
                style={{
                  flexShrink: 0,
                  width: "100%",
                  maxWidth: "280px",
                  position: "relative",
                  borderRight: "1px solid rgba(0,240,255,0.14)",
                }}
              >
                <div style={{ aspectRatio: "3 / 4", overflow: "hidden" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/anam-about-2.JPG"
                    alt="Anam"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "saturate(0.9) contrast(1.05)",
                    }}
                  />
                  {/* Cyan tint + scan */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(180deg, rgba(0,240,255,0.08) 0%, transparent 30%, rgba(4,4,10,0.4) 100%)",
                      mixBlendMode: "screen",
                      pointerEvents: "none",
                    }}
                  />
                </div>
                <span
                  className="mono-label"
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "12px",
                    fontSize: "8.5px",
                    background: "rgba(4,4,10,0.8)",
                    padding: "4px 8px",
                    border: "1px solid rgba(0,240,255,0.3)",
                  }}
                >
                  ID: ANAM_GTR99
                </span>
              </div>

              {/* Data */}
              <div style={{ flex: 1, padding: "26px 28px" }}>
                <a
                  href="https://www.eleno.com.au/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="eleno.com.au"
                  style={{ display: "inline-block", marginBottom: "20px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/eleno-logo.png"
                    alt="Eleno"
                    style={{
                      height: "38px",
                      filter:
                        "brightness(0) invert(1) drop-shadow(0 0 8px rgba(0,240,255,0.4))",
                      opacity: 0.85,
                    }}
                  />
                </a>
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(22px, 3.5vw, 32px)",
                    color: "#e6f8ff",
                    marginBottom: "6px",
                  }}
                >
                  {personal.fullName.toUpperCase()}
                </h2>
                <p
                  className="mono-label-dim"
                  style={{ fontSize: "10px", marginBottom: "24px" }}
                >
                  BASE: {personal.location.toUpperCase()}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {personal.funFacts.map((fact, i) => (
                    <div
                      key={i}
                      className="flex items-center"
                      style={{ gap: "10px" }}
                    >
                      <span
                        style={{
                          color: "#ff2a6d",
                          fontSize: "8px",
                          flexShrink: 0,
                        }}
                      >
                        ▸
                      </span>
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 300,
                          color: "rgba(230,248,255,0.6)",
                        }}
                      >
                        {fact.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CyberPanel>
        </motion.div>

        {/* ═══ Story ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: "44px" }}
        >
          <SectionLabel>THE STORY</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "15px",
                  fontWeight: 300,
                  color: "rgba(230,248,255,0.6)",
                  lineHeight: 1.85,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* ═══ Loadout ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginBottom: "44px" }}
        >
          <SectionLabel>LOADOUT</SectionLabel>
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: "12px" }}
          >
            {[
              {
                index: "01",
                title: "SOFTWARE ENGINEERING",
                accent: "cyan" as const,
                description:
                  "AI Engineer at Eleno — building intelligent automation, AI-powered applications, and full-stack products that solve real problems.",
              },
              {
                index: "02",
                title: "HOSPITALITY",
                accent: "magenta" as const,
                description:
                  "Owner & operator of The Anam Hotel Colombo — a boutique hotel where design meets genuine Sri Lankan warmth.",
              },
              {
                index: "03",
                title: "TALENT MGMT",
                accent: "amber" as const,
                description:
                  "Brand partnerships, content strategy, and scaling creative careers — work now folding into Mana Group.",
              },
            ].map((item) => (
              <CyberPanel key={item.title} accent={item.accent}>
                <div style={{ padding: "18px 20px" }}>
                  <span
                    className="mono-label-dim"
                    style={{ fontSize: "9px", display: "block", marginBottom: "10px" }}
                  >
                    MODULE_{item.index}
                  </span>
                  <h3
                    className="display"
                    style={{
                      fontSize: "15px",
                      color: "#e6f8ff",
                      marginBottom: "9px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "12.5px",
                      fontWeight: 300,
                      color: "rgba(230,248,255,0.45)",
                      lineHeight: 1.65,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </CyberPanel>
            ))}
          </div>
        </motion.div>

        {/* ═══ Trophy Shelf ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ marginBottom: "44px" }}
        >
          <TrophyShelf />
        </motion.div>

        {/* ═══ Channels ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <SectionLabel>CHANNELS</SectionLabel>
          <div
            className="flex flex-col sm:flex-row sm:items-center"
            style={{ gap: "16px" }}
          >
            <a
              href={`mailto:${personal.email}`}
              data-cursor="transmit"
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "14px",
                color: "#00f0ff",
                textShadow: "0 0 10px rgba(0,240,255,0.4)",
                transition: "color 0.2s",
              }}
            >
              {personal.email}
            </a>

            <div className="flex flex-wrap items-center" style={{ gap: "8px" }}>
              {Object.entries(personal.socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={name}
                  className="mono-label chamfer-sm"
                  style={{
                    display: "inline-block",
                    padding: "8px 16px",
                    fontSize: "9px",
                    border: "1px solid rgba(0,240,255,0.2)",
                    color: "rgba(0,240,255,0.6)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#00f0ff";
                    e.currentTarget.style.color = "#04040a";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "rgba(0,240,255,0.6)";
                  }}
                >
                  {name.toUpperCase()} ↗
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div
      className="flex items-center"
      style={{ gap: "12px", marginBottom: "18px" }}
    >
      <span className="mono-label" style={{ color: "#ff2a6d", fontSize: "9px" }}>
        ▸
      </span>
      <span className="mono-label" style={{ fontSize: "10px" }}>
        {children}
      </span>
      <div className="hairline" style={{ flex: 1 }} />
    </div>
  );
}
