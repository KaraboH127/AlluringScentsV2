import type { Collection } from "../../types/site";
import { formatCurrency } from "../../config/site";

/**
 * Shared size/price table for collection and pricing pages.
 */
export function PricingTable({ collection }: { collection: Collection }) {
  return (
    <div className="border border-[#222]">
      {(["10ml", "50ml", "100ml"] as const).map((size) => (
        <div key={size} className="flex items-center justify-between border-b border-[#222] px-4 py-3 last:border-b-0">
          <span className="text-sm text-[#EAEAEA]">{size}</span>
          <span className="text-sm text-[#C9A227]">{formatCurrency(collection.prices[size])}</span>
        </div>
      ))}
    </div>
  );
}
