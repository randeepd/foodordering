import products from "@/assets/data/products";

import ProductListIteam from "@/src/components/ProductListIteam";
import { FlatList } from "react-native";

export default function MenuScreen() {
  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListIteam product={item} />}
      numColumns={3}
    />
  );
}
