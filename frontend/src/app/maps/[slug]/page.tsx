"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { Map as MaplibreMap } from "maplibre-gl";
import { useMap } from "@/lib/use-map";
import { useMapLibre } from "@/components/use-map-libre";
import { PinLayer } from "@/components/pin-layer";
import { Icon } from "@/components/icon";
import type { Pin } from "@/lib/types";

export default function MapPage() {
  const params = useParams<{ slug: string }>();
  const { data, loading } = useMap(params.slug);
  const containerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<MaplibreMap | null>(null);
  const [activeCat, setActiveCat] = useState("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [sheetHalf, setSheetHalf] = useState(false);

  useMapLibre({
    containerRef,
    center: data?.meta.center ?? [-73.985, 40.74],
    zoom: data?.meta.zoom ?? 11.6,
    onReady: (m) => setMap(m),
  });

  const pins: Pin[] = useMemo(() => {
    if (!data) return [];
    return activeCat === "all"
      ? data.pins
      : data.pins.filter((p) => p.category === activeCat);
  }, [data, activeCat]);

  useEffect(() => {
    if (!map || !selectedId || !data) return;
    const pin = data.pins.find((p) => p.id === selectedId);
    if (!pin) return;
    map.flyTo({ center: [pin.lng, pin.lat], zoom: 13.5, duration: 900, essential: true });
  }, [selectedId, map, data]);

  if (loading) {
    return (
      <main style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg)" }}>
        <div className="skeleton" style={{ width: 200, height: 24 }} />
      </main>
    );
  }

  if (!data) {
    return (
      <main style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "var(--color-bg)", padding: 24, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 24 }}>Map not found</div>
        <p style={{ color: "var(--color-muted)", maxWidth: 320 }}>We couldn&apos;t find a map at that link.</p>
        <Link href="/maps" style={{ marginTop: 8, padding: "10px 18px", borderRadius: 9999, background: "var(--color-accent)", color: "#fff", textDecoration: "none", fontWeight: 600 }}>Browse maps</Link>
      </main>
    );
  }

  const selected = data.pins.find((p) => p.id === selectedId) || null;

  return (
    <main style={{ position: "fixed", inset: 0, background: "var(--color-bg)", overflow: "hidden" }}>
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }} />
      <PinLayer map={map} pins={pins} selectedId={selectedId} onSelect={(p) => setSelectedId(p.id)} />

      {/* Header card */}
      <div style={{ position: "absolute", top: 16, left: 16, right: 16, zIndex: 10 }}>
        <div style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderRadius: 14,
          padding: "12px 14px",
          boxShadow: "var(--shadow-md)",
          border: "1px solid rgba(232,224,214,0.6)",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: data.meta.heroGradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, color: "#fff",
          }}>{data.meta.heroEmoji}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 17, lineHeight: 1.1 }}>
              {data.meta.title}
            </div>
            <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 2, display: "flex", gap: 8, alignItems: "center" }}>
              <span>by {data.meta.creator.name}</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--color-muted)" }} />
              <span>{data.meta.drops} drops</span>
            </div>
          </div>
          <button style={{ width: 36, height: 36, borderRadius: 10, background: "var(--color-accent-light)", color: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="bookmark" size={18} />
          </button>
        </div>

        <div className="no-scrollbar" style={{ marginTop: 10, display: "flex", gap: 8, overflowX: "auto" }}>
          {data.categories.map((c) => {
            const active = activeCat === c.id;
            return (
              <button key={c.id} onClick={() => { setActiveCat(c.id); setSelectedId(null); }} style={{
                flexShrink: 0, height: 36, padding: "0 14px",
                borderRadius: 9999,
                background: active ? "var(--color-accent)" : "rgba(255,255,255,0.92)",
                color: active ? "#fff" : "var(--color-text)",
                border: active ? "1px solid var(--color-accent)" : "1px solid rgba(232,224,214,0.7)",
                fontSize: 13.5, fontWeight: 500,
                display: "flex", alignItems: "center", gap: 6,
                boxShadow: active ? "0 2px 8px rgba(212,97,59,0.3)" : "0 1px 3px rgba(44,36,24,0.06)",
                backdropFilter: active ? undefined : "blur(12px)",
                WebkitBackdropFilter: active ? undefined : "blur(12px)",
              }}>
                <span style={{ fontSize: 13 }}>{c.emoji}</span>
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* FAB */}
      <Link href={`/maps/${data.meta.slug}/edit`} style={{
        position: "absolute", right: 18, bottom: 220, zIndex: 11,
        width: 56, height: 56, borderRadius: "50%",
        background: "var(--color-accent)", color: "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 6px 20px rgba(212,97,59,0.4), 0 2px 6px rgba(0,0,0,0.1)",
        textDecoration: "none",
      }}>
        <Icon name="plus" size={26} color="#fff" strokeWidth={2.2} />
      </Link>

      {selected ? (
        <SelectionCard pin={selected} slug={data.meta.slug} onClose={() => setSelectedId(null)} />
      ) : (
        <BottomSheet pins={pins} half={sheetHalf} setHalf={setSheetHalf} saves={data.meta.saves} onSelect={(p) => setSelectedId(p.id)} />
      )}
    </main>
  );
}

function SelectionCard({ pin, slug, onClose }: { pin: Pin; slug: string; onClose: () => void }) {
  return (
    <div style={{
      position: "absolute", left: 14, right: 14, bottom: 24, zIndex: 12,
      background: "var(--color-surface)",
      borderRadius: 16, padding: 14,
      boxShadow: "var(--shadow-xl)",
      border: "1px solid var(--color-border)",
      animation: "fade-up 300ms var(--ease-spring)",
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--color-accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{pin.emoji}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 18, lineHeight: 1.15 }}>{pin.name}</div>
          <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 2, display: "flex", gap: 6 }}>
            <span>{pin.neighborhood}</span>
            <span>·</span>
            <span>{"$".repeat(pin.priceLevel)}</span>
            <span>·</span>
            <span>{pin.hours}</span>
          </div>
          <div style={{ fontSize: 13.5, marginTop: 8, fontStyle: "italic", lineHeight: 1.4 }}>"{pin.note}"</div>
        </div>
        <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, color: "var(--color-muted)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Icon name="x" size={16} />
        </button>
      </div>
      <Link href={`/maps/${slug}/pins/${pin.id}`} style={{
        marginTop: 12, display: "flex", alignItems: "center", justifyContent: "center",
        height: 44, borderRadius: 10,
        background: "var(--color-accent)", color: "#fff",
        fontWeight: 600, fontSize: 14, textDecoration: "none",
      }}>See the spot</Link>
    </div>
  );
}

function BottomSheet({ pins, half, setHalf, saves, onSelect }: { pins: Pin[]; half: boolean; setHalf: (v: boolean) => void; saves: number; onSelect: (p: Pin) => void }) {
  return (
    <div style={{
      position: "absolute", left: 0, right: 0, bottom: 0,
      height: half ? "62%" : 200,
      background: "var(--color-surface)",
      borderRadius: "20px 20px 0 0",
      boxShadow: "0 -8px 32px rgba(44,36,24,0.18)",
      border: "1px solid var(--color-border)", borderBottom: "none",
      transition: "height 350ms var(--ease-spring)",
      zIndex: 8, display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <button onClick={() => setHalf(!half)} style={{ padding: "10px 0 6px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: 36, height: 4, borderRadius: 9999, background: "var(--color-border)" }} />
      </button>
      <div style={{ padding: "4px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 20 }}>{pins.length} drop{pins.length === 1 ? "" : "s"}</div>
          <div style={{ fontSize: 12, color: "var(--color-muted)", marginTop: 2 }}>Tap a card to fly there.</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "var(--color-muted)" }}>
          <Icon name="bookmark-fill" size={13} color="var(--color-accent)" />
          <span style={{ fontFamily: "var(--font-data)", fontVariantNumeric: "tabular-nums" }}>{saves.toLocaleString()}</span>
        </div>
      </div>
      <div className="no-scrollbar" style={{ flex: 1, overflowY: "auto", padding: "0 16px 100px" }}>
        {pins.map((p, i) => (
          <button key={p.id} onClick={() => onSelect(p)} style={{
            width: "100%", textAlign: "left", display: "flex", gap: 12, alignItems: "center",
            padding: "12px 8px",
            borderBottom: i === pins.length - 1 ? "none" : "1px solid var(--color-border)",
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--color-accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 600, color: "var(--color-accent)", flexShrink: 0 }}>{i + 1}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, fontSize: 15, display: "flex", alignItems: "center", gap: 6 }}>
                <span>{p.emoji}</span>
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
              </div>
              <div style={{ fontSize: 12.5, color: "var(--color-muted)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {p.neighborhood} · {p.note}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
