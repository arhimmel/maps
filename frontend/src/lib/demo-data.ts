// Static demo data — stand-in until the Rust API exposes /maps and /maps/:slug.
// Once the backend is ready, swap useMap()/useMaps() to apiFetch() calls.
import type { MapDetail } from "./types";

export const DEMO_MAPS: MapDetail[] = [
  {
    meta: {
      slug: "best-ramen-in-nyc",
      title: "Best Ramen in NYC",
      subtitle: "13 spots to slurp through, ranked by feel.",
      creator: { name: "Aiko Tanaka", handle: "@aiko.eats", avatar: "🍜" },
      saves: 2148,
      drops: 13,
      heroEmoji: "🍜",
      heroGradient: "linear-gradient(135deg, #D4613B 0%, #C4892B 60%, #8C5E3B 100%)",
      center: [-73.985, 40.74],
      zoom: 11.6,
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
  },
  {
    meta: {
      slug: "slow-mornings-brooklyn",
      title: "Slow Mornings in Brooklyn",
      subtitle: "Six cafés worth setting an alarm for.",
      creator: { name: "Marcus Lee", handle: "@marcus.brews", avatar: "☕" },
      saves: 1284,
      drops: 6,
      heroEmoji: "☕",
      heroGradient: "linear-gradient(135deg, #C4892B 0%, #A56B22 55%, #6E4A1F 100%)",
      center: [-73.95, 40.71],
      zoom: 12.2,
    },
    categories: [
      { id: "all", label: "All", emoji: "✦" },
      { id: "espresso", label: "Espresso", emoji: "☕" },
      { id: "pour-over", label: "Pour Over", emoji: "🫖" },
      { id: "pastries", label: "Pastries", emoji: "🥐" },
      { id: "cozy", label: "Cozy", emoji: "📖" },
    ],
    pins: [
      { id: 1, name: "Sey Coffee", emoji: "☕", category: "pour-over", note: "Light roast paradise. The pour over flight is a religious experience.", neighborhood: "Bushwick", address: "18 Grattan St", lng: -73.9343, lat: 40.7068, hours: "7am – 5pm", priceLevel: 2 },
      { id: 2, name: "Devoción", emoji: "🫖", category: "pour-over", note: "Colombian beans, plant-filled atrium. Bring a book.", neighborhood: "Williamsburg", address: "69 Grand St", lng: -73.9626, lat: 40.7142, hours: "7am – 7pm", priceLevel: 2 },
      { id: 3, name: "Variety Coffee", emoji: "☕", category: "espresso", note: "Cortado standard. Reliable, unpretentious, packed by 9.", neighborhood: "Williamsburg", address: "146 Wythe Ave", lng: -73.9582, lat: 40.7216, hours: "6:30am – 8pm", priceLevel: 1 },
      { id: 4, name: "Café Grumpy", emoji: "☕", category: "espresso", note: "Where Mad Men shot scenes. Espresso pulls are tight.", neighborhood: "Greenpoint", address: "193 Meserole Ave", lng: -73.9518, lat: 40.7286, hours: "7am – 7pm", priceLevel: 2 },
      { id: 5, name: "Partners Coffee", emoji: "🥐", category: "pastries", note: "The kouign-amann is the play. Get there before 10.", neighborhood: "Williamsburg", address: "125 N 6th St", lng: -73.9620, lat: 40.7180, hours: "7am – 6pm", priceLevel: 2 },
      { id: 6, name: "Hungry Ghost", emoji: "📖", category: "cozy", note: "Big tables, good wifi, almond croissants. Stay all morning.", neighborhood: "Park Slope", address: "253 Flatbush Ave", lng: -73.9742, lat: 40.6816, hours: "6:30am – 8pm", priceLevel: 1 },
    ],
  },
  {
    meta: {
      slug: "tacos-worth-the-drive-la",
      title: "Tacos Worth the Drive",
      subtitle: "Six East LA spots that are worth the freeway.",
      creator: { name: "Sofía Reyes", handle: "@sofia.eats.la", avatar: "🌮" },
      saves: 3402,
      drops: 6,
      heroEmoji: "🌮",
      heroGradient: "linear-gradient(135deg, #3B8C5A 0%, #5BA84A 55%, #C4892B 100%)",
      center: [-118.2, 34.04],
      zoom: 11.4,
    },
    categories: [
      { id: "all", label: "All", emoji: "✦" },
      { id: "al-pastor", label: "Al Pastor", emoji: "🌮" },
      { id: "carnitas", label: "Carnitas", emoji: "🐖" },
      { id: "asada", label: "Carne Asada", emoji: "🔥" },
      { id: "mariscos", label: "Mariscos", emoji: "🦐" },
    ],
    pins: [
      { id: 1, name: "Mariscos Jalisco", emoji: "🦐", category: "mariscos", note: "Tacos dorados de camarón. Order two. Then two more.", neighborhood: "Boyle Heights", address: "3040 E Olympic Blvd", lng: -118.2104, lat: 34.0235, hours: "9am – 6pm", priceLevel: 1 },
      { id: 2, name: "Sonoratown", emoji: "🌮", category: "asada", note: "Flour tortillas made by hand. The chivichanga is non-negotiable.", neighborhood: "Downtown LA", address: "208 E 8th St", lng: -118.2486, lat: 34.0413, hours: "11am – 9pm", priceLevel: 1 },
      { id: 3, name: "Carnitas El Momo", emoji: "🐖", category: "carnitas", note: "Truck only. Cash only. Mixto plate, Saturdays only. Worth the chase.", neighborhood: "Boyle Heights", address: "Soto + 4th", lng: -118.2168, lat: 34.0408, hours: "Sat 8am – sold out", priceLevel: 1 },
      { id: 4, name: "King Taco", emoji: "🌮", category: "al-pastor", note: "The classic. Red salsa is dangerous. Stack two corn tortillas.", neighborhood: "East LA", address: "4504 E 3rd St", lng: -118.1797, lat: 34.0349, hours: "8am – 1am", priceLevel: 1 },
      { id: 5, name: "Tacos Tu Madre", emoji: "🌮", category: "al-pastor", note: "Late night. The pineapple-topped al pastor is a vibe.", neighborhood: "Los Feliz", address: "1945 Hillhurst Ave", lng: -118.2868, lat: 34.1064, hours: "11am – 2am", priceLevel: 1 },
      { id: 6, name: "Tire Shop Taqueria", emoji: "🔥", category: "asada", note: "Yes, an actual tire shop by day. Carne asada, mesquite grill, after dark.", neighborhood: "South LA", address: "4077 S Avalon Blvd", lng: -118.2666, lat: 33.9908, hours: "6pm – 11pm", priceLevel: 1 },
    ],
  },
];

// Backwards-compat: many components still import DEMO_MAP for the original fixture.
export const DEMO_MAP: MapDetail = DEMO_MAPS[0];

export function findDemoMap(slug: string): MapDetail | undefined {
  return DEMO_MAPS.find((m) => m.meta.slug === slug);
}
