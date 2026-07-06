import { collections, formatCurrency, fragrances } from "../../config/site";
import { useCart } from "../../store/CartContext";
import type { CartItem as CartEntry } from "../../store/CartContext";
import { QuantitySelector } from "../ui/QuantitySelector";

/**
 * Presentational row for a single cart line item.
 *
 * The component resolves fragrance metadata from config and delegates quantity
 * mutations back to cart context actions.
 */
export function CartItem({ item }: { item: CartEntry }) {
  const { updateQuantity, removeFromCart } = useCart();
  const fragrance = fragrances.find((entry) => entry.id === item.fragranceId);
  if (!fragrance) return null;
  const collection = collections.find((entry) => entry.id === fragrance.collection)!;
  const unitPrice = collection.prices[item.size];

  return (
    <div className="border-b py-4">
      <div className="flex items-start gap-3">
        <img src={fragrance.image} alt={fragrance.name} className="h-20 w-16 object-cover" />
        <div className="flex-1 space-y-2">
          <p className="text-sm site-heading">{fragrance.name}</p>
          <p className="text-xs uppercase tracking-[0.15em] text-muted">{item.size}</p>
          <p className="text-xs accent-gold">{formatCurrency(unitPrice)}</p>
          <QuantitySelector value={item.quantity} onChange={(value) => updateQuantity(item.fragranceId, item.size, value)} />
        </div>
        <button
          className="text-xs uppercase tracking-[0.12em] text-muted hover:accent-gold"
          onClick={() => removeFromCart(item.fragranceId, item.size)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
