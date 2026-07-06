import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { CollectionCard } from "../components/fragrance/CollectionCard";
import { CollectionGrid } from "../components/fragrance/CollectionGrid";
import { Section } from "../components/layout/Section";
import { Image } from "../components/ui/Image";
import { Button } from "../components/ui/Button";
import { collections, featuredFragrances, fragrances, homeWhyChoose, siteConfig } from "../config/site";
import { organizationSchema } from "../utils/seo";

export function HomePage() {
  const featured = fragrances.filter((fragrance) => featuredFragrances.includes(fragrance.id));

  return (
    <>
      <SEOHead
        title="Alluring Scents | Luxury Perfume South Africa"
        description="Discover timeless extrait de parfum crafted for confidence, elegance, and lasting impressions."
        path="/"
        schema={organizationSchema()}
      />

      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden section-surface">
        <Image src={siteConfig.images.hero} alt="Luxury fragrance hero" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/95" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.8fr)_1fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-7">
            <p className="text-xs uppercase tracking-[0.24em] accent-gold">South Africa • Est. 2024 • Premium Fragrances</p>
            <h1 className="text-5xl leading-tight site-heading md:text-7xl">Alluring Scents</h1>
            <p className="text-sm uppercase tracking-[0.3em] text-muted">Savour the seduction</p>
            <p className="max-w-xl text-base text-muted md:text-lg">
              A perfume house with a sharper point of view: rich blends, clean presentation, and a signature trail that lingers long after the room forgets everything else.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/collections">
                <Button>Shop Collection</Button>
              </Link>
              <Link to="/our-story">
                <Button variant="secondary">Explore Our Story</Button>
              </Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="grid gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-muted">Current Edit</p>
            </div>
            <div className="border border-white/40 bg-white/30 p-8 shadow-lg shadow-black/10 backdrop-blur-xl backdrop-saturate-150">
              <p className="text-xs uppercase tracking-[0.24em] accent-gold">Signature Collection</p>
              <h2 className="mt-4 text-3xl leading-tight md:text-4xl">Scents curated to feel magnetic, modern, and unmistakably yours.</h2>
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

      <Section>
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl site-heading md:text-4xl">Our Story</h2>
          <p className="leading-relaxed text-muted">
            Founded in 2024 by Thato Padi and Katlego Kennedy, Alluring Scents was born from a conversation about fragrance, identity, and creating something timeless. That conversation evolved into a fragrance house dedicated to making luxury perfume accessible without compromising quality.
          </p>
          <Link to="/our-story">
            <Button variant="ghost">Read Our Story</Button>
          </Link>
        </div>
      </Section>

      <Section className="border-y section-surface">
        <h2 className="mb-8 text-3xl site-heading md:text-4xl">Collections</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="mb-8 text-3xl site-heading md:text-4xl">Featured Fragrances</h2>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <CollectionGrid fragrances={featured} />
        </motion.div>
      </Section>

      <Section className="border-y section-surface">
        <h2 className="mb-8 text-3xl site-heading md:text-4xl">Why Choose Alluring Scents</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {homeWhyChoose.map((item) => (
            <p key={item} className="border px-4 py-6 text-sm text-muted">
              {item}
            </p>
          ))}
        </div>
      </Section>

      <Section>
        <div className="space-y-5 border p-8 text-center">
          <h2 className="text-3xl site-heading md:text-4xl">Luxury begins with your signature scent.</h2>
          <Link to="/collections" className="inline-block">
            <Button>Shop Collection</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
