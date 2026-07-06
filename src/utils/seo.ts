import { siteConfig } from "../config/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.brand,
    url: siteConfig.domain,
    foundingDate: `${siteConfig.foundedYear}`,
    founders: siteConfig.founders.map((name) => ({ "@type": "Person", name })),
    logo: `${siteConfig.domain}${siteConfig.images.logo}`,
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.domain}${item.path}`,
    })),
  };
}
