import { useOrderDetails } from "@/src/api/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import OrderListItem from "../../../components/OrderListItem";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  // Ensure we have a single string, even if it comes back as an array
  const normalizedId = Array.isArray(idString) ? idString[0] : idString;

  // Parse the full string
  const id = parseFloat(normalizedId);

  const { data: order, error, isLoading } = useOrderDetails(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Not Able to Fetch Order.</Text>;
  }
  if (!order) return <Text>Not Able to Fetch Order.</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
