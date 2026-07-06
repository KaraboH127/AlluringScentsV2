import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { CollectionCard } from "../components/fragrance/CollectionCard";
import { CollectionGrid } from "../components/fragrance/CollectionGrid";
import { Section } from "../components/layout/Section";
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

      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        <img src={siteConfig.images.hero} alt="Luxury fragrance hero" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl space-y-7">
            <p className="text-xs uppercase tracking-[0.24em] text-[#C9A227]">Alluring Scents</p>
            <h1 className="text-5xl leading-tight text-white md:text-7xl">Discover Your Signature.</h1>
            <p className="max-w-xl text-base text-[#D4D4D4] md:text-lg">
              Luxury fragrances crafted for those who leave lasting impressions.
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
        </div>
      </section>

      <Section>
        <div className="max-w-3xl space-y-4">
          <h2 className="text-3xl text-white md:text-4xl">Our Story</h2>
          <p className="leading-relaxed text-[#CFCFCF]">
            Founded in 2024 by Thato Padi and Katlego Kennedy, Alluring Scents was born from a conversation about fragrance, identity, and creating something timeless. That conversation evolved into a fragrance house dedicated to making luxury perfume accessible without compromising quality.
          </p>
          <Link to="/our-story">
            <Button variant="ghost">Read Our Story</Button>
          </Link>
        </div>
      </Section>

      <Section className="border-y border-[#1D1D1D] bg-[#0D0D0D]">
        <h2 className="mb-8 text-3xl text-white md:text-4xl">Collections</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </Section>

      <Section>
        <h2 className="mb-8 text-3xl text-white md:text-4xl">Featured Fragrances</h2>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <CollectionGrid fragrances={featured} />
        </motion.div>
      </Section>

      <Section className="border-y border-[#1D1D1D] bg-[#0D0D0D]">
        <h2 className="mb-8 text-3xl text-white md:text-4xl">Why Choose Alluring Scents</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {homeWhyChoose.map((item) => (
            <p key={item} className="border border-[#222] px-4 py-6 text-sm text-[#EAEAEA]">
              {item}
            </p>
          ))}
        </div>
      </Section>

      <Section>
        <div className="space-y-5 border border-[#222] p-8 text-center">
          <h2 className="text-3xl text-white md:text-4xl">Luxury begins with your signature scent.</h2>
          <Link to="/collections" className="inline-block">
            <Button>Shop Collection</Button>
          </Link>
        </div>
      </Section>
    </>
  );
}
