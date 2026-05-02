"use client";

import Link from "next/link";
import { useMaps } from "@/lib/use-map";
import { Icon } from "@/components/icon";

export default function MapsIndexPage() {
  const { data: maps, loading } = useMaps();

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      <header style={{ padding: "32px 24px 20px", maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: 1.6,
            textTransform: "uppercase",
            color: "var(--color-accent)",
          }}
        >
          MapDrop
        </div>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 600,
            fontSize: 40,
            lineHeight: 1.05,
            letterSpacing: -0.4,
            marginTop: 4,
          }}
        >
          Pick a map
        </h1>
        <p style={{ color: "var(--color-muted)", marginTop: 6, fontSize: 16 }}>
          Curated by people who actually know the spots.
        </p>
      </header>

      <section
        style={{
          padding: "8px 16px 80px",
          maxWidth: 1080,
          margin: "0 auto",
          display: "grid",
          gap: 16,
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        }}
      >
        {loading && maps.length === 0
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton" style={{ height: 220, borderRadius: 16 }} />
            ))
          : maps.map((m) => (
              <Link
                key={m.slug}
                href={`/maps/${m.slug}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 16,
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "inherit",
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 200ms var(--ease-spring), box-shadow 200ms var(--ease-move)",
                }}
              >
                <div
                  style={{
                    height: 140,
                    background: m.heroGradient,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 12px, rgba(255,255,255,0) 12px 24px)",
                    }}
                  />
                  <span style={{ fontSize: 56, textShadow: "0 6px 18px rgba(0,0,0,0.25)" }}>
                    {m.heroEmoji}
                  </span>
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 20,
                      lineHeight: 1.15,
                      letterSpacing: -0.2,
                    }}
                  >
                    {m.title}
                  </div>
                  <div style={{ fontSize: 13.5, color: "var(--color-muted)", lineHeight: 1.4 }}>
                    {m.subtitle}
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: 10,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: 12,
                      color: "var(--color-muted)",
                    }}
                  >
                    <span>by {m.creator.name}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Icon name="bookmark-fill" size={12} color="var(--color-accent)" />
                        <span style={{ fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums" }}>
                          {m.saves.toLocaleString()}
                        </span>
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <Icon name="pin" size={12} />
                        <span style={{ fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums" }}>
                          {m.drops}
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
      </section>
    </main>
  );
}
