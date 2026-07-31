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
  { label: "Track Order", path: "/track-order" },
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

];

export const featuredFragrances = [
  "9-lives",
  "golden-amber", 
  "lush",
  "whiskey-sour",
  "taboo",
  "midnight-oud",
];

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
