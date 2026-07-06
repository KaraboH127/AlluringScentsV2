import { Link } from "react-router-dom";
import { formatCurrency } from "../../config/site";
import { useCart } from "../../store/CartContext";
import { Button } from "../ui/Button";

/**
 * Cart totals and checkout actions for the dedicated cart page.
 *
 * Keeps pricing presentation separate from line-item rendering.
 */
export function CartSummary() {
  const { subtotal } = useCart();
  return (
    <div className="space-y-5 border p-6">
      <h3 className="text-lg site-heading">Order Summary</h3>
      <div className="space-y-2 text-sm text-muted">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{subtotal > 0 ? formatCurrency(95) : formatCurrency(0)}</span>
        </div>
        <div className="flex justify-between border-t pt-2 text-base accent-gold">
          <span>Total</span>
          <span>{formatCurrency(subtotal > 0 ? subtotal + 95 : 0)}</span>
        </div>
      </div>
      <div className="space-y-3">
        <Link to="/checkout">
          <Button className="w-full">Proceed To Checkout</Button>
        </Link>
        <Link to="/collections">
          <Button variant="ghost" className="w-full">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  );
}
