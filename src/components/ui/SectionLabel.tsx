/* ─── Section label: magenta caret + mono title + hairline ─── */
export default function SectionLabel({ children }: { children: string }) {
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
