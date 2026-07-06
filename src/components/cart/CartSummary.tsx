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
    <div className="space-y-5 border border-[#222] p-6">
      <h3 className="text-lg text-white">Order Summary</h3>
      <div className="space-y-2 text-sm text-[#D4D4D4]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{subtotal > 0 ? formatCurrency(95) : formatCurrency(0)}</span>
        </div>
        <div className="flex justify-between border-t border-[#2A2A2A] pt-2 text-base text-[#C9A227]">
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
