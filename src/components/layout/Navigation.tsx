"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GlitchText from "@/components/motion/GlitchText";
import LocalTime from "@/components/motion/LocalTime";

const NAV_LINKS = [
  { href: "/projects", label: "PROJECTS", index: "01" },
  { href: "/ventures", label: "VENTURES", index: "02" },
  { href: "/about", label: "ABOUT", index: "03" },
  { href: "/contact", label: "CONTACT", index: "04" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,4,10,0.92) 0%, rgba(4,4,10,0.75) 80%, transparent 100%)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(0,240,255,0.14)",
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "14px 24px",
          }}
        >
          {/* Logo */}
          <Link href="/" data-cursor="home" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span
              aria-hidden
              style={{
                width: "9px",
                height: "9px",
                background: "#00f0ff",
                boxShadow: "0 0 10px rgba(0,240,255,0.8)",
                clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)",
              }}
            />
            <span
              className="display neon-text"
              style={{ fontSize: "17px", letterSpacing: "0.12em" }}
            >
              <GlitchText>ANAM</GlitchText>
            </span>
            <span className="mono-label-dim" style={{ fontSize: "9px" }}>
              v3.0
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center sm:flex" style={{ gap: "6px" }}>
            {NAV_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor={link.label.toLowerCase()}
                  className="chamfer-sm"
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "11px",
                    letterSpacing: "0.14em",
                    padding: "8px 16px",
                    color: isActive ? "#04040a" : "rgba(0,240,255,0.65)",
                    background: isActive ? "#00f0ff" : "transparent",
                    border: isActive
                      ? "1px solid #00f0ff"
                      : "1px solid rgba(0,240,255,0.18)",
                    boxShadow: isActive
                      ? "0 0 18px rgba(0,240,255,0.45)"
                      : "none",
                    transition: "all 0.2s ease",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#00f0ff";
                      e.currentTarget.style.borderColor =
                        "rgba(0,240,255,0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "rgba(0,240,255,0.65)";
                      e.currentTarget.style.borderColor =
                        "rgba(0,240,255,0.18)";
                    }
                  }}
                >
                  <span style={{ opacity: 0.5, marginRight: "6px" }}>
                    {link.index}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* System readout — desktop */}
          <div
            className="hidden md:flex items-center"
            style={{ gap: "10px" }}
          >
            <span
              className="live-dot"
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "#adff2f",
                boxShadow: "0 0 8px rgba(173,255,47,0.7)",
              }}
            />
            <span className="mono-label-dim" style={{ fontSize: "9px" }}>
              <LocalTime />
            </span>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col justify-center sm:hidden"
            style={{ gap: "5px", width: "26px", padding: "4px 0" }}
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span
              style={{
                width: "26px",
                height: "2px",
                background: "#00f0ff",
                boxShadow: "0 0 6px rgba(0,240,255,0.6)",
                display: "block",
              }}
            />
            <span
              style={{
                width: "16px",
                height: "2px",
                background: "rgba(0,240,255,0.6)",
                display: "block",
              }}
            />
            <span
              style={{
                width: "21px",
                height: "2px",
                background: "rgba(255,42,109,0.8)",
                display: "block",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "rgba(4,4,10,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{
                padding: "16px 24px",
                borderBottom: "1px solid rgba(0,240,255,0.14)",
              }}
            >
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="display neon-text"
                style={{ fontSize: "16px", letterSpacing: "0.12em" }}
              >
                ANAM
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center chamfer-sm"
                style={{
                  width: "38px",
                  height: "38px",
                  border: "1px solid rgba(255,42,109,0.4)",
                  background: "rgba(255,42,109,0.08)",
                }}
                aria-label="Close menu"
              >
                <span
                  style={{
                    fontSize: "16px",
                    color: "#ff2a6d",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </span>
              </button>
            </div>

            <div
              className="flex flex-col"
              style={{ padding: "32px 24px", gap: "8px" }}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center chamfer-sm"
                      style={{
                        padding: "16px 20px",
                        minHeight: "44px",
                        gap: "14px",
                        fontFamily: "var(--font-chakra), sans-serif",
                        fontSize: "22px",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        color: isActive ? "#04040a" : "#00f0ff",
                        background: isActive ? "#00f0ff" : "rgba(0,240,255,0.04)",
                        border: "1px solid rgba(0,240,255,0.25)",
                      }}
                    >
                      <span
                        className="mono-label"
                        style={{
                          fontSize: "10px",
                          color: isActive
                            ? "rgba(4,4,10,0.6)"
                            : "rgba(255,42,109,0.9)",
                        }}
                      >
                        {link.index}
                      </span>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            <div style={{ marginTop: "auto", padding: "24px" }}>
              <span className="mono-label-dim" style={{ fontSize: "9px" }}>
                MEL / HKG / CMB — <LocalTime />
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
