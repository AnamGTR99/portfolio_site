"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type ProjectCategory, type Project } from "@/data/projects";
import CyberPanel from "@/components/ui/CyberPanel";
import DecoderText from "@/components/motion/DecoderText";

type FilterKey = "all" | ProjectCategory | "competition";

const EASE = [0.76, 0, 0.24, 1] as const;

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "ALL" },
  { key: "ai-native", label: "AI-NATIVE" },
  { key: "web-app", label: "WEB APPS" },
  { key: "mobile", label: "MOBILE" },
  { key: "client-website", label: "CLIENT WORK" },
  { key: "passion-project", label: "PASSION" },
  { key: "competition", label: "COMPETITIONS" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return projects;
    if (activeFilter === "competition")
      return projects.filter((p) => p.purpose === "Hackathon");
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div style={{ paddingTop: "110px", paddingBottom: "140px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: "34px" }}>
          <div
            className="flex items-center"
            style={{ gap: "14px", marginBottom: "12px" }}
          >
            <span className="mono-label" style={{ color: "#ff2a6d" }}>
              SYS.DATABASE
            </span>
            <span className="mono-label-dim">{"//"}</span>
            <div className="hairline" style={{ flex: 1 }} />
            <span className="mono-label-dim">
              {projects.length} FILES INDEXED
            </span>
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
            PROJECTS
          </DecoderText>
        </div>

        {/* ═══ Filter bar ═══ */}
        <div
          style={{
            position: "sticky",
            top: "58px",
            zIndex: 40,
            paddingTop: "10px",
            paddingBottom: "18px",
            background:
              "linear-gradient(to bottom, #04040a 70%, transparent 100%)",
          }}
        >
          <div className="flex flex-wrap" style={{ gap: "8px" }}>
            {filters.map((filter) => {
              const active = activeFilter === filter.key;
              return (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  data-cursor="hide"
                  className="chamfer-sm"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    padding: "8px 16px",
                    border: active
                      ? "1px solid #00f0ff"
                      : "1px solid rgba(0,240,255,0.18)",
                    background: active ? "#00f0ff" : "rgba(0,240,255,0.03)",
                    color: active ? "#04040a" : "rgba(0,240,255,0.6)",
                    boxShadow: active
                      ? "0 0 16px rgba(0,240,255,0.4)"
                      : "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ═══ Mission grid ═══ */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "18px" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  opacity: { duration: 0.35, delay: i * 0.05 },
                  y: { duration: 0.5, delay: i * 0.05, ease: EASE },
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
              >
                <MissionCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function MissionCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const accent: "cyan" | "magenta" =
    project.purpose === "Hackathon" ? "magenta" : "cyan";
  const accentHex = accent === "magenta" ? "#ff2a6d" : "#00f0ff";

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="open file"
      style={{ display: "block", height: "100%" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CyberPanel accent={accent} style={{ height: "100%" }}>
        {/* Visual */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16 / 10",
            overflow: "hidden",
            borderBottom: `1px solid ${accentHex}33`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: project.thumbnail.endsWith(".svg")
                ? "contain"
                : "cover",
              padding: project.thumbnail.endsWith(".svg") ? "28px" : 0,
              opacity: hovered ? 0.9 : 0.6,
              filter: hovered
                ? "saturate(1.3) contrast(1.08)"
                : "saturate(1.05)",
              transform: hovered ? "scale(1.04)" : "scale(1)",
              transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(4,4,10,0.35) 0%, transparent 35%, rgba(4,4,10,0.8) 100%)",
            }}
          />
          {hovered && <div className="scan-sweep" />}

          {/* File index */}
          <span
            className="mono-label"
            style={{
              position: "absolute",
              top: "10px",
              left: "12px",
              fontSize: "9px",
              color: accentHex,
              background: "rgba(4,4,10,0.7)",
              padding: "4px 8px",
              border: `1px solid ${accentHex}44`,
            }}
          >
            FILE_{String(index + 1).padStart(2, "0")}
          </span>

          {/* Year */}
          <span
            className="mono-label-dim"
            style={{
              position: "absolute",
              top: "10px",
              right: "12px",
              fontSize: "9px",
              background: "rgba(4,4,10,0.7)",
              padding: "4px 8px",
            }}
          >
            {project.year}
          </span>

          {/* Award */}
          {project.award && (
            <span
              className="mono-label"
              style={{
                position: "absolute",
                bottom: "10px",
                left: "12px",
                right: "12px",
                fontSize: "8.5px",
                color: "#ffb800",
                textShadow: "0 0 8px rgba(255,184,0,0.5)",
                background: "rgba(4,4,10,0.75)",
                padding: "5px 8px",
                border: "1px solid rgba(255,184,0,0.35)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              ✦ {project.award}
            </span>
          )}
        </div>

        {/* Data block */}
        <div style={{ padding: "16px 18px 18px" }}>
          <h2
            className="display"
            style={{
              fontSize: "19px",
              color: hovered ? accentHex : "#e6f8ff",
              textShadow: hovered ? `0 0 14px ${accentHex}66` : "none",
              transition: "all 0.25s",
              marginBottom: "7px",
            }}
          >
            {project.title}
          </h2>
          <p
            style={{
              fontSize: "12.5px",
              fontWeight: 300,
              color: "rgba(230,248,255,0.42)",
              lineHeight: 1.6,
              marginBottom: "13px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.description}
          </p>
          <div
            className="flex items-center justify-between"
            style={{ gap: "10px" }}
          >
            <span className="mono-label-dim" style={{ fontSize: "8.5px" }}>
              {(project.purpose ?? "PROJECT").toUpperCase()}
            </span>
            <span
              className="mono-label"
              style={{
                fontSize: "8.5px",
                color: hovered ? accentHex : "rgba(0,240,255,0.35)",
                transition: "color 0.25s",
              }}
            >
              OPEN ▸
            </span>
          </div>
        </div>
      </CyberPanel>
    </Link>
  );
}
