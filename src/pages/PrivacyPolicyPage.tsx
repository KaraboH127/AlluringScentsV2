import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Breadcrumb } from "../components/ui/Breadcrumb";

export function PrivacyPolicyPage() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Alluring Scents"
        description="How Alluring Scents collects, uses, and protects your personal information."
        path="/privacy-policy"
      />
      <Section>
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }]} />
        <div className="mx-auto max-w-3xl space-y-10 mt-8">
          <div className="space-y-2">
            <h1 className="text-4xl site-heading md:text-5xl">Privacy Policy</h1>
            <p className="text-sm text-muted">Effective date: 1 January 2024</p>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            Alluring Notes (trading as Alluring Scents) ("we", "us", "our") is committed to protecting your
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website or place an order with us. We undertake to process
            all personal information in accordance with the Protection of Personal Information Act 4 of 2013
            ("POPIA") and any other applicable South African legislation. Please read this policy carefully.
            By using our website, you agree to the terms of this Privacy Policy.
          </p>

          {/* 1 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">1. Who We Are</h2>
            <div className="text-sm text-muted leading-relaxed space-y-2">
              <p>Alluring Notes (trading as Alluring Scents)</p>
              <p>26 Whitney Road, Hazelhurst, Johannesburg, South Africa</p>
              <p>Email: <a href="mailto:alluringscents6@gmail.com" className="accent-gold hover:underline">alluringscents6@gmail.com</a></p>
            </div>
          </div>

          {/* 2 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">2. Information We Collect</h2>
            <p className="text-sm text-muted leading-relaxed">
              When you place an order or interact with our website, we may collect the following personal information:
            </p>
            <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc list-inside">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Delivery address (street address, city, province, postal code)</li>
              <li>Payment information (processed securely by our payment provider — we do not store card details)</li>
              <li>Order history and transaction details</li>
              <li>Device and browser information collected automatically when you visit our website</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">3. How We Use Your Information</h2>
            <p className="text-sm text-muted leading-relaxed">We use the information we collect to:</p>
            <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc list-inside">
              <li>Process and fulfil your orders</li>
              <li>Send you order confirmation and delivery updates via email</li>
              <li>Respond to your queries, returns, or complaints</li>
              <li>Improve our website and customer experience</li>
              <li>Comply with our legal obligations under applicable South African law</li>
            </ul>
            <p className="text-sm text-muted leading-relaxed">
              We do not sell, rent, or share your personal information with third parties for marketing purposes.
            </p>
          </div>

          {/* 4 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">4. How We Share Your Information</h2>
            <p className="text-sm text-muted leading-relaxed">
              To operate our business and fulfil your orders, we work with carefully selected third-party
              service providers. These providers assist us with payment processing, data storage, email
              communications, website hosting, and order delivery. Your personal information is shared
              with these parties only to the extent necessary to provide you with our services.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              All third-party service providers are required to handle your information responsibly,
              keep it confidential, and use it solely for the purposes for which it was shared. We do
              not permit any third party to use your personal information for their own marketing or
              commercial purposes.
            </p>
          </div>

          {/* 5 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">5. Payment Security</h2>
            <p className="text-sm text-muted leading-relaxed">
              All payments are processed by a PCI DSS compliant third-party payment provider. We never
              store, process, or transmit your card details on our servers. Your payment information is
              handled entirely within our payment provider's secure infrastructure, and we have no access
              to your full card details at any time.
            </p>
          </div>

          {/* 6 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">6. Data Security</h2>
            <p className="text-sm text-muted leading-relaxed">
              We have implemented appropriate, reasonable technical and organisational measures to
              safeguard your personal information against accidental or unlawful destruction, loss,
              alteration, unauthorised disclosure of, or access to personal information processed by us.
              While we take all reasonable steps to protect your information, no method of transmission
              over the internet is completely secure and we cannot guarantee absolute security.
            </p>
          </div>

          {/* 7 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">7. Data Retention</h2>
            <p className="text-sm text-muted leading-relaxed">
              We retain your personal information for as long as necessary to fulfil the purposes outlined in
              this policy, or as required by South African law. Order records are retained for a minimum of
              5 years for accounting and legal compliance purposes.
            </p>
          </div>

          {/* 8 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">8. Your Rights (POPIA)</h2>
            <p className="text-sm text-muted leading-relaxed">
              Under the Protection of Personal Information Act 4 of 2013 (POPIA), you have the right to:
            </p>
            <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc list-inside">
              <li>Know what personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information (subject to legal obligations)</li>
              <li>Object to the processing of your personal information</li>
              <li>Lodge a complaint with the Information Regulator of South Africa</li>
            </ul>
            <p className="text-sm text-muted leading-relaxed">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:alluringscents6@gmail.com" className="accent-gold hover:underline">
                alluringscents6@gmail.com
              </a>.
            </p>
          </div>

          {/* 9 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">9. Cookies</h2>
            <p className="text-sm text-muted leading-relaxed">
              Our website uses local storage to maintain your shopping cart between sessions. We do not use
              third-party tracking cookies or advertising cookies. No personal data is stored in your browser
              beyond your cart contents.
            </p>
          </div>

          {/* 10 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">10. Changes to This Policy</h2>
            <p className="text-sm text-muted leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with
              an updated effective date. We encourage you to review this policy periodically.
            </p>
          </div>

          {/* 11 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">11. Contact Us</h2>
            <p className="text-sm text-muted leading-relaxed">
              If you have any questions about this Privacy Policy or how we handle your personal information,
              please contact us at{" "}
              <a href="mailto:alluringscents6@gmail.com" className="accent-gold hover:underline">
                alluringscents6@gmail.com
              </a>.
            </p>
          </div>

        </div>
      </Section>
    </>
  );
}