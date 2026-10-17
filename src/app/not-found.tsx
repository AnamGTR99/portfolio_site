import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        paddingTop: "160px",
        paddingBottom: "160px",
        textAlign: "center",
        color: "rgba(230,248,255,0.5)",
      }}
    >
      <p className="mono-label" style={{ fontSize: "12px" }}>
        ERR_404: FILE NOT FOUND
      </p>
      <Link
        href="/"
        className="mono-label"
        style={{ color: "#00f0ff", marginTop: "16px", display: "inline-block" }}
      >
        ◂ RETURN TO /HOME
      </Link>
    </div>
  );
}
