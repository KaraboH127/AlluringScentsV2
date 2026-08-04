import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useDeliveryFee() {
  const [deliveryFeeCents, setDeliveryFeeCents] = useState(9500);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("settings")
      .select("value")
      .eq("key", "delivery_fee_cents")
      .single()
      .then(({ data, error }) => {
        const cents = !error && data ? parseInt(data.value, 10) : 9500;
        setDeliveryFeeCents(cents);
        setLoading(false);
      });
  }, []);

  return { deliveryFeeCents, loading };
}
