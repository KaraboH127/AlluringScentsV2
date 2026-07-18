import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { SEOHead } from "../SEOHead";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Section } from "../components/layout/Section";
import { Image } from "../components/ui/Image";
import { Button } from "../components/ui/Button";
import { journalArticles } from "../data/journalArticles";
import { breadcrumbSchema } from "../utils/seo";
import { fragrances } from "../config/site";

export function JournalArticlePage() {
  const { slug = "" } = useParams();
  const article = journalArticles.find((entry) => entry.slug === slug);

  if (!article) {
    return (
      <Section>
        <h1 className="text-3xl site-heading">Article not found.</h1>
      </Section>
    );
  }

  // Pick 3 random fragrances for the related products section
  const related = fragrances.slice(0, 3);

  return (
    <>
      <SEOHead
        title={article.seoTitle}
        description={article.metaDescription}
        path={`/journal/${article.slug}`}
        type="article"
        schema={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.metaDescription,
          datePublished: article.publishedAt,
          author: { "@type": "Organization", name: "Alluring Scents" },
          keywords: article.keywords.join(", "),
          breadcrumb: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: article.title, path: `/journal/${article.slug}` },
          ]),
        }}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] overflow-hidden">
        <Image
          src="/image6.webp"
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/80" />
        <div className="relative mx-auto flex min-h-[50vh] max-w-4xl flex-col justify-end px-4 pb-14 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                {article.readingMinutes} min read
              </p>
              <span className="text-white/30">·</span>
              <p className="text-xs text-white/60">
                {new Date(article.publishedAt).toLocaleDateString("en-ZA", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              </p>
            </div>
            <h1
              className="text-4xl leading-tight site-heading md:text-5xl text-white"
              style={{ color: "white" }}
            >
              {article.title}
            </h1>
            <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
              {article.metaDescription}
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: article.title, path: `/journal/${article.slug}` },
          ]}
        />

        <article className="mx-auto max-w-3xl space-y-10 mt-8">

          {/* Article content */}
          <section className="space-y-8 text-muted">
            {article.headings.map((heading, index) => (
              <div key={heading} className="space-y-4">
                <h2 className="text-2xl site-heading text-[var(--color-text)]">{heading}</h2>
                <p className="leading-relaxed">{article.content[index] ?? ""}</p>

                {/* Pull quote after second section */}
                {index === 1 && article.content[index] && (
                  <blockquote className="border-l-2 border-[var(--color-gold)] pl-6 py-2 my-6">
                    <p className="text-xl site-heading text-[var(--color-text)] leading-relaxed italic">
                      "{article.content[index].split(".")[0]}."
                    </p>
                  </blockquote>
                )}
              </div>
            ))}
            {article.content.slice(article.headings.length).map((paragraph, i) => (
              <p key={i} className="leading-relaxed">{paragraph}</p>
            ))}
          </section>

          {/* Keywords */}
          <div className="border-t pt-6 flex flex-wrap gap-2">
            {article.keywords.map((kw) => (
              <span
                key={kw}
                className="text-xs uppercase tracking-widest border border-[var(--color-border)] px-3 py-1.5 text-muted"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Related fragrances */}
          <div className="border-t pt-8 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] accent-gold">Explore the Collection</p>
            <div className="grid grid-cols-3 gap-4">
              {related.map((f) => (
                <Link key={f.id} to={`/fragrance/${f.slug}`} className="group space-y-2">
                  <div className="overflow-hidden">
                    <Image
                      src={f.image}
                      alt={f.name}
                      className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-muted group-hover:accent-gold transition-colors text-center">
                    {f.name}
                  </p>
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link to="/collections">
                <Button>Browse Collection</Button>
              </Link>
              <Link to="/journal">
                <Button variant="ghost">Back to Journal</Button>
              </Link>
            </div>
          </div>

        </article>
      </Section>
    </>
  );
}