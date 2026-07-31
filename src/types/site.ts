export type CollectionType = "standard" | "private";

export type SizeOption = "10ml" | "50ml" | "100ml";

export interface FragranceNotes {
  top: string;
  middle: string;
  base: string;
}

export interface Fragrance {
  id: string;
  slug: string;
  name: string;
  collection: string;
  description: string;
  extrait: string;
  notes: FragranceNotes;
  bestFor: string;
  occasions: string[];
  personality: string;
  image: string;
  sale_prices?: { "10ml"?: number; "50ml"?: number; "100ml"?: number } | null;
  sale_label?: string | null;
}

export interface Collection {
  id: string;
  name: string;
  label: string;
  tagline: string;
  description: string;
  prices: Record<SizeOption, number>;
  fragrances: string[];
}

export interface JournalArticle {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  readingMinutes: number;
  keywords: string[];
  headings: string[];
  content: string[];
}
