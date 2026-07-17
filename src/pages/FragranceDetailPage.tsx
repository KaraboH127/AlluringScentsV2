import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { FragranceHero } from "../components/fragrance/FragranceHero";
import { FragranceNotes } from "../components/fragrance/FragranceNotes";
import { Section } from "../components/layout/Section";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { collections, getFragranceBySlug, siteConfig } from "../config/site";
import { useCart } from "../store/CartContext";
import type { SizeOption } from "../types/site";

const API = import.meta.env.VITE_API_URL;

export function FragranceDetailPage() {
  const { slug = "" }   = useParams();
  const fragrance       = useMemo(() => getFragranceBySlug(slug), [slug]);
  const [size, setSize] = useState<SizeOption>("50ml");
  const [quantity, setQuantity]     = useState(1);
  const [stock, setStock]           = useState<Record<string, number>>({});
  const [stockLoading, setStockLoading] = useState(true);
  const [added, setAdded]           = useState(false);
  const { addToCart }               = useCart();

  useEffect(() => {
    if (!fragrance) return;
    setStockLoading(true);
    fetch(`${API}/stock/${fragrance.id}`)
      .then((r) => r.json())
      .then((data) => {
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

  const collection   = collections.find((entry) => entry.id === fragrance.collection)!;
  const currentStock = stock[size] ?? 0;
  const isOutOfStock = !stockLoading && currentStock === 0;

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
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
            { name: fragrance.name, path: `/fragrance/${fragrance.slug}` },
          ]}
        />
        <FragranceHero
          fragrance={fragrance}
          selectedSize={size}
          onSizeChange={(s) => { setSize(s); setAdded(false); }}
          quantity={quantity}
          onQuantityChange={setQuantity}
          stock={stock}
          stockLoading={stockLoading}
          added={added}
          onAddToCart={handleAddToCart}
        />
      </Section>

      <Section className="border-y section-surface">
        <FragranceNotes fragrance={fragrance} />
      </Section>

      <Section>
        <div className="max-w-2xl space-y-5 text-sm text-muted">
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
        </div>
      </Section>
    </>
  );
}