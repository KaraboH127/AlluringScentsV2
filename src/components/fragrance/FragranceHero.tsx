import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { Fragrance, SizeOption } from "../../types/site";
import { collections, formatCurrency } from "../../config/site";
import { Badge } from "../ui/Badge";
import { Image } from "../ui/Image";
import { Button } from "../ui/Button";
import { Select } from "../ui/Select";
import { QuantitySelector } from "../ui/QuantitySelector";
import { Skeleton } from "../ui/Skeleton";

interface FragranceHeroProps {
  fragrance: Fragrance;
  selectedSize: SizeOption;
  onSizeChange: (size: SizeOption) => void;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  stock: Record<string, number>;
  stockLoading: boolean;
  added: boolean;
  onAddToCart: () => void;
}

export function FragranceHero({
  fragrance,
  selectedSize,
  onSizeChange,
  quantity,
  onQuantityChange,
  stock,
  stockLoading,
  added,
  onAddToCart,
}: FragranceHeroProps) {
  const collection   = collections.find((entry) => entry.id === fragrance.collection)!;
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef       = useRef<HTMLImageElement>(null);

  const currentStock = stock[selectedSize] ?? 0;
  const isOutOfStock = !stockLoading && currentStock === 0;
  const isLowStock   = !stockLoading && currentStock > 0 && currentStock <= 5;

  useEffect(() => {
    setImageLoaded(false);
    const timer = setTimeout(() => {
      if (imgRef.current?.complete) setImageLoaded(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [fragrance.image]);

  return (
    <div className="grid gap-10 lg:grid-cols-2">

      {/* Image */}
      <div className="relative overflow-hidden bg-[#f5f5f5] h-[520px]">
        <Image
          src={fragrance.image}
          alt={fragrance.name}
          className={`h-[520px] w-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          onLoad={() => setImageLoaded(true)}
          ref={imgRef}
        />
      </div>

      {/* Info + Purchase */}
      <div className="flex flex-col justify-between gap-8 py-2">

        {/* Top — identity */}
        <div className="space-y-4">
          <Badge>{collection.name}</Badge>
          <h1 className="text-4xl tracking-tight site-heading md:text-5xl">{fragrance.name}</h1>
          <p className="text-sm uppercase tracking-[0.18em] text-muted">{fragrance.extrait}</p>
          <p className="text-base leading-relaxed text-muted">{fragrance.description}</p>
        </div>

        {/* Price */}
        <p className="text-3xl accent-gold site-heading">
          {formatCurrency(collection.prices[selectedSize])}
        </p>

        {/* Purchase controls */}
        <div className="space-y-4">

          {/* Size selector — pill style */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">Size</p>
            <div className="flex gap-2">
              {(["10ml", "50ml", "100ml"] as SizeOption[]).map((s) => (
                <button
                  key={s}
                  onClick={() => onSizeChange(s)}
                  className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                    selectedSize === s
                      ? "border-[#c9a84c] accent-gold"
                      : "border-current text-muted hover:border-[#c9a84c] hover:accent-gold"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {stockLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-11 w-full" />
            </div>
          ) : (
            <>
              {/* Stock status */}
              <p className={`text-xs tracking-wide ${
                isOutOfStock ? "text-red-400" :
                isLowStock   ? "text-yellow-400" :
                               "text-green-500"
              }`}>
                {isOutOfStock
                  ? "Out of stock for this size"
                  : isLowStock
                  ? `Only ${currentStock} left`
                  : "In stock"}
              </p>

              {/* Quantity */}
              {!isOutOfStock && (
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">Quantity</p>
                  <QuantitySelector
                    value={quantity}
                    onChange={onQuantityChange}
                    max={currentStock}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-2 pt-2">
                <Button
                  onClick={onAddToCart}
                  className="w-full"
                  disabled={isOutOfStock}
                >
                  {isOutOfStock ? "Out of Stock" : added ? "Added ✓" : "Add To Cart"}
                </Button>
                <Link to="/collections">
                  <Button variant="ghost" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}