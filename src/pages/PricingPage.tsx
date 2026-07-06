import { SEOHead } from "../SEOHead";
import { PricingTable } from "../components/fragrance/PricingTable";
import { Section } from "../components/layout/Section";
import { collections } from "../config/site";

export function PricingPage() {
  return (
    <>
      <SEOHead
        title="Pricing | Alluring Scents"
        description="Compare Standard and Private collection perfume pricing from 10ml to 100ml."
        path="/pricing"
      />
      <Section>
        <h1 className="mb-10 text-4xl site-heading md:text-5xl">Pricing</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection) => (
            <article key={collection.id} className="space-y-4 border panel-surface p-6">
              <p className="text-xs uppercase tracking-[0.2em] accent-gold">{collection.name}</p>
              <h2 className="text-2xl site-heading">{collection.label}</h2>
              <PricingTable collection={collection} />
              <p className="pt-2 text-sm text-muted">Fragrances: {collection.fragrances.join(", ")}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
