import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { PricingTable } from "../components/fragrance/PricingTable";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
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
        <h1 className="mb-10 text-4xl site-heading md:text-5xl">Collections</h1>
        <div className="space-y-12">
          {collections.length > 0 ? collections.map((collection) => {
            const items = fragrances.filter((fragrance) => fragrance.collection === collection.id);
            return (
              <article key={collection.id} className="grid gap-8 border panel-surface p-6 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-5">
                  <p className="text-xs uppercase tracking-[0.2em] accent-gold">{collection.name}</p>
                  <h2 className="text-3xl site-heading">{collection.tagline}</h2>
                  <p className="max-w-2xl text-muted">{collection.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {items.map((fragrance) => (
                      <Link key={fragrance.id} to={`/fragrance/${fragrance.slug}`} className="border px-3 py-2 text-xs uppercase tracking-[0.14em] text-muted hover:accent-gold">
                        {fragrance.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-sm uppercase tracking-[0.14em] text-muted">Pricing</p>
                  <PricingTable collection={collection} />
                  <Link to="/pricing">
                    <Button variant="ghost" className="w-full">
                      View Full Pricing
                    </Button>
                  </Link>
                </div>
              </article>
            );
          }) : Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="grid gap-8 border panel-surface p-6 lg:grid-cols-[1.5fr_1fr]">
              <div className="space-y-5">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex flex-wrap gap-2 pt-2">
                  {Array.from({ length: 4 }).map((_, chipIndex) => (
                    <Skeleton key={chipIndex} className="h-8 w-24" />
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
