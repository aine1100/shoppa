import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import TabButtons from "@/components/ui/TabButtons";
import ProductCard from "@/components/ui/ProductCard";

const ShopScreen = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Clothes", "Food", "Furniture", "Fruits"];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="menu-outline" size={28} color="green" />
        <Text style={styles.headerTitle}>Shopa</Text>
      </View>

      {/* Supermarket Info */}
      <Text style={styles.marketTitle}>Simba Supermarket</Text>
      <Image
        source={require("../../assets/images/image_5.png")}
        style={styles.marketImage}
      />

      {/* Contact Information */}
      <Text style={styles.sectionTitle}>Contact Information</Text>
      <Text style={styles.contactText}>Phone Number: 0788888889</Text>
      <Text style={styles.contactText}>Email: simba@gmail.com</Text>
      <Text style={styles.contactText}>Location: Kimironko Kigali</Text>

      {/* Products */}
      <View style={styles.productHeader}>
        <Text style={styles.sectionTitle}>Products (10)</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      {/* Category Tabs */}
      <View style={styles.categoryRow}>
        {categories.map((cat) => (
          <TabButtons key={cat}/>
        ))}
      </View>

      {/* Latest Product */}
      <Text style={styles.sectionTitle}>Latest</Text>
      <ProductCard/>
      
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
  marketTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "green",
    marginBottom: 8,
  },
  marketImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "green",
  },
  contactText: {
    fontSize: 14,
    marginBottom: 3,
    color: "#333",
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 10,
  },
  seeAll: {
    color: "green",
    fontSize: 14,
  },
  categoryRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
});

export default ShopScreen;
