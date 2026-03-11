export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 pt-16">
      <h1
        className="glass-text-hero"
        style={{
          fontSize: "96px",
          fontWeight: 800,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        Anam
      </h1>
      <p
        style={{
          fontSize: "19px",
          fontWeight: 300,
          color: "rgba(245,245,245,0.6)",
          letterSpacing: "0.01em",
        }}
      >
        Software, hospitality, and the spaces between.
      </p>
    </main>
  );
}
