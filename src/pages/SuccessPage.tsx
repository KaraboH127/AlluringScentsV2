import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { siteConfig } from "../config/site";
import { Image } from "../components/ui/Image";
import { Skeleton } from "../components/ui/Skeleton";
import { useCart } from "../store/CartContext";

const API = import.meta.env.VITE_API_URL;

interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  image: string;
}

interface Order {
  order_id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  amount_in_cents: number;
  status: string;
  items: OrderItem[];
}

const fmt = (cents: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(cents / 100);

export function SuccessPage() {
  const [params] = useSearchParams();
  const orderId = params.get("order") ?? "";
  const { clearCart } = useCart();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    clearCart();
  }, []);

  useEffect(() => {
    if (!orderId) { setLoading(false); return; }

    // Retry a few times — webhook may not have saved the order yet
    let attempts = 0;
    const maxAttempts = 5;

    const fetchOrder = async () => {
      try {
        const res = await fetch(`${API}/order/${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
          setLoading(false);
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(fetchOrder, 1500);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(fetchOrder, 1500);
        } else {
          setError(true);
          setLoading(false);
        }
      }
    };

    fetchOrder();
  }, [orderId]);

  return (
    <>
      <SEOHead
        title="Order Success | Alluring Scents"
        description="Your order has been received by Alluring Scents."
        path="/success"
        robots="noindex, nofollow"
      />
      <Section>
        {loading ? (
          <div className="mx-auto max-w-4xl border p-6 md:p-8 space-y-8">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <Skeleton className="h-64 w-full" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-5 w-56" />
                <Skeleton className="h-4 w-44" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
            <div className="space-y-4 border-t pt-6">
              <Skeleton className="h-4 w-32" />
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 py-3 border-b last:border-0">
                  <Skeleton className="h-14 w-14 rounded" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
            <div className="grid gap-6 border-t pt-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-48" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-44" />
              </div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-4xl border p-6 md:p-8 space-y-8">

            {/* Header */}
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <Image
                src={siteConfig.images.collection}
                alt="Luxury illustration"
                className="h-64 w-full object-cover"
              />
              <div className="space-y-4">
                <h1 className="text-4xl site-heading">Thank You.</h1>
                <p className="text-lg text-muted">Your Order Has Been Received.</p>
                {order && (
                  <p className="text-sm text-muted">
                    Order reference: <span className="accent-gold">{order.order_id}</span>
                  </p>
                )}
                {!order && orderId && (
                  <p className="text-sm text-muted">
                    Order reference: <span className="accent-gold">{orderId}</span>
                  </p>
                )}
                <p className="text-sm italic text-muted border-l-2 pl-3">
                  Your trust in Alluring Scents is the greatest compliment we could've gotten. You smell scent-sational.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/collections">
                    <Button>Continue Shopping</Button>
                  </Link>
                  <Link to="/">
                    <Button variant="ghost">Return Home</Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Order details */}
            {order && !error && (
              <>
                {/* Items */}
                <div className="border-t pt-6 space-y-4">
                  <p className="text-xs uppercase tracking-widest text-muted">Items Ordered</p>
                  <div className="space-y-3">
                    {order.items?.map((item, i) => (
                      <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted mt-0.5">{item.size}</p>
                        </div>
                        <p className="text-sm text-muted shrink-0">Qty: {item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t pt-6 grid gap-6 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-widest text-muted mb-2">Delivering To</p>
                    <p className="text-sm">{order.first_name} {order.last_name}</p>
                    <p className="text-sm text-muted">{order.address}</p>
                    <p className="text-sm text-muted">{order.city}, {order.province}, {order.postal_code}</p>
                    <p className="text-sm text-muted">{order.email}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-muted mb-2">Order Total</p>
                    <p className="text-3xl accent-gold site-heading">{fmt(order.amount_in_cents)}</p>
                    <p className="text-xs text-muted">Includes R95.00 delivery</p>
                  </div>
                </div>
              </>
            )}

          </div>
        )}
      </Section>
    </>
  );
}