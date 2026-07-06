import type { Collection, Fragrance } from "../types/site";

export const siteConfig = {
  brand: "Alluring Scents",
  domain: "https://alluring-scents-v2.vercel.app",
  foundedYear: 2024,
  founders: ["Thato Padi", "Katlego Kennedy"],
  keywords: [
    "Luxury Perfume South Africa",
    "Affordable Luxury Perfume",
    "Premium Fragrance South Africa",
    "Luxury Fragrance Brand",
    "Extrait de Parfum",
    "Long Lasting Perfume",
    "Signature Fragrance",
    "Men's Perfume South Africa",
    "Women's Perfume South Africa",
    "Unisex Perfume South Africa",
  ],
  navigation: [
    { label: "Home", path: "/" },
    { label: "Our Story", path: "/our-story" },
    { label: "Collections", path: "/collections" },
    { label: "Pricing", path: "/pricing" },
    { label: "Journal", path: "/journal" },
  ],
  images: {
    logo: "/Alluring_scents_logo.webp",
    hero: "/Alluring_scents_logo.webp",
    founders: "/founders-placeholder.webp",
    bottle: "/bottle-placeholder.webp",
    lifestyle: "/lifestyle-placeholder.webp",
    collection: "/Alluring_scents_logo.webp",
    journal: "/journal-placeholder.webp",
  },
};

export const collections: Collection[] = [
  {
    id: "standard",
    name: "Standard Collection",
    label: "White Label",
    tagline: "Elegant Everyday Luxury",
    description:
      "Our Standard Collection brings accessible luxury to everyday life, beautifully balanced fragrances crafted from the finest ingredients.",
    prices: { "10ml": 120, "50ml": 400, "100ml": 700 },
    fragrances: [
      "Lush",
      "Whiskey Sour",
      "Velvet Nectar",
      "Midnight Oud",
      "Purple Rain",
      "Taboo",
      "Ocean Eyes",
      "Fresh",
    ],
  },
  {
    id: "private",
    name: "Private Collection",
    label: "Black Label",
    tagline: "Exclusively Crafted. Unapologetically Bold.",
    description:
      "Our Private Collection represents the pinnacle of olfactory artistry, bold, complex compositions designed for those who wear fragrance as a statement.",
    prices: { "10ml": 200, "50ml": 600, "100ml": 1100 },
    fragrances: ["9 Lives", "Golden Amber", "Island Water", "Signature"],
  },
];

export const fragrances: Fragrance[] = [
  {
    id: "lush",
    slug: "lush",
    name: "Lush",
    collection: "standard",
    description: "A radiant floral-green composition with polished depth.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Bergamot and pear leaf",
      middle: "Jasmine petals and white tea",
      base: "Creamy musk and sandalwood",
    },
    bestFor: "Daily elegance",
    occasions: ["Workdays", "Brunch", "Evening transitions"],
    personality: "Refined, calm, effortlessly confident",
    image: "/image10.webp",
  },
  {
    id: "whiskey-sour",
    slug: "whiskey-sour",
    name: "Whiskey Sour",
    collection: "standard",
    description: "Citrus brightness wrapped in warm ambered woods.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Lemon zest and ginger",
      middle: "Clary sage and aromatic spice",
      base: "Oakwood and soft vanilla",
    },
    bestFor: "Bold evenings",
    occasions: ["Dinner dates", "Lounges", "Night events"],
    personality: "Magnetic, adventurous, polished",
    image: "/image9.webp",
  },
  {
    id: "velvet-nectar",
    slug: "velvet-nectar",
    name: "Velvet Nectar",
    collection: "standard",
    description: "Silken fruit and petals balanced with warm resins.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Nectarine and pink pepper",
      middle: "Rose absolute and iris",
      base: "Amber resin and tonka bean",
    },
    bestFor: "Signature wear",
    occasions: ["Celebrations", "Day-to-night wear", "Special meetings"],
    personality: "Elegant, expressive, poised",
    image: "/image5.webp",
  },
  {
    id: "midnight-oud",
    slug: "midnight-oud",
    name: "Midnight Oud",
    collection: "standard",
    description: "Dark woods and spice with a velvety modern trail.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Saffron and smoked cardamom",
      middle: "Rose and cedar",
      base: "Oud accord and patchouli",
    },
    bestFor: "After-dark presence",
    occasions: ["Formal events", "Winter evenings", "Statement moments"],
    personality: "Commanding, luxurious, deep",
    image: "/image6.webp",
  },
  {
    id: "purple-rain",
    slug: "purple-rain",
    name: "Purple Rain",
    collection: "standard",
    description: "Velvet florals lit by sparkling citrus and musk.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Mandarin and blackcurrant",
      middle: "Violet and peony",
      base: "Clean musk and amberwood",
    },
    bestFor: "Fresh confidence",
    occasions: ["Day events", "Creative work", "Weekend outings"],
    personality: "Modern, romantic, expressive",
    image: "/image3.webp",
  },
  {
    id: "taboo",
    slug: "taboo",
    name: "Taboo",
    collection: "standard",
    description: "A sensual amber-spice blend with smoky sophistication.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Pink pepper and saffron",
      middle: "Labdanum and suede",
      base: "Incense and vanilla absolute",
    },
    bestFor: "Evening attraction",
    occasions: ["Date nights", "Cocktail evenings", "Luxury occasions"],
    personality: "Fearless, alluring, unforgettable",
    image: "/image2.webp",
  },
  {
    id: "ocean-eyes",
    slug: "ocean-eyes",
    name: "Ocean Eyes",
    collection: "standard",
    description: "Marine freshness elevated with citrus and soft woods.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Grapefruit and sea breeze accord",
      middle: "Lavender and neroli",
      base: "Driftwood and white musk",
    },
    bestFor: "Clean versatility",
    occasions: ["Warm days", "Travel", "Office wear"],
    personality: "Fresh, focused, relaxed",
    image: "/image1.webp",
  },
  {
    id: "fresh",
    slug: "fresh",
    name: "Fresh",
    collection: "standard",
    description: "Crisp citrus and herbal brightness with clean depth.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Lime and petitgrain",
      middle: "Green tea and basil",
      base: "Vetiver and soft musk",
    },
    bestFor: "Everyday ease",
    occasions: ["Morning routines", "Gym-to-day transitions", "Hot weather"],
    personality: "Minimal, energetic, sharp",
    image: "/image0.webp",
  },
  {
    id: "9-lives",
    slug: "9-lives",
    name: "9 Lives",
    collection: "private",
    description: "A daring signature built on radiant spice and woods.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Bergamot and pink pepper",
      middle: "Geranium and nutmeg",
      base: "Sandalwood and ambergris accord",
    },
    bestFor: "Statement identity",
    occasions: ["High-impact meetings", "Events", "Nightlife"],
    personality: "Bold, charismatic, uncompromising",
    image: "/image12.webp",
  },
  {
    id: "golden-amber",
    slug: "golden-amber",
    name: "Golden Amber",
    collection: "private",
    description: "Liquid gold warmth with noble woods and resins.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Saffron and bergamot",
      middle: "Amber and orange blossom",
      base: "Guaiac wood and benzoin",
    },
    bestFor: "Luxury evenings",
    occasions: ["Formal dinners", "Celebratory nights", "Cool seasons"],
    personality: "Confident, warm, regal",
    image: "/image11.webp",
  },
  {
    id: "island-water",
    slug: "island-water",
    name: "Island Water",
    collection: "private",
    description: "A refined tropical interpretation with mineral depth.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Bitter orange and coconut water",
      middle: "Tiare flower and sea salt",
      base: "Cedar and ambrette",
    },
    bestFor: "Luxurious freshness",
    occasions: ["Resort wear", "Summer evenings", "Holiday escapes"],
    personality: "Relaxed, premium, luminous",
    image: "/image7.webp",
  },
  {
    id: "signature",
    slug: "signature",
    name: "Signature",
    collection: "private",
    description: "The house icon, smooth spice, woods, and rare florals.",
    extrait: "Extrait de Parfum",
    notes: {
      top: "Black pepper and bergamot",
      middle: "Orris and rose",
      base: "Sandalwood, musk, and labdanum",
    },
    bestFor: "Defining moments",
    occasions: ["Daily signature wear", "Business", "Elegant evenings"],
    personality: "Timeless, assured, sophisticated",
    image: "/image4.webp",
  },
];

export const featuredFragrances = ["9-lives", "golden-amber", "lush", "whiskey-sour"];

export const homeWhyChoose = [
  "Luxury Ingredients",
  "Long-lasting Extrait de Parfum",
  "Premium Craftsmanship",
  "Accessible Luxury",
  "Designed To Be Remembered",
];

export function formatCurrency(value: number) {
  return `R${value.toLocaleString("en-ZA")}`;
}

export function getCollectionById(id: Collection["id"]) {
  return collections.find((collection) => collection.id === id);
}

export function getFragranceBySlug(slug: string) {
  return fragrances.find((fragrance) => fragrance.slug === slug);
}
