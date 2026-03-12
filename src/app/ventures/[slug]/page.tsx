"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ventures, getVentureBySlug } from "@/data/ventures";

export default function VentureDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const venture = getVentureBySlug(slug);

  if (!venture) {
    return (
      <div
        style={{
          paddingTop: "140px",
          textAlign: "center",
          color: "rgba(245,245,245,0.5)",
        }}
      >
        <p>Venture not found.</p>
        <Link
          href="/ventures"
          style={{
            color: "rgba(245,245,245,0.7)",
            marginTop: "16px",
            display: "inline-block",
          }}
        >
          ← Back to Ventures
        </Link>
      </div>
    );
  }

  // Previous / Next
  const currentIndex = ventures.findIndex((v) => v.slug === slug);
  const prev = currentIndex > 0 ? ventures[currentIndex - 1] : null;
  const next =
    currentIndex < ventures.length - 1 ? ventures[currentIndex + 1] : null;

  // Split fullContent into paragraphs
  const paragraphs = venture.fullContent
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <div
      style={{ paddingTop: "100px", paddingBottom: "var(--spacing-section)" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        {/* ─── Back Link ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/ventures"
            style={{
              fontSize: "13px",
              fontWeight: 400,
              color: "rgba(245,245,245,0.4)",
              transition: "color 0.2s",
              display: "inline-block",
              marginBottom: "var(--spacing-component)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(245,245,245,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(245,245,245,0.4)")
            }
          >
            ← Back to Ventures
          </Link>
        </motion.div>

        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Badges row */}
          <div
            className="flex flex-wrap items-center"
            style={{ gap: "10px", marginBottom: "16px" }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(245,245,245,0.5)",
                background: "rgba(255,255,255,0.06)",
                padding: "4px 12px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {venture.role}
            </span>

            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color:
                  venture.status === "ongoing"
                    ? "rgba(100,220,100,0.85)"
                    : "rgba(245,245,245,0.5)",
                background:
                  venture.status === "ongoing"
                    ? "rgba(100,220,100,0.06)"
                    : "rgba(255,255,255,0.06)",
                padding: "4px 12px",
                borderRadius: "6px",
                border:
                  venture.status === "ongoing"
                    ? "1px solid rgba(100,220,100,0.15)"
                    : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {venture.status === "ongoing" ? "Ongoing" : "Completed"}
            </span>

            <span
              style={{
                fontSize: "12px",
                fontWeight: 300,
                color: "rgba(245,245,245,0.3)",
                marginLeft: "auto",
              }}
            >
              {venture.year}
            </span>
          </div>

          {/* Title */}
          <h1
            className="glass-text"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "12px",
            }}
          >
            {venture.title}
          </h1>

          {/* Short description */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              fontWeight: 300,
              color: "rgba(245,245,245,0.5)",
              lineHeight: 1.6,
              marginBottom: "var(--spacing-component)",
            }}
          >
            {venture.description}
          </p>
        </motion.div>

        {/* ─── Hero Media ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            position: "relative",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: "var(--spacing-group)",
            border: "1px solid rgba(255,255,255,0.08)",
            aspectRatio: "16 / 9",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%)",
          }}
        >
          {venture.heroVideo ? (
            <video
              src={venture.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.8,
              }}
            />
          ) : (venture.heroImage || venture.thumbnail) ? (
            <img
              src={venture.heroImage || venture.thumbnail}
              alt={venture.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.8,
              }}
            />
          ) : null}
        </motion.div>

        {/* ─── Metrics ─── */}
        {venture.metrics && venture.metrics.length > 0 && (
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
              Key Details
            </h2>
            <div
              className="grid grid-cols-2 sm:grid-cols-4"
              style={{ gap: "1px", borderRadius: "12px", overflow: "hidden" }}
            >
              {venture.metrics.map((m) => (
                <div
                  key={m.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(245,245,245,0.3)",
                      marginBottom: "6px",
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "rgba(245,245,245,0.8)",
                    }}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Case Study Content ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
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

        {/* ─── Links ─── */}
        {venture.links && venture.links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ marginBottom: "var(--spacing-group)" }}
          >
            <div className="flex flex-wrap" style={{ gap: "12px" }}>
              {venture.links.map((link, i) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={i === 0 ? "" : "glass"}
                  style={
                    i === 0
                      ? {
                          display: "inline-block",
                          padding: "12px 28px",
                          borderRadius: "9999px",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "#0A0A0A",
                          background: "rgba(245,245,245,0.85)",
                          transition: "all 0.2s",
                        }
                      : {
                          display: "inline-block",
                          padding: "12px 28px",
                          borderRadius: "9999px",
                          fontSize: "13px",
                          fontWeight: 500,
                          color: "rgba(245,245,245,0.8)",
                          transition: "all 0.2s",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (i === 0) {
                      e.currentTarget.style.background =
                        "rgba(245,245,245,1)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (i === 0) {
                      e.currentTarget.style.background =
                        "rgba(245,245,245,0.85)";
                    }
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── Previous / Next ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center justify-between"
          style={{
            paddingTop: "var(--spacing-component)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {prev ? (
            <Link
              href={`/ventures/${prev.slug}`}
              style={{
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(245,245,245,0.4)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.4)")
              }
            >
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/ventures/${next.slug}`}
              style={{
                fontSize: "13px",
                fontWeight: 400,
                color: "rgba(245,245,245,0.4)",
                transition: "color 0.2s",
                textAlign: "right",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.4)")
              }
            >
              {next.title} →
            </Link>
          ) : (
            <span />
          )}
        </motion.div>
      </div>
    </div>
  );
}
