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
              Delivery timeframes are estimates and may vary depending on your location and courier availability.
              We are not liable for delays caused by third-party courier services or circumstances beyond our
              reasonable control.
            </p>
          </div>

          {/* 5 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">5. Returns and Refunds</h2>
            <p className="text-sm text-muted leading-relaxed">
              We want you to be completely satisfied with your purchase. Our returns and refunds policy is as follows:
            </p>
            <ul className="text-sm text-muted leading-relaxed space-y-2 list-disc list-inside">
              <li>
                You may return a product within <strong>5 working days</strong> of receiving your order.
              </li>
              <li>
                Products must be returned in their <strong>original, pristine condition</strong> — unused,
                unopened, and in the same condition in which they were received, including all original packaging.
              </li>
              <li>
                If the product is defective (e.g. leaking bottle, broken packaging), email us at{" "}
                <a href="mailto:alluringscents6@gmail.com" className="accent-gold hover:underline">
                  alluringscents6@gmail.com
                </a>{" "}
                with clear photographs of the defect to initiate a replacement or refund.
              </li>
              <li>
                <strong>Return shipping costs</strong> are covered by Alluring Scents for all approved returns.
                We will arrange collection or reimburse reasonable courier costs upon approval.
              </li>
              <li>
                Approved refunds will be processed via <strong>EFT to your provided banking details</strong>{" "}
                within <strong>3–5 working days</strong> of receiving the returned product in our warehouse.
              </li>
              <li>
                We reserve the right to decline a return if the product shows signs of use, damage caused by
                the customer, or is returned outside the 5 working day window.
              </li>
            </ul>
          </div>

          {/* 6 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">6. Intellectual Property</h2>
            <p className="text-sm text-muted leading-relaxed">
              All content on this website — including text, images, logos, fragrance names, and design — is
              the property of Alluring Notes and is protected by applicable intellectual property laws. You
              may not reproduce, distribute, or use any content from this website without our prior written
              consent.
            </p>
          </div>

          {/* 7 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">7. Limitation of Liability</h2>
            <p className="text-sm text-muted leading-relaxed">
              To the fullest extent permitted by South African law, Alluring Notes shall not be liable for
              any indirect, incidental, or consequential damages arising from the use of our website or
              products. Our total liability in respect of any claim shall not exceed the amount paid by you
              for the order giving rise to the claim.
            </p>
          </div>

          {/* 8 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">8. Governing Law</h2>
            <p className="text-sm text-muted leading-relaxed">
              These Terms of Use are governed by and construed in accordance with the laws of the Republic
              of South Africa. Any disputes arising from these terms shall be subject to the jurisdiction
              of the South African courts.
            </p>
          </div>

          {/* 9 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">9. Changes to These Terms</h2>
            <p className="text-sm text-muted leading-relaxed">
              We reserve the right to update these Terms of Use at any time. Changes will be posted on this
              page with an updated effective date. Continued use of the website after changes are posted
              constitutes your acceptance of the revised terms.
            </p>
          </div>

          {/* 10 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">10. Contact Us</h2>
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