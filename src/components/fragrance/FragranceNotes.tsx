import type { Fragrance } from "../../types/site";

/**
 * Structured note pyramid presentation for product detail pages.
 */
export function FragranceNotes({ fragrance }: { fragrance: Fragrance }) {
  return (
    <div className="grid gap-4 border p-6 sm:grid-cols-3">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] accent-gold">Top Note</p>
        <p className="mt-2 text-sm text-muted">{fragrance.notes.top}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] accent-gold">Middle Note</p>
        <p className="mt-2 text-sm text-muted">{fragrance.notes.middle}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] accent-gold">Base Note</p>
        <p className="mt-2 text-sm text-muted">{fragrance.notes.base}</p>
      </div>
    </div>
  );
}
