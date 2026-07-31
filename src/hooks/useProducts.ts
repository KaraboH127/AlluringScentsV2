import { useEffect, useState } from "react";
import type { Fragrance, Collection } from "../types/site";

const API = import.meta.env.VITE_API_URL;

let cachedFragrances: Fragrance[] | null = null;
let cachedCollections: Collection[] | null = null;

function mapFragrance(f: any): Fragrance {
  return {
    id: f.id,
    slug: f.slug,
    name: f.name,
    collection: f.collection_id,
    description: f.description,
    extrait: f.extrait,
    notes: f.notes,
    bestFor: f.best_for,
    occasions: f.occasions,
    personality: f.personality,
    image: f.image_url,
    sale_prices: f.sale_prices,
    sale_label: f.sale_label,
  };
}

function mapCollection(c: any): Collection {
  return {
    id: c.id,
    name: c.name,
    label: c.label,
    tagline: c.tagline,
    description: c.description,
    prices: c.prices,
    fragrances: [], // filled in by caller if needed
  };
}

export function useFragrances() {
  const [fragrances, setFragrances] = useState<Fragrance[]>(cachedFragrances ?? []);
  const [loading, setLoading]       = useState(!cachedFragrances);

  useEffect(() => {
    if (cachedFragrances) return;
    fetch(`${API}/fragrances`)
      .then((r) => r.json())
      .then((data) => {
        const mapped = Array.isArray(data) ? data.map(mapFragrance) : [];
        cachedFragrances = mapped;
        setFragrances(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  return { fragrances, loading };
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>(cachedCollections ?? []);
  const [loading, setLoading]         = useState(!cachedCollections);

  useEffect(() => {
    if (cachedCollections) return;
    fetch(`${API}/collections`)
      .then((r) => r.json())
      .then((data) => {
        const mapped = Array.isArray(data) ? data.map(mapCollection) : [];
        cachedCollections = mapped;
        setCollections(mapped);
      })
      .finally(() => setLoading(false));
  }, []);

  return { collections, loading };
}

export function useFragranceBySlug(slug: string) {
  const [fragrance, setFragrance] = useState<Fragrance | null>(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/fragrances/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data) => setFragrance(mapFragrance(data)))
      .catch(() => setFragrance(null))
      .finally(() => setLoading(false));
  }, [slug]);

  return { fragrance, loading };
}

export function clearProductsCache() {
  cachedFragrances = null;
  cachedCollections = null;
}