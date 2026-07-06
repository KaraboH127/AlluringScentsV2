import type { Collection } from "../../types/site";
import { formatCurrency } from "../../config/site";

/**
 * Shared size/price table for collection and pricing pages.
 */
export function PricingTable({ collection }: { collection: Collection }) {
  return (
    <div className="border">
      {(["10ml", "50ml", "100ml"] as const).map((size) => (
        <div key={size} className="flex items-center justify-between divider px-4 py-3 last:border-b-0">
          <span className="text-sm text-muted">{size}</span>
          <span className="text-sm accent-gold">{formatCurrency(collection.prices[size])}</span>
        </div>
      ))}
    </div>
  );
}
