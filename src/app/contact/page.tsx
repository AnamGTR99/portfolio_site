"use client";

import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { personal } from "@/data/personal";
import CyberPanel from "@/components/ui/CyberPanel";
import DecoderText from "@/components/motion/DecoderText";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "rgba(0,240,255,0.03)",
  border: "1px solid rgba(0,240,255,0.2)",
  color: "#e6f8ff",
  fontFamily: "var(--font-geist-mono), monospace",
  fontSize: "13px",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = "#00f0ff";
  e.currentTarget.style.boxShadow = "0 0 14px rgba(0,240,255,0.2)";
};
const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  e.currentTarget.style.borderColor = "rgba(0,240,255,0.2)";
  e.currentTarget.style.boxShadow = "none";
};

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xeervzrq");

  return (
    <div style={{ paddingTop: "110px", paddingBottom: "140px" }}>
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px" }}>
        {/* ═══ Header ═══ */}
        <div style={{ marginBottom: "14px" }}>
          <div
            className="flex items-center"
            style={{ gap: "14px", marginBottom: "12px" }}
          >
            <span className="mono-label" style={{ color: "#ff2a6d" }}>
              SYS.COMMS
            </span>
            <span className="mono-label-dim">{"//"}</span>
            <div className="hairline" style={{ flex: 1 }} />
            <span className="mono-label-dim">CHANNEL: OPEN</span>
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
            CONTACT
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
          If something here piqued your interest, you know what to do.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: "flex", flexDirection: "column", gap: "28px" }}
        >
          {/* ═══ Primary channel ═══ */}
          <a href={`mailto:${personal.email}`} data-cursor="transmit" style={{ display: "block" }}>
            <CyberPanel scan>
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                style={{ padding: "26px 28px", gap: "14px" }}
              >
                <div>
                  <span
                    className="mono-label"
                    style={{ display: "block", marginBottom: "10px" }}
                  >
                    ▸ PRIMARY CHANNEL — EMAIL
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "clamp(16px, 3vw, 24px)",
                      color: "#00f0ff",
                      textShadow: "0 0 14px rgba(0,240,255,0.4)",
                    }}
                  >
                    {personal.email}
                  </span>
                </div>
                <span
                  className="mono-label"
                  style={{
                    fontSize: "10px",
                    color: "#ff2a6d",
                    border: "1px solid rgba(255,42,109,0.4)",
                    padding: "8px 14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  TRANSMIT ↗
                </span>
              </div>
            </CyberPanel>
          </a>

          {/* ═══ Message form ═══ */}
          <CyberPanel>
            <div style={{ padding: "26px 28px" }}>
              <span
                className="mono-label"
                style={{ display: "block", marginBottom: "20px" }}
              >
                ▸ SEND TRANSMISSION
              </span>

              {state.succeeded ? (
                <div>
                  <p
                    className="mono-label"
                    style={{
                      fontSize: "12px",
                      color: "#adff2f",
                      textShadow: "0 0 10px rgba(173,255,47,0.5)",
                      marginBottom: "8px",
                    }}
                  >
                    ✓ TRANSMISSION RECEIVED
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "rgba(230,248,255,0.6)",
                    }}
                  >
                    I&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="mono-label-dim"
                      style={{
                        display: "block",
                        fontSize: "9px",
                        marginBottom: "7px",
                      }}
                    >
                      RETURN ADDRESS
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      style={inputStyle}
                      onFocus={focusIn}
                      onBlur={focusOut}
                      placeholder="your@email.com"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="mono-label-dim"
                      style={{
                        display: "block",
                        fontSize: "9px",
                        marginBottom: "7px",
                      }}
                    >
                      PAYLOAD
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      style={{ ...inputStyle, resize: "vertical" }}
                      onFocus={focusIn}
                      onBlur={focusOut}
                      placeholder="What's on your mind?"
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    data-cursor="send"
                    className="mono-label chamfer-sm"
                    style={{
                      alignSelf: "flex-start",
                      padding: "12px 32px",
                      fontSize: "10px",
                      background: state.submitting
                        ? "rgba(0,240,255,0.15)"
                        : "#00f0ff",
                      color: state.submitting
                        ? "rgba(230,248,255,0.4)"
                        : "#04040a",
                      border: "1px solid #00f0ff",
                      boxShadow: state.submitting
                        ? "none"
                        : "0 0 18px rgba(0,240,255,0.4)",
                      cursor: state.submitting ? "not-allowed" : "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {state.submitting ? "TRANSMITTING..." : "SEND ▸"}
                  </button>
                </form>
              )}
            </div>
          </CyberPanel>

          {/* ═══ Alt channels ═══ */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            style={{ gap: "12px" }}
          >
            {Object.entries(personal.socials).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor={name}
                style={{ display: "block" }}
              >
                <CyberPanel corners={false}>
                  <div style={{ padding: "18px 20px" }}>
                    <span
                      className="mono-label-dim"
                      style={{
                        display: "block",
                        fontSize: "8.5px",
                        marginBottom: "8px",
                      }}
                    >
                      {name.toUpperCase()}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-geist-mono), monospace",
                        fontSize: "12px",
                        color: "rgba(0,240,255,0.75)",
                      }}
                    >
                      {name === "github"
                        ? "AnamGTR99"
                        : name === "linkedin"
                          ? "Sheik Anam Milfer"
                          : name === "devpost"
                            ? "@AnamGTR99"
                            : "@sheivault"}{" "}
                      ↗
                    </span>
                  </div>
                </CyberPanel>
              </a>
            ))}
          </div>

          {/* ═══ Route history ═══ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              paddingTop: "28px",
              borderTop: "1px solid rgba(0,240,255,0.12)",
            }}
          >
            <span className="mono-label-dim" style={{ fontSize: "9px" }}>
              BASE: {personal.location.toUpperCase()}
            </span>

            <div
              className="flex flex-wrap items-center"
              style={{ marginTop: "16px" }}
            >
              {[
                { city: "HONG KONG", years: "2003–2016" },
                { city: "KUALA LUMPUR", years: "2016–2020" },
                { city: "HONG KONG", years: "2020–2022" },
                { city: "MELBOURNE", years: "2022–NOW" },
              ].map((stop, i) => (
                <div key={i} className="flex items-center">
                  <div style={{ textAlign: "center", padding: "0 4px" }}>
                    <span
                      className="mono-label"
                      style={{
                        display: "block",
                        fontSize: "9px",
                        color:
                          i === 3
                            ? "#00f0ff"
                            : "rgba(230,248,255,0.35)",
                        textShadow:
                          i === 3 ? "0 0 8px rgba(0,240,255,0.5)" : "none",
                      }}
                    >
                      {stop.city}
                    </span>
                    <span
                      className="mono-label-dim"
                      style={{ fontSize: "8px" }}
                    >
                      {stop.years}
                    </span>
                  </div>
                  {i < 3 && (
                    <span
                      style={{
                        margin: "0 8px",
                        fontSize: "9px",
                        color: "rgba(255,42,109,0.5)",
                      }}
                    >
                      ▸
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
