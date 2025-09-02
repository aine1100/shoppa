import { Colors } from "@/constants/Colors";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import ProductsList from "@/components/ui/ProductList";
import CategoriesList from "@/components/ui/CategoriesList";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>
              Get all the products from different shops
            </Text>
            <TouchableOpacity style={styles.exploreButton}>
              <Text style={styles.exploreButtonText}>Explore</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={require("../../assets/images/shoe.png")}
            style={styles.bannerImage}
          />
        </View>

        {/* Categories */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        
        <CategoriesList />

        {/* Products Section */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Products</Text>
        </View>
        <View style={{ height: 6 }} />

        {/* Latest Products - Horizontal Scroll */}
        <View style={styles.sectionHeader}>
          <Text style={styles.subsectionTitle}>Latest</Text>
          <TouchableOpacity onPress={() => router.push("/(user)/Products")}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Horizontal Products List - Limited to 5 items */}
        <ProductsList 
          horizontal={true} 
          showLoadMore={false} 
          limit={5} 
        />

        {/* Shops Section */}
        <View style={styles.sectionRow}>
          <Text style={styles.subSectionTitle}>Shops</Text>
          <TouchableOpacity onPress={() => router.push("/(user)/Shops")}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.shopsContainer}
        >
          <TouchableOpacity 
            style={styles.shopCard}
            onPress={() => router.push("/(user)/ShopDetail")}
          >
            <Image
              source={require("../../assets/images/image_5.png")}
              style={styles.shopImage}
            />
            <Text style={styles.shopName}>Simba Supermarket</Text>
            <TouchableOpacity style={styles.viewShopButton}>
              <Text style={styles.viewShopButtonText}>View shop</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.shopCard}
            onPress={() => router.push("/(user)/ShopDetail")}
          >
            <Image
              source={require("../../assets/images/image_5.png")}
              style={styles.shopImage}
            />
            <Text style={styles.shopName}>Simba Supermarket</Text>
            <TouchableOpacity style={styles.viewShopButton}>
              <Text style={styles.viewShopButtonText}>View shop</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.homePill}>
          <Ionicons name="home" size={18} color="#fff" />
          <Text style={styles.homePillTxt}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(user)/Shops")}
        >
          <Entypo name="shop" size={24} color={Colors.tint} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(user)/Products")}
        >
          <MaterialIcons name="production-quantity-limits" size={24} color={Colors.tint} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },

  // Content styles
  scrollContent: { 
    paddingBottom: 100 
  },

  // Banner styles
  banner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tint,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    height: 150,
    paddingHorizontal: 16,
    overflow: "hidden",
  },
  bannerContent: { 
    flex: 1, 
    paddingRight: 8 
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  exploreButton: {
    backgroundColor: "#fff",
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
  exploreButtonText: { 
    color: Colors.tint, 
    fontWeight: "700" 
  },
  bannerImage: { 
    width: 120, 
    height: 120, 
    position: "absolute",
    right: -10,
    top: 15
  },

  // Header styles
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },

  // Section styles
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c2c2c",
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c2c2c",
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c2c2c",
  },
  seeAllText: { 
    color: Colors.tint, 
    fontSize: 13, 
    fontWeight: "600" 
  },

  // Shop card styles
  shopsContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  shopCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shopImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  shopName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 8,
  },
  viewShopButton: {
    backgroundColor: Colors.tint,
    paddingVertical: 6,
    borderRadius: 16,
    alignItems: "center",
  },
  viewShopButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  // Bottom navigation
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingBottom: 34,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  homePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tint,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  homePillTxt: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
});