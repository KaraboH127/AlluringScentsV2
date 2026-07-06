import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Optional utility action for long-scroll pages.
 *
 * Visibility is based on viewport scroll depth and intentionally managed
 * globally in Layout to avoid repeated logic in page components.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-6 right-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full back-to-top ring-1 ring-0 transition hover:back-to-top sm:right-6"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 14l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
