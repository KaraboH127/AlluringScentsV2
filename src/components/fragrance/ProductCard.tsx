import { Link } from "react-router-dom";
import { formatCurrency } from "../../config/site";
import { useCollections } from "../../hooks/useProducts";
import { useCart } from "../../store/CartContext";
import type { Fragrance } from "../../types/site";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Image } from "../ui/Image";

export function ProductCard({ fragrance }: { fragrance: Fragrance }) {
  const { addToCart } = useCart();
  const { collections } = useCollections();
  const collection = collections.find((c) => c.id === fragrance.collection);

  const originalPrice = collection?.prices["10ml"] ?? 0;
  const salePrice     = fragrance.sale_prices?.["10ml"];
  const isOnSale      = !!salePrice && salePrice < originalPrice;

  const saleLabel = fragrance.sale_label ?? (() => {
    if (!isOnSale) return null;
    const pct = Math.round(((originalPrice - salePrice!) / originalPrice) * 100);
    return `${pct}% OFF`;
  })();

  return (
    <article className="space-y-4 border panel-surface p-4 relative">
      {isOnSale && (
        <div className="absolute top-6 left-6 z-10">
          <span className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">
            {saleLabel}
          </span>
        </div>
      )}

      <div className="relative overflow-hidden">
        <Image src={fragrance.image} alt={fragrance.name} className="h-64 w-full object-cover" />
      </div>

      <div className="space-y-2">
        <Badge>{collection?.name}</Badge>
        <h3 className="text-xl site-heading">{fragrance.name}</h3>
        <p className="text-sm text-muted">{fragrance.description}</p>

        {isOnSale ? (
          <div className="flex items-center gap-2">
            <p className="text-sm accent-gold font-medium">From {formatCurrency(salePrice!)}</p>
            <p className="text-xs text-muted line-through">{formatCurrency(originalPrice)}</p>
          </div>
        ) : (
          <p className="text-sm accent-gold">From {formatCurrency(originalPrice)}</p>
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={() => addToCart(fragrance.id, "10ml", 1)} className="flex-1">
          Add To Cart
        </Button>
        <Link to={`/fragrance/${fragrance.slug}`} className="flex-1">
          <Button variant="ghost" className="w-full">View Details</Button>
        </Link>
      </div>
    </article>
  );
}