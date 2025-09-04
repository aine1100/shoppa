// (user)/ProductDetail.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useProductDetails, useProductStats } from "@/hooks/useProductDetails";

// Dynamic import for Lucide
let Lucide: any = null;
try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
const { Star } = Lucide || {};

export default function ProductDetailScreen() {
  const { id: productId } = useLocalSearchParams<{ id: string }>();

  // Fetch product details
  const { data: product, isLoading: productLoading, error: productError } = useProductDetails(productId);
  
  // Fetch product stats
  const { data: stats } = useProductStats(productId);

  const renderStars = (currentRating: number) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <View key={star} style={styles.star}>
            {Ionicons.glyphMap['star'] ? (
              <Ionicons
                name={star <= currentRating ? "star" : "star-outline"}
                size={16}
                color="#FFD700"
              />
            ) : Star ? (
              <Star
                size={16}
                color="#FFD700"
                fill={star <= currentRating ? "#FFD700" : "none"}
              />
            ) : (
              <Text style={styles.starText}>⭐</Text>
            )}
          </View>
        ))}
      </View>
    );
  };

  if (productLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.tint} />
      </View>
    );
  }

  if (productError || !product) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Failed to load product details</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        <Text style={styles.headerTitle} numberOfLines={1}>{product.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
          ) : (
            <View style={[styles.productImage, styles.placeholderImage]}>
              <Ionicons name="image-outline" size={50} color="#ccc" />
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productPrice}>{product.price.toLocaleString()} Rwf</Text>
          
          {/* Shop Info */}
          <TouchableOpacity 
            style={styles.shopInfo}
            onPress={() => router.push(`/(user)/ShopDetail?id=${product.shop[0].id}`)}
          >
            <Text style={styles.shopName}>{product.shop[0].title}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(Math.round(stats?.average_rating || 0))}
              <Text style={styles.ratingText}>
                {stats?.average_rating ? stats.average_rating.toFixed(1) : '0.0'} ({stats?.total_reviews || 0} Reviews)
              </Text>
            </View>
          </TouchableOpacity>

          {/* Description */}
          {product.description && (
            <>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </>
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.rateButton}
          onPress={() => router.push(`/(user)/ShopDetail?id=${product.shop[0].id}`)}
        >
          <Text style={styles.rateButtonText}>View Shop</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
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
    marginHorizontal: 8,
  },
  placeholder: {
    width: 40,
  },

  // Content styles
  scrollContent: {
    paddingBottom: 100,
  },

  // Image styles
  imageContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f9f9f9",
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  placeholderImage: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },

  // Product info styles
  productInfo: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.tint,
    marginBottom: 16,
  },

  // Shop info styles
  shopInfo: {
    marginBottom: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  shopName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  star: {
    marginRight: 2,
  },
  starText: {
    fontSize: 16,
  },
  ratingText: {
    fontSize: 14,
    color: "#666",
  },

  // Description styles
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 24,
  },

  // Action buttons styles
  actionButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  rateButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.tint,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  rateButtonText: {
    color: Colors.tint,
    fontSize: 16,
    fontWeight: "600",
  },

  // Error styles
  errorText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.tint,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});