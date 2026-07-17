import { Link } from "react-router-dom";
import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Button } from "../components/ui/Button";

export function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 | Alluring Scents"
        description="The fragrance you're looking for has drifted away. Return to home or browse collections."
        path="/404"
        robots="noindex, nofollow"
      />
      <Section>
        <div className="mx-auto max-w-2xl space-y-8 text-center py-12">

          {/* 404 display */}
          <p className="text-[120px] md:text-[160px] leading-none site-heading accent-gold opacity-20 select-none">
            404
          </p>

          {/* Copy */}
          <div className="space-y-3 -mt-6">
            <h1 className="text-3xl site-heading md:text-4xl">
              This Scent Has Drifted Away.
            </h1>
            <p className="text-sm text-muted max-w-md mx-auto">
              The page you're looking for doesn't exist or may have moved.
              Let us guide you back to something beautiful.
            </p>
          </div>

          {/* Primary actions */}
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
            <Link to="/collections">
              <Button variant="ghost">Browse Collections</Button>
            </Link>
          </div>

          {/* Quick links */}
          <div className="border-t pt-8 space-y-3">
            <p className="text-xs uppercase tracking-widest text-muted">
              You might be looking for
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { label: "Our Story",    path: "/our-story" },
                { label: "Pricing",      path: "/pricing" },
                { label: "Journal",      path: "/journal" },
                { label: "Track Order",  path: "/track-order" },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs uppercase tracking-widest text-muted hover:accent-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </Section>
    </>
  );
}