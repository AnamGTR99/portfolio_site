"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { getFeaturedProjects } from "@/data/projects";
import { ventures } from "@/data/ventures";
import LiquidGlassCard from "@/components/glass/LiquidGlassCard";
import ProjectCard from "@/components/cards/ProjectCard";
import HKSkyline from "@/components/hero/HKSkyline";
import GitHubActivity from "@/components/dashboard/GitHubActivity";

const featuredProjects = getFeaturedProjects();
const featuredVenture = ventures[0]; // Anam Hotel

export default function Home() {
  return (
    <>
      {/* ─── Scroll Progress Bar ─── */}
      <ScrollProgress />

      {/* ─── Hero ─── */}
      <section
        className="relative flex flex-col items-center justify-center"
        style={{ height: "calc(100vh - 80px)" }}
      >
        <HKSkyline />
        <div className="relative z-10 flex flex-col items-center gap-5 px-6">
          <h1
            className="glass-text-hero"
            style={{
              fontSize: "clamp(52px, 12vw, 96px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Anam
          </h1>
          <p
            className="text-center"
            style={{
              fontSize: "clamp(15px, 2.5vw, 19px)",
              fontWeight: 300,
              color: "rgba(245,245,245,0.55)",
              letterSpacing: "0.01em",
            }}
          >
            Artificial Intelligence Engineer at InLogic
          </p>
        </div>

        {/* Scroll chevron */}
        <motion.div
          className="absolute bottom-6 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.svg
            width="20"
            height="10"
            viewBox="0 0 20 10"
            fill="none"
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M1 1L10 8L19 1"
              stroke="rgba(245,245,245,0.35)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </section>

      {/* ─── Featured Work ─── */}
      <section
        style={{
          padding: "0 24px",
          paddingBottom: "var(--spacing-section)",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2
            className="glass-text"
            style={{
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "var(--spacing-group)",
            }}
          >
            Featured Work
          </h2>

          {/* Cards grid — large first card, two smaller below on desktop */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: "20px" }}
          >
            {/* Large featured card — spans full width */}
            <div style={{ gridColumn: "1 / -1" }}>
              <FeaturedCard
                href={`/ventures/${featuredVenture.slug}`}
                title={featuredVenture.title}
                description={featuredVenture.description}
                label={featuredVenture.role}
                category="Venture"
                thumbnail={featuredVenture.thumbnail}
                status={featuredVenture.status}
                large
              />
            </div>

            {/* Two project cards side by side */}
            {featuredProjects.slice(0, 2).map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          {/* View all link */}
          <div
            style={{
              marginTop: "var(--spacing-component)",
              textAlign: "center",
            }}
          >
            <Link
              href="/projects"
              style={{
                fontSize: "14px",
                fontWeight: 400,
                color: "rgba(245,245,245,0.45)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.45)")
              }
            >
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Git Activity ─── */}
      <GitHubActivity />

      {/* ─── CTA ─── */}
      <section
        style={{
          padding: "var(--spacing-section) 24px",
          textAlign: "center",
        }}
      >
        <div
          className="flex flex-col items-center"
          style={{ gap: "var(--spacing-element)" }}
        >
          <h2
            className="glass-text"
            style={{
              fontSize: "clamp(24px, 5vw, 36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
            }}
          >
            Let&apos;s chat.
          </h2>
          <p
            style={{
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(245,245,245,0.45)",
              maxWidth: "420px",
            }}
          >
            Open to coffees, collaborations, and the occasional unsolicited
            startup pitch.
          </p>
          <Link
            href="/contact"
            className="glass"
            style={{
              marginTop: "12px",
              display: "inline-block",
              padding: "12px 36px",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "#f5f5f5",
              transition: "all 0.2s",
            }}
          >
            Get in touch
          </Link>
        </div>
      </section>
    </>
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
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.15) 100%)",
        zIndex: 70,
      }}
    />
  );
}

function FeaturedCard({
  href,
  title,
  description,
  label,
  category,
  thumbnail,
  status,
  large = false,
}: {
  href: string;
  title: string;
  description: string;
  label: string;
  category: string;
  thumbnail?: string;
  status?: "ongoing" | "completed";
  large?: boolean;
}) {
  return (
    <Link href={href} style={{ display: "block" }}>
      <LiquidGlassCard className="rounded-2xl">
        {/* Thumbnail area */}
        <div
          style={{
            position: "relative",
            height: large ? "220px" : "160px",
            overflow: "hidden",
            borderRadius: "16px 16px 0 0",
          }}
        >
          {thumbnail && thumbnail.match(/\.(png|webp|svg)$/) ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%)",
              }}
            >
              <img
                src={thumbnail}
                alt={title}
                style={{
                  maxWidth: "40%",
                  maxHeight: "60%",
                  objectFit: "contain",
                  opacity: 0.5,
                }}
              />
            </div>
          ) : thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.7,
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%)`,
              }}
            />
          )}
          {/* Bottom fade into card content */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60px",
              background:
                "linear-gradient(to top, rgba(17,17,17,0.9) 0%, transparent 100%)",
            }}
          />
          {/* Badges */}
          <div
            style={{
              position: "absolute",
              top: "14px",
              left: "16px",
              display: "flex",
              gap: "6px",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(245,245,245,0.5)",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {category}
            </span>
            {status === "ongoing" && (
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "rgba(100,220,100,0.85)",
                  background: "rgba(0,0,0,0.4)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(100,220,100,0.15)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  className="live-dot"
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "rgba(100,220,100,0.85)",
                  }}
                />
                Ongoing
              </span>
            )}
          </div>
        </div>

        {/* Text content */}
        <div style={{ padding: "20px 24px 24px" }}>
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: "8px" }}
          >
            <h3
              style={{
                fontSize: "clamp(17px, 2.5vw, 20px)",
                fontWeight: 600,
                color: "#f5f5f5",
                letterSpacing: "-0.01em",
              }}
            >
              {title}
            </h3>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 400,
                color: "rgba(245,245,245,0.3)",
                flexShrink: 0,
                marginLeft: "12px",
              }}
            >
              {label}
            </span>
          </div>
          <p
            style={{
              fontSize: "13px",
              fontWeight: 300,
              color: "rgba(245,245,245,0.45)",
              lineHeight: 1.6,
            }}
          >
            {description}
          </p>
        </div>
      </LiquidGlassCard>
    </Link>
  );
}
