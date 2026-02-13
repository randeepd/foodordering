import { supabase } from "@/src/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export const useInsertOrderSubscription = () => {
  const QueryClient = useQueryClient();
  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload);
          QueryClient.invalidateQueries(["orders"]);
        },
      )
      .subscribe();
    return () => {
      orders.unsubscribe();
    };
  }, []);
};

export const UseUpdateOrderSubscription = (id: number) => {
  const QueryClient = useQueryClient();
  useEffect(() => {
    const orders = supabase
      .channel("custom-filter-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${id}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          QueryClient.invalidateQueries(["orders", id]);
        },
      )
      .subscribe();

    return () => {
      orders.unsubscribe();
    };
  }, []);
};
