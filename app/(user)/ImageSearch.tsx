import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

// Dynamic import for Lucide
let Lucide: any = null;
try { Lucide = require('lucide-react-native'); } catch (e) { Lucide = null; }
const { Camera, Upload, ArrowLeft } = Lucide || {};

export default function ImageSearchScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleUploadImage = () => {
    Alert.alert(
      "Upload Image",
      "This feature would open your device's image gallery to select a photo for product search.",
      [{ text: "OK" }]
    );
  };

  const handleTakePhoto = () => {
    Alert.alert(
      "Take Photo",
      "This feature would open your device's camera to take a photo of a product for search.",
      [{ text: "OK" }]
    );
  };

  const handleGoogleDrive = () => {
    Alert.alert(
      "Google Drive",
      "This feature would connect to your Google Drive to select an image for product search.",
      [{ text: "OK" }]
    );
  };

  const handleSearch = () => {
    if (selectedImage) {
      Alert.alert(
        "Searching...",
        "Searching for similar products based on your image.",
        [
          {
            text: "OK",
            onPress: () => router.push("/(user)/SearchResults"),
          },
        ]
      );
    } else {
      Alert.alert("No Image", "Please select an image first.");
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
        <Text style={styles.headerTitle}>Search by Image</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Image Selection Area */}
        <View style={styles.imageContainer}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <View style={styles.placeholderIcon}>
                {Ionicons.glyphMap['camera'] ? (
                  <Ionicons name="camera" size={40} color={Colors.tint} />
                ) : Camera ? (
                  <Camera size={40} color={Colors.tint} />
                ) : (
                  <Ionicons name="camera-outline" size={40} color={Colors.tint} />
                )}
              </View>
              <Text style={styles.placeholderText}>Select image</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleUploadImage}
          >
            <View style={styles.actionIcon}>
              {Ionicons.glyphMap['cloud-upload'] ? (
                <Ionicons name="cloud-upload" size={24} color="#fff" />
              ) : Upload ? (
                <Upload size={24} color="#fff" />
              ) : (
                <Ionicons name="cloud-upload-outline" size={24} color="#fff" />
              )}
            </View>
            <Text style={styles.actionButtonText}>Upload image</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleTakePhoto}
          >
            <View style={styles.actionIcon}>
              {Ionicons.glyphMap['camera'] ? (
                <Ionicons name="camera" size={24} color="#fff" />
              ) : Camera ? (
                <Camera size={24} color="#fff" />
              ) : (
                <Ionicons name="camera-outline" size={24} color="#fff" />
              )}
            </View>
            <Text style={styles.actionButtonText}>Take live image</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleGoogleDrive}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="logo-google" size={24} color="#fff" />
            </View>
            <Text style={styles.actionButtonText}>use google drive</Text>
          </TouchableOpacity>
        </View>

        {/* Search Button */}
        <TouchableOpacity 
          style={[
            styles.searchButton,
            !selectedImage && styles.searchButtonDisabled
          ]}
          onPress={handleSearch}
          disabled={!selectedImage}
        >
          <Text style={[
            styles.searchButtonText,
            !selectedImage && styles.searchButtonTextDisabled
          ]}>
            Search
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

  // Content styles
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },

  // Image container styles
  imageContainer: {
    height: 300,
    marginBottom: 32,
  },
  imagePlaceholder: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.tint,
    borderStyle: "dashed",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fafafa",
  },
  placeholderIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    color: Colors.tint,
    fontWeight: "600",
  },
  selectedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },

  // Actions container styles
  actionsContainer: {
    marginBottom: 32,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.tint,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },

  // Search button styles
  searchButton: {
    backgroundColor: Colors.tint,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  searchButtonDisabled: {
    backgroundColor: "#ddd",
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  searchButtonTextDisabled: {
    color: "#999",
  },
});
