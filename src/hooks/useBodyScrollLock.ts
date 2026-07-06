import { useEffect } from "react";

interface UseBodyScrollLockOptions {
  allowInteractionWithin?: HTMLElement | null;
}

/**
 * Locks document scrolling while an overlay is open.
 *
 * Why this exists:
 * Mobile browsers (especially iOS Safari) can continue scrolling the
 * background even when overlays are visible unless body position is pinned
 * and touch/wheel input is explicitly constrained.
 *
 * Responsibilities:
 * - Preserve and restore exact scroll position.
 * - Prevent background wheel/touch scrolling and overscroll bounce.
 * - Avoid layout shift by compensating for scrollbar width.
 * - Clean up all temporary inline styles and listeners.
 */
export function useBodyScrollLock(locked: boolean, options: UseBodyScrollLockOptions = {}) {
  useEffect(() => {
    if (!locked) return;

    const allowInteractionWithin = options.allowInteractionWithin ?? null;
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    const scrollbarWidth = window.innerWidth - html.clientWidth;

    const previous = {
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyPaddingRight: body.style.paddingRight,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      htmlScrollBehavior: html.style.scrollBehavior,
    };

    const canInteract = (target: EventTarget | null) => {
      if (!allowInteractionWithin || !(target instanceof Node)) return false;
      return allowInteractionWithin.contains(target);
    };

    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overscrollBehavior = "none";
    html.style.overscrollBehavior = "none";
    html.style.scrollBehavior = "auto";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const blockBackgroundScroll = (event: TouchEvent | WheelEvent) => {
      if (!canInteract(event.target)) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchmove", blockBackgroundScroll, { passive: false });
    document.addEventListener("wheel", blockBackgroundScroll, { passive: false });

    return () => {
      document.removeEventListener("touchmove", blockBackgroundScroll);
      document.removeEventListener("wheel", blockBackgroundScroll);

      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.paddingRight = previous.bodyPaddingRight;
      body.style.overscrollBehavior = previous.bodyOverscrollBehavior;
      html.style.overscrollBehavior = previous.htmlOverscrollBehavior;
      html.style.scrollBehavior = previous.htmlScrollBehavior;

      window.scrollTo(scrollX, scrollY);
    };
  }, [locked, options.allowInteractionWithin]);
}
