import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Image } from "../components/ui/Image";
import { Button } from "../components/ui/Button";
import { breadcrumbSchema } from "../utils/seo";

export function StoryPage() {
  return (
    <>
      <SEOHead
        title="Our Story | Alluring Scents"
        description="The origin of Alluring Scents and the vision behind a modern luxury fragrance house in South Africa."
        path="/our-story"
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Our Story", path: "/our-story" },
        ])}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] overflow-hidden">
        <Image
          src="/image4.webp"
          alt="Alluring Scents"
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-6xl flex-col justify-end px-4 pb-16 sm:px-6 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-3xl space-y-4"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Our Story</p>
            <h1 className="text-5xl leading-[1.05] text-white site-heading md:text-6xl" style={{ color: "white" }}>
              A Conversation That Became<br />a Fragrance House.
            </h1>
            <p className="text-base text-white/60 max-w-xl leading-relaxed">
              Founded in South Africa with a belief that luxury should be intentional,
              accessible, and deeply personal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Our Beginning ─────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] accent-gold">The Beginning</p>
            <h2 className="text-3xl site-heading md:text-4xl leading-tight">
              Born from a shared obsession with fragrance and identity.
            </h2>
            <p className="text-muted leading-relaxed">
              Founded in 2024 by Thato Padi and Katlego Kennedy, Alluring Scents began as a
              conversation about fragrance, identity, and self-expression. What started as a
              shared obsession became a purpose-driven fragrance house.
            </p>
            <p className="text-muted leading-relaxed">
              The idea was simple — create something that feels genuinely luxurious without
              the gatekeeping. Fragrance that is rich, intentional, and made for people who
              wear their identity with confidence.
            </p>
          </div>
          <div className="overflow-hidden">
            <Image
              src="/image12.webp"
              alt="Alluring Scents beginning"
              className="h-[480px] w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* ── Pull Quote ────────────────────────────────────────────────────────── */}
      <section className="border-y section-surface py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl text-center space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] accent-gold">Our Philosophy</p>
          <blockquote className="text-3xl site-heading md:text-4xl lg:text-5xl leading-tight text-[var(--color-text)]">
            "Luxury should not be loud. It should be intentional, refined, and memorable."
          </blockquote>
          <p className="text-sm text-muted">— Alluring Scents</p>
        </div>
      </section>

      {/* ── The Founders ──────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="overflow-hidden">
            <Image
              src="/image11.webp"
              alt="Thato Padi and Katlego Kennedy"
              className="h-[480px] w-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.24em] accent-gold">The Founders</p>
            <h2 className="text-3xl site-heading md:text-4xl leading-tight">
              Thato Padi &amp; Katlego Kennedy.
            </h2>
            <p className="text-muted leading-relaxed">
              Thato Padi and Katlego Kennedy built Alluring Scents around a clear belief:
              fragrance should feel deeply personal and undeniably premium, while staying
              accessible to those who value quality.
            </p>
            <p className="text-muted leading-relaxed">
              Their vision was not to follow trends but to create a house with its own
              language — one that speaks through longevity, depth, and the quiet confidence
              of a well-chosen scent.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Three pillars ─────────────────────────────────────────────────────── */}
      <Section className="border-y section-surface">
        <div className="mb-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.24em] accent-gold">What We Stand For</p>
          <h2 className="text-3xl site-heading md:text-4xl">The pillars of the house.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Craftsmanship",
              image: "/image6.webp",
              body: "Every composition is designed with balance, depth, and longevity in mind. We focus on extrait-level concentration to deliver scent performance that carries confidently from day to evening.",
            },
            {
              title: "Philosophy",
              image: "/image2.webp",
              body: "Luxury should not be loud. It should be intentional, refined, and memorable. Our fragrances are made for people who understand that presence is often expressed quietly.",
            },
            {
              title: "Vision",
              image: "/image7.webp",
              body: "To become one of South Africa's defining luxury fragrance houses by creating timeless scents that move beyond trends and become personal signatures.",
            },
          ].map((pillar) => (
            <div key={pillar.title} className="space-y-4">
              <div className="overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  className="h-56 w-full object-cover"
                />
              </div>
              <div className="space-y-2 p-2">
                <p className="text-xs uppercase tracking-[0.2em] accent-gold">{pillar.title}</p>
                <p className="text-muted text-sm leading-relaxed">{pillar.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.24em] accent-gold">Begin Your Journey</p>
            <h2 className="text-3xl site-heading md:text-4xl leading-tight">
              Find the fragrance that tells your story.
            </h2>
            <p className="text-muted leading-relaxed max-w-md">
              Explore our Standard and Private collections and discover the scent that
              becomes your signature.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/collections">
                <Button>Shop Collection</Button>
              </Link>
              <Link to="/journal">
                <Button variant="ghost">Read the Journal</Button>
              </Link>
            </div>
          </div>
          <div className="overflow-hidden">
            <Image
              src="/image9.webp"
              alt="Alluring Scents collection"
              className="h-[360px] w-full object-cover"
            />
          </div>
        </div>
      </Section>
    </>
  );
}