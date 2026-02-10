import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { InsertTables } from "../../types";

export const useCreateOrderItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    async mutationFn(items: InsertTables<"order_items">[]) {
      const { data: orderItem, error } = await supabase
        .from("order_items")
        .insert(items)
        .select();
      if (error) {
        throw new Error(error.message);
      }
      return orderItem;
    },
    async onSuccess() {
      //await queryClient.invalidateQueries(["order_items"]);
    },
    onError(error) {
      console.log(error);
    },
  });
};
