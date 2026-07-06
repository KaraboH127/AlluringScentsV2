import { fragrances } from "../config/site";
import { journalArticles } from "../data/journalArticles";

const base = "https://alluring-scents-v2.vercel.app/";

const staticRoutes = ["/", "/our-story", "/collections", "/pricing", "/journal", "/cart", "/checkout", "/success"];

export const sitemapUrls = [
  ...staticRoutes,
  ...fragrances.map((fragrance) => `/fragrance/${fragrance.slug}`),
  ...journalArticles.map((article) => `/journal/${article.slug}`),
].map((path) => `${base}${path}`);

export function getSitemapXml() {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n")}\n</urlset>`;
}
