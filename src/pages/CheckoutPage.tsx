import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { CheckoutSummary } from "../components/cart/CheckoutSummary";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useCart } from "../store/CartContext";

export function CheckoutPage() {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const orderId = `AS-${Date.now().toString().slice(-6)}`;
    clearCart();
    navigate(`/success?order=${orderId}`);
  };

  return (
    <>
      <SEOHead title="Checkout | Alluring Scents" description="Complete your fragrance order and review your premium checkout summary." path="/checkout" />
      <Section>
        <h1 className="mb-10 text-4xl site-heading md:text-5xl">Checkout</h1>
        {items.length === 0 ? (
          <p className="text-muted">Your cart is empty.</p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
              <Input required placeholder="First Name" />
              <Input required placeholder="Last Name" />
              <Input required type="email" placeholder="Email" />
              <Input required placeholder="Phone Number" />
              <Input required placeholder="Address" className="sm:col-span-2" />
              <Input required placeholder="City" />
              <Input required placeholder="Province" />
              <Input required placeholder="Postal Code" className="sm:col-span-2" />
              <Button type="submit" className="sm:col-span-2">
                Complete Order
              </Button>
            </form>
            <CheckoutSummary />
          </div>
        )}
      </Section>
    </>
  );
}
