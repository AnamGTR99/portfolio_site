"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, getProjectBySlug } from "@/data/projects";
import { categoryLabels } from "@/components/cards/ProjectCard";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div
        style={{
          paddingTop: "140px",
          textAlign: "center",
          color: "rgba(245,245,245,0.5)",
        }}
      >
        <p>Project not found.</p>
        <Link
          href="/projects"
          style={{ color: "rgba(245,245,245,0.7)", marginTop: "16px", display: "inline-block" }}
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  // Previous / Next
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const primaryCategory = project.categories[0];

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "var(--spacing-section)" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        {/* ─── Back Link ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/projects"
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
            ← Back to Projects
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
              {categoryLabels[primaryCategory] || primaryCategory}
            </span>

            {(project.award || project.badge) && (
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  color: "rgba(255,215,0,0.85)",
                  background: "rgba(255,215,0,0.06)",
                  padding: "4px 12px",
                  borderRadius: "6px",
                  border: "1px solid rgba(255,215,0,0.15)",
                }}
              >
                {project.award || project.badge}
              </span>
            )}

            <span
              style={{
                fontSize: "12px",
                fontWeight: 300,
                color: "rgba(245,245,245,0.3)",
                marginLeft: "auto",
              }}
            >
              {project.year}
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
            {project.title}
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              fontWeight: 300,
              color: "rgba(245,245,245,0.5)",
              lineHeight: 1.6,
              marginBottom: "var(--spacing-component)",
            }}
          >
            {project.description}
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
          {project.demoVideo ? (
            <video
              src={project.demoVideo}
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
          ) : project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.8,
              }}
            />
          ) : null}
        </motion.div>


        {/* ─── Overview ─── */}
        {project.longDescription && (
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
              Overview
            </h2>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(245,245,245,0.6)",
                lineHeight: 1.8,
              }}
            >
              {project.longDescription}
            </p>
          </motion.div>
        )}

        {/* ─── Tech Stack ─── */}
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
            Tech Stack
          </h2>
          <div className="flex flex-wrap" style={{ gap: "8px" }}>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "0.02em",
                  color: "rgba(245,245,245,0.6)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ─── Quick Facts ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
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
            Quick Facts
          </h2>
          <div
            className="grid grid-cols-2 sm:grid-cols-4"
            style={{ gap: "1px", borderRadius: "12px", overflow: "hidden" }}
          >
            {[
              { label: "Built in", value: project.buildTime },
              { label: "Role", value: project.role },
              { label: "Purpose", value: project.purpose },
              { label: "Year", value: String(project.year) },
            ]
              .filter((f) => f.value)
              .map((fact) => (
                <div
                  key={fact.label}
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
                    {fact.label}
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "rgba(245,245,245,0.8)",
                    }}
                  >
                    {fact.value}
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* ─── Links ─── */}
        {(project.githubUrl || project.liveUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ marginBottom: "var(--spacing-group)" }}
          >
            <div className="flex flex-wrap" style={{ gap: "12px" }}>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass"
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "rgba(245,245,245,0.8)",
                    transition: "all 0.2s",
                  }}
                >
                  GitHub ↗
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "12px 28px",
                    borderRadius: "9999px",
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#0A0A0A",
                    background: "rgba(245,245,245,0.85)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(245,245,245,1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(245,245,245,0.85)")
                  }
                >
                  Live Demo ↗
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* ─── Previous / Next ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-between"
          style={{
            paddingTop: "var(--spacing-component)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
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
              href={`/projects/${next.slug}`}
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
