"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ventures } from "@/data/ventures";
import LiquidGlassCard from "@/components/glass/LiquidGlassCard";

export default function VenturesPage() {
  return (
    <div
      style={{ paddingTop: "100px", paddingBottom: "var(--spacing-section)" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <h1
          className="glass-text"
          style={{
            fontSize: "clamp(32px, 6vw, 48px)",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            marginBottom: "12px",
          }}
        >
          Ventures
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
          Businesses and roles beyond software — hospitality, talent management,
          and the spaces where industries intersect.
        </p>

        {/* Venture Cards — Side by Side */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2"
          style={{ gap: "20px" }}
        >
          {ventures.map((venture, i) => (
            <motion.div
              key={venture.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                href={`/ventures/${venture.slug}`}
                style={{ display: "block" }}
              >
                <LiquidGlassCard className="rounded-2xl group">
                  <div
                    style={{
                      position: "relative",
                      overflow: "hidden",
                      borderRadius: "16px",
                      minHeight: "380px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                    }}
                  >
                    {/* Background image */}
                    {venture.thumbnail ? (
                      venture.thumbnail.match(/\.(png|webp|svg)$/) ? (
                        /* Logo-style image — centered, contained */
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: "60px",
                          }}
                        >
                          <img
                            src={venture.thumbnail}
                            alt={venture.title}
                            style={{
                              maxWidth: "50%",
                              maxHeight: "50%",
                              objectFit: "contain",
                              opacity: 0.55,
                              transition:
                                "opacity 0.4s ease, transform 0.6s ease",
                            }}
                            className="group-hover:opacity-70 group-hover:scale-[1.05]"
                          />
                        </div>
                      ) : (
                        <img
                          src={venture.thumbnail}
                          alt={venture.title}
                          style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.35,
                            transition:
                              "opacity 0.4s ease, transform 0.6s ease",
                          }}
                          className="group-hover:opacity-50 group-hover:scale-[1.03]"
                        />
                      )
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.02) 100%)",
                        }}
                      />
                    )}

                    {/* Bottom gradient fade */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "70%",
                        background:
                          "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.6) 40%, transparent 100%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Status badge — top left */}
                    <span
                      style={{
                        position: "absolute",
                        top: "16px",
                        left: "18px",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color:
                          venture.status === "ongoing"
                            ? "rgba(100,220,100,0.85)"
                            : "rgba(245,245,245,0.5)",
                        background: "rgba(0,0,0,0.4)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        border:
                          venture.status === "ongoing"
                            ? "1px solid rgba(100,220,100,0.15)"
                            : "1px solid rgba(255,255,255,0.08)",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {venture.status === "ongoing" && (
                        <span
                          className="live-dot"
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "rgba(100,220,100,0.85)",
                          }}
                        />
                      )}
                      {venture.status === "ongoing" ? "ONGOING" : "COMPLETED"}
                    </span>

                    {/* Content overlay at bottom */}
                    <div
                      style={{
                        position: "relative",
                        zIndex: 1,
                        padding: "24px",
                      }}
                    >
                      {/* Role */}
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "rgba(245,245,245,0.4)",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        {venture.role}
                      </span>

                      {/* Title */}
                      <h2
                        style={{
                          fontSize: "clamp(22px, 3vw, 28px)",
                          fontWeight: 600,
                          color: "#f5f5f5",
                          letterSpacing: "-0.02em",
                          marginBottom: "6px",
                        }}
                      >
                        {venture.title}
                      </h2>

                      {/* Year */}
                      <span
                        style={{
                          fontSize: "13px",
                          fontWeight: 300,
                          color: "rgba(245,245,245,0.35)",
                        }}
                      >
                        Est. {venture.year}
                      </span>
                    </div>
                  </div>
                </LiquidGlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
