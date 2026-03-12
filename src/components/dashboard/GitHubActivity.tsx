"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { GitHubActivityData } from "@/lib/github";
import LiquidGlassCard from "@/components/glass/LiquidGlassCard";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

function StatCounter({
  label,
  value,
  suffix,
  inView,
}: {
  label: string;
  value: number;
  suffix?: string;
  inView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (value === 0) {
      setDisplay(0);
      return;
    }

    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setDisplay(Math.round(progress * value));
      if (step >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [value, inView]);

  return (
    <div style={{ textAlign: "center" }}>
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
        {label}
      </div>
      <div
        style={{
          fontSize: "clamp(18px, 2.5vw, 24px)",
          fontWeight: 600,
          color: "rgba(245,245,245,0.85)",
          letterSpacing: "-0.02em",
        }}
      >
        {display}
        {suffix && (
          <span
            style={{
              fontSize: "14px",
              fontWeight: 400,
              color: "rgba(245,245,245,0.4)",
              marginLeft: "4px",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

const LEVEL_COLORS = [
  "rgba(255,255,255,0.04)",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

const TODAY_LEVEL_COLORS = [
  "rgba(255,160,0,0.35)",
  "rgba(255,160,0,0.5)",
  "rgba(255,160,0,0.7)",
  "rgba(255,160,0,0.85)",
  "rgba(255,160,0,1)",
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS: [number, string][] = [[1, "Mon"], [3, "Wed"], [5, "Fri"]];

function ContributionHeatmap({
  heatmap,
}: {
  heatmap: GitHubActivityData["heatmap"];
}) {
  const todayStr = new Date().toISOString().split("T")[0];

  // Organize into weeks (columns of 7 days)
  const weeks: GitHubActivityData["heatmap"][] = [];
  for (let i = 0; i < heatmap.length; i += 7) {
    weeks.push(heatmap.slice(i, i + 7));
  }

  const cellSize = 10;
  const cellGap = 2;
  const labelWidth = 14;
  const monthLabelHeight = 8;
  const totalWeeks = weeks.length;

  const svgWidth = labelWidth + totalWeeks * (cellSize + cellGap);
  const svgHeight = monthLabelHeight + 7 * (cellSize + cellGap);

  // Compute month labels — place at the first week where a new month starts
  const monthLabels: { x: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstDay = week[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        monthLabels.push({
          x: labelWidth + wi * (cellSize + cellGap),
          label: MONTH_NAMES[month],
        });
        lastMonth = month;
      }
    }
  });

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width="100%"
        style={{ display: "block" }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <style>{`
            @keyframes pulse-today {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.35; }
            }
          `}</style>
        </defs>
        {/* Month labels along top */}
        {monthLabels.map((m) => (
          <text
            key={m.label + m.x}
            x={m.x}
            y={6}
            fill="rgba(245,245,245,0.2)"
            fontSize="3.5"
            fontFamily="inherit"
          >
            {m.label}
          </text>
        ))}
        {/* Day labels on left */}
        {DAY_LABELS.map(([row, label]) => (
          <text
            key={label}
            x={0}
            y={monthLabelHeight + row * (cellSize + cellGap) + cellSize - 2}
            fill="rgba(245,245,245,0.2)"
            fontSize="3.5"
            fontFamily="inherit"
          >
            {label}
          </text>
        ))}
        {/* Heatmap cells */}
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const isToday = day.date === todayStr;
            const fill = isToday
              ? TODAY_LEVEL_COLORS[day.level] || TODAY_LEVEL_COLORS[0]
              : LEVEL_COLORS[day.level];

            return (
              <motion.rect
                key={day.date}
                x={labelWidth + wi * (cellSize + cellGap)}
                y={monthLabelHeight + di * (cellSize + cellGap)}
                width={cellSize}
                height={cellSize}
                rx={2}
                fill={fill}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: wi * 0.03 }}
                style={
                  isToday
                    ? { animation: "pulse-today 2s ease-in-out infinite" }
                    : undefined
                }
              >
                <title>
                  {day.date}: {day.count} contribution
                  {day.count !== 1 ? "s" : ""}
                  {isToday ? " (today)" : ""}
                </title>
              </motion.rect>
            );
          }),
        )}
      </svg>
    </div>
  );
}

export default function GitHubActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState("");

  useEffect(() => {
    setMounted(true);
    setToday(
      new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
    );
  }, []);

  const { data, error } = useSWR<GitHubActivityData>(
    mounted ? "/api/github" : null,
    fetcher,
    {
      refreshInterval: 300_000,
      revalidateOnFocus: true,
    },
  );

  if (error) return null;

  // Guard against error responses that don't match expected shape
  const isValidData = data && Array.isArray(data.heatmap);

  return (
    <section
      ref={ref}
      style={{
        padding: "0 24px",
        paddingBottom: "var(--spacing-group)",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Section label */}
        <h2
          className="glass-text"
          style={{
            fontSize: "clamp(28px, 5vw, 40px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "var(--spacing-group)",
          }}
        >
          Git Activity
        </h2>

        <LiquidGlassCard className="rounded-2xl">
          <div style={{ padding: "18px 20px" }}>
            {!isValidData ? (
              /* Skeleton */
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div
                  className="grid grid-cols-2 sm:grid-cols-4"
                  style={{ gap: "14px" }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div
                        style={{
                          width: "60px",
                          height: "8px",
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: "4px",
                          margin: "0 auto 10px",
                        }}
                      />
                      <div
                        style={{
                          width: "40px",
                          height: "24px",
                          background: "rgba(255,255,255,0.04)",
                          borderRadius: "6px",
                          margin: "0 auto",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    height: "70px",
                    background: "rgba(255,255,255,0.02)",
                    borderRadius: "8px",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {/* Stats row */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-4"
                  style={{ gap: "20px" }}
                >
                  <div style={{ textAlign: "center" }}>
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
                      Today
                    </div>
                    <div
                      style={{
                        fontSize: "clamp(13px, 2vw, 15px)",
                        fontWeight: 500,
                        color: "rgba(245,245,245,0.6)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {today}
                    </div>
                  </div>
                  <StatCounter
                    label="Commits Today"
                    value={data.commitsToday}
                    inView={inView}
                  />
                  <StatCounter
                    label="Current Streak"
                    value={data.currentStreak}
                    suffix="days"
                    inView={inView}
                  />
                  <StatCounter
                    label="2026 Contributions"
                    value={data.totalContributions}
                    inView={inView}
                  />
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: "1px",
                    background: "rgba(255,255,255,0.06)",
                  }}
                />

                {/* Full-width heatmap */}
                <ContributionHeatmap heatmap={data.heatmap} />
              </div>
            )}
          </div>
        </LiquidGlassCard>
      </div>
    </section>
  );
}
