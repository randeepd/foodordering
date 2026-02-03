import { Product } from "@/assets/types";
import Colors from "@/src/constants/Colors";
import { Link, useSegments } from "expo-router";
import { Image, Pressable, StyleSheet, Text } from "react-native";

type ProductListIteamProps = {
  product: Product;
};

const ProductListIteam = ({ product }: ProductListIteamProps) => {
  const segment = useSegments();
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{
            uri:
              product.image ||
              "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png",
          }}
          style={styles.image}
          resizeMode="contain"
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
