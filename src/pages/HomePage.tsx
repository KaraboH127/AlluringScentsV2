import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Image } from "../components/ui/Image";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { featuredFragrances, homeWhyChoose, siteConfig } from "../config/site";
import { useFragrances, useCollections } from "../hooks/useProducts";
import { organizationSchema } from "../utils/seo";

const SLIDE_DURATION = 5000;

export function HomePage() {
  const { fragrances, loading: fragrancesLoading }   = useFragrances();
  const { collections, loading: collectionsLoading } = useCollections();
  const loading = fragrancesLoading || collectionsLoading;

  const featured = fragrances.filter((f) => featuredFragrances.includes(f.id));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);
  const [touchStart, setTouchStart]   = useState<number | null>(null);
  const intervalRef                   = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeFragrance  = featured[activeIndex];
  const activeCollection = collections.find((c) => c.id === activeFragrance?.collection);

  useEffect(() => {
    if (isPaused || featured.length === 0) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featured.length);
    }, SLIDE_DURATION);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPaused, featured.length]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % featured.length);
      }, SLIDE_DURATION);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goTo((activeIndex + 1) % featured.length);
      else goTo((activeIndex - 1 + featured.length) % featured.length);
    }
    setTouchStart(null);
  };

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
        <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="/Hero-Video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
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
            <h1 className="text-5xl leading-[1.05] text-white site-heading md:text-7xl lg:text-8xl" style={{ color: "white" }}>
              Alluring Scents
            </h1>
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">Savour the seduction</p>
            <p className="max-w-xl text-base text-white/70 md:text-lg leading-relaxed">
              A perfume house with a sharper point of view — rich blends, clean
              presentation, and a signature trail that lingers long after the room
              forgets everything else.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/collections"><Button>Shop Collection</Button></Link>
              <Link to="/our-story">
                <button className="px-6 py-3 text-xs uppercase tracking-[0.16em] text-white/70 border border-white/30 hover:border-white/60 hover:text-white transition-colors">
                  Our Story
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Marquee ───────────────────────────────────────────────────────────── */}
      <div className="border-y border-[var(--color-border)] overflow-hidden py-3 section-surface">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[
            "Extrait de Parfum", "Long-Lasting Sillage", "Crafted in South Africa",
            "Standard Collection", "Private Collection", "Luxury Without Compromise",
            "Extrait de Parfum", "Long-Lasting Sillage", "Crafted in South Africa",
            "Standard Collection", "Private Collection", "Luxury Without Compromise",
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
            <Image src={siteConfig.images.collection} alt="Alluring Scents story" className="h-[480px] w-full object-cover" />
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
            <Link to="/our-story"><Button variant="ghost">Read Our Story</Button></Link>
          </div>
        </div>
      </Section>

      {/* ── Collections ───────────────────────────────────────────────────────── */}
      <Section className="border-y section-surface">
        <div className="mb-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] accent-gold">Our Collections</p>
          <h2 className="text-3xl site-heading md:text-4xl">Two collections. One identity.</h2>
        </div>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-72 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {collections.map((collection) => {
              const collectionFragrances = fragrances.filter((f) => f.collection === collection.id);
              const coverImage = collectionFragrances[0]?.image ?? siteConfig.images.collection;
              return (
                <Link key={collection.id} to="/collections" className="group block">
                  <div className="overflow-hidden">
                    <Image src={coverImage} alt={collection.name} className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
        )}
      </Section>

      {/* ── Featured Fragrances Carousel ──────────────────────────────────────── */}
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

        {loading || featured.length === 0 ? (
          <div className="space-y-8">
            <Skeleton className="h-[420px] sm:h-[520px] w-full" />
            <div className="grid gap-8 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </div>
          </div>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Image carousel */}
            <div className="relative h-[420px] sm:h-[520px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeFragrance.image}
                    alt={activeFragrance.name}
                    className="h-full w-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute top-4 left-4">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeIndex}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.5 }}
                    className="text-xs uppercase tracking-[0.2em] accent-gold border border-[var(--color-gold)] px-3 py-1 bg-white/80 backdrop-blur-sm"
                  >
                    {activeCollection?.name}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-border)]">
                {!isPaused && (
                  <motion.div
                    key={activeIndex}
                    className="h-full bg-[var(--color-gold)]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                  />
                )}
              </div>
            </div>

            {/* Fragrance info */}
            <div className="mt-8 min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="grid gap-8 lg:grid-cols-[1fr_1px_1fr_1px_1fr]"
                >
                  <div className="space-y-3">
                    <h3 className="text-3xl site-heading md:text-4xl">{activeFragrance.name}</h3>
                    <p className="text-sm uppercase tracking-[0.18em] text-muted">{activeFragrance.extrait}</p>
                    <p className="text-sm text-muted leading-relaxed">{activeFragrance.description}</p>
                    <p className="text-lg accent-gold site-heading">
                      From R{activeCollection?.prices["10ml"]}
                    </p>
                  </div>

                  <div className="hidden lg:block bg-[var(--color-border)]" />

                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">Fragrance Notes</p>
                    {[
                      { label: "Top",    value: activeFragrance.notes.top    },
                      { label: "Middle", value: activeFragrance.notes.middle },
                      { label: "Base",   value: activeFragrance.notes.base   },
                    ].map((note) => (
                      <div key={note.label} className="space-y-0.5">
                        <p className="text-xs uppercase tracking-[0.15em] accent-gold">{note.label}</p>
                        <p className="text-sm text-muted">{note.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="hidden lg:block bg-[var(--color-border)]" />

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Best For</p>
                      <p className="text-sm text-muted">{activeFragrance.bestFor}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Personality</p>
                      <p className="text-sm text-muted">{activeFragrance.personality}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">Occasions</p>
                      <p className="text-sm text-muted">{activeFragrance.occasions.join(", ")}</p>
                    </div>
                    <Link to={`/fragrance/${activeFragrance.slug}`}>
                      <Button className="mt-2">Explore {activeFragrance.name}</Button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-3 mt-8">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-500 rounded-full ${
                    i === activeIndex
                      ? "w-6 h-2 bg-[var(--color-gold)]"
                      : "w-2 h-2 bg-[var(--color-border)] hover:bg-[var(--color-gold-strong)]"
                  }`}
                  aria-label={`Go to ${featured[i].name}`}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 sm:hidden">
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
              <Link to="/collections"><Button className="mt-2">Shop Now</Button></Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {homeWhyChoose.map((item) => (
                <div key={item} className="border border-[var(--color-border)] p-5">
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
          <Image src={siteConfig.images.collection} alt="Alluring Scents collection" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative px-8 py-20 text-center space-y-6 sm:py-28">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Begin your signature</p>
            <h2 className="text-3xl site-heading md:text-5xl text-white leading-tight" style={{ color: "white" }}>
              Luxury begins with<br />your signature scent.
            </h2>
            <p className="mx-auto max-w-xl text-base text-white/60 leading-relaxed">
              Discover the collection and find the fragrance that fits your rhythm,
              your style, and the impression you want to leave.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link to="/collections"><Button>Shop Collection</Button></Link>
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