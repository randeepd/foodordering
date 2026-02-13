import Colors from "@/src/constants/Colors";
import { Link, useSegments } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";
import { Tables } from "../types";
import RemoteImage from "./RemoteImage";

type ProductListIteamProps = {
  product: Tables<"products">;
};

const ProductListIteam = ({ product }: ProductListIteamProps) => {
  const segment = useSegments();
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback="https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png"
        />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </Pressable>
    </Link>
  );
};

export default ProductListIteam;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
    flex: 1,
    margin: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    fontSize: 16,
    fontWeight: 400,
  },
});
