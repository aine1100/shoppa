import ProductCard from "@/components/ui/ProductCard";
import { Colors } from "@/constants/Colors";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

// Dynamic import for Lucide
let Lucide: any = null;
try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
const { Camera, Search } = Lucide || {};

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showImageSearch, setShowImageSearch] = useState(false);

  const categories = ["All", "Clothes", "Food", "Furniture", "Fruits"];

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {/* <TouchableOpacity style={styles.iconCircle}>
          <Ionicons name="menu-outline" size={22} color="#111" />
        </TouchableOpacity> */}
        {/* <Text style={styles.brand}>Shopa</Text> */}
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

        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Products</Text>
        </View>
        <View style={{ height: 6 }} />

        {/* Latest Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.subsectionTitle}>Latest</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardPad}>
          <ProductCard />
        </View>

        <View style={styles.sectionRow}>
          <Text style={styles.subSectionTitle}>Shops</Text>
          <TouchableOpacity>
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

  // Header styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  menuButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flex: 1,
    marginHorizontal: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 8,
    fontSize: 16,
    color: "#000",
  },
  cameraButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
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

  // Section styles
  sectionHeader: {
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
  seeAllText: { 
    color: Colors.tint, 
    fontSize: 13, 
    fontWeight: "600" 
  },

  // Category styles
  categoryContainer: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeCategoryButton: {
    backgroundColor: Colors.tint,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeCategoryText: {
    color: "#fff",
  },

  // Product card styles
  productCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.tint,
    marginBottom: 8,
  },
  viewButton: {
    backgroundColor: Colors.tint,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
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

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 32,
    minWidth: 280,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c2c2c",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: Colors.tint,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  closeButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },

  // New styles for upstream/main version
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 24,
    paddingHorizontal: 16,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c2c2c",
  },
  cardPad: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
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
