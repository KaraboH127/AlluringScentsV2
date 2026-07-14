import { SEOHead } from "../SEOHead";
import { Section } from "../components/layout/Section";
import { Breadcrumb } from "../components/ui/Breadcrumb";

export function ReturnsRefundsPage() {
  return (
    <>
      <SEOHead
        title="Returns, Refunds & Exchanges | Alluring Scents"
        description="Our returns, refunds and exchanges policy for products purchased through Alluring Scents."
        path="/returns-refunds"
      />
      <Section>
        <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Returns, Refunds & Exchanges", path: "/returns-refunds" }]} />
        <div className="mx-auto max-w-3xl space-y-10 mt-8">
          <div className="space-y-2">
            <h1 className="text-4xl site-heading md:text-5xl">Returns, Refunds & Exchanges</h1>
            <p className="text-sm text-muted">Effective date: 1 January 2024</p>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            This Returns, Refunds and Exchanges Policy explains your rights and our procedures in
            relation to products purchased through our website. This Policy is intended to comply with
            the Consumer Protection Act 68 of 2008 ("CPA"), the Electronic Communications and
            Transactions Act 25 of 2002 ("ECTA") and any other applicable South African legislation.
          </p>

          {/* 1 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">1. Scope</h2>
            <p className="text-sm text-muted leading-relaxed">
              This Policy applies to all purchases made through our website by consumers within the
              Republic of South Africa.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Due to the nature of perfumes and fragrance products, we generally do not accept returns where:
            </p>
            <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc list-inside">
              <li>The product has been opened</li>
              <li>The product has been used or tested</li>
              <li>The packaging has been damaged by the customer</li>
            </ul>
            <p className="text-sm text-muted leading-relaxed">
              If a product remains unopened, unused, in its original sealed condition and original
              packaging, we may, at our discretion, accept a return within <strong>5 (five) days</strong> of delivery,
              subject to inspection.
            </p>
          </div>

          {/* 2 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">2. Erroneous Products and Orders</h2>
            <p className="text-sm text-muted leading-relaxed">
              If you receive a product different from the one ordered, please notify us within <strong>48 (forty eight) hours of delivery</strong>.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              Provided the product remains unused and in its original condition, we will arrange
              for collection and either:
            </p>
            <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc list-inside">
              <li>Replace the product; or</li>
              <li>Issue a refund where a replacement is unavailable</li>
            </ul>
          </div>

          {/* 3 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">3. Defective Products</h2>
            <p className="text-sm text-muted leading-relaxed">
              If a product is defective or fails to meet the standards required by section 55 of the
              Consumer Protection Act, you may exercise your rights under section 56 of the Act by
              returning the product, and we shall replace the product or issue a refund.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              To report a defective product, email us at{" "}
              <a href="mailto:alluringscents6@gmail.com" className="accent-gold hover:underline">
                alluringscents6@gmail.com
              </a>{" "}
              with clear photographs of the defect and your order details.
            </p>
            <p className="text-sm text-muted leading-relaxed">
              This right does not apply where the defect results from misuse, negligence, accidental
              damage or failure to follow reasonable storage or usage instructions.
            </p>
          </div>

          {/* 4 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">4. Refunds</h2>
            <p className="text-sm text-muted leading-relaxed">
              Approved refunds will be processed using the original payment method wherever reasonably
              possible. Refund processing times may vary depending on the payment provider but generally
              take between <strong>3 (three) and 5 (five) business days</strong> after approval.
            </p>
          </div>

          {/* 5 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">5. Exchanges</h2>
            <p className="text-sm text-muted leading-relaxed">
              Where stock is available, we may exchange eligible unopened products for another product
              of equal value. If there is a price difference, you may be required to pay the balance or
              receive a partial refund, as applicable.
            </p>
          </div>

          {/* 6 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">6. Return Procedure</h2>
            <p className="text-sm text-muted leading-relaxed">
              To request a return, please contact us at{" "}
              <a href="mailto:alluringscents6@gmail.com" className="accent-gold hover:underline">
                alluringscents6@gmail.com
              </a>{" "}
              with the following:
            </p>
            <ul className="text-sm text-muted leading-relaxed space-y-1 list-disc list-inside">
              <li>Your full name</li>
              <li>Order number and/or proof of purchase</li>
              <li>A description of the issue</li>
              <li>Supporting photographs where applicable</li>
            </ul>
            <p className="text-sm text-muted leading-relaxed">
              We will provide instructions for the return process and, where applicable, arrange
              collection through our nominated courier at no cost to you.
            </p>
          </div>

          {/* 7 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">7. Inspection of Returned Goods</h2>
            <p className="text-sm text-muted leading-relaxed">
              All returned products will be inspected upon receipt to determine whether they comply
              with the requirements of this Policy. We reserve the right to decline a return if, upon
              inspection, the product is found to be ineligible for return, including where it has been
              opened, used, damaged, altered or otherwise fails to meet the conditions set out in this
              Policy. In such circumstances, the product may be returned to you at your expense and no
              refund, replacement or exchange will be processed unless otherwise required by applicable law.
            </p>
          </div>

          {/* 8 */}
          <div className="space-y-3">
            <h2 className="text-xl site-heading">8. Contact Us</h2>
            <p className="text-sm text-muted leading-relaxed">
              If you have any questions about this Policy, please contact us at{" "}
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