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
const { Search, MapPin, ArrowLeft } = Lucide || {};

export default function SearchResultsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for search results
  const searchResults = [
    {
      id: "1",
      name: "Simba Supermarket",
      address: "Kimironko, Kigali",
      distance: "0.5 km",
      rating: 4.5,
      reviews: 1000,
      image: require("../../assets/images/image_5.png"),
    },
    {
      id: "2",
      name: "City Market",
      address: "Downtown, Kigali",
      distance: "1.2 km",
      rating: 4.2,
      reviews: 850,
      image: require("../../assets/images/image_5.png"),
    },
    {
      id: "3",
      name: "Fresh Grocery",
      address: "Nyamirambo, Kigali",
      distance: "2.1 km",
      rating: 4.7,
      reviews: 1200,
      image: require("../../assets/images/image_5.png"),
    },
  ];

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
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            {Ionicons.glyphMap['search'] ? (
              <Ionicons name="search" size={20} color="#999" />
            ) : Search ? (
              <Search size={20} color="#999" />
            ) : (
              <Ionicons name="search-outline" size={20} color="#999" />
            )}
            <TextInput
              style={styles.searchInput}
              placeholder="Search shops..."
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>
      </View>

      {/* Search Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Results for your searching</Text>
        <Text style={styles.summaryCount}>12 shops found</Text>
      </View>

      {/* Map View Placeholder */}
      <View style={styles.mapContainer}>
        <View style={styles.mapPlaceholder}>
          <View style={styles.mapContent}>
            {/* Mock map with shop locations */}
            <View style={styles.mapArea}>
              <View style={styles.mapBackground}>
                <Text style={styles.mapText}>Map View</Text>
                <Text style={styles.mapSubtext}>Shops near you</Text>
              </View>
              
              {/* Shop markers */}
              <View style={[styles.shopMarker, { top: 100, left: 80 }]}>
                <View style={styles.markerDot} />
                <Text style={styles.markerLabel}>Simba</Text>
              </View>
              
              <View style={[styles.shopMarker, { top: 150, left: 120 }]}>
                <View style={styles.markerDot} />
                <Text style={styles.markerLabel}>City</Text>
              </View>
              
              <View style={[styles.shopMarker, { top: 200, left: 60 }]}>
                <View style={styles.markerDot} />
                <Text style={styles.markerLabel}>Fresh</Text>
              </View>

              {/* Route line */}
              <View style={styles.routeLine} />
            </View>
          </View>
        </View>
      </View>

      {/* Shop List */}
      <ScrollView 
        style={styles.shopListContainer}
        contentContainerStyle={styles.shopListContent}
        showsVerticalScrollIndicator={false}
      >
        {searchResults.map((shop) => (
          <TouchableOpacity
            key={shop.id}
            style={styles.shopCard}
            onPress={() => router.push("/(user)/ShopDetail")}
          >
            <Image source={shop.image} style={styles.shopImage} />
            <View style={styles.shopInfo}>
              <Text style={styles.shopName}>{shop.name}</Text>
              <View style={styles.shopDetails}>
                <View style={styles.locationContainer}>
                  {Ionicons.glyphMap['location'] ? (
                    <Ionicons name="location" size={16} color="#666" />
                  ) : MapPin ? (
                    <MapPin size={16} color="#666" />
                  ) : (
                    <Ionicons name="location-outline" size={16} color="#666" />
                  )}
                  <Text style={styles.shopAddress}>{shop.address}</Text>
                </View>
                <Text style={styles.shopDistance}>{shop.distance}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name={star <= Math.floor(shop.rating) ? "star" : "star-outline"}
                      size={14}
                      color="#FFD700"
                    />
                  ))}
                </View>
                <Text style={styles.ratingText}>
                  {shop.rating} ({shop.reviews} reviews)
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  searchContainer: {
    flex: 1,
    marginLeft: 12,
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
    marginLeft: 8,
    fontSize: 16,
    color: "#000",
  },

  // Summary styles
  summaryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f8f8",
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
  },
  summaryCount: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  // Map styles
  mapContainer: {
    height: 300,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: "#e8f5e8",
  },
  mapContent: {
    flex: 1,
    position: "relative",
  },
  mapArea: {
    flex: 1,
    position: "relative",
  },
  mapBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f5e8",
  },
  mapText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c2c2c",
  },
  mapSubtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  shopMarker: {
    position: "absolute",
    alignItems: "center",
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.tint,
    borderWidth: 2,
    borderColor: "#fff",
  },
  markerLabel: {
    fontSize: 10,
    color: "#2c2c2c",
    marginTop: 2,
    fontWeight: "600",
  },
  routeLine: {
    position: "absolute",
    top: 106,
    left: 86,
    width: 40,
    height: 2,
    backgroundColor: Colors.tint,
    transform: [{ rotate: "45deg" }],
  },

  // Shop list styles
  shopListContainer: {
    flex: 1,
  },
  shopListContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  shopCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shopImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  shopInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  shopName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 4,
  },
  shopDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  shopAddress: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  shopDistance: {
    fontSize: 12,
    color: Colors.tint,
    fontWeight: "600",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starsContainer: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    fontSize: 12,
    color: "#666",
  },
  viewButton: {
    backgroundColor: Colors.tint,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
