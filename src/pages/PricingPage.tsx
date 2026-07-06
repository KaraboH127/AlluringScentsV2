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
        <h1 className="mb-10 text-4xl text-white md:text-5xl">Pricing</h1>
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection) => (
            <article key={collection.id} className="space-y-4 border border-[#222] p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C9A227]">{collection.name}</p>
              <h2 className="text-2xl text-white">{collection.label}</h2>
              <PricingTable collection={collection} />
              <p className="pt-2 text-sm text-[#BEBEBE]">Fragrances: {collection.fragrances.join(", ")}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
