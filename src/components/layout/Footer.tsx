import { Link } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { Container } from "./Container";

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

        {/* Legal links */}
        <div className="border-t border-[rgba(255,255,255,0.08)] pt-5 flex flex-wrap justify-center gap-4 md:justify-start">
          <Link to="/privacy-policy" className="text-xs uppercase tracking-[0.15em] footer-link">
            Privacy Policy
          </Link>
          <Link to="/terms-of-use" className="text-xs uppercase tracking-[0.15em] footer-link">
            Terms of Use
          </Link>
          <Link to="/returns-refunds" className="text-xs uppercase tracking-[0.15em] footer-link">
            Returns & Refunds
          </Link>
          <span className="text-xs text-muted">
            © {new Date().getFullYear()} Alluring Notes T/A Alluring Scents
          </span>
        </div>
      </Container>
    </footer>
  );
}