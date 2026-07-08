import { useEffect, useState } from "react";
import { collections, formatCurrency, fragrances } from "../../config/site";
import { useCart } from "../../store/CartContext";
import type { CartItem as CartEntry } from "../../store/CartContext";
import { QuantitySelector } from "../ui/QuantitySelector";
import { Image } from "../ui/Image";
import { Skeleton } from "../ui/Skeleton";

const API = import.meta.env.VITE_API_URL;

export function CartItem({ item }: { item: CartEntry }) {
  const { updateQuantity, removeFromCart } = useCart();
  const [stock, setStock] = useState<number | null>(null);
  const [stockLoading, setStockLoading] = useState(true);

  const fragrance = fragrances.find((entry) => entry.id === item.fragranceId);
  if (!fragrance) return null;

  const collection = collections.find((entry) => entry.id === fragrance.collection)!;
  const unitPrice = collection.prices[item.size];

  useEffect(() => {
    setStockLoading(true);
    fetch(`${API}/stock/${item.fragranceId}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const row = data.find((r: { size: string; stock: number }) => r.size === item.size);
          setStock(row?.stock ?? 0);
        }
        setStockLoading(false);
      })
      .catch(() => {
        setStock(null);
        setStockLoading(false);
      });
  }, [item.fragranceId, item.size]);

  const isOutOfStock = stock !== null && stock === 0;
  const isLowStock   = stock !== null && stock > 0 && stock <= 5;
  const exceedsStock = stock !== null && stock > 0 && item.quantity > stock;

  return (
    <div className={`border-b py-4 ${isOutOfStock ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <Image src={fragrance.image} alt={fragrance.name} className="h-20 w-16 object-cover" />
        <div className="flex-1 space-y-2">
          <p className="text-sm site-heading">{fragrance.name}</p>
          <p className="text-xs uppercase tracking-[0.15em] text-muted">{item.size}</p>
          <p className="text-xs accent-gold">{formatCurrency(unitPrice)}</p>

          {stockLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-10 w-32" />
            </div>
          ) : (
            <>
              {isOutOfStock && (
                <p className="text-xs text-red-400">Out of stock — please remove this item</p>
              )}
              {isLowStock && !exceedsStock && (
                <p className="text-xs text-yellow-400">Only {stock} left in stock</p>
              )}
              {exceedsStock && (
                <p className="text-xs text-yellow-400">
                  Only {stock} available — please reduce quantity
                </p>
              )}

              <QuantitySelector
                value={item.quantity}
                onChange={(value) => updateQuantity(item.fragranceId, item.size, value)}
                max={stock ?? undefined}
                min={1}
              />
            </>
          )}
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