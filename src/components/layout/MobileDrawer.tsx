import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useCart } from "../../store/CartContext";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const mobileLinks = [
  { label: "Home", path: "/" },
  { label: "Our Story", path: "/our-story" },
  { label: "Collections", path: "/collections" },
  { label: "Pricing", path: "/pricing" },
  { label: "Journal", path: "/journal" },
  { label: "Cart", path: "/cart" },
  { label: "Checkout", path: "/checkout" },
];

/**
 * Mobile navigation drawer used only on small breakpoints.
 *
 * Responsibilities:
 * - Render route links and commerce shortcuts for touch-first navigation.
 * - Manage accessibility affordances (focus trap, Escape to close).
 * - Coordinate robust body scroll locking so background content never moves.
 *
 * This component is intentionally isolated from Navbar so all mobile-overlay
 * behavior can evolve in one place without touching desktop navigation.
 */
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const { itemCount } = useCart();
  const drawerRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useBodyScrollLock(open, { allowInteractionWithin: drawerRef.current });

  useEffect(() => {
    if (!open) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;

    const container = drawerRef.current;
    const getFocusable = () =>
      container?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])",
      ) ?? [];

    getFocusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      const focusable = getFocusable();
      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            aria-label="Close navigation drawer"
            className="fixed inset-0 z-50 bg-black/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.aside
            ref={drawerRef}
            className="fixed right-0 top-0 z-[60] flex h-screen w-[85vw] max-w-[400px] flex-col border-l border-[#EAEAEA] bg-white text-black"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
            aria-modal="true"
            role="dialog"
          >
            <div className="flex items-center justify-between border-b border-[#EAEAEA] px-6 py-5">
              <p className="text-xs uppercase tracking-[0.18em] text-[#111]">Menu</p>
              <button
                className="text-sm uppercase tracking-[0.14em] text-[#111] transition hover:text-[#C9A227]"
                onClick={onClose}
                aria-label="Close menu"
              >
                X
              </button>
            </div>

            <nav className="flex-1 px-6 py-4">
              {mobileLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between border-b border-[#EAEAEA] py-4 text-sm uppercase tracking-[0.16em] transition ${isActive ? "text-[#C9A227]" : "text-[#111] hover:text-[#C9A227]"}`
                  }
                >
                  <span>{item.label}</span>
                  {item.label === "Cart" && itemCount > 0 ? (
                    <span className="inline-flex min-w-6 items-center justify-center rounded-full border border-[#C9A227] px-1.5 py-0.5 text-[10px] text-[#111]">
                      {itemCount}
                    </span>
                  ) : null}
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-[#EAEAEA] px-6 py-10">
              <Link
                to="/collections"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center border border-black bg-black px-6 py-3 text-xs uppercase tracking-[0.16em] text-white transition hover:border-[#C9A227] hover:bg-[#C9A227] hover:text-black"
              >
                Shop Collection
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
