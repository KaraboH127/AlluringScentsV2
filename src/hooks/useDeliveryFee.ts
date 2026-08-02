import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

let cachedFee: number | null = null;

export function useDeliveryFee() {
  const [deliveryFeeCents, setDeliveryFeeCents] = useState(cachedFee ?? 9500);
  const [loading, setLoading] = useState(cachedFee === null);

  useEffect(() => {
    if (cachedFee !== null) return;
    supabase
      .from("settings")
      .select("value")
      .eq("key", "delivery_fee_cents")
      .single()
      .then(({ data, error }) => {
        const cents = !error && data ? parseInt(data.value, 10) : 9500;
        cachedFee = cents;
        setDeliveryFeeCents(cents);
        setLoading(false);
      });
  }, []);

  return { deliveryFeeCents, loading };
}