"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ventures } from "@/data/ventures";
import CyberPanel from "@/components/ui/CyberPanel";
import DecoderText from "@/components/motion/DecoderText";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function VenturesPage() {
  return (
    <div style={{ paddingTop: "110px", paddingBottom: "140px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: "14px" }}>
          <div
            className="flex items-center"
            style={{ gap: "14px", marginBottom: "12px" }}
          >
            <span className="mono-label" style={{ color: "#ff2a6d" }}>
              SYS.OPERATIONS
            </span>
            <span className="mono-label-dim">{"//"}</span>
            <div className="hairline" style={{ flex: 1 }} />
            <span className="mono-label-dim">{ventures.length} ACTIVE</span>
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
            VENTURES
          </DecoderText>
        </div>
        <p
          style={{
            fontSize: "15px",
            fontWeight: 300,
            color: "rgba(230,248,255,0.5)",
            lineHeight: 1.7,
            marginBottom: "44px",
            maxWidth: "520px",
          }}
        >
          What I build outside of Eleno — hospitality, talent, and the spaces
          where industries intersect.
        </p>

        {/* ═══ Files ═══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "18px" }}>
          {ventures.map((venture, i) => {
            const construction = venture.status === "construction";
            return (
              <motion.div
                key={venture.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              >
                <Link
                  href={`/ventures/${venture.slug}`}
                  data-cursor={construction ? "classified" : "open file"}
                  style={{ display: "block", height: "100%" }}
                >
                  <CyberPanel
                    accent={construction ? "amber" : "cyan"}
                    scan={!construction}
                    style={{ height: "100%" }}
                  >
                    <div
                      style={{
                        position: "relative",
                        minHeight: "400px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        overflow: "hidden",
                      }}
                    >
                      {/* Visual field */}
                      {construction ? (
                        <>
                          {/* Hazard stripes */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "repeating-linear-gradient(-45deg, rgba(255,184,0,0.05) 0px, rgba(255,184,0,0.05) 12px, transparent 12px, transparent 34px)",
                            }}
                          />
                          {/* CLASSIFIED stamp */}
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              paddingBottom: "80px",
                            }}
                          >
                            <span
                              className="display"
                              style={{
                                fontSize: "clamp(20px, 3vw, 30px)",
                                color: "rgba(255,184,0,0.35)",
                                border: "2px solid rgba(255,184,0,0.3)",
                                padding: "10px 26px",
                                transform: "rotate(-8deg)",
                                letterSpacing: "0.25em",
                              }}
                            >
                              CLASSIFIED
                            </span>
                          </div>
                        </>
                      ) : venture.thumbnail ? (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            paddingBottom: "80px",
                            background:
                              "radial-gradient(circle at 50% 40%, rgba(0,240,255,0.07), transparent 65%)",
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={venture.thumbnail}
                            alt={venture.title}
                            style={{
                              maxWidth: "48%",
                              maxHeight: "46%",
                              objectFit: "contain",
                              opacity: 0.65,
                              filter:
                                "drop-shadow(0 0 18px rgba(0,240,255,0.4))",
                            }}
                          />
                        </div>
                      ) : null}

                      {/* Status tag */}
                      <span
                        className="mono-label"
                        style={{
                          position: "absolute",
                          top: "14px",
                          left: "16px",
                          fontSize: "9px",
                          color: construction ? "#ffb800" : "#adff2f",
                          background: "rgba(4,4,10,0.7)",
                          border: construction
                            ? "1px solid rgba(255,184,0,0.4)"
                            : "1px solid rgba(173,255,47,0.35)",
                          padding: "5px 10px",
                          display: "flex",
                          alignItems: "center",
                          gap: "7px",
                          zIndex: 2,
                        }}
                      >
                        <span
                          className="live-dot"
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: construction ? "#ffb800" : "#adff2f",
                            boxShadow: construction
                              ? "0 0 8px rgba(255,184,0,0.7)"
                              : "0 0 8px rgba(173,255,47,0.7)",
                            display: "inline-block",
                          }}
                        />
                        {construction ? "IN CONSTRUCTION" : "OPERATIONAL"}
                      </span>

                      <span
                        className="mono-label-dim"
                        style={{
                          position: "absolute",
                          top: "14px",
                          right: "16px",
                          fontSize: "9px",
                          zIndex: 2,
                        }}
                      >
                        FILE_0{i + 1}
                      </span>

                      {/* Bottom data block */}
                      <div
                        style={{
                          position: "relative",
                          zIndex: 1,
                          padding: "22px 24px",
                          background:
                            "linear-gradient(to top, rgba(4,4,10,0.95) 0%, rgba(4,4,10,0.6) 70%, transparent 100%)",
                        }}
                      >
                        <span
                          className="mono-label-dim"
                          style={{
                            fontSize: "9px",
                            display: "block",
                            marginBottom: "8px",
                          }}
                        >
                          ROLE: {venture.role.toUpperCase()}
                        </span>
                        <h2
                          className="display"
                          style={{
                            fontSize: "clamp(22px, 3vw, 32px)",
                            color: construction
                              ? "rgba(255,184,0,0.9)"
                              : "#e6f8ff",
                            textShadow: construction
                              ? "0 0 16px rgba(255,184,0,0.3)"
                              : "0 0 16px rgba(0,240,255,0.2)",
                            marginBottom: "6px",
                          }}
                        >
                          {venture.title}
                        </h2>
                        <span
                          className="mono-label-dim"
                          style={{ fontSize: "9px" }}
                        >
                          EST. {venture.year}
                        </span>
                      </div>
                    </div>
                  </CyberPanel>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
