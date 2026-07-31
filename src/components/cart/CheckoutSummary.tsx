import { formatCurrency } from "../../config/site";
import { useCart } from "../../store/CartContext";
import { Skeleton } from "../ui/Skeleton";

interface CheckoutSummaryProps {
  deliveryFee: number;
  deliveryLoading: boolean;
}

export function CheckoutSummary({ deliveryFee, deliveryLoading }: CheckoutSummaryProps) {
  const { subtotal } = useCart();
  const delivery = subtotal > 0 ? deliveryFee : 0;

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
          {deliveryLoading
            ? <Skeleton className="h-4 w-16" />
            : <span>{formatCurrency(delivery)}</span>
          }
        </div>
        <div className="flex justify-between border-t pt-2 text-base accent-gold">
          <span>Total</span>
          {deliveryLoading
            ? <Skeleton className="h-5 w-20" />
            : <span>{formatCurrency(subtotal + delivery)}</span>
          }
        </div>
      </div>
    </div>
  );
}