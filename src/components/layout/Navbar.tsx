import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { siteConfig } from "../../config/site";
import { useCart } from "../../store/CartContext";
import { Button } from "../ui/Button";
import { Image } from "../ui/Image";
import { Container } from "./Container";
import { MobileDrawer } from "./MobileDrawer";

/**
 * Main navigation component.
 *
 * Desktop behavior:
 * - Horizontal nav sourced from config/site.ts.
 * - Cart trigger opens the cart drawer from cart context.
 *
 * Mobile behavior:
 * - Shows only a hamburger trigger.
 * - Delegates full mobile menu rendering/interaction to MobileDrawer.
 */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, toggleDrawer } = useCart();

  return (
    <header className="sticky top-0 z-40 site-header backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <Image src={siteConfig.images.logo} alt="Alluring Scents logo" className="h-8 w-8" loading="eager" />
          <span className="text-sm uppercase tracking-[0.2em] site-brand">Alluring Scents</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {siteConfig.navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.16em] transition nav-link ${isActive ? "nav-link--active" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden h-10 px-3 md:inline-flex" onClick={() => toggleDrawer(true)}>
            Cart ({itemCount})
          </Button>
          <button
            aria-label="Open navigation menu"
            className="menu-button inline-flex h-10 w-10 items-center justify-center border transition md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </Container>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
