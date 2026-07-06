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
    <footer className="border-t border-[#1F1F1F] py-12">
      <Container className="space-y-5 text-center md:text-left">
        <p className="text-xs uppercase tracking-[0.2em] text-[#C9A227]">{siteConfig.brand}</p>
        <p className="max-w-xl text-sm text-[#BEBEBE]">
          Luxury fragrances crafted for identity, confidence, and timeless self-expression.
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
          {siteConfig.navigation.map((item) => (
            <Link key={item.path} to={item.path} className="text-xs uppercase tracking-[0.15em] text-[#EAEAEA] hover:text-[#C9A227]">
              {item.label}
            </Link>
          ))}
        </div>
      </Container>
    </footer>
  );
}
