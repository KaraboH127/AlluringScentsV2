import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { CollectionGrid } from "../components/fragrance/CollectionGrid";
import { Section } from "../components/layout/Section";
import { Image } from "../components/ui/Image";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { collections, featuredFragrances, fragrances, homeWhyChoose, siteConfig } from "../config/site";
import { organizationSchema } from "../utils/seo";

export function HomePage() {
  const featured = fragrances.filter((f) => featuredFragrances.includes(f.id));

  return (
    <>
      <SEOHead
        title="Alluring Scents | Luxury Perfume South Africa"
        description="Discover timeless extrait de parfum crafted for confidence, elegance, and lasting impressions."
        path="/"
        schema={organizationSchema()}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden section-surface">
        <Skeleton className="absolute inset-0 h-full w-full" />
        <Image
          src={siteConfig.images.hero}
          alt="Luxury fragrance hero"
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/95" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.8fr)_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-7"
          >
            <p className="text-xs uppercase tracking-[0.24em] accent-gold">South Africa • Est. 2024 • Premium Fragrances</p>
            <h1 className="text-5xl leading-tight site-heading md:text-7xl">Alluring Scents</h1>
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Savour the seduction</p>
            <p className="max-w-xl text-base text-muted md:text-lg">
              A perfume house with a sharper point of view: rich blends, clean presentation, and a signature trail that lingers long after the room forgets everything else.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/collections"><Button>Shop Collection</Button></Link>
              <Link to="/our-story"><Button variant="secondary">Explore Our Story</Button></Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid gap-5"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Current Edit</p>
            </div>
            <div className="border border-white/40 bg-white/30 p-8 shadow-lg shadow-black/10 backdrop-blur-xl backdrop-saturate-150">
              <p className="text-xs uppercase tracking-[0.24em] accent-gold">Signature Collection</p>
              <h2 className="mt-4 text-3xl leading-tight md:text-4xl">
                Scents curated to feel magnetic, modern, and unmistakably yours.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-white/40 bg-white/25 p-6 shadow-sm shadow-black/10 backdrop-blur-xl backdrop-saturate-150">
                <p className="text-xl font-semibold">01</p>
                <p className="mt-4 text-sm text-muted">Luxury blends built for presence, memory, and mood.</p>
              </div>
              <div className="border border-white/40 bg-white/25 p-6 shadow-sm shadow-black/10 backdrop-blur-xl backdrop-saturate-150">
                <p className="text-xl font-semibold">ZA</p>
                <p className="mt-4 text-sm text-muted">Curated in South Africa with a cleaner, fashion-led point of view.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden">
            <Image
              src={siteConfig.images.collection}
              alt="Alluring Scents story"
              className="h-[420px] w-full object-cover"
            />
          </div>
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.24em] accent-gold">Our Story</p>
            <h2 className="text-3xl site-heading md:text-4xl">Born from a conversation about identity.</h2>
            <p className="leading-relaxed text-muted">
              Founded in 2024 by Thato Padi and Katlego Kennedy, Alluring Scents was born from a conversation about fragrance, identity, and creating something timeless. That conversation evolved into a fragrance house dedicated to making luxury perfume accessible without compromising quality.
            </p>
            <Link to="/our-story">
              <Button variant="ghost">Read Our Story</Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* ── Collections ───────────────────────────────────────────────────────── */}
      <Section className="border-y section-surface">
        <div className="mb-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] accent-gold">Our Collections</p>
          <h2 className="text-3xl site-heading md:text-4xl">Two collections. One identity.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection) => {
            const collectionFragrances = fragrances.filter((f) => f.collection === collection.id);
            const coverImage = collectionFragrances[0]?.image ?? siteConfig.images.collection;
            return (
              <Link key={collection.id} to="/collections" className="group block">
                <div className="overflow-hidden">
                  <Image
                    src={coverImage}
                    alt={collection.name}
                    className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="border border-t-0 panel-surface p-6 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] accent-gold">{collection.name}</p>
                  <h3 className="text-2xl site-heading">{collection.tagline}</h3>
                  <p className="text-sm text-muted">{collection.description}</p>
                  <p className="text-sm accent-gold pt-1">
                    Starting from R{collection.prices["10ml"]} · {collectionFragrances.length} fragrances
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ── Featured Fragrances ───────────────────────────────────────────────── */}
      <Section>
        <div className="mb-8 flex items-end justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.24em] accent-gold">Hand Picked</p>
            <h2 className="text-3xl site-heading md:text-4xl">Featured Fragrances</h2>
          </div>
          <Link to="/collections" className="hidden sm:block">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <CollectionGrid fragrances={featured} />
        </motion.div>
        <div className="mt-6 sm:hidden">
          <Link to="/collections">
            <Button variant="ghost" className="w-full">View All Fragrances</Button>
          </Link>
        </div>
      </Section>

      {/* ── Why Choose ────────────────────────────────────────────────────────── */}
      <Section className="border-y section-surface">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.24em] accent-gold">Why choose Alluring Scents</p>
              <h2 className="text-3xl site-heading md:text-4xl">
                A fragrance house designed for presence, longevity, and personal expression.
              </h2>
              <Link to="/collections">
                <Button className="mt-2">Shop Now</Button>
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {homeWhyChoose.map((item) => (
                <div
                  key={item}
                  className="border border-white/40 bg-white/30 p-5 shadow-sm shadow-black/10 backdrop-blur-xl backdrop-saturate-150"
                >
                  <p className="text-sm text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── Final CTA ─────────────────────────────────────────────────────────── */}
      <Section>
        <div className="mx-auto max-w-5xl border border-white/40 bg-white/30 p-8 text-center shadow-lg shadow-black/10 backdrop-blur-xl backdrop-saturate-150 sm:p-10">
          <p className="text-xs uppercase tracking-[0.24em] accent-gold">Begin your signature</p>
          <h2 className="mt-4 text-3xl site-heading md:text-4xl">Luxury begins with your signature scent.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted">
            Discover the collection and find the fragrance that fits your rhythm, your style, and the impression you want to leave.
          </p>
          <Link to="/collections" className="mt-6 inline-block">
            <Button>Shop Collection</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}