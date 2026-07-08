import { useEffect, useState } from "react";
import type { Fragrance, SizeOption } from "../../types/site";
import { collections, formatCurrency } from "../../config/site";
import { Badge } from "../ui/Badge";
import { Image } from "../ui/Image";
import { Skeleton } from "../ui/Skeleton";

/**
 * Top-of-page product header for fragrance detail routes.
 *
 * Receives selected size from page state so pricing updates without mutating
 * global state.
 */
export function FragranceHero({ fragrance, selectedSize }: { fragrance: Fragrance; selectedSize: SizeOption }) {
  const collection = collections.find((entry) => entry.id === fragrance.collection)!;
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [fragrance.image]);

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="relative overflow-hidden">
        {!imageLoaded && <Skeleton className="h-[420px] w-full" />}
        <Image
          src={fragrance.image}
          alt={fragrance.name}
          className={`h-[420px] w-full object-cover ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          priority
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className="space-y-5">
        <Badge>{collection.name}</Badge>
        <h1 className="text-4xl tracking-tight site-heading md:text-5xl">{fragrance.name}</h1>
        <p className="text-sm uppercase tracking-[0.18em] text-muted">{fragrance.extrait}</p>
        <p className="max-w-xl text-base leading-relaxed text-muted">{fragrance.description}</p>
        <p className="text-2xl accent-gold">{formatCurrency(collection.prices[selectedSize])}</p>
      </div>
    </div>
  );
}
