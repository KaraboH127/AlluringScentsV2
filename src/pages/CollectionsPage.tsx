import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { Image } from "../components/ui/Image";
import { collections, fragrances } from "../config/site";

export function CollectionsPage() {
  return (
    <>
      <SEOHead
        title="Collections | Alluring Scents"
        description="Explore the Standard and Private collections from Alluring Scents, premium extrait de parfum for every identity."
        path="/collections"
      />

      {/* Hero intro */}
      <Section>
        <div className="max-w-2xl space-y-3 mb-16">
          <h1 className="text-4xl site-heading md:text-5xl">Collections</h1>
          <p className="text-sm text-muted leading-relaxed">
            Two collections. One for everyday elegance, one for those who leave a mark.
            Find the fragrance that speaks your identity.
          </p>
        </div>

        <div className="space-y-24">
          {collections.map((collection, index) => {
            const items = fragrances.filter((f) => f.collection === collection.id);
            const featured = items.slice(0, 3);
            const isReversed = index % 2 !== 0;

            return (
              <article key={collection.id} className="space-y-10">

                {/* Collection header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] accent-gold">{collection.name}</p>
                    <h2 className="text-3xl site-heading">{collection.tagline}</h2>
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {items.length} Fragrances
                  </p>
                </div>

                {/* Featured images + description */}
                <div className={`grid gap-6 lg:grid-cols-2 lg:items-center ${isReversed ? "lg:[direction:rtl]" : ""}`}>

                  {/* Featured fragrance images */}
                  <div className={`grid grid-cols-3 gap-3 ${isReversed ? "lg:[direction:ltr]" : ""}`}>
                    {featured.map((f) => (
                      <Link key={f.id} to={`/fragrance/${f.slug}`} className="group space-y-2">
                        <div className="overflow-hidden bg-[#f5f5f5]">
                          <Image
                            src={f.image}
                            alt={f.name}
                            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <p className="text-xs uppercase tracking-widest text-muted group-hover:accent-gold transition-colors text-center">
                          {f.name}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* Description + actions */}
                  <div className={`space-y-6 ${isReversed ? "lg:[direction:ltr]" : ""}`}>
                    <p className="text-base leading-relaxed text-muted">{collection.description}</p>

                    {/* All fragrance pills */}
                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-widest text-muted">All Fragrances</p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((f) => (
                          <Link
                            key={f.id}
                            to={`/fragrance/${f.slug}`}
                            className="border px-3 py-1.5 text-xs uppercase tracking-widest text-muted hover:accent-gold hover:border-[#c9a84c] transition-colors"
                          >
                            {f.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Starting price */}
                    <p className="text-sm text-muted">
                      Starting from{" "}
                      <span className="accent-gold">
                        R{collection.prices["10ml"]}
                      </span>
                      {" "}· Available in 10ml, 50ml & 100ml
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-3">
                      <Link to="/pricing">
                        <Button variant="ghost">View Pricing</Button>
                      </Link>
                    </div>
                  </div>
                </div>

              </article>
            );
          })}
        </div>
      </Section>
    </>
  );
}