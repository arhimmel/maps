# Design System — MapDrop

## Product Context
- **What this is:** A creator-first social map platform where foodies and niche enthusiasts create beautiful categorized maps and share them via social media
- **Who it's for:** Food bloggers, travel enthusiasts, local experts — creators who curate place-based content for their audience
- **Space/industry:** Creator economy × maps — positioned as the beautiful alternative to Google My Maps
- **Project type:** Mobile-first PWA (web app)

## Aesthetic Direction
- **Direction:** Organic Editorial
- **Decoration level:** Intentional — subtle grain texture on surfaces, soft shadows on cards and sheets
- **Mood:** A food magazine's editorial quality applied to a digital map tool. Warm, curated, taste-driven. The map is the hero; the UI chrome recedes into warm, appetizing tones. Premium but approachable — worth paying for, but not stuffy.

## Typography
- **Display/Hero:** Fraunces (variable serif) — warm, characterful, editorial. Says "curated taste" not "tech startup." The biggest brand signal.
- **Body:** DM Sans — clean geometric sans with warmth. Readable at small sizes on mobile. Pairs with Fraunces without competing.
- **UI/Labels:** DM Sans (same as body, weight 500)
- **Data/Tables:** Geist (tabular-nums) — clean for stats, counters, prices
- **Code:** Geist Mono
- **Loading:** Google Fonts CDN — `Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400` and `DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400`
- **Scale:**
  - 56px — hero display (Fraunces 600)
  - 40px — page title (Fraunces 600)
  - 32px — section heading (Fraunces 500)
  - 24px — card heading (Fraunces 500)
  - 20px — large body / location name (DM Sans 500)
  - 16px — body text (DM Sans 400)
  - 14px — secondary text, labels (DM Sans 400/500)
  - 12px — caption, metadata (DM Sans 400)

## Color
- **Approach:** Restrained — the map and emoji pins ARE the color. UI chrome is warm and neutral.
- **Background:** `#FBF8F3` (warm cream) — not white, feels like parchment
- **Surface:** `#FFFFFF` (cards, sheets, modals) — pure white lifts off the cream
- **Primary text:** `#2C2418` (warm near-black) — softer than pure black
- **Muted text:** `#8C7E6E` (warm gray) — captions, metadata, secondary content
- **Accent:** `#D4613B` (terracotta/burnt orange) — appetizing, warm, distinctive brand color
- **Accent hover:** `#B84F2E`
- **Accent light:** `#FDF0EB` — subtle accent background for hover states, selected tabs
- **Border:** `#E8E0D6` — warm neutral for dividers and input borders
- **Semantic:**
  - Success: `#3B8C5A` / bg: `#E8F5ED`
  - Warning: `#C4892B` / bg: `#FFF3E0`
  - Error: `#C44B3B` / bg: `#FDECEB`
  - Info: `#3B7EC4` / bg: `#E8F0FA`
- **Dark mode:**
  - Background: `#0F0D0A`
  - Surface: `#1A1612`
  - Primary text: `#F0EBE3`
  - Muted text: `#8C7E6E` (unchanged)
  - Accent: `#E07850` (slightly lighter for dark backgrounds)
  - Accent hover: `#D4613B`
  - Accent light: `#2A1A12`
  - Border: `#2E2820`
  - Semantic backgrounds darken proportionally

## Spacing
- **Base unit:** 4px
- **Density:** Comfortable — touch targets need breathing room on mobile
- **Scale:**
  - 2xs: 2px
  - xs: 4px
  - sm: 8px
  - md: 16px
  - lg: 24px
  - xl: 32px
  - 2xl: 48px
  - 3xl: 64px

## Layout
- **Approach:** Hybrid — map views are full-bleed with floating overlays; profile/dashboard use disciplined grid
- **Grid:** 1 column mobile, 2 columns tablet (768px+), 3 columns desktop (1024px+) for card grids
- **Max content width:** 1080px
- **Map viewport:** 70%+ of screen on map views; map is always the hero
- **Mobile patterns:** Bottom sheets for location details, floating pill tabs for category filtering, FAB for primary actions
- **Border radius:**
  - sm: 4px (inputs, small elements)
  - md: 8px (buttons, cards)
  - lg: 12px (sheets, modals, large cards)
  - full: 9999px (pills, avatars, tags)

## Motion
- **Approach:** Intentional — the map interaction itself provides visual richness; UI motion supports, not competes
- **Easing:**
  - Enter: ease-out (elements arriving)
  - Exit: ease-in (elements leaving)
  - Move: ease-in-out (repositioning)
  - Spring: cubic-bezier(0.34, 1.56, 0.64, 1) (bottom sheets, playful elements)
- **Duration:**
  - Micro: 50-100ms (button feedback, hover)
  - Short: 150-250ms (tab switches, card transitions)
  - Medium: 250-400ms (sheet slide, panel open)
  - Long: 400-700ms (fly-to animation, page transitions)
- **Map-specific:** MapLibre `flyTo()` with duration 1500ms, essential easing. Pin fade-in on map load (staggered 50ms).

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-23 | Initial design system created | Created by /design-consultation. Organic Editorial direction chosen: food magazine warmth meets modern digital tool. |
| 2026-03-23 | Fraunces as display font | Editorial serif positions MapDrop as a lifestyle product, not tech tool. Deliberate departure from sans-serif category norm. |
| 2026-03-23 | Warm cream background (#FBF8F3) | Deliberate departure from stark white. Feels editorial and appetizing. Map and emoji pins provide the color. |
| 2026-03-23 | Terracotta accent (#D4613B) | Warm, food-adjacent, distinctive. No other map tool uses this color. Instant brand recognition. |
