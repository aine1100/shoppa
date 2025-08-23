import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import ShopCard from "@/components/ui/ShopCard"; 
import SearchBar from "@/components/ui/SearchBar";

const shops = [
  { id: 1, name: "Simba Supermarket", image: "https://cdn.britannica.com/84/170584-050-64B5F60F/Supermarket-interior.jpg" },
  { id: 2, name: "Simba Supermarket", image: "https://cdn.britannica.com/84/170584-050-64B5F60F/Supermarket-interior.jpg" },
  { id: 3, name: "Simba Supermarket", image: "https://cdn.britannica.com/84/170584-050-64B5F60F/Supermarket-interior.jpg" },
  { id: 4, name: "Simba Supermarket", image: "https://cdn.britannica.com/84/170584-050-64B5F60F/Supermarket-interior.jpg" },
];

const ShopsScreen = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      <SearchBar />

      {/* Shops Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shops</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      {/* Shops Grid */}
      <View style={styles.shopGrid}>
        {shops.map((shop) => (
          <ShopCard key={shop.id} {...shop} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 15, paddingTop: 40 },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "green" },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  searchText: { marginLeft: 10, color: "gray" },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: "600", color: "green" },
  seeAll: { color: "green" },
  shopGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
});

export default ShopsScreen;
