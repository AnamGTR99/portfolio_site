"use client";

import { motion } from "framer-motion";
import { personal } from "@/data/personal";

export default function ContactPage() {
  return (
    <div
      style={{ paddingTop: "100px", paddingBottom: "var(--spacing-section)" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px" }}>
        {/* ─── Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="glass-text"
            style={{
              fontSize: "clamp(32px, 6vw, 48px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              marginBottom: "12px",
            }}
          >
            Get in touch
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
            Have a project in mind, a question, or just want to connect? Reach
            out on any of these platforms.
          </p>
        </motion.div>

        {/* ─── Contact Links ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-component)",
          }}
        >
          {/* Email — primary CTA */}
          <a
            href={`mailto:${personal.email}`}
            style={{
              display: "block",
              padding: "28px 32px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            <span
              style={{
                display: "block",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(245,245,245,0.35)",
                marginBottom: "10px",
              }}
            >
              Email
            </span>
            <span
              style={{
                fontSize: "clamp(18px, 3vw, 24px)",
                fontWeight: 500,
                color: "rgba(245,245,245,0.8)",
                letterSpacing: "-0.01em",
              }}
            >
              {personal.email}
            </span>
          </a>

          {/* Social platforms */}
          <div
            className="grid grid-cols-1 sm:grid-cols-3"
            style={{ gap: "16px" }}
          >
            {Object.entries(personal.socials).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "24px 28px",
                  borderRadius: "16px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.08)";
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(245,245,245,0.35)",
                    marginBottom: "10px",
                  }}
                >
                  {name}
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "rgba(245,245,245,0.7)",
                  }}
                >
                  {name === "github"
                    ? "AnamGTR99"
                    : name === "linkedin"
                      ? "Sheik Anam Milfer"
                      : "@sheivault"}{" "}
                  ↗
                </span>
              </a>
            ))}
          </div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              paddingTop: "var(--spacing-component)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              style={{
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(245,245,245,0.35)",
              }}
            >
              Based in {personal.location}
            </span>

            {/* Journey timeline */}
            <div
              className="flex flex-wrap"
              style={{
                marginTop: "16px",
                gap: "0",
                alignItems: "center",
              }}
            >
              {[
                { city: "Hong Kong", years: "2003–2016" },
                { city: "Kuala Lumpur", years: "2016–2020" },
                { city: "Hong Kong", years: "2020–2022" },
                { city: "Melbourne", years: "2022–Present" },
              ].map((stop, i) => (
                <div
                  key={i}
                  className="flex items-center"
                >
                  <div style={{ textAlign: "center", padding: "0 4px" }}>
                    <span
                      style={{
                        display: "block",
                        fontSize: "12px",
                        fontWeight: 400,
                        color:
                          i === 3
                            ? "rgba(245,245,245,0.6)"
                            : "rgba(245,245,245,0.3)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {stop.city}
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 300,
                        color: "rgba(245,245,245,0.2)",
                      }}
                    >
                      {stop.years}
                    </span>
                  </div>
                  {i < 3 && (
                    <span
                      style={{
                        margin: "0 6px",
                        fontSize: "10px",
                        color: "rgba(245,245,245,0.15)",
                      }}
                    >
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
