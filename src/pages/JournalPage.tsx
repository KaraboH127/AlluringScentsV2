import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Section } from "../components/layout/Section";
import { siteConfig } from "../config/site";
import { journalArticles } from "../data/journalArticles";
import { breadcrumbSchema } from "../utils/seo";

export function JournalPage() {
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
      <section className="relative min-h-[42vh]">
        <img src={siteConfig.images.journal} alt="Journal editorial" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h1 className="text-5xl text-white md:text-6xl">Journal</h1>
        </div>
      </section>
      <Section>
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
          ]}
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {journalArticles.map((article) => (
            <article key={article.slug} className="space-y-3 border border-[#222] p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-[#C9A227]">{article.readingMinutes} min read</p>
              <h2 className="text-2xl text-white">{article.title}</h2>
              <p className="text-sm text-[#CFCFCF]">{article.excerpt}</p>
              <Link to={`/journal/${article.slug}`} className="text-xs uppercase tracking-[0.15em] text-[#EAEAEA] hover:text-[#C9A227]">
                Read Article
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
