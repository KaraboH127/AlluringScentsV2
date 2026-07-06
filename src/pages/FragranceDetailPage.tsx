import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { FragranceHero } from "../components/fragrance/FragranceHero";
import { FragranceNotes } from "../components/fragrance/FragranceNotes";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { QuantitySelector } from "../components/ui/QuantitySelector";
import { Select } from "../components/ui/Select";
import { collections, formatCurrency, getFragranceBySlug, siteConfig } from "../config/site";
import { useCart } from "../store/CartContext";
import type { SizeOption } from "../types/site";

export function FragranceDetailPage() {
  const { slug = "" } = useParams();
  const fragrance = useMemo(() => getFragranceBySlug(slug), [slug]);
  const [size, setSize] = useState<SizeOption>("50ml");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!fragrance) {
    return (
      <Section>
        <h1 className="text-3xl site-heading">Fragrance not found.</h1>
      </Section>
    );
  }

  const collection = collections.find((entry) => entry.id === fragrance.collection)!;

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
              <span className="accent-gold">Suggested Occasions:</span> {fragrance.occasions.join(", ")}
            </p>
            <p>
              <span className="accent-gold">Suggested Personality:</span> {fragrance.personality}
            </p>
            <p>
              Available Sizes: 10ml ({formatCurrency(collection.prices["10ml"])}), 50ml ({formatCurrency(collection.prices["50ml"])}), 100ml ({formatCurrency(collection.prices["100ml"])})
            </p>
          </div>

          <div className="space-y-4 border p-6">
            <label className="block space-y-2 text-xs uppercase tracking-[0.14em] text-muted">
              Size Selector
              <Select value={size} onChange={(event) => setSize(event.target.value as SizeOption)}>
                <option value="10ml">10ml - {formatCurrency(collection.prices["10ml"])}</option>
                <option value="50ml">50ml - {formatCurrency(collection.prices["50ml"])}</option>
                <option value="100ml">100ml - {formatCurrency(collection.prices["100ml"])}</option>
              </Select>
            </label>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">Quantity Selector</p>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>
            <Button onClick={() => addToCart(fragrance.id, size, quantity)} className="w-full">
              Add To Cart
            </Button>
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
