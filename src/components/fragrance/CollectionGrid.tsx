import type { Fragrance } from "../../types/site";
import { ProductCard } from "./ProductCard";

/**
 * Grid wrapper that standardizes responsive product-card layouts.
 */
export function CollectionGrid({ fragrances }: { fragrances: Fragrance[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {fragrances.map((fragrance) => (
        <ProductCard key={fragrance.id} fragrance={fragrance} />
      ))}
    </div>
  );
}
