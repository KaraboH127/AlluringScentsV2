import { formatCurrency } from "../../config/site";
import { useCart } from "../../store/CartContext";

/**
 * Checkout-side order recap.
 *
 * Reuses cart totals logic while keeping payment messaging in a dedicated
 * component so checkout form fields remain focused on customer details.
 */
export function CheckoutSummary() {
  const { subtotal } = useCart();
  const delivery = subtotal > 0 ? 95 : 0;
  return (
    <div className="space-y-4 border p-6">
      <h3 className="text-lg site-heading">Order Summary</h3>
      <div className="space-y-2 text-sm text-muted">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{formatCurrency(delivery)}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-base accent-gold">
          <span>Total</span>
          <span>{formatCurrency(subtotal + delivery)}</span>
        </div>
      </div>
      <p className="border-t pt-4 text-sm text-muted">Payment integration coming soon.</p>
    </div>
  );
}
