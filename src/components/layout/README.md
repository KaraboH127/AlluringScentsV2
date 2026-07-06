# Layout Components

Layout components control application structure, shell behavior, and cross-route UX.

- `Layout.tsx` composes global chrome (navbar, footer, cart drawer, global scroll helpers).
- `Navbar.tsx` renders desktop navigation and mobile drawer trigger.
- `MobileDrawer.tsx` encapsulates mobile navigation overlay and accessibility behavior.
- `ScrollToTop.tsx` and `BackToTop.tsx` manage global scrolling ergonomics.

Avoid placing business logic here. Layout components should orchestrate structure, not product or pricing rules.
