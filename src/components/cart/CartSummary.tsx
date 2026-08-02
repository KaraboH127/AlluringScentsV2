import { Link } from "react-router-dom";
import { formatCurrency } from "../../config/site";
import { useDeliveryFee } from "../../hooks/useDeliveryFee";
import { useCart } from "../../store/CartContext";
import { Button } from "../ui/Button";
import { Skeleton } from "../ui/Skeleton";

export function CartSummary() {
  const { subtotal } = useCart();
  const { deliveryFeeCents, loading: deliveryLoading } = useDeliveryFee();

  const deliveryFee = subtotal > 0 ? deliveryFeeCents / 100 : 0;
  const total       = subtotal + deliveryFee;

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
          {deliveryLoading
            ? <Skeleton className="h-4 w-16" />
            : <span>{formatCurrency(deliveryFee)}</span>
          }
        </div>
        <div className="flex justify-between border-t pt-2 text-base accent-gold">
          <span>Total</span>
          {deliveryLoading
            ? <Skeleton className="h-5 w-20" />
            : <span>{formatCurrency(total)}</span>
          }
        </div>
      </div>
      <div className="space-y-3">
        <Link to="/checkout">
          <Button className="w-full" disabled={deliveryLoading}>
            Proceed To Checkout
          </Button>
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