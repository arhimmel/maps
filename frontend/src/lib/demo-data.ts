// Static demo data — stand-in until the Rust API exposes /maps/:slug.
// Once the backend is ready, swap useMap()/useMaps() to apiFetch() calls.
import type { MapDetail } from "./types";

export const DEMO_MAP: MapDetail = {
  meta: {
    slug: "best-ramen-in-nyc",
    title: "Best Ramen in NYC",
    subtitle: "13 spots to slurp through, ranked by feel.",
    creator: { name: "Aiko Tanaka", handle: "@aiko.eats", avatar: "🍜" },
    saves: 2148,
    drops: 13,
  },
  categories: [
    { id: "all", label: "All", emoji: "✦" },
    { id: "tonkotsu", label: "Tonkotsu", emoji: "🍜" },
    { id: "shoyu", label: "Shoyu", emoji: "🥢" },
    { id: "miso", label: "Miso", emoji: "🍲" },
    { id: "spicy", label: "Spicy", emoji: "🌶️" },
    { id: "veggie", label: "Veggie", emoji: "🌿" },
  ],
  pins: [
    { id: 1, name: "Ippudo NY", emoji: "🍜", category: "tonkotsu", note: "Akamaru Modern is the move. Get there before 6.", neighborhood: "East Village", address: "65 4th Ave", lng: -73.9893, lat: 40.7314, hours: "11am – 10pm", priceLevel: 2 },
    { id: 2, name: "Totto Ramen", emoji: "🍜", category: "tonkotsu", note: "Chicken paitan with a soft egg — comfort in a bowl.", neighborhood: "Hell's Kitchen", address: "366 W 52nd St", lng: -73.9879, lat: 40.7639, hours: "12pm – 11pm", priceLevel: 1 },
    { id: 3, name: "Ivan Ramen", emoji: "🥢", category: "shoyu", note: "Triple pork triple garlic. The dashi is doing things.", neighborhood: "Lower East Side", address: "25 Clinton St", lng: -73.9847, lat: 40.7211, hours: "5pm – 11pm", priceLevel: 3 },
    { id: 4, name: "Momofuku Noodle Bar", emoji: "🥢", category: "shoyu", note: "The OG. Pork buns are non-negotiable.", neighborhood: "East Village", address: "171 1st Ave", lng: -73.9849, lat: 40.7290, hours: "12pm – 10pm", priceLevel: 3 },
    { id: 5, name: "Mensho Tokyo", emoji: "🍲", category: "miso", note: "Lamb miso. Worth the line. Don't argue.", neighborhood: "Midtown", address: "693 6th Ave", lng: -73.9900, lat: 40.7440, hours: "11:30am – 10pm", priceLevel: 3 },
    { id: 6, name: "Ramen Ishida", emoji: "🍲", category: "miso", note: "Sapporo-style. The corn butter add-on is essential.", neighborhood: "Greenpoint", address: "122 Greenpoint Ave", lng: -73.9533, lat: 40.7297, hours: "5pm – 11pm", priceLevel: 2 },
    { id: 7, name: "Ramen Lab", emoji: "🌶️", category: "spicy", note: "Tantanmen with extra chili oil. You'll cry. Worth it.", neighborhood: "Nolita", address: "70 Kenmare St", lng: -73.9967, lat: 40.7211, hours: "12pm – 9pm", priceLevel: 2 },
    { id: 8, name: "Ootoya Ramen", emoji: "🌶️", category: "spicy", note: "Spicy garlic miso, hidden inside the chaya menu.", neighborhood: "Chelsea", address: "8 W 18th St", lng: -73.9933, lat: 40.7393, hours: "11am – 10pm", priceLevel: 2 },
    { id: 9, name: "Jun-Men Ramen Bar", emoji: "🌿", category: "veggie", note: "Mushroom mazemen. The vegan one your friends will steal bites of.", neighborhood: "Chelsea", address: "249 9th Ave", lng: -74.0019, lat: 40.7479, hours: "12pm – 10pm", priceLevel: 2 },
    { id: 10, name: "Misoya", emoji: "🍲", category: "miso", note: "Three miso bases. Order all three with friends.", neighborhood: "East Village", address: "129 2nd Ave", lng: -73.9876, lat: 40.7280, hours: "12pm – 11pm", priceLevel: 2 },
    { id: 11, name: "Hide-Chan", emoji: "🍜", category: "tonkotsu", note: "Hakata-style. Kae-dama (extra noodles) is the play.", neighborhood: "Midtown", address: "248 E 52nd St", lng: -73.9686, lat: 40.7569, hours: "12pm – 1am", priceLevel: 2 },
    { id: 12, name: "Mu Ramen", emoji: "🥢", category: "shoyu", note: "Long Island City pilgrimage. Smoked uni bucatini if it's on.", neighborhood: "Long Island City", address: "12-09 Jackson Ave", lng: -73.9404, lat: 40.7491, hours: "5pm – 10pm", priceLevel: 3 },
    { id: 13, name: "Yatai Ramen", emoji: "🌿", category: "veggie", note: "Sesame tan-tan, vegan-style. Quietly excellent.", neighborhood: "Williamsburg", address: "240 Bedford Ave", lng: -73.9613, lat: 40.7178, hours: "5pm – 11pm", priceLevel: 1 },
  ],
};
