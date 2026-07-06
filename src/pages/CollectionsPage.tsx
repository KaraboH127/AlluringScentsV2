import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { PricingTable } from "../components/fragrance/PricingTable";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { collections, fragrances } from "../config/site";

export function CollectionsPage() {
  return (
    <>
      <SEOHead
        title="Collections | Alluring Scents"
        description="Explore the Standard and Private collections from Alluring Scents, premium extrait de parfum for every identity."
        path="/collections"
      />

      <Section>
        <h1 className="mb-10 text-4xl text-white md:text-5xl">Collections</h1>
        <div className="space-y-12">
          {collections.map((collection) => {
            const items = fragrances.filter((fragrance) => fragrance.collection === collection.id);
            return (
              <article key={collection.id} className="grid gap-8 border border-[#222] p-6 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#C9A227]">{collection.name}</p>
                  <h2 className="text-3xl text-white">{collection.tagline}</h2>
                  <p className="max-w-2xl text-[#CFCFCF]">{collection.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {items.map((fragrance) => (
                      <Link key={fragrance.id} to={`/fragrance/${fragrance.slug}`} className="border border-[#2A2A2A] px-3 py-2 text-xs uppercase tracking-[0.14em] text-[#EAEAEA] hover:border-[#C9A227] hover:text-[#C9A227]">
                        {fragrance.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.14em] text-[#EAEAEA]">Pricing</p>
                  <PricingTable collection={collection} />
                  <Link to="/pricing">
                    <Button variant="ghost" className="w-full">
                      View Full Pricing
                    </Button>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}
