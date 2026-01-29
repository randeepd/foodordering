import products from "@/assets/data/products";

import ProductListIteam from "@/src/components/ProductListIteam";
import { View } from "react-native";

export default function MenuScreen() {
  return (
    <View>
      <ProductListIteam product={products[0]} />
      <ProductListIteam product={products[1]} />
    </View>
  );
}
