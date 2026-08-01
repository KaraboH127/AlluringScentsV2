import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Fragrance, Collection } from "../types/site";

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
    fragrances: [],
  };
}

export function useFragrances() {
  const [fragrances, setFragrances] = useState<Fragrance[]>(cachedFragrances ?? []);
  const [loading, setLoading]       = useState(!cachedFragrances);

  useEffect(() => {
    if (cachedFragrances) return;
    supabase
      .from("fragrances")
      .select("*")
      .eq("active", true)
      .then(({ data, error }) => {
        if (!error && data) {
          const mapped = data.map(mapFragrance);
          cachedFragrances = mapped;
          setFragrances(mapped);
        }
        setLoading(false);
      });
  }, []);

  return { fragrances, loading };
}

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>(cachedCollections ?? []);
  const [loading, setLoading]         = useState(!cachedCollections);

  useEffect(() => {
    if (cachedCollections) return;
    supabase
      .from("collections")
      .select("*")
      .eq("active", true)
      .then(({ data, error }) => {
        if (!error && data) {
          const mapped = data.map(mapCollection);
          cachedCollections = mapped;
          setCollections(mapped);
        }
        setLoading(false);
      });
  }, []);

  return { collections, loading };
}

export function useFragranceBySlug(slug: string) {
  const [fragrance, setFragrance] = useState<Fragrance | null>(null);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    setLoading(true);
    supabase
      .from("fragrances")
      .select("*")
      .eq("slug", slug)
      .eq("active", true)
      .single()
      .then(({ data, error }) => {
        setFragrance(error || !data ? null : mapFragrance(data));
        setLoading(false);
      });
  }, [slug]);

  return { fragrance, loading };
}

export function clearProductsCache() {
  cachedFragrances = null;
  cachedCollections = null;
}