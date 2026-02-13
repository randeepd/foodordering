import { useAdminOrderList } from "@/src/api/orders";
import { useInsertOrderSubscription } from "@/src/api/orders/subscription";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function OrdersScreen() {
  const {
    data: orders,
    error,
    isLoading,
  } = useAdminOrderList({ archive: false });
  useInsertOrderSubscription();
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Not Able to Fetch Order.</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: "Orders" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
