import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

import CategoriesList from "@/components/ui/CategoriesList";
import ProductsList from "@/components/ui/ProductList";

const ProductsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Products</Text>
      </View>

      {/* Categories */}
      <CategoriesList />

      {/* Products Section Header */}
      <View style={styles.productHeader}>
        <Text style={styles.latestTitle}>Latest</Text>
      </View>

      {/* Products List - Vertical with Infinite Scroll */}
      <View style={styles.productsContainer}>
        <ProductsList 
          horizontal={false} 
          showLoadMore={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
  },
  
  header: {
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "#fff",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.tint,
    marginBottom: 10,
  },

  productHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },

  latestTitle: {
    fontSize: 18,
    fontWeight: "600", 
    color: "#2c2c2c",
  },

  productsContainer: {
    // flex: 1,
  },
});

export default ProductsScreen;