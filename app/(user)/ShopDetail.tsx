import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Dynamic import for Lucide
let Lucide: any = null;
try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
const { MessageCircle, Phone, Mail, MapPin } = Lucide || {};

const ShopDetailScreen = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Clothes", "Food", "Furniture", "Fruits"];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Simba Supermarket</Text>
        <Text style={styles.brandName}>Shopa</Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Shop Banner */}
        <Image
          source={require("../../assets/images/image_5.png")}
          style={styles.shopBanner}
        />

        {/* Contact Information */}
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contact Information</Text>
          
          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              {Ionicons.glyphMap['call'] ? (
                <Ionicons name="call" size={20} color={Colors.tint} />
              ) : Phone ? (
                <Phone size={20} color={Colors.tint} />
              ) : (
                <Ionicons name="call-outline" size={20} color={Colors.tint} />
              )}
            </View>
            <Text style={styles.contactText}>Phone Number: 0788888889</Text>
          </View>

          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              {Ionicons.glyphMap['mail'] ? (
                <Ionicons name="mail" size={20} color={Colors.tint} />
              ) : Mail ? (
                <Mail size={20} color={Colors.tint} />
              ) : (
                <Ionicons name="mail-outline" size={20} color={Colors.tint} />
              )}
            </View>
            <Text style={styles.contactText}>Email: simba@gmail.com</Text>
          </View>

          <View style={styles.contactItem}>
            <View style={styles.contactIcon}>
              {Ionicons.glyphMap['location'] ? (
                <Ionicons name="location" size={20} color={Colors.tint} />
              ) : MapPin ? (
                <MapPin size={20} color={Colors.tint} />
              ) : (
                <Ionicons name="location-outline" size={20} color={Colors.tint} />
              )}
            </View>
            <Text style={styles.contactText}>Location: Kimironko Kigali</Text>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.productsSection}>
          <View style={styles.productHeader}>
            <Text style={styles.sectionTitle}>Products (10)</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
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

          {/* Latest Product */}
          <Text style={styles.subsectionTitle}>Latest</Text>
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
        </View>
      </ScrollView>

      {/* Chat Button */}
      <TouchableOpacity 
        style={styles.chatButton}
        onPress={() => router.push("/(user)/Chat")}
      >
        {Ionicons.glyphMap['chatbubble'] ? (
          <Ionicons name="chatbubble" size={20} color="#fff" />
        ) : MessageCircle ? (
          <MessageCircle size={20} color="#fff" />
        ) : (
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
        )}
        <Text style={styles.chatButtonText}>Chat with Shop</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // Header styles
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c2c2c",
    flex: 1,
    textAlign: "center",
  },
  brandName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.tint,
  },

  // Scroll styles
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Shop banner styles
  shopBanner: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },

  // Contact section styles
  contactSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c2c2c",
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  contactIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  contactText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },

  // Products section styles
  productsSection: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  productHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  seeAllText: {
    color: Colors.tint,
    fontSize: 13,
    fontWeight: "600",
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c2c2c",
    marginTop: 20,
    marginBottom: 12,
  },

  // Category styles
  categoryContainer: {
    paddingRight: 16,
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

  // Chat button styles
  chatButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: Colors.tint,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default ShopDetailScreen;
