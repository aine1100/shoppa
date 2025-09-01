import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuButton}>
          <Ionicons name="menu-outline" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            {Ionicons.glyphMap['camera'] ? (
              <Ionicons name="camera" size={20} color="#999" />
            ) : Camera ? (
              <Camera size={20} color="#999" />
            ) : (
              <Ionicons name="camera-outline" size={20} color="#999" />
            )}
            <TextInput
              style={styles.searchInput}
              placeholder="Search Product"
              placeholderTextColor="#999"
            />
            {Ionicons.glyphMap['search'] ? (
              <Ionicons name="search" size={20} color="#999" />
            ) : Search ? (
              <Search size={20} color="#999" />
            ) : (
              <Ionicons name="search-outline" size={20} color="#999" />
            )}
          </View>
        </View>
        <TouchableOpacity 
          style={styles.cameraButton}
          onPress={() => router.push("/(user)/ImageSearch")}
        >
          {Ionicons.glyphMap['camera'] ? (
            <Ionicons name="camera" size={24} color="#000" />
          ) : Camera ? (
            <Camera size={24} color="#000" />
          ) : (
            <Ionicons name="camera-outline" size={24} color="#000" />
          )}
        </TouchableOpacity>
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

        {/* Products Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Products</Text>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                activeCategory === category && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category)}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.activeCategoryText
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Latest Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.subsectionTitle}>Latest</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Product Card */}
        <View style={styles.productCard}>
          <Image
            source={require("../../assets/images/shoe.png")}
            style={styles.productImage}
          />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Nike Air Force Shoe</Text>
            <Text style={styles.productPrice}>20000 Frw</Text>
            <TouchableOpacity 
              style={styles.viewButton}
              onPress={() => router.push("/(user)/ProductDetail")}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Shops Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.subsectionTitle}>Shops</Text>
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

      {/* Image Search Modal */}
      <Modal
        visible={showImageSearch}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowImageSearch(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Search product by image</Text>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Upload image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Take live image</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton}>
              <Text style={styles.modalButtonText}>use google drive</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowImageSearch(false)}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
});
