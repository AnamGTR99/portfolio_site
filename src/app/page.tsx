"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getFeaturedProjects, type Project } from "@/data/projects";
import { ventures } from "@/data/ventures";
import GitHubActivity from "@/components/dashboard/GitHubActivity";
import CyberPanel from "@/components/ui/CyberPanel";
import GlitchText from "@/components/motion/GlitchText";
import DecoderText from "@/components/motion/DecoderText";
import Marquee from "@/components/motion/Marquee";
import Magnetic from "@/components/motion/Magnetic";

const featuredProjects = getFeaturedProjects();
const featuredVenture =
  ventures.find((v) => v.slug === "anam-hotel") ?? ventures[0];

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Home() {
  return (
    <>
      <ScrollProgress />

      {/* ═══ HERO ═══ */}
      <section
        className="relative flex flex-col items-center justify-center"
        style={{ height: "100vh", minHeight: "620px" }}
      >
        {/* HUD corner readouts */}
        <span
          className="mono-label absolute hidden sm:block"
          style={{ left: "24px", top: "84px" }}
        >
          ◢ OPERATIVE: SHEIK ANAM MILFER
        </span>
        <span
          className="mono-label absolute hidden sm:block"
          style={{ right: "24px", top: "84px", textAlign: "right" }}
        >
          LOC: 37.8136°S 144.9631°E ◣
        </span>
        <span
          className="mono-label-dim absolute hidden sm:block"
          style={{ left: "24px", bottom: "88px" }}
        >
          ◥ EST. HONG KONG — 1999
        </span>
        <span
          className="mono-label-dim absolute hidden sm:block"
          style={{ right: "24px", bottom: "88px", textAlign: "right" }}
        >
          PORTFOLIO ©{new Date().getFullYear()} ◤
        </span>

        {/* Name */}
        <div className="relative z-10 flex flex-col items-center px-6" style={{ gap: "22px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h1
              className="display neon-flicker"
              style={{
                fontSize: "clamp(84px, 18vw, 230px)",
                lineHeight: 0.9,
                color: "rgba(230,248,255,0.92)",
                textShadow:
                  "0 0 18px rgba(0,240,255,0.45), 0 0 70px rgba(0,240,255,0.18)",
              }}
            >
              <GlitchText>ANAM</GlitchText>
            </h1>
          </motion.div>

          <div
            className="flex items-center"
            style={{ gap: "14px", flexWrap: "wrap", justifyContent: "center" }}
          >
            <span
              aria-hidden
              style={{
                width: "34px",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, #00f0ff)",
              }}
            />
            <DecoderText
              className="mono-label"
              style={{ fontSize: "12px", color: "rgba(0,240,255,0.85)" }}
              delay={0.5}
            >
              ARTIFICIAL INTELLIGENCE ENGINEER @ ELENO
            </DecoderText>
            <span
              aria-hidden
              style={{
                width: "34px",
                height: "1px",
                background:
                  "linear-gradient(90deg, #00f0ff, transparent)",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="flex items-center"
            style={{ gap: "18px" }}
          >
            {["AI ENGINEER", "HOTELIER", "TALENT MGMT"].map((tag, i) => (
              <span key={tag} className="flex items-center" style={{ gap: "18px" }}>
                {i > 0 && (
                  <span style={{ color: "rgba(255,42,109,0.6)", fontSize: "9px" }}>
                    ◆
                  </span>
                )}
                <span className="mono-label-dim" style={{ fontSize: "9px" }}>
                  {tag}
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll prompt */}
        <motion.div
          className="absolute flex flex-col items-center"
          style={{ bottom: "26px", gap: "8px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <span className="mono-label" style={{ fontSize: "9px" }}>
            INITIATE SCROLL
          </span>
          <motion.span
            animate={{ y: [0, 6, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{ color: "#00f0ff", fontSize: "12px" }}
          >
            ▼
          </motion.span>
        </motion.div>
      </section>

      {/* ═══ FEATURED WORK ═══ */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <SectionHeader index="01" title="FEATURED_WORK" />

          <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "18px" }}>
            {/* Venture — full width */}
            <motion.div
              style={{ gridColumn: "1 / -1" }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Link
                href={`/ventures/${featuredVenture.slug}`}
                data-cursor="open file"
                style={{ display: "block" }}
              >
                <CyberPanel scan>
                  <div
                    className="flex flex-col sm:flex-row sm:items-stretch"
                    style={{ minHeight: "180px" }}
                  >
                    <div
                      style={{
                        flex: 1,
                        padding: "26px 28px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        gap: "18px",
                      }}
                    >
                      <div>
                        <div
                          className="flex items-center"
                          style={{ gap: "10px", marginBottom: "14px", flexWrap: "wrap" }}
                        >
                          <Tag color="cyan">VENTURE</Tag>
                          <Tag color="lime" dot>
                            ONGOING
                          </Tag>
                        </div>
                        <h3
                          className="display"
                          style={{
                            fontSize: "clamp(24px, 4vw, 40px)",
                            color: "#e6f8ff",
                            marginBottom: "10px",
                          }}
                        >
                          {featuredVenture.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "rgba(230,248,255,0.5)",
                            lineHeight: 1.7,
                            maxWidth: "560px",
                          }}
                        >
                          {featuredVenture.description}
                        </p>
                      </div>
                      <span className="mono-label-dim" style={{ fontSize: "9px" }}>
                        ROLE: {featuredVenture.role.toUpperCase()} — EST.{" "}
                        {featuredVenture.year}
                      </span>
                    </div>
                    {featuredVenture.thumbnail && (
                      <div
                        className="hidden sm:flex items-center justify-center"
                        style={{
                          width: "300px",
                          borderLeft: "1px solid rgba(0,240,255,0.14)",
                          background:
                            "radial-gradient(circle at 50% 50%, rgba(0,240,255,0.06), transparent 70%)",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={featuredVenture.thumbnail}
                          alt={featuredVenture.title}
                          style={{
                            maxWidth: "55%",
                            maxHeight: "60%",
                            objectFit: "contain",
                            opacity: 0.7,
                            filter: "drop-shadow(0 0 14px rgba(0,240,255,0.35))",
                          }}
                        />
                      </div>
                    )}
                  </div>
                </CyberPanel>
              </Link>
            </motion.div>

            {/* Two featured projects */}
            {featuredProjects.slice(0, 2).map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                <FeaturedProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: "36px", textAlign: "center" }}>
            <Magnetic strength={0.25}>
              <Link
                href="/projects"
                data-cursor="all files"
                className="mono-label chamfer-sm"
                style={{
                  display: "inline-block",
                  padding: "12px 28px",
                  border: "1px solid rgba(0,240,255,0.3)",
                  color: "#00f0ff",
                  fontSize: "10px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#00f0ff";
                  e.currentTarget.style.color = "#04040a";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(0,240,255,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#00f0ff";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                ACCESS ALL PROJECTS →
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>

      {/* ═══ GIT ACTIVITY ═══ */}
      <GitHubActivity />

      {/* ═══ MARQUEE ═══ */}
      <div style={{ padding: "56px 0" }}>
        <Marquee
          items={["AI ENGINEER", "HOTELIER", "TALENT MANAGER", "BUILDER"]}
        />
      </div>

      {/* ═══ CTA ═══ */}
      <section style={{ padding: "40px 24px 140px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <CyberPanel accent="magenta">
              <div style={{ padding: "34px 32px" }}>
                <span className="mono-label" style={{ display: "block", marginBottom: "18px" }}>
                  ~/anam $ <span className="blink" style={{ display: "inline-block", width: "7px", height: "12px", background: "#00f0ff", verticalAlign: "middle" }} />
                </span>
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(28px, 5.5vw, 52px)",
                    color: "#e6f8ff",
                    marginBottom: "14px",
                  }}
                >
                  THAT&apos;S THE{" "}
                  <span className="neon-text-magenta">WORK.</span>
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 300,
                    color: "rgba(230,248,255,0.5)",
                    marginBottom: "26px",
                    lineHeight: 1.7,
                  }}
                >
                  If something piqued your interest, you know where to find
                  me.
                </p>
                <Magnetic strength={0.3}>
                  <a
                    href="mailto:milferanam@gmail.com"
                    data-cursor="transmit"
                    className="chamfer-sm"
                    style={{
                      display: "inline-block",
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "12px",
                      letterSpacing: "0.1em",
                      padding: "13px 28px",
                      background: "#00f0ff",
                      color: "#04040a",
                      boxShadow: "0 0 24px rgba(0,240,255,0.4)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#ff2a6d";
                      e.currentTarget.style.boxShadow =
                        "0 0 24px rgba(255,42,109,0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#00f0ff";
                      e.currentTarget.style.boxShadow =
                        "0 0 24px rgba(0,240,255,0.4)";
                    }}
                  >
                    MILFERANAM@GMAIL.COM ↗
                  </a>
                </Magnetic>
              </div>
            </CyberPanel>
          </motion.div>
        </div>
      </section>
    </>
  );
}

/* ─── Section header: mono index + display title + hairline ─── */
function SectionHeader({ index, title }: { index: string; title: string }) {
  return (
    <div style={{ marginBottom: "40px" }}>
      <div className="flex items-center" style={{ gap: "14px", marginBottom: "12px" }}>
        <span className="mono-label" style={{ color: "#ff2a6d" }}>
          {index}
        </span>
        <span className="mono-label-dim">{"//"}</span>
        <motion.div
          className="hairline"
          style={{ flex: 1, transformOrigin: "left" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        />
      </div>
      <DecoderText
        as="h2"
        className="display"
        style={{
          fontSize: "clamp(30px, 5.5vw, 54px)",
          color: "#e6f8ff",
          textShadow: "0 0 24px rgba(0,240,255,0.18)",
        }}
      >
        {title}
      </DecoderText>
    </div>
  );
}

/* ─── Small colored tag ─── */
function Tag({
  children,
  color = "cyan",
  dot = false,
}: {
  children: React.ReactNode;
  color?: "cyan" | "magenta" | "lime" | "amber";
  dot?: boolean;
}) {
  const c =
    color === "magenta"
      ? "#ff2a6d"
      : color === "lime"
        ? "#adff2f"
        : color === "amber"
          ? "#ffb800"
          : "#00f0ff";
  return (
    <span
      className="mono-label"
      style={{
        fontSize: "9px",
        color: c,
        border: `1px solid ${c}44`,
        background: `${c}11`,
        padding: "4px 10px",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      {dot && (
        <span
          className="live-dot"
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: c,
            boxShadow: `0 0 6px ${c}`,
            display: "inline-block",
          }}
        />
      )}
      {children}
    </span>
  );
}

/* ─── Featured project card ─── */
function FeaturedProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="open file"
      style={{ display: "block", height: "100%" }}
    >
      <CyberPanel
        scan
        accent={index % 2 === 0 ? "cyan" : "magenta"}
        style={{ height: "100%" }}
      >
        <div
          style={{
            position: "relative",
            height: "190px",
            overflow: "hidden",
            borderBottom: "1px solid rgba(0,240,255,0.14)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.65,
              filter: "saturate(1.15) contrast(1.05)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4,4,10,0.15) 0%, transparent 40%, rgba(4,4,10,0.85) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "14px",
              display: "flex",
              gap: "8px",
            }}
          >
            <Tag color={index % 2 === 0 ? "cyan" : "magenta"}>
              {project.purpose ?? "PROJECT"}
            </Tag>
          </div>
          {project.award && (
            <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
              <Tag color="amber">✦ {project.award}</Tag>
            </div>
          )}
        </div>
        <div style={{ padding: "18px 20px 20px" }}>
          <h3
            className="display"
            style={{
              fontSize: "20px",
              color: "#e6f8ff",
              marginBottom: "8px",
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 300,
              color: "rgba(230,248,255,0.45)",
              lineHeight: 1.6,
              marginBottom: "14px",
            }}
          >
            {project.description}
          </p>
          <div className="flex flex-wrap" style={{ gap: "6px" }}>
            {project.techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="mono-label-dim"
                style={{
                  fontSize: "8px",
                  padding: "3px 8px",
                  border: "1px solid rgba(230,248,255,0.12)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </CyberPanel>
    </Link>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "linear-gradient(90deg, #00f0ff, #ff2a6d)",
        boxShadow: "0 0 12px rgba(0,240,255,0.6)",
        zIndex: 70,
      }}
    />
  );
}
