import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { CartItem } from "../components/cart/CartItem";
import { CartSummary } from "../components/cart/CartSummary";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { useCart } from "../store/CartContext";

export function CartPage() {
  const { items } = useCart();

  return (
    <>
      <SEOHead title="Cart | Alluring Scents" description="Review fragrance items in your cart and proceed to secure checkout." path="/cart" />
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
              {items.map((item) => (
                <CartItem key={`${item.fragranceId}-${item.size}`} item={item} />
              ))}
            </div>
            <CartSummary />
          </div>
        )}
      </Section>
    </>
  );
}
