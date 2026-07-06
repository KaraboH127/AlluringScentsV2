import { Link } from "react-router-dom";
import { formatCurrency, getCollectionById } from "../../config/site";
import { useCart } from "../../store/CartContext";
import type { Fragrance } from "../../types/site";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Image } from "../ui/Image";

/**
 * Reusable fragrance commerce card.
 *
 * Used in listing grids to keep browse -> add to cart and browse -> details
 * actions visually consistent across routes.
 */
export function ProductCard({ fragrance }: { fragrance: Fragrance }) {
  const { addToCart } = useCart();
  const collection = getCollectionById(fragrance.collection);

  return (
    <article className="space-y-4 border panel-surface p-4">
      <Image src={fragrance.image} alt={fragrance.name} className="h-64 w-full object-cover" />
      <div className="space-y-2">
        <Badge>{collection?.name}</Badge>
        <h3 className="text-xl site-heading">{fragrance.name}</h3>
        <p className="text-sm text-muted">{fragrance.description}</p>
        <p className="text-sm accent-gold">From {formatCurrency(collection?.prices["10ml"] ?? 0)}</p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => addToCart(fragrance.id, "10ml", 1)} className="flex-1">
          Add To Cart
        </Button>
        <Link to={`/fragrance/${fragrance.slug}`} className="flex-1">
          <Button variant="ghost" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </article>
  );
}
