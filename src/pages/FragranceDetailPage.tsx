import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { FragranceHero } from "../components/fragrance/FragranceHero";
import { FragranceNotes } from "../components/fragrance/FragranceNotes";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { QuantitySelector } from "../components/ui/QuantitySelector";
import { Select } from "../components/ui/Select";
import { Skeleton } from "../components/ui/Skeleton";
import { collections, formatCurrency, getFragranceBySlug, siteConfig } from "../config/site";
import { useCart } from "../store/CartContext";
import type { SizeOption } from "../types/site";

const API = import.meta.env.VITE_API_URL;

export function FragranceDetailPage() {
  const { slug = "" } = useParams();
  const fragrance = useMemo(() => getFragranceBySlug(slug), [slug]);
  const [size, setSize] = useState<SizeOption>("50ml");
  const [quantity, setQuantity] = useState(1);
  const [stock, setStock] = useState<Record<string, number>>({});
  const [stockLoading, setStockLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  // ── Fetch stock for this fragrance ─────────────────────────────────────────

  useEffect(() => {
    if (!fragrance) return;
    setStockLoading(true);
    fetch(`${API}/stock/${fragrance.id}`)
      .then((r) => r.json())
      .then((data) => {
        // data is an array of { size, stock }
        const map: Record<string, number> = {};
        if (Array.isArray(data)) {
          data.forEach((row: { size: string; stock: number }) => {
            map[row.size] = row.stock;
          });
        }
        setStock(map);
        setStockLoading(false);
      })
      .catch(() => setStockLoading(false));
  }, [fragrance?.id]);

  if (!fragrance) {
    return (
      <Section>
        <h1 className="text-3xl site-heading">Fragrance not found.</h1>
      </Section>
    );
  }

  const collection = collections.find((entry) => entry.id === fragrance.collection)!;
  const currentStock = stock[size] ?? 0;
  const isOutOfStock = !stockLoading && currentStock === 0;
  const isLowStock = !stockLoading && currentStock > 0 && currentStock <= 5;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(fragrance.id, size, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <SEOHead
        title={`${fragrance.name} | Alluring Scents`}
        description={`${fragrance.name} ${fragrance.extrait} from the ${collection.name}. ${fragrance.description}`}
        path={`/fragrance/${fragrance.slug}`}
        type="product"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: fragrance.name,
          brand: "Alluring Scents",
          description: fragrance.description,
          image: `${siteConfig.domain}${fragrance.image}`,
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "ZAR",
            lowPrice: collection.prices["10ml"],
            highPrice: collection.prices["100ml"],
          },
        }}
      />

      <Section>
        <FragranceHero fragrance={fragrance} selectedSize={size} />
      </Section>

      <Section className="border-y section-surface">
        <FragranceNotes fragrance={fragrance} />
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5 text-sm text-muted">
            <p>
              <span className="accent-gold">Best For:</span> {fragrance.bestFor}
            </p>
            <p>
              <span className="accent-gold">Suggested Occasions:</span>{" "}
              {fragrance.occasions.join(", ")}
            </p>
            <p>
              <span className="accent-gold">Suggested Personality:</span> {fragrance.personality}
            </p>
            <p>
              Available Sizes: 10ml ({formatCurrency(collection.prices["10ml"])}), 50ml (
              {formatCurrency(collection.prices["50ml"])}), 100ml (
              {formatCurrency(collection.prices["100ml"])})
            </p>
          </div>

          <div className="space-y-4 border p-6">
            <label className="block space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
              Size Selector
              <Select
                value={size}
                onChange={(event) => {
                  setSize(event.target.value as SizeOption);
                  setAdded(false);
                }}
              >
                <option value="10ml">10ml — {formatCurrency(collection.prices["10ml"])}</option>
                <option value="50ml">50ml — {formatCurrency(collection.prices["50ml"])}</option>
                <option value="100ml">100ml — {formatCurrency(collection.prices["100ml"])}</option>
              </Select>
            </label>

            {stockLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-3 w-28" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-11 w-full" />
              </div>
            ) : (
              <>
                <p className={`text-xs tracking-wide ${
                  isOutOfStock ? "text-red-400" :
                  isLowStock   ? "text-yellow-400" :
                                 "text-green-500"
                }`}>
                  {isOutOfStock
                    ? "Out of stock for this size"
                    : isLowStock
                    ? `Only ${currentStock} left`
                    : "In stock"}
                </p>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">Quantity Selector</p>
                  <QuantitySelector
                    value={quantity}
                    onChange={setQuantity}
                    max={isOutOfStock ? 0 : currentStock}
                  />
                </div>

                <Button
                  onClick={handleAddToCart}
                  className="w-full"
                  disabled={isOutOfStock || stockLoading}
                >
                  {isOutOfStock ? "Out of Stock" : added ? "Added ✓" : "Add To Cart"}
                </Button>
              </>
            )}

            <Link to="/collections">
              <Button variant="ghost" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}