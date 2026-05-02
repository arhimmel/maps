"use client";

import { useEffect, useRef } from "react";
import maplibregl, { Map as MaplibreMap } from "maplibre-gl";

type Theme = "light" | "dark";

const lightStyle: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
    labels: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
  },
  layers: [
    { id: "bg", type: "background", paint: { "background-color": "#FBF8F3" } },
    { id: "base", type: "raster", source: "carto", paint: { "raster-opacity": 0.85, "raster-saturation": -0.3 } },
    { id: "labels", type: "raster", source: "labels", paint: { "raster-opacity": 0.7 } },
  ],
};

const darkStyle: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    carto: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    },
  },
  layers: [
    { id: "bg", type: "background", paint: { "background-color": "#0F0D0A" } },
    { id: "base", type: "raster", source: "carto", paint: { "raster-opacity": 0.7 } },
  ],
};

export function useMapLibre(opts: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  center: [number, number];
  zoom: number;
  theme?: Theme;
  onReady?: (map: MaplibreMap) => void;
}) {
  const { containerRef, center, zoom, theme = "light", onReady } = opts;
  const mapRef = useRef<MaplibreMap | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: theme === "dark" ? darkStyle : lightStyle,
      center,
      zoom,
      attributionControl: false,
      dragRotate: false,
      pitchWithRotate: false,
    });
    map.on("load", () => onReady?.(map));
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  return mapRef;
}
