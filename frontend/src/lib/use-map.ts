"use client";

// Data hooks. Currently return DEMO_MAP synchronously. When the Rust API exposes
// GET /maps/:slug, swap the body for `await apiFetch<MapDetail>(\`/maps/\${slug}\`)`.
import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import { DEMO_MAP } from "./demo-data";
import type { MapDetail } from "./types";

const USE_LIVE_API = false; // flip when /maps/:slug ships

export function useMap(slug: string) {
  const [data, setData] = useState<MapDetail | null>(USE_LIVE_API ? null : DEMO_MAP);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(USE_LIVE_API);

  useEffect(() => {
    if (!USE_LIVE_API) return;
    let cancelled = false;
    setLoading(true);
    apiFetch<MapDetail>(`/maps/${slug}`)
      .then((d) => { if (!cancelled) { setData(d); setLoading(false); } })
      .catch((e: Error) => { if (!cancelled) { setError(e); setLoading(false); } });
    return () => { cancelled = true; };
  }, [slug]);

  return { data, error, loading };
}
