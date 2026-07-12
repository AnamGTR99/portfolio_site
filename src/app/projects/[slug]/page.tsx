"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects, getProjectBySlug, categoryLabels } from "@/data/projects";
import CyberPanel from "@/components/ui/CyberPanel";

const EASE = [0.76, 0, 0.24, 1] as const;
const PORTRAIT_SLUGS = ["pokemon-ai", "puff", "ai-anime-companion"];

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div
        style={{
          paddingTop: "160px",
          textAlign: "center",
          color: "rgba(230,248,255,0.5)",
        }}
      >
        <p className="mono-label" style={{ fontSize: "12px" }}>
          ERR_404: FILE NOT FOUND
        </p>
        <Link
          href="/projects"
          className="mono-label"
          style={{
            color: "#00f0ff",
            marginTop: "16px",
            display: "inline-block",
          }}
        >
          ◂ RETURN TO /PROJECTS
        </Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next =
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const primaryCategory = project.categories[0];
  const isPortrait = PORTRAIT_SLUGS.includes(project.slug);

  return (
    <div style={{ paddingTop: "110px", paddingBottom: "140px" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/projects"
            data-cursor="return"
            className="mono-label"
            style={{
              color: "rgba(0,240,255,0.55)",
              display: "inline-block",
              marginBottom: "30px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00f0ff")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(0,240,255,0.55)")
            }
          >
            ◂ /PROJECTS
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div
            className="flex flex-wrap items-center"
            style={{ gap: "10px", marginBottom: "16px" }}
          >
            <span
              className="mono-label"
              style={{
                fontSize: "9px",
                padding: "5px 10px",
                border: "1px solid rgba(0,240,255,0.3)",
                color: "rgba(0,240,255,0.75)",
              }}
            >
              {(categoryLabels[primaryCategory] || primaryCategory).toUpperCase()}
            </span>

            {(project.award || project.badge) && (
              <span
                className="mono-label"
                style={{
                  fontSize: "9px",
                  padding: "5px 10px",
                  border: "1px solid rgba(255,184,0,0.4)",
                  color: "#ffb800",
                  textShadow: "0 0 8px rgba(255,184,0,0.4)",
                }}
              >
                ✦ {(project.award || project.badge)?.toUpperCase()}
              </span>
            )}

            <span
              className="mono-label-dim"
              style={{ fontSize: "10px", marginLeft: "auto" }}
            >
              FILE_{String(currentIndex + 1).padStart(2, "0")} — {project.year}
            </span>
          </div>

          <h1
            className="display"
            style={{
              fontSize: "clamp(34px, 6.5vw, 64px)",
              color: "#e6f8ff",
              textShadow: "0 0 28px rgba(0,240,255,0.2)",
              lineHeight: 1,
              marginBottom: "14px",
            }}
          >
            {project.title.toUpperCase()}
          </h1>

          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              fontWeight: 300,
              color: "rgba(230,248,255,0.5)",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "680px",
            }}
          >
            {project.description}
          </p>
        </motion.div>

        {/* Hero media */}
        <motion.div
          className="chamfer"
          initial={{
            opacity: 0,
            clipPath: "inset(10% 6% 10% 6%)",
            scale: 1.03,
          }}
          animate={{
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
          }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          style={{
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(0,240,255,0.2)",
            aspectRatio: isPortrait ? "9 / 16" : "16 / 9",
            ...(isPortrait
              ? {
                  maxHeight: "600px",
                  margin: "0 auto 44px",
                  width: "auto",
                  background: "transparent",
                }
              : {
                  marginBottom: "44px",
                  background:
                    "radial-gradient(circle at 50% 40%, rgba(0,240,255,0.06), transparent 70%)",
                }),
          }}
        >
          {project.youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}`}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          ) : project.demoVideo ? (
            <video
              src={project.demoVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: isPortrait ? "contain" : "cover",
                opacity: 0.9,
              }}
            />
          ) : project.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.thumbnail}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: 0.9,
              }}
            />
          ) : null}
        </motion.div>

        {/* Overview */}
        {project.longDescription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginBottom: "44px" }}
          >
            <SectionLabel>BRIEFING</SectionLabel>
            <p
              style={{
                fontSize: "15px",
                fontWeight: 300,
                color: "rgba(230,248,255,0.6)",
                lineHeight: 1.85,
              }}
            >
              {project.longDescription}
            </p>
          </motion.div>
        )}

        {/* Tech stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ marginBottom: "44px" }}
        >
          <SectionLabel>TECH STACK</SectionLabel>
          <div className="flex flex-wrap" style={{ gap: "8px" }}>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="mono-label chamfer-sm"
                style={{
                  fontSize: "10px",
                  color: "rgba(0,240,255,0.7)",
                  background: "rgba(0,240,255,0.04)",
                  border: "1px solid rgba(0,240,255,0.2)",
                  padding: "8px 14px",
                }}
              >
                {tech.toUpperCase()}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Quick facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginBottom: "44px" }}
        >
          <SectionLabel>MISSION DATA</SectionLabel>
          <div
            className="grid grid-cols-2 sm:grid-cols-4"
            style={{ gap: "10px" }}
          >
            {[
              { label: "BUILT IN", value: project.buildTime },
              { label: "ROLE", value: project.role },
              { label: "PURPOSE", value: project.purpose },
              { label: "YEAR", value: String(project.year) },
            ]
              .filter((f) => f.value)
              .map((fact) => (
                <CyberPanel key={fact.label} corners={false}>
                  <div style={{ padding: "16px" }}>
                    <div
                      className="mono-label-dim"
                      style={{ fontSize: "8.5px", marginBottom: "7px" }}
                    >
                      {fact.label}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#e6f8ff",
                      }}
                    >
                      {fact.value}
                    </div>
                  </div>
                </CyberPanel>
              ))}
          </div>
        </motion.div>

        {/* Links */}
        {(project.githubUrl || project.liveUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ marginBottom: "44px" }}
          >
            <div className="flex flex-wrap" style={{ gap: "10px" }}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="launch"
                  className="mono-label chamfer-sm"
                  style={{
                    display: "inline-block",
                    padding: "12px 26px",
                    fontSize: "10px",
                    background: "#00f0ff",
                    color: "#04040a",
                    border: "1px solid #00f0ff",
                    boxShadow: "0 0 18px rgba(0,240,255,0.4)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ff2a6d";
                    e.currentTarget.style.borderColor = "#ff2a6d";
                    e.currentTarget.style.boxShadow =
                      "0 0 18px rgba(255,42,109,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#00f0ff";
                    e.currentTarget.style.borderColor = "#00f0ff";
                    e.currentTarget.style.boxShadow =
                      "0 0 18px rgba(0,240,255,0.4)";
                  }}
                >
                  LIVE DEMO ↗
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="source"
                  className="mono-label chamfer-sm"
                  style={{
                    display: "inline-block",
                    padding: "12px 26px",
                    fontSize: "10px",
                    color: "rgba(0,240,255,0.7)",
                    border: "1px solid rgba(0,240,255,0.25)",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(0,240,255,0.6)";
                    e.currentTarget.style.color = "#00f0ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(0,240,255,0.25)";
                    e.currentTarget.style.color = "rgba(0,240,255,0.7)";
                  }}
                >
                  SOURCE ↗
                </a>
              )}
            </div>
          </motion.div>
        )}

        {/* Prev / Next */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-between"
          style={{
            paddingTop: "28px",
            borderTop: "1px solid rgba(0,240,255,0.12)",
            gap: "16px",
          }}
        >
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="mono-label"
              style={{ color: "rgba(0,240,255,0.55)" }}
            >
              ◂ {prev.title.toUpperCase()}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="mono-label"
              style={{ color: "rgba(0,240,255,0.55)", textAlign: "right" }}
            >
              {next.title.toUpperCase()} ▸
            </Link>
          ) : (
            <span />
          )}
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
      <span
        className="mono-label"
        style={{ color: "#ff2a6d", fontSize: "9px" }}
      >
        ▸
      </span>
      <span className="mono-label" style={{ fontSize: "10px" }}>
        {children}
      </span>
      <div className="hairline" style={{ flex: 1 }} />
    </div>
  );
}
