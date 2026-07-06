import type { Fragrance } from "../../types/site";

/**
 * Structured note pyramid presentation for product detail pages.
 */
export function FragranceNotes({ fragrance }: { fragrance: Fragrance }) {
  return (
    <div className="grid gap-4 border border-[#222] p-6 sm:grid-cols-3">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[#C9A227]">Top Note</p>
        <p className="mt-2 text-sm text-[#EAEAEA]">{fragrance.notes.top}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[#C9A227]">Middle Note</p>
        <p className="mt-2 text-sm text-[#EAEAEA]">{fragrance.notes.middle}</p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-[#C9A227]">Base Note</p>
        <p className="mt-2 text-sm text-[#EAEAEA]">{fragrance.notes.base}</p>
      </div>
    </div>
  );
}
