"use client";

// Data hooks. Currently return demo data synchronously. When the Rust API exposes
// GET /maps and GET /maps/:slug, swap the bodies for `apiFetch<...>(...)`.
import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import { DEMO_MAPS, findDemoMap } from "./demo-data";
import type { MapDetail, MapMeta } from "./types";

const USE_LIVE_API = false; // flip when /maps and /maps/:slug ship

export function useMap(slug: string) {
  const initial = USE_LIVE_API ? null : findDemoMap(slug) ?? null;
  const [data, setData] = useState<MapDetail | null>(initial);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(USE_LIVE_API);

  useEffect(() => {
    if (!USE_LIVE_API) {
      setData(findDemoMap(slug) ?? null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    apiFetch<MapDetail>(`/maps/${slug}`)
      .then((d) => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch((e: Error) => { if (!cancelled) { setError(e); setLoading(false); } });
    return () => { cancelled = true; };
  }, [slug]);

  return { data, error, loading };
}

export function useMaps() {
  const initial: MapMeta[] = USE_LIVE_API ? [] : DEMO_MAPS.map((m) => m.meta);
  const [data, setData] = useState<MapMeta[]>(initial);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(USE_LIVE_API);

  useEffect(() => {
    if (!USE_LIVE_API) return;
    let cancelled = false;
    setLoading(true);
    apiFetch<MapMeta[]>(`/maps`)
      .then((d) => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch((e: Error) => { if (!cancelled) { setError(e); setLoading(false); } });
    return () => { cancelled = true; };
  }, []);

  return { data, error, loading };
}
