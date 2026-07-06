import { Link, useParams } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { Breadcrumb } from "../components/ui/Breadcrumb";
import { Section } from "../components/layout/Section";
import { journalArticles } from "../data/journalArticles";
import { breadcrumbSchema } from "../utils/seo";

export function JournalArticlePage() {
  const { slug = "" } = useParams();
  const article = journalArticles.find((entry) => entry.slug === slug);

  if (!article) {
    return (
      <Section>
        <h1 className="text-3xl text-white">Article not found.</h1>
      </Section>
    );
  }

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

      <Section>
        <Breadcrumb
          items={[
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: article.title, path: `/journal/${article.slug}` },
          ]}
        />
        <article className="mx-auto max-w-3xl space-y-8">
          <header className="space-y-4 border-b border-[#222] pb-6">
            <p className="text-xs uppercase tracking-[0.14em] text-[#C9A227]">{article.readingMinutes} min read</p>
            <h1 className="text-4xl leading-tight text-white md:text-5xl">{article.title}</h1>
            <p className="text-sm text-[#BEBEBE]">{article.metaDescription}</p>
          </header>

          <section className="space-y-6 text-[#D4D4D4]">
            {article.headings.map((heading, index) => (
              <div key={heading} className="space-y-3">
                <h2 className="text-2xl text-white">{heading}</h2>
                <p>{article.content[index] ?? ""}</p>
              </div>
            ))}
            {article.content.slice(article.headings.length).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section className="border-t border-[#222] pt-6 text-sm">
            <p className="mb-3 text-[#C9A227]">Related Links</p>
            <div className="flex flex-wrap gap-4">
              <Link to="/collections" className="text-[#EAEAEA] hover:text-[#C9A227]">
                Browse Collection
              </Link>
              <Link to="/pricing" className="text-[#EAEAEA] hover:text-[#C9A227]">
                View Pricing
              </Link>
              <Link to="/our-story" className="text-[#EAEAEA] hover:text-[#C9A227]">
                Read Our Story
              </Link>
            </div>
          </section>
        </article>
      </Section>
    </>
  );
}
