export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "var(--font-display)",
        color: "var(--color-text)",
      }}
    >
      <h1 style={{ fontSize: "40px", fontWeight: 600 }}>MapDrop</h1>
      <p
        style={{
          fontSize: "16px",
          color: "var(--color-muted)",
          fontFamily: "var(--font-body)",
          marginTop: "var(--space-sm)",
        }}
      >
        Your taste, on the map.
      </p>
    </main>
  );
}
