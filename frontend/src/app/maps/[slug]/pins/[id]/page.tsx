import Link from "next/link";
import { DEMO_MAP } from "@/lib/demo-data";
import { Icon } from "@/components/icon";
import { notFound } from "next/navigation";

export default async function PinDetailPage({
  params,
}: {
  params: Promise<{ slug: string; id: string }>;
}) {
  const { slug, id } = await params;
  const pinId = Number(id);
  const pin = DEMO_MAP.pins.find((p) => p.id === pinId);
  if (!pin) notFound();

  const indexInMap = DEMO_MAP.pins.findIndex((p) => p.id === pinId) + 1;
  const category = DEMO_MAP.categories.find((c) => c.id === pin.category);

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
      <div style={{
        height: 320, position: "relative", flexShrink: 0,
        background: "linear-gradient(135deg, #D4613B 0%, #C4892B 60%, #8C5E3B 100%)",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.07) 0 12px, rgba(255,255,255,0) 12px 24px)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 100, textShadow: "0 8px 24px rgba(0,0,0,0.3)" }}>{pin.emoji}</div>
        <Link href={`/maps/${slug}`} style={{
          position: "absolute", top: 16, left: 16,
          width: 40, height: 40, borderRadius: 10,
          background: "rgba(255,255,255,0.94)", display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(12px)", boxShadow: "var(--shadow-sm)", textDecoration: "none",
        }}>
          <Icon name="back" size={20} color="var(--color-text)" />
        </Link>
        <div style={{
          position: "absolute", bottom: -22, left: 24,
          width: 56, height: 56, borderRadius: 16,
          background: "var(--color-surface)",
          border: "3px solid var(--color-bg)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 22,
          color: "var(--color-accent)",
          boxShadow: "var(--shadow-md)",
        }}>{String(indexInMap).padStart(2, "0")}</div>
      </div>

      <div style={{ flex: 1, padding: "36px 24px 100px", maxWidth: 600, width: "100%", margin: "0 auto" }}>
        <div style={{ fontSize: 12, color: "var(--color-muted)", letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 500 }}>
          {category?.label} · drop {String(indexInMap).padStart(2, "0")} of {DEMO_MAP.pins.length}
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 36, lineHeight: 1.05, letterSpacing: -0.4, marginTop: 6 }}>{pin.name}</h2>
        <div style={{ marginTop: 6, display: "flex", gap: 8, alignItems: "center", color: "var(--color-muted)", fontSize: 14 }}>
          <Icon name="pin" size={14} />
          <span>{pin.neighborhood} · {pin.address}</span>
        </div>

        <div style={{
          marginTop: 24, padding: "18px 20px",
          background: "var(--color-accent-light)",
          borderLeft: "3px solid var(--color-accent)",
          borderRadius: "0 12px 12px 0",
        }}>
          <div style={{ fontSize: 11, color: "var(--color-accent)", fontWeight: 600, letterSpacing: 1.2, textTransform: "uppercase" }}>
            {DEMO_MAP.meta.creator.name.split(" ")[0]}'s note
          </div>
          <p style={{ marginTop: 6, fontFamily: "var(--font-display)", fontSize: 19, lineHeight: 1.4, fontStyle: "italic" }}>"{pin.note}"</p>
        </div>

        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[
            { label: "Hours", value: pin.hours },
            { label: "Price", value: "$".repeat(pin.priceLevel), data: true },
            { label: "Style", value: category?.label },
            { label: "Neighborhood", value: pin.neighborhood },
          ].map((m, i) => (
            <div key={i} style={{ padding: "12px 14px", background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 12 }}>
              <div style={{ fontSize: 11, color: "var(--color-muted)", letterSpacing: 1, textTransform: "uppercase", fontWeight: 500 }}>{m.label}</div>
              <div style={{ marginTop: 4, fontSize: 14, fontWeight: 500, fontFamily: m.data ? "var(--font-data)" : "var(--font-body)", fontVariantNumeric: "tabular-nums" }}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "sticky", bottom: 0, padding: "16px 20px 28px", background: "linear-gradient(to top, var(--color-bg) 60%, rgba(251,248,243,0))" }}>
        <button style={{ width: "100%", height: 52, borderRadius: 12, background: "var(--color-accent)", color: "#fff", fontWeight: 600, fontSize: 15, boxShadow: "0 4px 14px rgba(212,97,59,0.35)" }}>
          Get directions
        </button>
      </div>
    </main>
  );
}
