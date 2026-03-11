"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LiquidGlassPill from "@/components/glass/LiquidGlassPill";

const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/ventures", label: "Ventures" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
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
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div
          className="mx-auto"
          style={{ maxWidth: "700px", padding: "16px 20px" }}
        >
          <LiquidGlassPill className="px-7 py-3">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="glass-text"
                style={{
                  fontSize: "17px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                Anam
              </Link>

              {/* Desktop links */}
              <div
                className="hidden items-center sm:flex"
                style={{ gap: "8px" }}
              >
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="transition-colors duration-200"
                      style={{
                        fontSize: "13px",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive
                          ? "#f5f5f5"
                          : "rgba(245,245,245,0.55)",
                        padding: "6px 16px",
                        borderRadius: "9999px",
                        background: isActive
                          ? "rgba(255,255,255,0.1)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(255,255,255,0.15)"
                          : "1px solid transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              {/* Mobile hamburger */}
              <button
                className="flex flex-col justify-center sm:hidden"
                style={{ gap: "5px", width: "24px", padding: "4px 0" }}
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <span
                  style={{
                    width: "24px",
                    height: "1.5px",
                    background: "#f5f5f5",
                    borderRadius: "1px",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    width: "16px",
                    height: "1.5px",
                    background: "rgba(245,245,245,0.6)",
                    borderRadius: "1px",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    width: "20px",
                    height: "1.5px",
                    background: "rgba(245,245,245,0.8)",
                    borderRadius: "1px",
                    display: "block",
                  }}
                />
              </button>
            </div>
          </LiquidGlassPill>
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
            transition={{ duration: 0.25 }}
            style={{
              background: "rgba(10, 10, 10, 0.85)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
            }}
          >
            <div
              className="flex items-center justify-between"
              style={{ padding: "16px 24px" }}
            >
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="glass-text"
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}
              >
                Anam
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.06)",
                }}
                aria-label="Close menu"
              >
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 300,
                    color: "rgba(245,245,245,0.6)",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </span>
              </button>
            </div>

            <div
              style={{
                height: "1px",
                background: "rgba(255,255,255,0.06)",
                margin: "0 24px",
              }}
            />

            <div
              className="flex flex-col"
              style={{ padding: "24px 24px", gap: "4px" }}
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center"
                      style={{
                        padding: "14px 20px",
                        borderRadius: "12px",
                        minHeight: "44px",
                        fontSize: "20px",
                        fontWeight: isActive ? 600 : 400,
                        color: isActive
                          ? "#f5f5f5"
                          : "rgba(245,245,245,0.55)",
                        background: isActive
                          ? "rgba(255,255,255,0.08)"
                          : "transparent",
                        border: isActive
                          ? "1px solid rgba(255,255,255,0.10)"
                          : "1px solid transparent",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
