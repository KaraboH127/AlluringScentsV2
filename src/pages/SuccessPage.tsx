import { Link, useSearchParams } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { siteConfig } from "../config/site";

export function SuccessPage() {
  const [params] = useSearchParams();
  const order = params.get("order") ?? "AS-000000";

  return (
    <>
      <SEOHead title="Order Success | Alluring Scents" description="Your order has been received by Alluring Scents." path="/success" />
      <Section>
        <div className="mx-auto grid max-w-4xl gap-8 border border-[#222] p-8 md:grid-cols-2 md:items-center">
          <img src={siteConfig.images.collection} alt="Luxury illustration" className="h-64 w-full object-cover" />
          <div className="space-y-4">
            <h1 className="text-4xl text-white">Thank You.</h1>
            <p className="text-lg text-[#EAEAEA]">Your Order Has Been Received.</p>
            <p className="text-sm text-[#BEBEBE]">Order confirmation: {order}</p>
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
