import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { Container } from "./Container";

/**
 * Global footer.
 *
 * Uses centralized navigation and brand copy from config to avoid duplicate
 * hard-coded links across page templates.
 */
export function Footer() {
  return (
    <footer className="py-12 site-footer">
      <Container className="space-y-5 text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.2em] footer-brand">{siteConfig.brand}</p>
        <p className="max-w-xl text-sm footer-desc">
          Luxury fragrances crafted for identity, confidence, and timeless self-expression.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          {siteConfig.navigation.map((item) => (
            <Link key={item.path} to={item.path} className="text-xs uppercase tracking-[0.15em] footer-link">
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
