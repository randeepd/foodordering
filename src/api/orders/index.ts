import { Tables } from "@/src/database.types";
import { useAuth } from "@/src/providers/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../../lib/supabase";
import { InsertTables } from "../../types";

export const useAdminOrderList = ({ archive = false }) => {
  const statuses = archive ? ["DELIVERED"] : ["NEW", "COOKING", "DELIVERING"];
  return useQuery<Tables<"orders">[]>({
    queryKey: ["orders", { archive }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useMyOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;
  return useQuery<Tables<"orders">[]>({
    queryKey: ["orders", { user_id: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(* , products(*))")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();

  return useMutation({
    //async mutationFn({ total }: Pick<Order, "total">) {
    async mutationFn({ total }: InsertTables<"orders">) {
      if (!session?.user) return null;
      const { error, data } = await supabase
        .from("orders")
        .insert({
          total,
          user_id: session.user.id,
        })
        .select();

      if (error) {
        throw error;
      }
      return data[0];
    },
    async onSuccess() {
      //await queryClient.invalidateQueries(["orders"]);
    },
    onError(error) {
      console.log(error);
    },
  });
};
