# Luxury Fragrance E-Commerce Website

This project is a React + TypeScript e-commerce website for an upscale fragrance brand. It includes product browsing, cart functionality, checkout flow, SEO metadata, journal articles, and a polished marketing experience.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- Framer Motion
- Tailwind CSS

## Project Structure

```text
luxury-fragrance-ecommerce-website/
├── index.html
├── package.json
├── tsconfig.json
├── vercel.json
├── vite.config.ts
├── public/
│   ├── *.avif
│   ├── robots.txt
│   └── sitemap.xml
├── scripts/
│   ├── generate-sitemap.js
│   └── optimize-images.js
└── src/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── SEOHead.tsx
    ├── components/
    │   ├── cart/
    │   │   ├── CartDrawer.tsx
    │   │   ├── CartItem.tsx
    │   │   ├── CartSummary.tsx
    │   │   └── CheckoutSummary.tsx
    │   ├── fragrance/
    │   │   ├── CollectionCard.tsx
    │   │   ├── CollectionGrid.tsx
    │   │   ├── FragranceHero.tsx
    │   │   ├── FragranceNotes.tsx
    │   │   ├── PricingTable.tsx
    │   │   └── ProductCard.tsx
    │   ├── layout/
    │   │   ├── BackToTop.tsx
    │   │   ├── Container.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Layout.tsx
    │   │   ├── MobileDrawer.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── ScrollToTop.tsx
    │   │   └── Section.tsx
    │   └── ui/
    │       ├── Badge.tsx
    │       ├── Breadcrumb.tsx
    │       ├── Button.tsx
    │       ├── Card.tsx
    │       ├── Image.tsx
    │       ├── Input.tsx
    │       ├── LoadingSpinner.tsx
    │       ├── Modal.tsx
    │       ├── QuantitySelector.tsx
    │       └── Select.tsx
    ├── config/
    │   └── site.ts
    ├── data/
    │   └── journalArticles.ts
    ├── hooks/
    │   ├── useBodyScrollLock.ts
    │   └── useLocalStorage.ts
    ├── pages/
    │   ├── CartPage.tsx
    │   ├── CheckoutPage.tsx
    │   ├── CollectionsPage.tsx
    │   ├── FragranceDetailPage.tsx
    │   ├── HomePage.tsx
    │   ├── JournalArticlePage.tsx
    │   ├── JournalPage.tsx
    │   ├── NotFoundPage.tsx
    │   ├── PricingPage.tsx
    │   ├── StoryPage.tsx
    │   └── SuccessPage.tsx
    ├── router/
    │   └── AppRouter.tsx
    ├── store/
    │   └── CartContext.tsx
    ├── styles/
    │   └── theme.css
    ├── types/
    │   └── site.ts
    └── utils/
        ├── cn.ts
        ├── seo.ts
        └── sitemap.ts
```

## File-by-File Overview

### Root Files

- `index.html` — Main HTML entry point for the Vite app.
- `package.json` — Project metadata, scripts, and dependencies.
- `tsconfig.json` — TypeScript compiler settings.
- `vercel.json` — Deployment configuration for Vercel.
- `vite.config.ts` — Vite configuration, including React and build settings.

### Public Assets

- `public/` — Static files such as images, icons, robots.txt, and sitemap.xml used by the website.
- `public/robots.txt` — Tells search engines how to crawl the site.
- `public/sitemap.xml` — Sitemap for SEO indexing.

### Scripts

- `scripts/optimize-images.js` — Optimizes image assets for performance.
- `scripts/generate-sitemap.js` — Generates the sitemap from the site routes.

### Source Entry Files

- `src/main.tsx` — Mounts the React app into the DOM.
- `src/App.tsx` — Wraps the app with router and cart context.
- `src/index.css` — Global styles and base theme styling.
- `src/SEOHead.tsx` — Adds page-specific SEO metadata and title tags.

### Components

#### Cart Components

- `src/components/cart/CartDrawer.tsx` — Slide-out cart menu UI.
- `src/components/cart/CartItem.tsx` — Displays and manages a single cart item.
- `src/components/cart/CartSummary.tsx` — Shows cart totals and summary information.
- `src/components/cart/CheckoutSummary.tsx` — Displays order summary on checkout.

#### Fragrance Components

- `src/components/fragrance/CollectionCard.tsx` — Shows a collection preview card.
- `src/components/fragrance/CollectionGrid.tsx` — Renders the collection listing grid.
- `src/components/fragrance/FragranceHero.tsx` — Hero section for fragrance details.
- `src/components/fragrance/FragranceNotes.tsx` — Displays fragrance notes by category.
- `src/components/fragrance/PricingTable.tsx` — Pricing table for fragrance sizes.
- `src/components/fragrance/ProductCard.tsx` — Product card UI used across product listings.

#### Layout Components

- `src/components/layout/BackToTop.tsx` — Scroll-to-top button for long pages.
- `src/components/layout/Container.tsx` — Shared layout wrapper for page sections.
- `src/components/layout/Footer.tsx` — Site footer markup and links.
- `src/components/layout/Layout.tsx` — Global layout shell with navigation and footer.
- `src/components/layout/MobileDrawer.tsx` — Mobile navigation drawer.
- `src/components/layout/Navbar.tsx` — Main site navigation.
- `src/components/layout/ScrollToTop.tsx` — Automatically scrolls to the top on route changes.
- `src/components/layout/Section.tsx` — Shared section wrapper used throughout pages.

#### UI Components

- `src/components/ui/Badge.tsx` — Small status or label component.
- `src/components/ui/Breadcrumb.tsx` — Breadcrumb navigation UI.
- `src/components/ui/Button.tsx` — Reusable button component.
- `src/components/ui/Card.tsx` — Card container used for content blocks.
- `src/components/ui/Image.tsx` — Image component with consistent styling and behavior.
- `src/components/ui/Input.tsx` — Reusable form input.
- `src/components/ui/LoadingSpinner.tsx` — Loading state indicator.
- `src/components/ui/Modal.tsx` — Modal dialog component.
- `src/components/ui/QuantitySelector.tsx` — Quantity adjustment control.
- `src/components/ui/Select.tsx` — Select dropdown component.

### Configuration and Data

- `src/config/site.ts` — Main site configuration, brand details, navigation, collections, and fragrance catalog data.
- `src/data/journalArticles.ts` — Journal article content and metadata.

### Hooks

- `src/hooks/useBodyScrollLock.ts` — Prevents background scrolling while a drawer or modal is open.
- `src/hooks/useLocalStorage.ts` — Saves and retrieves state from local storage.

### Pages

- `src/pages/HomePage.tsx` — Landing page for the brand.
- `src/pages/StoryPage.tsx` — Brand story page.
- `src/pages/CollectionsPage.tsx` — Collections overview page.
- `src/pages/FragranceDetailPage.tsx` — Detail page for an individual fragrance.
- `src/pages/PricingPage.tsx` — Pricing and sizing page.
- `src/pages/JournalPage.tsx` — Journal listing page.
- `src/pages/JournalArticlePage.tsx` — Individual journal article page.
- `src/pages/CartPage.tsx` — Cart details page.
- `src/pages/CheckoutPage.tsx` — Checkout page.
- `src/pages/SuccessPage.tsx` — Confirmation page after successful checkout.
- `src/pages/NotFoundPage.tsx` — 404 error page.

### Routing and State

- `src/router/AppRouter.tsx` — Defines the application routes and links them to page components.
- `src/store/CartContext.tsx` — Global shopping cart state and cart actions.

### Styles and Types

- `src/styles/theme.css` — Theme tokens and styling primitives.
- `src/types/site.ts` — Shared TypeScript types for collections, fragrances, cart, and journal content.

### Utilities

- `src/utils/cn.ts` — Utility for merging class names conditionally.
- `src/utils/seo.ts` — Helpers for SEO metadata generation.
- `src/utils/sitemap.ts` — Helpers for building the sitemap.

## Getting Started

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Notes

- The project uses a local cart store with persistence through `localStorage`.
- The build pipeline also runs image optimization and sitemap generation after the production build.
- The app is designed for deployment on Vercel.
