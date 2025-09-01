import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
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
const { Star, MessageCircle } = Lucide || {};

export default function ProductDetailScreen() {
  const [selectedColor, setSelectedColor] = useState("White");
  const [selectedSize, setSelectedSize] = useState("42");
  const [reviewText, setReviewText] = useState("");

  const colors = ["White", "Black", "Red", "Blue"];
  const sizes = ["40", "41", "42", "43", "44", "46"];

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
        <Text style={styles.headerTitle}>Nike Air Force Shoe</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/images/shoe.png")}
            style={styles.productImage}
          />
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productPrice}>20000 Rwf</Text>
          
          {/* Shop Info */}
          <View style={styles.shopInfo}>
            <Text style={styles.shopName}>Simba SupaMarket Shop</Text>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <View key={star} style={styles.star}>
                    {Ionicons.glyphMap['star'] ? (
                      <Ionicons 
                        name={star <= 4 ? "star" : "star-half"} 
                        size={16} 
                        color="#FFD700" 
                      />
                    ) : Star ? (
                      <Star 
                        size={16} 
                        color="#FFD700" 
                        fill={star <= 4 ? "#FFD700" : "none"}
                      />
                    ) : (
                      <Text style={styles.starText}>⭐</Text>
                    )}
                  </View>
                ))}
              </View>
              <Text style={styles.ratingText}>4.5 (1000 Reviews)</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            This is a high-quality Nike Air Force shoe with excellent comfort and style. 
            Perfect for everyday wear and sports activities.
          </Text>

          {/* Color Selection */}
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Choose Color</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.optionsContainer}
            >
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorOption,
                    selectedColor === color && styles.selectedColorOption
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <Text
                    style={[
                      styles.colorText,
                      selectedColor === color && styles.selectedColorText
                    ]}
                  >
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Size Selection */}
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionTitle}>Size</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.optionsContainer}
            >
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedSizeOption
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Review Section */}
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewTitle}>Rate the shop</Text>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} style={styles.star}>
                  {Ionicons.glyphMap['star'] ? (
                    <Ionicons name="star-outline" size={24} color="#FFD700" />
                  ) : Star ? (
                    <Star size={24} color="#FFD700" />
                  ) : (
                    <Text style={styles.starText}>⭐</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.reviewInputContainer}>
              <TextInput
                style={styles.reviewInput}
                placeholder="Drop your thoughts on this shop"
                placeholderTextColor="#999"
                multiline
                value={reviewText}
                onChangeText={setReviewText}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
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
          <Text style={styles.chatButtonText}>Talk to the Shop</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.rateButton}
          onPress={() => router.push("/(user)/RateShop")}
        >
          <Text style={styles.rateButtonText}>Rate shop</Text>
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
  placeholder: {
    width: 40,
  },

  // Content styles
  scrollContent: {
    paddingBottom: 120,
  },

  // Image styles
  imageContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  productImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },

  // Product info styles
  productInfo: {
    paddingHorizontal: 16,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.tint,
    marginBottom: 16,
  },

  // Shop info styles
  shopInfo: {
    marginBottom: 16,
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
  description: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 24,
  },

  // Selection styles
  selectionContainer: {
    marginBottom: 24,
  },
  selectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 12,
  },
  optionsContainer: {
    paddingRight: 16,
  },
  colorOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedColorOption: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  colorText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  selectedColorText: {
    color: "#fff",
  },
  sizeOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  selectedSizeOption: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  sizeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  selectedSizeText: {
    color: "#fff",
  },

  // Review styles
  reviewContainer: {
    marginBottom: 24,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 12,
  },
  reviewInputContainer: {
    borderWidth: 2,
    borderColor: Colors.tint,
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  reviewInput: {
    fontSize: 14,
    color: "#2c2c2c",
    minHeight: 80,
    textAlignVertical: "top",
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
  chatButton: {
    backgroundColor: Colors.tint,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  chatButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
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
});
