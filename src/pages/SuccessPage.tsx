import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { siteConfig } from "../config/site";
import { Image } from "../components/ui/Image";
import { useCart } from "../store/CartContext";

export function SuccessPage() {
  const [params] = useSearchParams();
  const order = params.get("order") ?? "AS-000000";
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <SEOHead
        title="Order Success | Alluring Scents"
        description="Your order has been received by Alluring Scents."
        path="/success"
        robots="noindex, nofollow"
      />
      <Section>
        <div className="mx-auto grid max-w-4xl gap-8 border p-8 md:grid-cols-2 md:items-center">
          <Image
            src={siteConfig.images.collection}
            alt="Luxury illustration"
            className="h-64 w-full object-cover"
          />
          <div className="space-y-4">
            <h1 className="text-4xl site-heading">Thank You.</h1>
            <p className="text-lg text-muted">Your Order Has Been Received.</p>
            <p className="text-sm text-muted">Order confirmation: {order}</p>
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
      </Section>
    </>
  );
}