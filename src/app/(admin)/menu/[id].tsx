import products from "@/assets/data/products";
import { PizzaSize } from "@/assets/types";
import { useCart } from "@/src/providers/CartProvider";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const defaultPizzaImage = "";

const ProductDetailsScreen = () => {
  const Router = useRouter();
  const { addItem } = useCart();
  const { id } = useLocalSearchParams();
  const product = products.find((p) => p.id.toString() === id);
  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const addToCart = () => {
    if (!product) return;
    addItem(product, selectedSize);
    Router.push("/cart");
  };

  if (!product) {
    return <Text>Product Missing</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
  },

  sizes: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  size: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
  },
});

export default ProductDetailsScreen;
