import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { CollectionGrid } from "../components/fragrance/CollectionGrid";
import { Section } from "../components/layout/Section";
import { Image } from "../components/ui/Image";
import { Button } from "../components/ui/Button";
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

      {/* ── Hero — Video ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/Hero-Video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — lets text breathe */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl space-y-6"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              South Africa · Est. 2024 · Premium Fragrances
            </p>
            <h1 className="text-5xl leading-[1.05] text-white site-heading md:text-7xl lg:text-8xl">
              Alluring Scents
            </h1>
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Savour the seduction
            </p>
            <p className="max-w-xl text-base text-white/70 md:text-lg leading-relaxed">
              A perfume house with a sharper point of view — rich blends, clean
              presentation, and a signature trail that lingers long after the room
              forgets everything else.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/collections">
                <Button>Shop Collection</Button>
              </Link>
              <Link to="/our-story">
                <button className="px-6 py-3 text-xs uppercase tracking-[0.16em] text-white/70 border border-white/30 hover:border-white/60 hover:text-white transition-colors">
                  Our Story
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee — Sensory strip ───────────────────────────────────────────── */}
      <div className="border-y border-[var(--color-border)] overflow-hidden py-3 section-surface">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[
            "Extrait de Parfum",
            "Long-Lasting Sillage",
            "Crafted in South Africa",
            "Standard Collection",
            "Private Collection",
            "Luxury Without Compromise",
            "Extrait de Parfum",
            "Long-Lasting Sillage",
            "Crafted in South Africa",
            "Standard Collection",
            "Private Collection",
            "Luxury Without Compromise",
          ].map((text, i) => (
            <span key={i} className="text-xs uppercase tracking-[0.2em] text-muted">
              {text} <span className="accent-gold mx-4">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Our Story ─────────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden">
            <Image
              src={siteConfig.images.collection}
              alt="Alluring Scents story"
              className="h-[480px] w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] accent-gold">Our Story</p>
            <h2 className="text-3xl site-heading md:text-4xl leading-tight">
              Born from a conversation<br />about identity.
            </h2>
            <p className="leading-relaxed text-muted">
              Founded in 2024 by Thato Padi and Katlego Kennedy, Alluring Scents was born
              from a conversation about fragrance, identity, and creating something timeless.
              That conversation evolved into a fragrance house dedicated to making luxury
              perfume accessible without compromising quality.
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
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
              <p className="text-xs uppercase tracking-[0.24em] accent-gold">Why Alluring Scents</p>
              <h2 className="text-3xl site-heading md:text-4xl leading-tight">
                Designed for presence, longevity, and personal expression.
              </h2>
              <Link to="/collections">
                <Button className="mt-2">Shop Now</Button>
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {homeWhyChoose.map((item) => (
                <div
                  key={item}
                  className="border border-[var(--color-border)] p-5"
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
        <div className="relative overflow-hidden">
          <Image
            src={siteConfig.images.collection}
            alt="Alluring Scents collection"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative px-8 py-20 text-center space-y-6 sm:py-28">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Begin your signature</p>
            <h2 className="text-3xl site-heading md:text-5xl text-white leading-tight">
              Luxury begins with<br />your signature scent.
            </h2>
            <p className="mx-auto max-w-xl text-base text-white/60 leading-relaxed">
              Discover the collection and find the fragrance that fits your rhythm,
              your style, and the impression you want to leave.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link to="/collections">
                <Button>Shop Collection</Button>
              </Link>
              <Link to="/journal">
                <button className="px-6 py-3 text-xs uppercase tracking-[0.16em] text-white/70 border border-white/30 hover:border-white/60 hover:text-white transition-colors">
                  Read Journal
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}