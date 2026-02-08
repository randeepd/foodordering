import Button from "@/src/components/Button";
import { supabase } from "@/src/lib/supabase";
import { Stack } from "expo-router";

export default function OrdersScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Profile" }} />
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </>
  );
}
