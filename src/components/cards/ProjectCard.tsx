"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import LiquidGlassCard from "@/components/glass/LiquidGlassCard";

interface ProjectCardProps {
  project: Project;
  large?: boolean;
  onClick?: () => void;
}

export const categoryLabels: Record<string, string> = {
  "ai-native": "AI-Native",
  "web-app": "Web App",
  mobile: "Mobile",
  "client-website": "Client Website",
  "passion-project": "Passion Project",
};

export default function ProjectCard({ project, large = false, onClick }: ProjectCardProps) {
  const {
    slug,
    title,
    description,
    techStack,
    categories,
    thumbnail,
    liveUrl,
    githubUrl,
    award,
    badge,
  } = project;

  // Show first category as the card badge
  const primaryCategory = categories[0];
  const topRightLabel = award || badge;
  const isAward = !!award;

  const cardContent = (
    <LiquidGlassCard className="rounded-2xl group">
      {/* ─── Thumbnail ─── */}
      <div
        style={{
          position: "relative",
          height: large ? "220px" : "160px",
          overflow: "hidden",
          borderRadius: "16px 16px 0 0",
        }}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.7,
              transition: "opacity 0.3s ease, transform 0.5s ease",
            }}
            className="group-hover:opacity-85 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%)",
            }}
          />
        )}

        {/* Bottom fade */}
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

        {/* Top badges container */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "16px",
            right: "16px",
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Category badge */}
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
              flexShrink: 0,
            }}
          >
            {categoryLabels[primaryCategory] || primaryCategory}
          </span>

          {/* Non-award badges stay top-right (gold) */}
          {topRightLabel && !isAward && (
            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: "rgba(255,215,0,0.85)",
                background: "rgba(0,0,0,0.4)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid rgba(255,215,0,0.15)",
                textAlign: "right",
              }}
            >
              {topRightLabel}
            </span>
          )}
        </div>

        {/* Award badge — bottom left corner */}
        {isAward && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "16px",
              zIndex: 2,
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: "rgba(255,215,0,0.85)",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid rgba(255,215,0,0.15)",
              }}
            >
              {topRightLabel}
            </span>
          </div>
        )}
      </div>

      {/* ─── Content ─── */}
      <div style={{ padding: "20px 24px 24px" }}>
        {/* Title */}
        <h3
          style={{
            fontSize: large ? "clamp(18px, 2.5vw, 22px)" : "clamp(16px, 2vw, 18px)",
            fontWeight: 600,
            color: "#f5f5f5",
            letterSpacing: "-0.01em",
            marginBottom: "8px",
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: "13px",
            fontWeight: 300,
            color: "rgba(245,245,245,0.45)",
            lineHeight: 1.6,
            marginBottom: "16px",
            display: "-webkit-box",
            WebkitLineClamp: large ? 3 : 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>

        {/* Tech stack pills */}
        <div
          className="flex flex-wrap"
          style={{ gap: "6px", marginBottom: "16px" }}
        >
          {techStack.slice(0, large ? 4 : 3).map((tech) => (
            <span
              key={tech}
              style={{
                fontSize: "10px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "rgba(245,245,245,0.5)",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "3px 10px",
                borderRadius: "9999px",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action links */}
        <div className="flex items-center" style={{ gap: "16px" }}>
          {githubUrl && (
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(githubUrl, "_blank", "noopener,noreferrer");
              }}
              style={{
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "rgba(245,245,245,0.4)",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.4)")
              }
            >
              GitHub ↗
            </span>
          )}
          {liveUrl && (
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(liveUrl, "_blank", "noopener,noreferrer");
              }}
              style={{
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.04em",
                color: "rgba(245,245,245,0.4)",
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.8)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(245,245,245,0.4)")
              }
            >
              Live Demo ↗
            </span>
          )}
        </div>
      </div>
    </LiquidGlassCard>
  );

  if (onClick) {
    return (
      <div onClick={onClick} style={{ display: "block", cursor: "pointer" }}>
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={`/projects/${slug}`} style={{ display: "block" }}>
      {cardContent}
    </Link>
  );
}
