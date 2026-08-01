import { FormEvent, useEffect, useState } from "react";
import { SEOHead } from "../SEOHead";
import { CheckoutSummary } from "../components/cart/CheckoutSummary";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Skeleton } from "../components/ui/Skeleton";
import { useFragrances, useCollections } from "../hooks/useProducts";
import { useCart } from "../store/CartContext";

const API = import.meta.env.VITE_API_URL;

export function CheckoutPage() {
  const { items, subtotal }                     = useCart();
  const { fragrances }                          = useFragrances();
  const { collections }                         = useCollections();
  const [loading, setLoading]                   = useState(false);
  const [error, setError]                       = useState<string | null>(null);
  const [deliveryFeeCents, setDeliveryFeeCents] = useState(9500);
  const [deliveryLoading, setDeliveryLoading]   = useState(true);

  useEffect(() => {
    fetch(`${API}/settings/delivery-fee`)
      .then((r) => r.json())
      .then((data) => setDeliveryFeeCents(data.deliveryFeeCents ?? 9500))
      .catch(() => setDeliveryFeeCents(9500))
      .finally(() => setDeliveryLoading(false));
  }, []);

  const deliveryFee = subtotal > 0 ? deliveryFeeCents / 100 : 0;
  const total       = subtotal + deliveryFee;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form    = event.currentTarget;
    const orderId = `AS-${Date.now().toString().slice(-6)}`;

    const orderItems = items.map((item) => {
      const fragrance  = fragrances.find((f) => f.id === item.fragranceId);
      const collection = collections.find((c) => c.id === fragrance?.collection);

      const originalPrice = collection?.prices[item.size] ?? 0;
      const salePrice      = fragrance?.sale_prices?.[item.size];
      const isOnSale        = !!salePrice && salePrice < originalPrice;

      return {
        name:            fragrance?.name ?? item.fragranceId,
        size:            item.size,
        quantity:        item.quantity,
        image:           `https://alluring-scents-v2.vercel.app${fragrance?.image ?? ""}`,
        originalPrice,
        salePrice:       isOnSale ? salePrice : null,
        saleLabel:       isOnSale ? (fragrance?.sale_label ?? null) : null,
      };
    });

    const metadata = {
      orderId,
      firstName:       (form.elements.namedItem("firstName")  as HTMLInputElement).value,
      lastName:        (form.elements.namedItem("lastName")   as HTMLInputElement).value,
      email:           (form.elements.namedItem("email")      as HTMLInputElement).value,
      phone:           (form.elements.namedItem("phone")      as HTMLInputElement).value,
      address:         (form.elements.namedItem("address")    as HTMLInputElement).value,
      city:            (form.elements.namedItem("city")       as HTMLInputElement).value,
      province:        (form.elements.namedItem("province")   as HTMLInputElement).value,
      postalCode:      (form.elements.namedItem("postalCode") as HTMLInputElement).value,
      items:           JSON.stringify(orderItems),
      deliveryInCents: String(deliveryFeeCents),
    };

    try {
      const response = await fetch(`${API}/create-checkout`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountInCents: Math.round(total * 100),
          currency:      "ZAR",
          successUrl:    `${window.location.origin}/success?order=${orderId}`,
          cancelUrl:     `${window.location.origin}/checkout`,
          metadata,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");
      window.location.href = data.redirectUrl;

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Could not start payment. Please try again.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Checkout | Alluring Scents"
        description="Complete your fragrance order and review your premium checkout summary."
        path="/checkout"
        robots="noindex, nofollow"
      />
      <Section>
        <h1 className="mb-10 text-4xl site-heading md:text-5xl">Checkout</h1>

        {items.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              {loading ? (
                <div className="sm:col-span-2 space-y-4 rounded border border-white/10 p-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <Skeleton key={index} className={`h-11 ${index === 4 ? "sm:col-span-2" : ""}`} />
                    ))}
                  </div>
                  <Skeleton className="h-11 w-full" />
                </div>
              ) : (
                <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
                  <Input required name="firstName"  placeholder="First Name" />
                  <Input required name="lastName"   placeholder="Last Name" />
                  <Input required name="email"      type="email" placeholder="Email" />
                  <Input required name="phone"      placeholder="Phone Number" />
                  <Input required name="address"    placeholder="Address" className="sm:col-span-2" />
                  <Input required name="city"       placeholder="City" />
                  <Input required name="province"   placeholder="Province" />
                  <Input required name="postalCode" placeholder="Postal Code" className="sm:col-span-2" />

                  {error && (
                    <div className="sm:col-span-2 border border-red-500/20 bg-red-500/5 p-3">
                      <p className="text-sm text-red-400">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="sm:col-span-2"
                    disabled={loading || deliveryLoading}
                  >
                    {deliveryLoading ? "Loading..." : "Complete Order"}
                  </Button>
                </form>
              )}
            </div>
            <CheckoutSummary
              deliveryFee={deliveryFee}
              deliveryLoading={deliveryLoading}
            />
          </div>
        )}
      </Section>
    </>
  );
}