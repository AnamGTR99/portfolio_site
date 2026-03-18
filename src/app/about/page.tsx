"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { personal } from "@/data/personal";
import LiquidGlassCard from "@/components/glass/LiquidGlassCard";

export default function AboutPage() {
  const paragraphs = personal.bio.split("\n\n").filter((p) => p.trim());

  return (
    <div
      style={{ paddingTop: "100px", paddingBottom: "var(--spacing-section)" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="glass-text"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "12px",
            }}
          >
            About
          </h1>
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 17px)",
              fontWeight: 300,
              color: "rgba(245,245,245,0.45)",
              lineHeight: 1.6,
              marginBottom: "var(--spacing-group)",
              maxWidth: "560px",
            }}
          >
            {personal.tagline}
          </p>
        </motion.div>

        {/* ─── Photo + Intro Row ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row"
          style={{ gap: "32px", marginBottom: "var(--spacing-group)" }}
        >
          {/* Photo */}
          <div
            style={{
              flexShrink: 0,
              width: "100%",
              maxWidth: "280px",
              aspectRatio: "3 / 4",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <img
              src="/images/anam-about.jpg"
              alt="Anam"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Intro card */}
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: "20px" }}>
              <img
                src="/images/inlogic-logo.png"
                alt="InLogic"
                style={{
                  height: "56px",
                  filter: "invert(1)",
                  opacity: 0.75,
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "clamp(24px, 4vw, 32px)",
                fontWeight: 600,
                color: "#f5f5f5",
                letterSpacing: "-0.02em",
                marginBottom: "6px",
              }}
            >
              {personal.fullName}
            </h2>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(245,245,245,0.4)",
                marginBottom: "24px",
              }}
            >
              {personal.location}
            </p>

            {/* Fun facts */}
            {personal.funFacts && (
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
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "rgba(245,245,245,0.3)",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "rgba(245,245,245,0.55)",
                      }}
                    >
                      {fact.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ─── Bio ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginBottom: "var(--spacing-group)" }}
        >
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,245,245,0.35)",
              marginBottom: "16px",
            }}
          >
            The Story
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "15px",
                  fontWeight: 300,
                  color: "rgba(245,245,245,0.6)",
                  lineHeight: 1.8,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* ─── What I Do ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ marginBottom: "var(--spacing-group)" }}
        >
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,245,245,0.35)",
              marginBottom: "16px",
            }}
          >
            What I Do
          </h2>
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: "16px" }}
          >
            {[
              {
                title: "Software Engineering",
                description:
                  "AI Engineer at InLogic — building intelligent automation, AI-powered applications, and full-stack products that solve real problems.",
              },
              {
                title: "Hospitality",
                description:
                  "Owner & operator of The Anam Hotel Colombo — a boutique hotel where design meets genuine Sri Lankan warmth.",
              },
              {
                title: "Talent Management",
                description:
                  "Managing HUGO ZBOR — brand partnerships, content strategy, and scaling a multi-disciplinary creative's career.",
              },
            ].map((item) => (
              <LiquidGlassCard key={item.title} className="rounded-xl">
                <div style={{ padding: "20px" }}>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#f5f5f5",
                      marginBottom: "8px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(245,245,245,0.45)",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </LiquidGlassCard>
            ))}
          </div>
        </motion.div>

        {/* ─── Get In Touch ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <h2
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(245,245,245,0.35)",
              marginBottom: "16px",
            }}
          >
            Get In Touch
          </h2>
          <div
            className="flex flex-col sm:flex-row sm:items-center"
            style={{ gap: "16px" }}
          >
            <a
              href={`mailto:${personal.email}`}
              style={{
                fontSize: "15px",
                fontWeight: 400,
                color: "rgba(245,245,245,0.7)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,1)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.7)")
              }
            >
              {personal.email}
            </a>

            <div
              className="flex items-center"
              style={{ gap: "12px" }}
            >
              {Object.entries(personal.socials).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass"
                  style={{
                    display: "inline-block",
                    padding: "8px 20px",
                    borderRadius: "9999px",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(245,245,245,0.7)",
                    textTransform: "capitalize",
                    transition: "all 0.2s",
                  }}
                >
                  {name} ↗
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
