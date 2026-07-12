"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ventures, getVentureBySlug } from "@/data/ventures";
import CyberPanel from "@/components/ui/CyberPanel";
import DecoderText from "@/components/motion/DecoderText";
import GlitchText from "@/components/motion/GlitchText";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function VentureDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const venture = getVentureBySlug(slug);

  if (!venture) {
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
          href="/ventures"
          className="mono-label"
          style={{
            color: "#00f0ff",
            marginTop: "16px",
            display: "inline-block",
          }}
        >
          ◂ RETURN TO /VENTURES
        </Link>
      </div>
    );
  }

  // In-construction ventures: access-restricted terminal.
  if (venture.status === "construction") {
    return (
      <div
        className="flex flex-col items-center justify-center"
        style={{
          minHeight: "100vh",
          padding: "120px 24px 80px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <motion.span
          className="mono-label flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ gap: "8px", marginBottom: "26px", color: "#ffb800" }}
        >
          <span
            className="live-dot"
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#ffb800",
              boxShadow: "0 0 8px rgba(255,184,0,0.8)",
              display: "inline-block",
            }}
          />
          ACCESS RESTRICTED — IN CONSTRUCTION / {venture.year}
        </motion.span>

        <motion.h1
          className="display"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontSize: "clamp(48px, 11vw, 150px)",
            lineHeight: 0.95,
            color: "rgba(230,248,255,0.9)",
            textShadow:
              "0 0 20px rgba(255,184,0,0.35), 0 0 70px rgba(255,184,0,0.12)",
            marginBottom: "28px",
          }}
        >
          <GlitchText>{venture.title.toUpperCase()}</GlitchText>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ marginBottom: "44px" }}
        >
          <DecoderText
            className="mono-label"
            style={{ fontSize: "12px", color: "rgba(255,184,0,0.75)" }}
            delay={0.8}
          >
            {venture.description.toUpperCase()}
          </DecoderText>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Link
            href="/ventures"
            data-cursor="return"
            className="mono-label chamfer-sm"
            style={{
              display: "inline-block",
              padding: "11px 24px",
              border: "1px solid rgba(0,240,255,0.3)",
              color: "rgba(0,240,255,0.7)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00f0ff";
              e.currentTarget.style.color = "#04040a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(0,240,255,0.7)";
            }}
          >
            ◂ RETURN TO /VENTURES
          </Link>
        </motion.div>
      </div>
    );
  }

  const currentIndex = ventures.findIndex((v) => v.slug === slug);
  const prev = currentIndex > 0 ? ventures[currentIndex - 1] : null;
  const next =
    currentIndex < ventures.length - 1 ? ventures[currentIndex + 1] : null;

  const paragraphs = venture.fullContent
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

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
            href="/ventures"
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
            ◂ /VENTURES
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
              {venture.role.toUpperCase()}
            </span>
            <span
              className="mono-label"
              style={{
                fontSize: "9px",
                padding: "5px 10px",
                border: "1px solid rgba(173,255,47,0.35)",
                color: "#adff2f",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <span
                className="live-dot"
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "#adff2f",
                  boxShadow: "0 0 6px rgba(173,255,47,0.8)",
                  display: "inline-block",
                }}
              />
              {venture.status === "ongoing" ? "OPERATIONAL" : "COMPLETED"}
            </span>
            <span
              className="mono-label-dim"
              style={{ fontSize: "10px", marginLeft: "auto" }}
            >
              EST. {venture.year}
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
            {venture.title.toUpperCase()}
          </h1>

          <p
            style={{
              fontSize: "clamp(14px, 2vw, 17px)",
              fontWeight: 300,
              color: "rgba(230,248,255,0.5)",
              lineHeight: 1.7,
              marginBottom: "36px",
              maxWidth: "640px",
            }}
          >
            {venture.description}
          </p>
        </motion.div>

        {/* Hero media */}
        <motion.div
          className="chamfer"
          initial={{ opacity: 0, clipPath: "inset(10% 6% 10% 6%)", scale: 1.03 }}
          animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          style={{
            position: "relative",
            overflow: "hidden",
            marginBottom: "44px",
            border: "1px solid rgba(0,240,255,0.2)",
            aspectRatio: "16 / 9",
            background:
              "radial-gradient(circle at 50% 40%, rgba(0,240,255,0.06), transparent 70%)",
          }}
        >
          {venture.heroVideo ? (
            <video
              src={venture.heroVideo}
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.85,
              }}
            />
          ) : venture.heroImage || venture.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={venture.heroImage || venture.thumbnail}
              alt={venture.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.85,
              }}
            />
          ) : null}
        </motion.div>

        {/* Metrics */}
        {venture.metrics && venture.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginBottom: "44px" }}
          >
            <SectionLabel>KEY DETAILS</SectionLabel>
            <div
              className="grid grid-cols-2 sm:grid-cols-4"
              style={{ gap: "10px" }}
            >
              {venture.metrics.map((m) => (
                <CyberPanel key={m.label} corners={false}>
                  <div style={{ padding: "16px" }}>
                    <div
                      className="mono-label-dim"
                      style={{ fontSize: "8.5px", marginBottom: "7px" }}
                    >
                      {m.label.toUpperCase()}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: "#e6f8ff",
                      }}
                    >
                      {m.value}
                    </div>
                  </div>
                </CyberPanel>
              ))}
            </div>
          </motion.div>
        )}

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{ marginBottom: "44px" }}
        >
          <SectionLabel>THE STORY</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
            {paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "15px",
                  fontWeight: 300,
                  color: "rgba(230,248,255,0.6)",
                  lineHeight: 1.85,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Roster — IKB cards, echoing the Mana roster announcement graphics */}
        {venture.roster && venture.roster.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.37 }}
            style={{ marginBottom: "44px" }}
          >
            <SectionLabel>THE ROSTER</SectionLabel>
            <div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ gap: "14px" }}
            >
              {venture.roster.map((creator) => (
                <motion.a
                  key={creator.handle}
                  href={creator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="view profile"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="chamfer"
                  style={{
                    display: "block",
                    background: "#002FA7",
                    padding: "20px 20px 22px",
                    boxShadow: "0 0 32px rgba(0,47,167,0.35)",
                  }}
                >
                  {/* Top row: knot mark + roster index */}
                  <div
                    className="flex items-center justify-between"
                    style={{ marginBottom: "16px" }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/ventures/mana/mana-mark.png"
                      alt="Mana"
                      style={{ width: "30px", height: "30px" }}
                    />
                    <span
                      className="mono-label"
                      style={{
                        fontSize: "9px",
                        color: "#9DB4E8",
                        letterSpacing: "0.14em",
                      }}
                    >
                      TALENT · ROSTER · {creator.index}
                    </span>
                  </div>

                  {/* Photo window */}
                  <div
                    style={{
                      border: "2px solid #F5F2EA",
                      aspectRatio: "4 / 5",
                      overflow: "hidden",
                      marginBottom: "18px",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={creator.photo}
                      alt={creator.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Name block */}
                  <span
                    className="mono-label"
                    style={{
                      fontSize: "9px",
                      color: "#F5F2EA",
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      marginBottom: "10px",
                      letterSpacing: "0.14em",
                    }}
                  >
                    <span
                      className="live-dot"
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#9DB4E8",
                        display: "inline-block",
                      }}
                    />
                    NOW REPRESENTING
                  </span>
                  <h3
                    className="display"
                    style={{
                      fontSize: "clamp(24px, 3.4vw, 34px)",
                      color: "#F5F2EA",
                      lineHeight: 1,
                      marginBottom: "10px",
                    }}
                  >
                    {creator.name.toUpperCase()}
                  </h3>
                  <div
                    className="flex flex-wrap items-center justify-between"
                    style={{ gap: "8px" }}
                  >
                    <span
                      className="mono-label"
                      style={{
                        fontSize: "10px",
                        color: "#9DB4E8",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {creator.handle.toUpperCase()}
                    </span>
                    <span
                      className="mono-label"
                      style={{
                        fontSize: "8.5px",
                        color: "#9DB4E8",
                        letterSpacing: "0.14em",
                      }}
                    >
                      {creator.tags}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Brand collaborations */}
        {venture.brandLogos && venture.brandLogos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            style={{ marginBottom: "44px" }}
          >
            <SectionLabel>SOME COLLABORATIONS</SectionLabel>
            <div
              className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5"
              style={{ gap: "10px" }}
            >
              {venture.brandLogos.map((logo) => (
                <CyberPanel key={logo.name} corners={false}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "16px 12px 12px",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        height: "38px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={logo.src}
                        alt={logo.name}
                        style={{
                          maxWidth: `${78 * (logo.scale ?? 1)}px`,
                          maxHeight: `${38 * (logo.scale ?? 1)}px`,
                          objectFit: "contain",
                          filter: "grayscale(1) brightness(0) invert(1)",
                          opacity: 0.7,
                        }}
                      />
                    </div>
                    <span
                      className="mono-label-dim"
                      style={{ fontSize: "8px", textAlign: "center" }}
                    >
                      {logo.name}
                    </span>
                  </div>
                </CyberPanel>
              ))}
            </div>
          </motion.div>
        )}

        {/* Links */}
        {venture.links && venture.links.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{ marginBottom: "44px" }}
          >
            <div className="flex flex-wrap" style={{ gap: "10px" }}>
              {venture.links.map((link, i) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open link"
                  className="mono-label chamfer-sm"
                  style={{
                    display: "inline-block",
                    padding: "12px 24px",
                    fontSize: "10px",
                    background: i === 0 ? "#00f0ff" : "transparent",
                    color: i === 0 ? "#04040a" : "rgba(0,240,255,0.7)",
                    border:
                      i === 0
                        ? "1px solid #00f0ff"
                        : "1px solid rgba(0,240,255,0.25)",
                    boxShadow:
                      i === 0 ? "0 0 18px rgba(0,240,255,0.4)" : "none",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (i !== 0) {
                      e.currentTarget.style.borderColor =
                        "rgba(0,240,255,0.6)";
                      e.currentTarget.style.color = "#00f0ff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (i !== 0) {
                      e.currentTarget.style.borderColor =
                        "rgba(0,240,255,0.25)";
                      e.currentTarget.style.color = "rgba(0,240,255,0.7)";
                    }
                  }}
                >
                  {link.label.toUpperCase()} ↗
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Prev / Next */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center justify-between"
          style={{
            paddingTop: "28px",
            borderTop: "1px solid rgba(0,240,255,0.12)",
          }}
        >
          {prev ? (
            <Link
              href={`/ventures/${prev.slug}`}
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
              href={`/ventures/${next.slug}`}
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
      <span className="mono-label" style={{ color: "#ff2a6d", fontSize: "9px" }}>
        ▸
      </span>
      <span className="mono-label" style={{ fontSize: "10px" }}>
        {children}
      </span>
      <div className="hairline" style={{ flex: 1 }} />
    </div>
  );
}
