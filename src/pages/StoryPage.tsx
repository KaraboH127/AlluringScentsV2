import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { siteConfig } from "../config/site";
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
      <section className="relative min-h-[60vh] section-surface">
        <img src={siteConfig.images.founders} alt="Founders of Alluring Scents" className="absolute inset-0 h-full w-full object-cover opacity-12" />
        <div className="absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <p className="text-xs uppercase tracking-[0.24em] accent-gold">Our Story</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-tight site-heading md:text-6xl">A Conversation That Became a Fragrance House.</h1>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <article className="space-y-4">
            <h2 className="text-3xl site-heading">Our Beginning</h2>
            <p className="text-muted">
              Founded in 2024 by Thato Padi and Katlego Kennedy, Alluring Scents began as a conversation about fragrance, identity, and self-expression. What started as a shared obsession became a purpose-driven fragrance house.
            </p>
          </article>
          <img src={siteConfig.images.lifestyle} alt="Alluring Scents lifestyle" className="h-80 w-full object-cover" />
        </div>
      </Section>

      <Section className="border-y section-surface">
        <div className="grid gap-12 lg:grid-cols-2">
          <img src={siteConfig.images.founders} alt="Thato Padi and Katlego Kennedy" className="h-80 w-full object-cover" />
          <article className="space-y-4">
            <h2 className="text-3xl site-heading">The Founders</h2>
            <p className="text-muted">
              Thato Padi and Katlego Kennedy built Alluring Scents around a clear belief: fragrance should feel deeply personal and undeniably premium, while staying accessible to those who value quality.
            </p>
          </article>
        </div>
      </Section>

      <Section>
        <div className="space-y-12">
          <article className="space-y-4">
            <h2 className="text-3xl site-heading">Craftsmanship</h2>
            <p className="max-w-3xl text-muted">
              Every composition is designed with balance, depth, and longevity in mind. We focus on extrait-level concentration to deliver scent performance that carries confidently from day to evening.
            </p>
          </article>
          <article className="space-y-4">
            <h2 className="text-3xl site-heading">Our Philosophy</h2>
            <p className="max-w-3xl text-muted">
              Luxury should not be loud. It should be intentional, refined, and memorable. Our fragrances are made for people who understand that presence is often expressed quietly.
            </p>
          </article>
          <article className="space-y-4">
            <h2 className="text-3xl site-heading">Vision</h2>
            <p className="max-w-3xl text-muted">
              To become one of South Africa's defining luxury fragrance houses by creating timeless scents that move beyond trends and become personal signatures.
            </p>
          </article>
        </div>
      </Section>
    </>
  );
}
