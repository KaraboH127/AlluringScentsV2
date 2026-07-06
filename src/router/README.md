# Router

Central route registration for the SPA.

- `AppRouter.tsx` maps URLs to pages.
- Catch-all route redirects to `/404` to keep not-found handling explicit.

To add a new page:
1. Create a page component in `pages/`.
2. Register the route in `AppRouter.tsx`.
3. Add navigation entries in `config/site.ts` if needed.

Protected routes can be added later by wrapping route elements with guard components before rendering page content.
