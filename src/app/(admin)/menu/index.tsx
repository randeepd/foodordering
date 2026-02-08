import { useProductList } from "@/src/api/products";
import ProductListIteam from "@/src/components/ProductListIteam";
import { ActivityIndicator, FlatList, Text } from "react-native";

export default function MenuScreen() {
  const { data, isLoading, error } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch products</Text>;
  }
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ProductListIteam product={item} />}
      numColumns={3}
    />
  );
}
