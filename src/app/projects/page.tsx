"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type ProjectCategory } from "@/data/projects";
import ProjectCard from "@/components/cards/ProjectCard";

type FilterKey = "all" | ProjectCategory;

const filters: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "ai-native", label: "AI-Native" },
  { key: "web-app", label: "Web Apps" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "client-website", label: "Client Websites" },
  { key: "passion-project", label: "Passion Projects" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((p) => p.categories.includes(activeFilter));
  }, [activeFilter]);

  return (
    <div style={{ paddingTop: "100px", paddingBottom: "var(--spacing-section)" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        {/* ─── Header ─── */}
        <h1
          className="glass-text"
          style={{
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "var(--spacing-component)",
          }}
        >
          Projects
        </h1>

        {/* ─── Filter Bar ─── */}
        <div
          style={{
            position: "sticky",
            top: "72px",
            zIndex: 40,
            paddingBottom: "var(--spacing-element)",
            paddingTop: "8px",
            background:
              "linear-gradient(to bottom, rgba(10,10,10,0.95) 60%, transparent 100%)",
          }}
        >
          <div className="flex flex-wrap" style={{ gap: "8px" }}>
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                style={{
                  position: "relative",
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: "0.04em",
                  padding: "7px 18px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "transparent",
                  color:
                    activeFilter === filter.key
                      ? "rgba(245,245,245,0.9)"
                      : "rgba(245,245,245,0.4)",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
              >
                {activeFilter === filter.key && (
                  <motion.div
                    layoutId="active-filter"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: "9999px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span style={{ position: "relative", zIndex: 1 }}>
                  {filter.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── Project Grid ─── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "20px" }}
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
                  opacity: { duration: 0.3, delay: i * 0.06 },
                  y: { duration: 0.4, delay: i * 0.06 },
                  layout: { type: "spring", stiffness: 300, damping: 30 },
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
