import type { ReactNode } from "react";
import { CartDrawer } from "../cart/CartDrawer";
import { BackToTop } from "./BackToTop";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { ScrollToTop } from "./ScrollToTop";

/**
 * Shared application shell used by all pages.
 *
 * Responsibilities:
 * - Render persistent chrome around routed content.
 * - Attach global UX helpers that should exist once (scroll restoration,
 *   optional back-to-top, cart drawer portal behavior).
 */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <ScrollToTop />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <CartDrawer />
    </div>
  );
}
