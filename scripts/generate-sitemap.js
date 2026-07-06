import fs from 'fs';
import path from 'path';

// Simple sitemap generator that parses site slugs from source files.
// Works without TypeScript compilation by extracting slug strings via regex.

const base = 'https://alluring-scents-v2.vercel.app/';
const out = path.resolve(process.cwd(), 'public', 'sitemap.xml');

function extractSlugsFromFile(filePath, keyName = 'slug') {
  const src = fs.readFileSync(filePath, 'utf8');
  const regex = new RegExp(`${keyName}\s*:\s*\"([a-z0-9-]+)\"`, 'gi');
  const matches = [];
  let m;
  while ((m = regex.exec(src))) {
    matches.push(m[1]);
  }
  return matches;
}

function main() {
  const staticRoutes = ['/', '/our-story', '/collections', '/pricing', '/journal', '/cart', '/checkout', '/success'];
  const urls = [];

  staticRoutes.forEach((p) => urls.push({ loc: `${base}${p}`, changefreq: 'weekly', priority: p === '/' ? '1.0' : '0.7' }));

  // Extract fragrances
  const siteFile = path.resolve(process.cwd(), 'src', 'config', 'site.ts');
  if (fs.existsSync(siteFile)) {
    const slugs = extractSlugsFromFile(siteFile, 'slug');
    slugs.forEach((s) => urls.push({ loc: `${base}/fragrance/${s}`, changefreq: 'monthly', priority: '0.7' }));
  }

  // Extract journal articles
  const journalFile = path.resolve(process.cwd(), 'src', 'data', 'journalArticles.ts');
  if (fs.existsSync(journalFile)) {
    const jslugs = extractSlugsFromFile(journalFile, 'slug');
    jslugs.forEach((s) => urls.push({ loc: `${base}/journal/${s}`, changefreq: 'monthly', priority: '0.6' }));
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
    .join('\n')}\n</urlset>`;

  fs.writeFileSync(out, xml, 'utf8');
  console.log('Generated sitemap at', out);
}

main();
