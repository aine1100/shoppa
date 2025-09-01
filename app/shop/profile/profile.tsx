import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ShopProfileScreen() {
  const [isFollowing, setIsFollowing] = useState(false);

  const shopInfo = {
    name: "Shopa",
    
    product: "1.5K",
    rating: 4.8,
    reviews: "12.5K",
    description:
      "Premium fashion & lifestyle store. Quality products at affordable prices. Fast shipping worldwide.",
    verified: true,
    location: "New York, USA",
    website: "www.shopa.com",
  };

  const products = [
    {
      id: 1,
      name: "Black Winter Jacket",
      price: "$89.99",
      originalPrice: "$129.99",
      image: require("@/assets/images/product.png"),
      discount: "30% OFF",
      rating: 4.5,
      reviews: 234,
    },
    {
      id: 2,
      name: "Mens Starry Night Shirt",
      price: "$45.99",
      originalPrice: "$65.99",
      image: require("@/assets/images/product.png"),
      discount: "30% OFF",
      rating: 4.3,
      reviews: 156,
    },
    {
      id: 3,
      name: "Black Dress",
      price: "$79.99",
      originalPrice: "$99.99",
      image: require("@/assets/images/product.png"),
      discount: "20% OFF",
      rating: 4.7,
      reviews: 89,
    },
    {
      id: 4,
      name: "Pink Envelope Bag",
      price: "$35.99",
      originalPrice: "$49.99",
      image: require("@/assets/images/product.png"),
      discount: "28% OFF",
      rating: 4.2,
      reviews: 67,
    },
    {
      id: 5,
      name: "Blue Dress",
      price: "$69.99",
      originalPrice: "$89.99",
      image: require("@/assets/images/product.png"),
      discount: "22% OFF",
      rating: 4.6,
      reviews: 123,
    },
    {
      id: 6,
      name: "Denim Dress",
      price: "$55.99",
      originalPrice: "$75.99",
      image: require("@/assets/images/product.png"),
      discount: "26% OFF",
      rating: 4.4,
      reviews: 98,
    },
    {
      id: 7,
      name: "Ocean Surf Tee",
      price: "$29.99",
      originalPrice: "$39.99",
      image: require("@/assets/images/product.png"),
      discount: "25% OFF",
      rating: 4.1,
      reviews: 45,
    },
    {
      id: 8,
      name: "Red Hoodie",
      price: "$59.99",
      originalPrice: "$79.99",
      image: require("@/assets/images/product.png"),
      discount: "25% OFF",
      rating: 4.5,
      reviews: 178,
    },
    {
      id: 9,
      name: "Sony Shoes",
      price: "$119.99",
      originalPrice: "$149.99",
      image: require("@/assets/images/product.png"),
      discount: "20% OFF",
      rating: 4.8,
      reviews: 267,
    },
    {
      id: 10,
      name: "Black Hoodie",
      price: "$65.99",
      originalPrice: "$85.99",
      image: require("@/assets/images/product.png"),
      discount: "23% OFF",
      rating: 4.3,
      reviews: 134,
    },
    {
      id: 11,
      name: "DTOM Dri-Fit Tee",
      price: "$39.99",
      originalPrice: "$54.99",
      image: require("@/assets/images/product.png"),
      discount: "27% OFF",
      rating: 4.2,
      reviews: 89,
    },
    {
      id: 12,
      name: "Men Running Shoes",
      price: "$99.99",
      originalPrice: "$129.99",
      image: require("@/assets/images/product.png"),
      discount: "23% OFF",
      rating: 4.6,
      reviews: 203,
    },
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleProductPress = (productId: number) => {
    router.push("/shop/product/product-detail");
  };

  const handleMessage = () => {
    // Handle message functionality
  };

  const handleShare = () => {
    // Handle share functionality
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Ionicons name="storefront" size={16} color="white" />
            </View>
            <Text style={styles.logoText}>Shopa</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <Image
              source={require("@/assets/images/avatar.png")}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <View style={styles.nameContainer}>
                <Text style={styles.shopName}>{shopInfo.name}</Text>
                {shopInfo.verified && (
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                )}
              </View>
              <Text style={styles.location}>📍 {shopInfo.location}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{shopInfo.product}</Text>
              <Text style={styles.statLabel}>Products</Text>
            </View>
           
            <View style={styles.statItem}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.statNumber}>{shopInfo.rating}</Text>
              </View>
              <Text style={styles.statLabel}>{shopInfo.reviews} Reviews</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>{shopInfo.description}</Text>
          <Text style={styles.website}>{shopInfo.website}</Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={handleMessage}
            >
              <Text style={styles.messageButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Ionicons name="share-outline" size={18} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Products Grid */}
        <View style={styles.productsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Products</Text>
            <Text style={styles.productCount}>{products.length} items</Text>
          </View>

          <View style={styles.productsGrid}>
            {products.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productCard}
                onPress={() => handleProductPress(product.id)}
              >
                <View style={styles.productImageContainer}>
                  <Image source={product.image} style={styles.productImage} />
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}</Text>
                  </View>
                </View>

                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {product.name}
                  </Text>

                  <View style={styles.ratingRow}>
                    <View style={styles.stars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Ionicons
                          key={star}
                          name={
                            star <= Math.floor(product.rating)
                              ? "star"
                              : "star-outline"
                          }
                          size={12}
                          color="#FFD700"
                        />
                      ))}
                    </View>
                    <Text style={styles.reviewCount}>({product.reviews})</Text>
                  </View>

                  <View style={styles.priceContainer}>
                    <Text style={styles.price}>{product.price}</Text>
                    <Text style={styles.originalPrice}>
                      {product.originalPrice}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#4CAF50",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    backgroundColor: "#4CAF50",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  logoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  profileSection: {
    padding: 20,
    backgroundColor: "#fff",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  profileInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  shopName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  username: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#f0f0f0",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  description: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 10,
  },
  website: {
    fontSize: 14,
    color: "#4CAF50",
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  followButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  followingButton: {
    backgroundColor: "#f0f0f0",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  followButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  followingButtonText: {
    color: "#333",
  },
  messageButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginRight: 10,
  },
  messageButtonText: {
    color: "#4CAF50",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 5,
  },
  shareButton: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#4CAF50",
  },
  productsSection: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  productCount: {
    fontSize: 14,
    color: "#666",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#FF4444",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
});
