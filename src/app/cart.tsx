import { StatusBar } from "expo-status-bar";
import { FlatList, Platform, Text, View } from "react-native";
import Button from "../components/Button";
import CartListItem from "../components/CartListItem";
import { useCart } from "../providers/CartProvider";

const CartScreen = () => {
  const { items, total, checkOut } = useCart();
  if (items.length == 0) {
    return (
      <View style={{ padding: 10 }}>
        <Text>Cart is Empty</Text>
        <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      </View>
    );
  }

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      ></FlatList>
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "600" }}>
        Total: ${total}
      </Text>
      <Button onPress={checkOut} text="Checkout" />
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;
