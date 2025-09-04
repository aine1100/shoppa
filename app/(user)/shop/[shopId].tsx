// (user)/ShopDetail.tsx
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { 
  ActivityIndicator, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { useShopDetails } from "@/hooks/useShopDetails";
import { useShopProducts, useLatestShopProduct } from "@/hooks/useShopProducts";
import CategoriesList from "@/components/ui/CategoriesList";

// Dynamic import for Lucide
let Lucide: any = null;
try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
const { MessageCircle, Phone, Mail, MapPin } = Lucide || {};

const ShopDetailScreen = () => {
  const { id: shopId } = useLocalSearchParams<{ id: string }>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  
  // Fetch shop details
  const { data: shop, isLoading: shopLoading, error: shopError } = useShopDetails(shopId);
  
  // Fetch products based on selected category
  const { data: products, isLoading: productsLoading } = useShopProducts({
    shopId,
    categoryId: selectedCategoryId
  });
  
  // Fetch latest product
  const { data: latestProduct } = useLatestShopProduct(shopId, selectedCategoryId);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  const formatLocation = () => {
    if (!shop) return 'Location not available';
    if (shop.latitude && shop.longitude) {
      return `Lat: ${shop.latitude.toFixed(4)}, Long: ${shop.longitude.toFixed(4)}`;
    }
    return 'Kigali, Rwanda'; // Default location
  };

  if (shopLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.tint} />
      </View>
    );
  }

  if (shopError || !shop) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>Failed to load shop details</Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => router.back()}
        >
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
        <Text style={styles.headerTitle} numberOfLines={1}>{shop.title}</Text>
        <Text style={styles.brandName}>Shopa</Text>
      </View>

      <ScrollView 
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Shop Banner */}
        {shop.image ? (
          <Image
            source={{ uri: shop.image }}
            style={styles.shopBanner}
          />
        ) : (
          <View style={[styles.shopBanner, styles.placeholderBanner]}>
            <Ionicons name="storefront-outline" size={50} color="#ccc" />
          </View>
        )}

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
            <Text style={styles.contactText}>
              Phone: {shop.owner[0]?.phone_number || 'Not available'}
            </Text>
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
            <Text style={styles.contactText}>
              Email: {shop.owner[0]?.email || 'Not available'}
            </Text>
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
            <Text style={styles.contactText}>
              Location: {formatLocation()}
            </Text>
          </View>
        </View>

        {/* Products Section */}
        <View style={styles.productsSection}>
          <View style={styles.productHeader}>
            <Text style={styles.sectionTitle}>
              Products {products ? `(${products.length})` : ''}
            </Text>
            {/* <TouchableOpacity onPress={() => router.push({
              pathname: "/(user)/ShopProducts",
              params: { shopId },
            })}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity> */}
          </View>

          {/* Category Tabs - Replaced with CategoriesList */}
          <CategoriesList onCategorySelect={handleCategorySelect} />

          {/* Latest Product */}
          {productsLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={Colors.tint} />
            </View>
          ) : latestProduct ? (
            <>
              <Text style={styles.subsectionTitle}>Latest</Text>
              <View style={styles.productCard}>
                {latestProduct.image ? (
                  <Image
                    source={{ uri: latestProduct.image }}
                    style={styles.productImage}
                  />
                ) : (
                  <View style={[styles.productImage, styles.placeholderImage]}>
                    <Ionicons name="image-outline" size={30} color="#ccc" />
                  </View>
                )}
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {latestProduct.name}
                  </Text>
                  <Text style={styles.productPrice}>
                    {latestProduct.price.toLocaleString()} Frw
                  </Text>
                  <TouchableOpacity 
                    style={styles.viewButton}
                    onPress={() => router.push({
                      pathname: '/(user)/products/[productId]',
                      params: { productId: latestProduct.id }
                    })}
                  >
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.noProductsText}>No products available</Text>
          )}
        </View>
      </ScrollView>

          {/* <TouchableOpacity 
        style={styles.chatButton}
        onPress={() => router.push(`/(user)/Chat?shopId=${shopId}`)}
      >
        {Ionicons.glyphMap['chatbubble'] ? (
          <Ionicons name="chatbubble" size={20} color="#fff" />
        ) : MessageCircle ? (
          <MessageCircle size={20} color="#fff" />
        ) : (
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
        )}
        <Text style={styles.chatButtonText}>Chat with Shop</Text>
      </TouchableOpacity> */}
    </View>
  );
};

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
  placeholderBanner: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
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
  placeholderImage: {
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
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

  // Loading and error styles
  loadingContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
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
  noProductsText: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    paddingVertical: 20,
  },
});

export default ShopDetailScreen;