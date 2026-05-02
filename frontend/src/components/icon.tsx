"use client";

// Tiny stroke-based icon set tuned to MapDrop's design system.
type IconName =
  | "search" | "layers" | "compass" | "plus" | "x" | "back"
  | "share" | "bookmark" | "bookmark-fill" | "clock" | "pin"
  | "edit" | "drag" | "globe" | "google" | "apple";

export function Icon({
  name,
  size = 20,
  color = "currentColor",
  strokeWidth = 1.75,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "search":
      return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case "layers":
      return <svg {...p}><path d="M12 3 2 8l10 5 10-5-10-5Z"/><path d="m2 16 10 5 10-5"/><path d="m2 12 10 5 10-5"/></svg>;
    case "compass":
      return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="m15 9-4 2-2 4 4-2 2-4Z"/></svg>;
    case "plus":
      return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case "x":
      return <svg {...p}><path d="M18 6 6 18M6 6l12 12"/></svg>;
    case "back":
      return <svg {...p}><path d="m15 18-6-6 6-6"/></svg>;
    case "share":
      return <svg {...p}><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/></svg>;
    case "bookmark":
      return <svg {...p}><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/></svg>;
    case "bookmark-fill":
      return <svg {...p} fill={color}><path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z"/></svg>;
    case "clock":
      return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "pin":
      return <svg {...p}><path d="M12 22s7-7.5 7-13A7 7 0 0 0 5 9c0 5.5 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case "edit":
      return <svg {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5Z"/></svg>;
    case "drag":
      return <svg {...p}><circle cx="9" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="18" r="1"/></svg>;
    case "globe":
      return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "google":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.07 5.07 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/>
          <path fill="#FBBC05" d="M5.84 14.1A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.44.34-2.1V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/>
        </svg>
      );
    case "apple":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M16.4 12.5c-.02-2.4 1.97-3.55 2.06-3.6-1.12-1.64-2.87-1.87-3.49-1.9-1.49-.15-2.9.87-3.66.87-.76 0-1.92-.85-3.16-.83-1.62.02-3.13.94-3.97 2.4-1.7 2.94-.43 7.3 1.21 9.69.81 1.17 1.77 2.48 3.02 2.43 1.21-.05 1.67-.78 3.13-.78 1.46 0 1.87.78 3.16.76 1.3-.02 2.13-1.19 2.92-2.36.93-1.36 1.31-2.68 1.33-2.75-.03-.01-2.55-.98-2.57-3.93ZM14 5.45c.66-.81 1.11-1.93.99-3.05-.95.04-2.12.64-2.81 1.44-.61.71-1.16 1.86-1.02 2.95 1.07.08 2.17-.54 2.84-1.34Z"/>
        </svg>
      );
    default:
      return null;
  }
}
