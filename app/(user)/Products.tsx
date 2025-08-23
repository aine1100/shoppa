import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import TabButtons from "@/components/ui/TabButtons"; 
import ProductCard from "@/components/ui/ProductCard"; 

const ProductsScreen = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const categories = ["All", "Clothes", "Food", "Furniture", "Fruits"];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Products</Text>

      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TabButtons key={cat} />
        ))}
      </View>

      <View style={styles.productHeader}>
        <Text style={styles.sectionTitle}>Latest</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <View style={styles.productsList}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 40,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
    marginBottom: 10,
  },
  categoryRow: { 
    flexDirection: "row", 
    marginBottom: 20,
    gap: 10,  
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  seeAll: { color: "green", fontWeight: "500" },

  productsList: {
    flexDirection: "column",
    gap: 16,
  },
});

export default ProductsScreen;
