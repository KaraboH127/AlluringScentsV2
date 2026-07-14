import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Breadcrumb } from "../components/ui/Breadcrumb";

export function TermsOfUsePage() {
  return (
    <>
      <SEOHead
        title="Terms of Use | Alluring Scents"
        description="Terms and conditions governing the use of the Alluring Scents website and purchase of products."
        path="/terms-of-use"
      />
      <Section>
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Terms of Use", path: "/terms-of-use" }]} />
        <div className="mx-auto max-w-3xl space-y-10 mt-8">
          <div className="space-y-2">
            <h1 className="text-4xl site-heading md:text-5xl">Terms of Use</h1>
            <p className="text-sm text-muted">Effective date: 1 January 2024</p>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            These Terms of Use govern your use of the Alluring Scents website and the purchase of products
            from Alluring Notes (trading as Alluring Scents) ("we", "us", "our"). By accessing our website
            or placing an order, you agree to be bound by these terms. If you do not agree, please do not
            use our website.
          </p>

          {/* 1 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">1. About Us</h2>
            <div className="text-sm text-muted leading-relaxed space-y-2">
              <p>Alluring Notes (trading as Alluring Scents)</p>
              <p>26 Whitney Road, Hazelhurst, Johannesburg, South Africa</p>
              <p>Email: <a href="mailto:alluringscents6@gmail.com" className="accent-gold hover:underline">alluringscents6@gmail.com</a></p>
            </div>
          </div>

          {/* 2 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">2. Use of the Website</h2>
            <p className="text-sm text-muted leading-relaxed">By using this website, you confirm that:</p>
            <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc list-inside">
              <li>You are at least 18 years of age</li>
              <li>You will not use the website for any unlawful or fraudulent purpose</li>
              <li>You will not attempt to disrupt or interfere with the website's functionality</li>
              <li>All information you provide is accurate and complete</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">3. Orders and Payments</h2>
            <p className="text-sm text-muted leading-relaxed">
              All orders placed through our website are subject to availability and acceptance. We reserve the
              right to cancel or refuse any order at our discretion. Prices are displayed in South African Rand
              (ZAR) and include VAT where applicable.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Payments are processed securely through a third-party payment provider. By placing an order,
              you confirm that you are authorised to use the payment method provided. Your order is confirmed
              once payment has been successfully processed and you have received a confirmation email.
            </p>
          </div>

          {/* 4 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">4. Delivery</h2>
            <p className="text-sm text-muted leading-relaxed">
              A flat delivery fee of R95.00 applies to all orders. We deliver within South Africa only.
              Delivery timeframes are estimates only and may vary depending on your location, courier
              availability, public holidays, adverse weather, strikes or other unforeseen events
              (force majeure).
            </p>
            <p className="text-sm text-muted leading-relaxed">
              We are not liable for delays caused by third-party courier services or circumstances
              beyond our reasonable control.
            </p>
          </div>

          {/* 5 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">5. Returns and Refunds</h2>
            <p className="text-sm text-muted leading-relaxed">
              Our full returns, refunds and exchanges policy is available on our{" "}
              <a href="/returns-refunds" className="accent-gold hover:underline">
                Returns, Refunds & Exchanges
              </a>{" "}
              page. By placing an order, you agree to the terms of that policy.
            </p>
          </div>

          {/* 6 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">6. Force Majeure</h2>
            <p className="text-sm text-muted leading-relaxed">
              We shall not be liable for any failure or delay in performing our obligations where such
              failure or delay results from events beyond our reasonable control, including but not limited
              to natural disasters, acts of government, strikes, civil unrest, power failures, internet
              outages, pandemics or courier disruptions.
            </p>
          </div>

          {/* 7 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">7. Intellectual Property</h2>
            <p className="text-sm text-muted leading-relaxed">
              All content on this website — including text, images, logos, fragrance names, and design — is
              the property of Alluring Notes and is protected by applicable intellectual property laws. You
              may not reproduce, distribute, or use any content from this website without our prior written
              consent.
            </p>
          </div>

          {/* 8 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">8. Limitation of Liability</h2>
            <p className="text-sm text-muted leading-relaxed">
              To the fullest extent permitted by South African law, Alluring Notes shall not be liable for
              any indirect, incidental, or consequential damages arising from the use of our website or
              products. Our total liability in respect of any claim shall not exceed the amount paid by you
              for the order giving rise to the claim.
            </p>
          </div>

          {/* 9 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">9. Governing Law</h2>
            <p className="text-sm text-muted leading-relaxed">
              These Terms of Use shall be governed by, construed and take effect in accordance with the
              laws of the Republic of South Africa. The courts of South Africa shall have exclusive
              jurisdiction to decide any claim, dispute or matter of difference which may arise out of,
              or in connection with, these Terms of Use.
            </p>
          </div>

          {/* 10 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">10. Severability</h2>
            <p className="text-sm text-muted leading-relaxed">
              Each and every term contained herein is severable from the rest of these Terms of Use.
              Should any term be in conflict with any applicable law, or be held to be unenforceable
              or invalid for any reason whatsoever, such term shall be treated as pro non scripto and
              shall be severable from the remaining provisions, which shall continue to be of full
              force and effect.
            </p>
          </div>

          {/* 11 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">11. Changes to These Terms</h2>
            <p className="text-sm text-muted leading-relaxed">
              We reserve the right to update these Terms of Use at any time. Changes will be posted on
              this page with an updated effective date. Continued use of the website after changes are
              posted constitutes your acceptance of the revised terms.
            </p>
          </div>

          {/* 12 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">12. Contact Us</h2>
            <p className="text-sm text-muted leading-relaxed">
              If you have any questions about these Terms of Use, please contact us at{" "}
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