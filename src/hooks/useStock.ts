import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export function useStock(fragranceId: string | undefined) {
  const [stock, setStock] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!fragranceId) return;
    setLoading(true);
    supabase
      .from("inventory")
      .select("size, stock")
      .eq("fragrance_id", fragranceId)
      .then(({ data, error }) => {
        if (!error && data) {
          const map: Record<string, number> = {};
          data.forEach((row) => { map[row.size] = row.stock; });
          setStock(map);
        }
        setLoading(false);
      });
  }, [fragranceId]);

  return { stock, loading };
}