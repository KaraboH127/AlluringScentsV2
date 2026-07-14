import type { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";

const ogMeta: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Alluring Scents | Luxury Perfume South Africa",
    description: "Luxury fragrances and premium perfume collections designed for everyday elegance and bold statement moments.",
  },
  "/our-story": {
    title: "Our Story | Alluring Scents",
    description: "Discover the story behind Alluring Scents — a luxury fragrance brand built on identity, confidence, and timeless self-expression.",
  },
  "/collections": {
    title: "Collections | Alluring Scents",
    description: "Explore the Alluring Scents fragrance collections — Standard and Private. Luxury perfumes crafted for every moment.",
  },
  "/pricing": {
    title: "Pricing | Alluring Scents",
    description: "View pricing for Alluring Scents luxury fragrances available in 10ml, 50ml and 100ml.",
  },
  "/journal": {
    title: "Journal | Alluring Scents",
    description: "Explore fragrance guides, scent stories and lifestyle articles from the Alluring Scents journal.",
  },
  "/track-order": {
    title: "Track Your Order | Alluring Scents",
    description: "Enter your order ID to track your Alluring Scents fragrance delivery.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | Alluring Scents",
    description: "How Alluring Scents collects, uses and protects your personal information in accordance with POPIA.",
  },
  "/terms-of-use": {
    title: "Terms of Use | Alluring Scents",
    description: "Terms and conditions governing the use of the Alluring Scents website and purchase of products.",
  },
  "/returns-refunds": {
    title: "Returns, Refunds & Exchanges | Alluring Scents",
    description: "Our returns, refunds and exchanges policy for products purchased through Alluring Scents.",
  },
};

const BASE_URL = "https://alluring-scents-v2.vercel.app";
const DEFAULT_IMAGE = `${BASE_URL}/Alluring_scents_logo.avif`;

export default function handler(req: VercelRequest, res: VercelResponse) {
  const pathname = (req.query.path as string) ?? "/";

  let meta = ogMeta[pathname];

  if (!meta && pathname.startsWith("/fragrance/")) {
    const slug = pathname.replace("/fragrance/", "");
    const name = slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    meta = {
      title: `${name} | Alluring Scents`,
      description: `Shop ${name} — a luxury Extrait de Parfum from Alluring Scents. Available in 10ml, 50ml and 100ml.`,
    };
  }

  if (!meta && pathname.startsWith("/journal/")) {
    meta = {
      title: "Journal | Alluring Scents",
      description: "Explore fragrance guides, scent stories and lifestyle articles from the Alluring Scents journal.",
    };
  }

  if (!meta) {
    meta = ogMeta["/"];
  }

  const image = DEFAULT_IMAGE;
  const url   = `${BASE_URL}${pathname}`;

  let html = readFileSync(join(process.cwd(), "dist", "index.html"), "utf-8");

  html = html
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${image}" />`)
    .replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${meta.description}" />`)
    .replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${image}" />`)
    .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);

  res.setHeader("Content-Type", "text/html");
  res.send(html);
}