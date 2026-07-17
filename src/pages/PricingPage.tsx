import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { PricingTable } from "../components/fragrance/PricingTable";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { collections, fragrances } from "../config/site";

export function PricingPage() {
  return (
    <>
      <SEOHead
        title="Pricing | Alluring Scents"
        description="Compare Standard and Private collection perfume pricing from 10ml to 100ml."
        path="/pricing"
      />
      <Section>
        <div className="mb-10 space-y-3">
          <h1 className="text-4xl site-heading md:text-5xl">Pricing</h1>
          <p className="text-sm text-muted max-w-xl">
            All fragrances are available in three sizes. Choose what suits your lifestyle —
            whether you're trying a new scent or committing to a signature.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection) => {
            const collectionFragrances = fragrances.filter(
              (f) => f.collection === collection.id
            );

            return (
              <article key={collection.id} className="space-y-4 border panel-surface p-6">
                <p className="text-xs uppercase tracking-[0.2em] accent-gold">{collection.name}</p>
                <h2 className="text-2xl site-heading">{collection.label}</h2>
                <p className="text-sm text-muted">{collection.tagline}</p>
                <PricingTable collection={collection} />

                {/* Fragrance links */}
                <div className="border-t pt-4 space-y-3">
                  <p className="text-xs uppercase tracking-widest text-muted">
                    Fragrances in this collection
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {collectionFragrances.map((f) => (
                      <Link
                        key={f.id}
                        to={`/fragrance/${f.slug}`}
                        className="text-xs border px-3 py-1.5 text-muted uppercase tracking-widest hover:accent-gold hover:border-[#c9a84c] transition-colors"
                      >
                        {f.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2">
                  <Link to="/collections">
                    <Button className="w-full">
                      Shop {collection.label}
                    </Button>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 border p-8 text-center space-y-4">
          <p className="text-lg site-heading">Not sure where to start?</p>
          <p className="text-sm text-muted max-w-md mx-auto">
            Browse the full collection and find a fragrance that speaks to your identity.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link to="/collections">
              <Button>Browse All Fragrances</Button>
            </Link>
            <Link to="/journal">
              <Button variant="ghost">Read the Journal</Button>
            </Link>
          </div>
        </div>

      </Section>
    </>
  );
}