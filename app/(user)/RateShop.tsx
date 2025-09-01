import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
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
const { Star, ArrowLeft } = Lucide || {};

export default function RateShopScreen() {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const submitRating = () => {
    if (rating > 0) {
      // Here you would typically send the rating and review to your backend
      console.log("Rating:", rating, "Review:", reviewText);
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          {Ionicons.glyphMap['arrow-back'] ? (
            <Ionicons name="arrow-back" size={24} color="#000" />
          ) : ArrowLeft ? (
            <ArrowLeft size={24} color="#000" />
          ) : (
            <Ionicons name="arrow-back-outline" size={24} color="#000" />
          )}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rate the shop</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Rating Section */}
        <View style={styles.ratingSection}>
          <Text style={styles.sectionTitle}>How was your experience?</Text>
          
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                style={styles.starButton}
                onPress={() => handleRating(star)}
              >
                {Ionicons.glyphMap['star'] ? (
                  <Ionicons
                    name={star <= rating ? "star" : "star-outline"}
                    size={40}
                    color={star <= rating ? "#FFD700" : "#ddd"}
                  />
                ) : Star ? (
                  <Star
                    size={40}
                    color={star <= rating ? "#FFD700" : "#ddd"}
                    fill={star <= rating ? "#FFD700" : "none"}
                  />
                ) : (
                  <Text style={styles.starText}>
                    {star <= rating ? "⭐" : "☆"}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.ratingText}>
            {rating === 0 && "Tap a star to rate"}
            {rating === 1 && "Poor"}
            {rating === 2 && "Fair"}
            {rating === 3 && "Good"}
            {rating === 4 && "Very Good"}
            {rating === 5 && "Excellent"}
          </Text>
        </View>

        {/* Review Section */}
        <View style={styles.reviewSection}>
          <Text style={styles.sectionTitle}>Share your thoughts</Text>
          
          <View style={styles.reviewInputContainer}>
            <TextInput
              style={styles.reviewInput}
              placeholder="Drop your thoughts on this shop"
              placeholderTextColor="#999"
              multiline
              value={reviewText}
              onChangeText={setReviewText}
              maxLength={500}
            />
            <Text style={styles.characterCount}>
              {reviewText.length}/500
            </Text>
          </View>
        </View>

        {/* Additional Rating Categories */}
        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Rate specific aspects</Text>
          
          <View style={styles.categoryItem}>
            <Text style={styles.categoryLabel}>Product Quality</Text>
            <View style={styles.categoryStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} style={styles.smallStarButton}>
                  {Ionicons.glyphMap['star'] ? (
                    <Ionicons
                      name="star"
                      size={20}
                      color="#FFD700"
                    />
                  ) : Star ? (
                    <Star
                      size={20}
                      color="#FFD700"
                      fill="#FFD700"
                    />
                  ) : (
                    <Text style={styles.smallStarText}>⭐</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.categoryItem}>
            <Text style={styles.categoryLabel}>Customer Service</Text>
            <View style={styles.categoryStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} style={styles.smallStarButton}>
                  {Ionicons.glyphMap['star'] ? (
                    <Ionicons
                      name="star"
                      size={20}
                      color="#FFD700"
                    />
                  ) : Star ? (
                    <Star
                      size={20}
                      color="#FFD700"
                      fill="#FFD700"
                    />
                  ) : (
                    <Text style={styles.smallStarText}>⭐</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.categoryItem}>
            <Text style={styles.categoryLabel}>Delivery Speed</Text>
            <View style={styles.categoryStars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} style={styles.smallStarButton}>
                  {Ionicons.glyphMap['star'] ? (
                    <Ionicons
                      name="star"
                      size={20}
                      color="#FFD700"
                    />
                  ) : Star ? (
                    <Star
                      size={20}
                      color="#FFD700"
                      fill="#FFD700"
                    />
                  ) : (
                    <Text style={styles.smallStarText}>⭐</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Submit Button */}
      <View style={styles.submitContainer}>
        <TouchableOpacity 
          style={[
            styles.submitButton,
            rating === 0 && styles.submitButtonDisabled
          ]}
          onPress={submitRating}
          disabled={rating === 0}
        >
          <Text style={[
            styles.submitButtonText,
            rating === 0 && styles.submitButtonTextDisabled
          ]}>
            Submit Rating
          </Text>
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

  // Scroll styles
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Rating section styles
  ratingSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c2c2c",
    marginBottom: 24,
    textAlign: "center",
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  starButton: {
    marginHorizontal: 8,
  },
  starText: {
    fontSize: 40,
  },
  ratingText: {
    fontSize: 16,
    color: Colors.tint,
    fontWeight: "600",
  },

  // Review section styles
  reviewSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  reviewInputContainer: {
    borderWidth: 2,
    borderColor: Colors.tint,
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fafafa",
  },
  reviewInput: {
    fontSize: 16,
    color: "#2c2c2c",
    minHeight: 100,
    textAlignVertical: "top",
  },
  characterCount: {
    fontSize: 12,
    color: "#999",
    textAlign: "right",
    marginTop: 8,
  },

  // Categories section styles
  categoriesSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
    flex: 1,
  },
  categoryStars: {
    flexDirection: "row",
  },
  smallStarButton: {
    marginLeft: 4,
  },
  smallStarText: {
    fontSize: 20,
  },

  // Submit styles
  submitContainer: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  submitButton: {
    backgroundColor: Colors.tint,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#ddd",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonTextDisabled: {
    color: "#999",
  },
});
