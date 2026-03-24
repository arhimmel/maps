# TODOS — MapDrop

## P1 — Fast-Follow After v1 Launch

### Payments / Stripe Connect Integration
- **What:** Add paid maps with Stripe Checkout for buyers and Stripe Connect Express for creator payouts.
- **Why:** Business model — creators monetize maps, platform takes a cut. Enables the flywheel: great maps → followers → revenue → more great maps.
- **Effort:** M (human: ~1-2 weeks) → with CC: S-M (~30-45 min)
- **Depends on:** v1 launch + validated sharing behavior
- **Context:** Deferred from v1 per UX-first reframing. Should be first thing built after v1 launches. Requires Stripe Connect onboarding (KYC flows), payout management, refund handling. Also need to resolve: fixed pricing vs subscription, revenue split percentage, free tier limits.

## P2 — Validated Upgrades

### Headless Browser Map Screenshots for Share-as-Image
- **What:** Upgrade share-as-image from static Satori template to real map screenshots via Puppeteer/Playwright.
- **Why:** Static cards validate sharing behavior; real map screenshots are the killer viral asset.
- **Effort:** M (human: ~2-3 days) → with CC: S (~20 min)
- **Depends on:** v1 launch + evidence creators actually share images
- **Context:** v1 ships with static template (title + emoji pins + QR code). Upgrade when sharing behavior is confirmed. Requires headless Chrome service, adds ~1-3s generation time.

## P3 — Phase 2+ Features

### Social Features (Follow, Feed, Discovery)
- **What:** Follow creators, discovery feed sorted by geography and taste, explore page.
- **Why:** Makes the platform sticky beyond shared links. Organic growth engine.
- **Effort:** L (human: ~3-4 weeks) → with CC: M-L (~1-2 hours)
- **Depends on:** Payments + proven creator base

### AI Taste Matching / Map Generation
- **What:** "You loved these 15 ramen spots in NYC, here are 10 you'd probably love in LA."
- **Why:** The long-term "whoa" differentiator. Maps become data that reveals taste.
- **Effort:** XL (human: ~2+ months) → with CC: L (~3-5 hours)
- **Depends on:** Significant user data + PostGIS geospatial analysis

### Collaborative Maps
- **What:** Multiple creators contribute to a single map.
- **Why:** Enables community-curated maps (e.g., "Best Coffee in Brooklyn" by 5 local creators).
- **Effort:** M → with CC: S-M
- **Depends on:** Social features

### Embeddable Map Widgets
- **What:** Embed MapDrop maps on external websites (food blogs, travel sites).
- **Why:** Distribution channel — drives organic traffic back to creators.
- **Effort:** M → with CC: S

### Photo Carousels per Pin
- **What:** Multiple photos per location with swipeable carousel.
- **Why:** Richer location content, more visually engaging.
- **Effort:** S → with CC: S

### Embedded Video per Location
- **What:** Short-form video (TikTok/Reels style) embedded per location pin.
- **Why:** Aligns with creator content formats. Maps become multimedia.
- **Effort:** M → with CC: S-M

### Dark Mode (v1.1)
- **What:** Implement dark mode using the dark palette already defined in DESIGN.md (bg: #0F0D0A, surface: #1A1612, accent: #E07850).
- **Why:** Users expect dark mode. The CSS variable foundation is built in v1 — this is just swapping values via media query or toggle.
- **Pros:** Low effort since CSS variables and dark palette are already specified. Immediate perceived quality boost.
- **Cons:** Need to verify all component states (hover, focus, error) in dark context. Map style must coordinate (dark map style for dark mode).
- **Effort:** S (human: ~1-2 days) → with CC: S (~15 min)
- **Depends on:** v1 launch (CSS variables must be in place first)
- **Context:** Deferred from v1 per design review. DESIGN.md already has the full dark palette. v1 ships light-only with CSS variables prepared for easy theme switching.

### SVG Emoji Pins — Twemoji/Noto (v1.1)
- **What:** Replace native text emoji map markers with SVG emoji (Twemoji or Noto Emoji) for cross-platform visual consistency.
- **Why:** Native emoji render differently across OS/browser — a pin that looks great on iOS may look different on Android/Windows. SVG emoji ensures every user sees the same pin.
- **Pros:** Pixel-perfect consistency across all platforms. Enables custom sizing and styling of emoji markers.
- **Cons:** Adds a font/SVG asset dependency (~200KB for common emoji subset). Need to map emoji codepoints to SVG files.
- **Effort:** S (human: ~1 day) → with CC: S (~15 min)
- **Depends on:** v1 launch (native emoji validates the concept first)
- **Context:** Deferred from v1 per design review. v1 ships with native text emoji (OS-rendered) which is sufficient to validate the emoji-as-pin concept. Upgrade to SVG when cross-platform inconsistency becomes user-reported friction.

### Private / Unlisted Maps
- **What:** Unlisted maps (v1.1: URL-accessible but hidden from profile). Private maps (later: creator-only).
- **Why:** Not all maps should be public. Creators may want draft maps.
- **Effort:** S → with CC: S
- **Depends on:** Nothing — can be added anytime
