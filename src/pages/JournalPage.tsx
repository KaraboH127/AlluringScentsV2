import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SEOHead } from "../SEOHead";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Section } from "../components/layout/Section";
import { Image } from "../components/ui/Image";
import { breadcrumbSchema } from "../utils/seo";
import { journalArticles } from "../data/journalArticles";

export function JournalPage() {
  const [featured, ...rest] = journalArticles;

  return (
    <>
      <SEOHead
        title="Journal | Alluring Scents"
        description="Expert fragrance guides on signature scents, extrait de parfum, seasonal picks, and luxury perfume care."
        path="/journal"
        schema={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
        ])}
      />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[55vh] overflow-hidden">
        <Image
          src="/image3.webp"
          alt="Journal editorial"
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        <div className="relative mx-auto flex min-h-[55vh] max-w-6xl flex-col justify-end px-4 pb-14 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-3"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">Alluring Scents</p>
            <h1 className="text-5xl site-heading md:text-6xl text-white" style={{ color: "white" }}>
              Journal
            </h1>
            <p className="text-sm text-white/60 max-w-md">
              Fragrance guides, scent stories, and the art of wearing perfume with intention.
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
          ]}
        />

        {/* Featured article */}
        {featured && (
          <Link
            to={`/journal/${featured.slug}`}
            className="group mt-6 grid gap-6 lg:grid-cols-2 lg:items-center border p-6 hover:border-[var(--color-gold)] transition-colors mb-10"
          >
            <div className="overflow-hidden">
              <Image
                src="/image10.webp"
                alt={featured.title}
                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <p className="text-xs uppercase tracking-[0.2em] accent-gold">Featured</p>
                <span className="text-muted text-xs">·</span>
                <p className="text-xs text-muted">{featured.readingMinutes} min read</p>
                <span className="text-muted text-xs">·</span>
                <p className="text-xs text-muted">
                  {new Date(featured.publishedAt).toLocaleDateString("en-ZA", {
                    day: "numeric", month: "long", year: "numeric",
                  })}
                </p>
              </div>
              <h2 className="text-2xl site-heading md:text-3xl leading-tight group-hover:accent-gold transition-colors">
                {featured.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{featured.excerpt}</p>
              <p className="text-xs uppercase tracking-[0.2em] text-muted group-hover:accent-gold transition-colors">
                Read Article →
              </p>
            </div>
          </Link>
        )}

        {/* Rest of articles */}
        {rest.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {rest.map((article, i) => {
              const images = ["/image5.webp", "/image1.webp", "/image8.webp", "/image0.webp"];
              return (
                <Link
                  key={article.slug}
                  to={`/journal/${article.slug}`}
                  className="group border p-5 space-y-4 hover:border-[var(--color-gold)] transition-colors"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={images[i % images.length]}
                      alt={article.title}
                      className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-xs uppercase tracking-[0.15em] accent-gold">
                        {article.readingMinutes} min read
                      </p>
                      <span className="text-muted text-xs">·</span>
                      <p className="text-xs text-muted">
                        {new Date(article.publishedAt).toLocaleDateString("en-ZA", {
                          day: "numeric", month: "long", year: "numeric",
                        })}
                      </p>
                    </div>
                    <h2 className="text-xl site-heading leading-tight group-hover:accent-gold transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted leading-relaxed">{article.excerpt}</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-muted group-hover:accent-gold transition-colors">
                      Read Article →
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}