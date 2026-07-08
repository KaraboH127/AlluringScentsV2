import { useState } from "react";
import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Skeleton } from "../components/ui/Skeleton";

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
  phone: string;
  address: string;
  city: string;
  province: string;
  postal_code: string;
  amount_in_cents: number;
  status: string;
  created_at: string;
  items?: OrderItem[];
}

const fmt = (cents: number) =>
  new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR" }).format(cents / 100);

const statusConfig: Record<string, { label: string; description: string; step: number }> = {
  succeeded: {
    label: "Order Received",
    description: "Your order has been received and is being prepared.",
    step: 1,
  },
  fulfilled: {
    label: "Order Fulfilled",
    description: "Your order has been packed and is ready for shipping.",
    step: 2,
  },
  shipped: {
    label: "Order Shipped",
    description: "Your order is on its way to you.",
    step: 3,
  },
};

const steps = [
  { key: "succeeded", label: "Received" },
  { key: "fulfilled", label: "Fulfilled" },
  { key: "shipped",   label: "Shipped" },
];

export function TrackOrderPage() {
  const [orderId, setOrderId]   = useState("");
  const [order, setOrder]       = useState<Order | null>(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = async () => {
    if (!orderId.trim()) return;
    setLoading(true);
    setError(null);
    setOrder(null);
    setSearched(true);

    try {
      const res = await fetch(`${API}/order/${orderId.trim().toUpperCase()}`);
      if (!res.ok) throw new Error("Order not found.");
      const data = await res.json();
      setOrder(data);
    } catch {
      setError("We couldn't find an order with that ID. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? (statusConfig[order.status]?.step ?? 1) : 0;
  const delivery = 9500;
  const subtotal = order ? order.amount_in_cents - delivery : 0;

  return (
    <>
      <SEOHead
        title="Track Your Order | Alluring Scents"
        description="Enter your order ID to track your Alluring Scents fragrance delivery."
        path="/track-order"
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-10">

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl site-heading md:text-5xl">Track Order</h1>
            <p className="text-muted text-sm">
              Enter your order ID to see the status of your delivery. Your order ID was emailed to you after purchase.
            </p>
          </div>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="e.g. AS-123456"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              className="flex-1"
            />
            <Button onClick={handleTrack} disabled={loading || !orderId.trim()}>
              {loading ? "Searching..." : "Track"}
            </Button>
          </div>

          {/* Error */}
          {error && searched && !loading && (
            <div className="border border-red-500/20 bg-red-500/5 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Order result */}
          {loading ? (
            <div className="space-y-6">
              <div className="border p-6 space-y-6">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-8 w-44" />
                <Skeleton className="h-4 w-36" />
                <div className="flex items-center gap-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex flex-1 items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      {index < 2 && <Skeleton className="h-px flex-1" />}
                    </div>
                  ))}
                </div>
                <Skeleton className="h-16 w-full" />
              </div>
              <div className="border p-6 space-y-4">
                <Skeleton className="h-4 w-32" />
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-4 py-3 border-b last:border-0">
                    <Skeleton className="h-14 w-14 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-36" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
              <div className="border p-6 space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          ) : order ? (
            <div className="space-y-6">

              {/* Status tracker */}
              <div className="border p-6 space-y-6">
                <div className="space-y-1">
                  <p className="text-xs text-muted uppercase tracking-widest">Order Reference</p>
                  <p className="text-2xl accent-gold site-heading">{order.order_id}</p>
                  <p className="text-xs text-muted">
                    Placed {new Date(order.created_at).toLocaleDateString("en-ZA", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-3">
                  <div className="flex items-center">
                    {steps.map((step, i) => {
                      const isComplete = currentStep > i + 1;
                      const isActive   = currentStep === i + 1;
                      return (
                        <div key={step.key} className="flex items-center flex-1 last:flex-none">
                          <div className="flex flex-col items-center gap-1 shrink-0">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border transition-colors ${
                              isComplete || isActive
                                ? "bg-[#c9a84c] border-[#c9a84c] text-black"
                                : "border-[#333] text-[#555]"
                            }`}>
                              {isComplete ? "✓" : i + 1}
                            </div>
                            <p className={`text-xs whitespace-nowrap ${
                              isComplete || isActive ? "text-white" : "text-[#555]"
                            }`}>
                              {step.label}
                            </p>
                          </div>
                          {i < steps.length - 1 && (
                            <div className={`flex-1 h-px mx-2 mb-5 transition-colors ${
                              currentStep > i + 1 ? "bg-[#c9a84c]" : "bg-[#222]"
                            }`} />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Status message */}
                  <div className="border border-[#1a1a1a] bg-[#111] p-3">
                    <p className="text-sm text-white font-medium">
                      {statusConfig[order.status]?.label}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {statusConfig[order.status]?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items */}
              {order.items && order.items.length > 0 && (
                <div className="border p-6 space-y-4">
                  <p className="text-xs text-muted uppercase tracking-widest">Items Ordered</p>
                  <div className="space-y-3">
                    {order.items.map((item, i) => (
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
                        <p className="text-sm text-muted flex-shrink-0">Qty: {item.quantity}</p>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="space-y-2 text-sm border-t pt-4">
                    <div className="flex justify-between text-muted">
                      <span>Subtotal</span><span>{fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span>Delivery</span><span>{fmt(delivery)}</span>
                    </div>
                    <div className="flex justify-between font-medium border-t pt-2">
                      <span>Total</span>
                      <span className="accent-gold">{fmt(order.amount_in_cents)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Delivery address */}
              <div className="border p-6 space-y-3">
                <p className="text-xs text-muted uppercase tracking-widest">Delivering To</p>
                <div className="text-sm space-y-1">
                  <p>{order.first_name} {order.last_name}</p>
                  <p className="text-muted">{order.address}</p>
                  <p className="text-muted">{order.city}, {order.province}, {order.postal_code}</p>
                  <p className="text-muted">{order.email}</p>
                  <p className="text-muted">{order.phone}</p>
                </div>
              </div>

            </div>
          ) : null}
        </div>
      </Section>
    </>
  );
}