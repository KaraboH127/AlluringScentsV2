import { FormEvent, useState } from "react";
import { SEOHead } from "../SEOHead";
import { CheckoutSummary } from "../components/cart/CheckoutSummary";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useCart } from "../store/CartContext";

export function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const delivery = subtotal > 0 ? 95 : 0;
  const total = subtotal + delivery;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const form = event.currentTarget;
    const orderId = `AS-${Date.now().toString().slice(-6)}`;

    const metadata = {
      orderId,
      firstName: (form.elements.namedItem("firstName") as HTMLInputElement).value,
      lastName: (form.elements.namedItem("lastName") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      address: (form.elements.namedItem("address") as HTMLInputElement).value,
      city: (form.elements.namedItem("city") as HTMLInputElement).value,
      province: (form.elements.namedItem("province") as HTMLInputElement).value,
      postalCode: (form.elements.namedItem("postalCode") as HTMLInputElement).value,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountInCents: Math.round(total * 100),
          currency: "ZAR",
          successUrl: `${window.location.origin}/success?order=${orderId}`,
          cancelUrl: `${window.location.origin}/checkout`,
          metadata,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      window.location.href = data.redirectUrl;

    } catch (err: any) {
      setError(err.message || "Could not start payment. Please try again.");
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
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <Input required name="firstName" placeholder="First Name" />
              <Input required name="lastName" placeholder="Last Name" />
              <Input required name="email" type="email" placeholder="Email" />
              <Input required name="phone" placeholder="Phone Number" />
              <Input required name="address" placeholder="Address" className="sm:col-span-2" />
              <Input required name="city" placeholder="City" />
              <Input required name="province" placeholder="Province" />
              <Input required name="postalCode" placeholder="Postal Code" className="sm:col-span-2" />

              {error && (
                <p className="sm:col-span-2 text-sm text-red-500">{error}</p>
              )}

              <Button type="submit" className="sm:col-span-2" disabled={loading}>
                {loading ? "Redirecting to payment..." : "Complete Order"}
              </Button>
            </form>
            <CheckoutSummary />
          </div>
        )}
      </Section>
    </>
  );
}