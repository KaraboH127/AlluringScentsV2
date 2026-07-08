import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { Skeleton } from "../components/ui/Skeleton";
import { useCart } from "../store/CartContext";

export function CartPage() {
  const { items } = useCart();
  const [loadingStock, setLoadingStock] = useState(items.length > 0);

  useEffect(() => {
    if (items.length === 0) {
      setLoadingStock(false);
      return;
    }

    setLoadingStock(true);
    const timer = window.setTimeout(() => setLoadingStock(false), 500);
    return () => window.clearTimeout(timer);
  }, [items.length]);

  return (
    <>
      <SEOHead title="Cart | Alluring Scents" description="Review fragrance items in your cart and proceed to secure checkout." path="/cart" robots="noindex, nofollow" />
      <Section>
        <h1 className="mb-10 text-4xl site-heading md:text-5xl">Cart</h1>
        {items.length === 0 ? (
          <div className="space-y-4 border p-8 text-center">
            <p className="text-muted">Your cart is currently empty.</p>
            <Link to="/collections">
              <Button>Browse Collection</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
            <div className="border px-5">
              {loadingStock ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex items-start gap-3 border-b py-4">
                    <Skeleton className="h-20 w-16" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-10 w-32" />
                    </div>
                  </div>
                ))
              ) : (
                items.map((item) => (
                  <CartItem key={`${item.fragranceId}-${item.size}`} item={item} />
                ))
              )}
            </div>
            <CartSummary />
          </div>
        )}
      </Section>
    </>
  );
}
