"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useMap } from "@/lib/use-map";
import { useMapLibre } from "@/components/use-map-libre";
import { Icon } from "@/components/icon";
import { apiFetch } from "@/lib/api";

export default function EditPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const { data } = useMap(params.slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🍜");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("tonkotsu");
  const [saving, setSaving] = useState(false);

  useMapLibre({
    containerRef,
    center: [-73.985, 40.74],
    zoom: 12.5,
  });

  const valid = name.trim().length > 0;

  const onSave = async () => {
    if (!valid) return;
    setSaving(true);
    try {
      // TODO: enable when POST /maps/:slug/pins lands
      // await apiFetch(`/maps/${params.slug}/pins`, { method: "POST", body: JSON.stringify({ name, emoji, note, category }) });
      void apiFetch;
      setTimeout(() => router.push(`/maps/${params.slug}`), 400);
    } catch {
      setSaving(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", background: "var(--color-bg)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "20px 16px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href={`/maps/${params.slug}`} style={{ color: "var(--color-muted)", display: "flex", padding: "8px 4px" }}>
          <Icon name="x" size={20} />
        </Link>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 17 }}>New drop</div>
        <button onClick={onSave} disabled={!valid || saving} style={{
          padding: "8px 14px", borderRadius: 9999,
          background: valid ? "var(--color-accent)" : "var(--color-border)",
          color: valid ? "#fff" : "var(--color-muted)",
          fontWeight: 600, fontSize: 13,
        }}>{saving ? "Saving…" : "Save"}</button>
      </div>

      <div style={{ position: "relative", height: 220, borderTop: "1px solid var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
        <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -100%)", pointerEvents: "none" }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--color-surface)", border: "3px solid var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, boxShadow: "0 6px 18px rgba(212,97,59,0.45)" }}>{emoji}</div>
        </div>
      </div>

      <div style={{ flex: 1, padding: "20px 20px 100px", maxWidth: 600, width: "100%", margin: "0 auto" }}>
        <label style={lbl}>Drop name</label>
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <button onClick={() => {
            const list = ["🍜", "🥢", "🍲", "🌶️", "🌿", "🍣", "🍙", "🥟"];
            setEmoji(list[(list.indexOf(emoji) + 1) % list.length]);
          }} style={{ width: 52, height: 52, borderRadius: 12, background: "var(--color-surface)", border: "1px solid var(--color-border)", fontSize: 26, flexShrink: 0 }}>{emoji}</button>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ippudo East Village" style={inputStyle} />
        </div>

        <label style={{ ...lbl, marginTop: 20 }}>Category</label>
        <div className="no-scrollbar" style={{ display: "flex", gap: 8, marginTop: 8, overflowX: "auto" }}>
          {data?.categories.filter((c) => c.id !== "all").map((c) => {
            const active = category === c.id;
            return (
              <button key={c.id} onClick={() => setCategory(c.id)} style={{
                flexShrink: 0, height: 36, padding: "0 14px",
                borderRadius: 9999,
                background: active ? "var(--color-accent)" : "var(--color-surface)",
                color: active ? "#fff" : "var(--color-text)",
                border: active ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
                fontSize: 13.5, fontWeight: 500,
                display: "flex", alignItems: "center", gap: 6,
              }}><span>{c.emoji}</span> {c.label}</button>
            );
          })}
        </div>

        <label style={{ ...lbl, marginTop: 20 }}>Your take <span style={{ color: "var(--color-muted)", fontWeight: 400 }}>· keep it short</span></label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="What should people order?" rows={3} style={{ ...inputStyle, height: "auto", padding: 14, resize: "none", lineHeight: 1.45 }} />
      </div>
    </main>
  );
}

const lbl: React.CSSProperties = { display: "block", fontSize: 13, fontWeight: 500, color: "var(--color-text)" };
const inputStyle: React.CSSProperties = {
  flex: 1, height: 52, padding: "0 14px",
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 12, fontSize: 15,
  color: "var(--color-text)", outline: "none",
  fontFamily: "var(--font-body)",
};
