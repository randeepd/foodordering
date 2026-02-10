import { useAdminOrderList } from "@/src/api/orders";
import OrderListItem from "@/src/components/OrderListItem";
import { Stack } from "expo-router";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function ArchiveScreen() {
  const {
    data: orders,
    error,
    isLoading,
  } = useAdminOrderList({ archive: true });
  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Not Able to Fetch Order.</Text>;
  }
  return (
    <>
      <Stack.Screen options={{ title: "Archive" }} />
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
