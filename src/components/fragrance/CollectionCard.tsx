import type { Collection } from "../../types/site";
import { formatCurrency } from "../../config/site";
import { Badge } from "../ui/Badge";

/**
 * Compact collection highlight used on promotional surfaces (home previews).
 */
export function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <div className="space-y-4 border border-[#222] p-6">
      <Badge>{collection.name.toUpperCase()}</Badge>
      <h3 className="text-2xl text-white">{collection.tagline}</h3>
      <p className="text-sm leading-relaxed text-[#BEBEBE]">{collection.description}</p>
      <p className="text-sm text-[#C9A227]">Starting From {formatCurrency(collection.prices["10ml"])}</p>
    </div>
  );
}
