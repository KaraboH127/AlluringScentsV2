import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Global route-change scroll restoration.
 *
 * Mounted once in Layout so pages never duplicate scroll reset logic.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  return null;
}
