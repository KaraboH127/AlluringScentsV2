export type CollectionType = "standard" | "private";

export type SizeOption = "10ml" | "50ml" | "100ml";

export interface Fragrance {
  id: string;
  slug: string;
  name: string;
  collection: CollectionType;
  description: string;
  extrait: string;
  notes: {
    top: string;
    middle: string;
    base: string;
  };
  bestFor: string;
  occasions: string[];
  personality: string;
  image: string;
}

export interface Collection {
  id: CollectionType;
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
