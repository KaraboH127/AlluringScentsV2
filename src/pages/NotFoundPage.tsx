import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";
import { siteConfig } from "../config/site";
import { Image } from "../components/ui/Image";

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 | Alluring Scents"
        description="The fragrance you're looking for has drifted away. Return to home or browse collections."
        path="/404"
      />
      <Section>
        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <Image src={siteConfig.images.collection} alt="Luxury illustration placeholder" className="h-72 w-full object-cover" />
          <h1 className="text-4xl site-heading md:text-5xl">The Fragrance You're Looking For Has Drifted Away.</h1>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
            <Link to="/collections">
              <Button variant="ghost">Browse Collection</Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
