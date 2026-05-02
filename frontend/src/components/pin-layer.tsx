"use client";

import { useEffect, useState } from "react";
import type { Map as MaplibreMap } from "maplibre-gl";
import type { Pin } from "@/lib/types";

type PinStyle = "emoji" | "numbered" | "dot";

export function PinLayer({
  map,
  pins,
  selectedId,
  pinStyle = "emoji",
  onSelect,
}: {
  map: MaplibreMap | null;
  pins: Pin[];
  selectedId: number | null;
  pinStyle?: PinStyle;
  onSelect: (pin: Pin) => void;
}) {
  const [, force] = useState(0);

  useEffect(() => {
    if (!map) return;
    const update = () => force((n) => n + 1);
    map.on("move", update);
    map.on("zoom", update);
    map.on("resize", update);
    update();
    return () => {
      map.off("move", update);
      map.off("zoom", update);
      map.off("resize", update);
    };
  }, [map]);

  if (!map) return null;

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {pins.map((pin, i) => {
        const pt = map.project([pin.lng, pin.lat]);
        const selected = selectedId === pin.id;
        const dim = selectedId !== null && selectedId !== pin.id;
        const accent = "var(--color-accent)";
        const size = pinStyle === "dot" ? 16 : 36;

        return (
          <div
            key={pin.id}
            style={{
              position: "absolute",
              left: pt.x,
              top: pt.y,
              pointerEvents: "auto",
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(pin);
              }}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                transform: "translate(-50%, -50%)",
                width: size,
                height: size,
                borderRadius: "50%",
                background: pinStyle === "dot" ? accent : "var(--color-surface)",
                border:
                  pinStyle === "dot"
                    ? "2px solid #fff"
                    : `2px solid ${selected ? accent : "rgba(212,97,59,0.35)"}`,
                boxShadow: selected
                  ? "0 6px 18px rgba(212,97,59,0.45), 0 2px 4px rgba(0,0,0,0.1)"
                  : "0 2px 6px rgba(44,36,24,0.18), 0 1px 2px rgba(44,36,24,0.10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: dim ? 0.32 : 1,
                transition:
                  "transform 200ms var(--ease-spring), box-shadow 200ms var(--ease-move), opacity 200ms",
                animation: "pin-bounce-in 350ms var(--ease-spring) both",
                cursor: "pointer",
                zIndex: selected ? 5 : 2,
              }}
            >
              {pinStyle === "numbered" && (
                <span
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: accent,
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 2 }}>
                {pinStyle === "numbered" ? (
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 16,
                      color: "#fff",
                    }}
                  >
                    {i + 1}
                  </span>
                ) : pinStyle === "dot" ? null : (
                  <span style={{ fontSize: 18, lineHeight: 1 }}>{pin.emoji}</span>
                )}
              </span>
              {selected && (
                <span
                  style={{
                    position: "absolute",
                    inset: -4,
                    borderRadius: "50%",
                    border: `2px solid ${accent}`,
                    animation: "pin-pulse 1.4s ease-out infinite",
                  }}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
