import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useCurrentUser } from "@/hooks/useAuth";
import { useCategories, useCreateProduct } from "@/hooks/useProducts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddProductScreen = () => {
  const { data: authData, isLoading: authLoading } = useCurrentUser();
  const createProductMutation = useCreateProduct();
  const { data: categoriesData } = useCategories();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    amount: "",
    category_id: "",
    description: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim()) {
      Alert.alert("Error", "Please enter a product name");
      return;
    }

    if (!formData.price.trim()) {
      Alert.alert("Error", "Please enter a price");
      return;
    }

    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      Alert.alert("Error", "Please enter a valid price");
      return;
    }

    const amount = formData.amount ? parseInt(formData.amount) : 0;
    if (isNaN(amount) || amount < 0) {
      Alert.alert("Error", "Please enter a valid quantity");
      return;
    }

    if (!authData?.shop?.id) {
      Alert.alert("Error", "Shop not found. Please complete your shop setup first.");
      return;
    }

    try {
      const result = await createProductMutation.mutateAsync({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        price,
        amount,
        shop_id: authData.shop.id,
        category_id: formData.category_id || undefined,
      });

      if (result.success) {
        Alert.alert("Success", "Product created successfully!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Error", result.error || "Failed to create product");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to create product. Please try again.");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const handleImageUpload = () => {
    // Handle image upload logic
  };

  const handleCameraUpload = () => {
    // Handle camera upload logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
        <TouchableOpacity onPress={handleSave} disabled={createProductMutation.isPending}>
          <Text style={[styles.saveButton, createProductMutation.isPending && styles.disabledText]}>
            {createProductMutation.isPending ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      {authLoading ? (
        <View style={styles.loadingContainer}>
          <LoadingSpinner />
        </View>
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Product Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(value) => handleInputChange("name", value)}
              placeholder="e.g. Summer Dress"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Price *</Text>
            <TextInput
              style={styles.input}
              value={formData.price}
              onChangeText={(value) => handleInputChange("price", value)}
              placeholder="e.g. 29.99"
              placeholderTextColor="#999"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Stock Quantity</Text>
            <TextInput
              style={styles.input}
              value={formData.amount}
              onChangeText={(value) => handleInputChange("amount", value)}
              placeholder="e.g. 50"
              placeholderTextColor="#999"
              keyboardType="number-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity 
              style={styles.selectInput}
              onPress={() => {
                // For now, just show available categories in an alert
                if (categoriesData?.success && categoriesData.categories) {
                  const categoryNames = categoriesData.categories.map((cat: any) => cat.name).join(', ');
                  Alert.alert("Available Categories", categoryNames || "No categories available");
                }
              }}
            >
              <Text style={[styles.selectText, !formData.category_id && { color: '#999' }]}>
                {formData.category_id ? 
                  categoriesData?.categories?.find((cat: any) => cat.id === formData.category_id)?.name || 'Select Category'
                  : 'Select Category'
                }
              </Text>
              <Ionicons name="chevron-down" size={20} color="#999" />
            </TouchableOpacity>
          </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.description}
            onChangeText={(value) => handleInputChange("description", value)}
            placeholder="Product description..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Upload</Text>
          <View style={styles.uploadContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleImageUpload}
            >
              <Ionicons name="image-outline" size={40} color="#4CAF50" />
              <Text style={styles.uploadText}>Select Image</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>or</Text>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleCameraUpload}
            >
              <Ionicons name="camera-outline" size={20} color="white" />
              <Text style={styles.cameraButtonText}>
                Open Camera & Take Photo
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveActionButton, createProductMutation.isPending && styles.disabledButton]}
            onPress={handleSave}
            disabled={createProductMutation.isPending}
          >
            {createProductMutation.isPending ? (
              <LoadingSpinner size={16} color="white" />
            ) : (
              <Text style={styles.saveActionButtonText}>Save Product</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  saveButton: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#f8f8f8",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  selectInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: "#f8f8f8",
  },
  selectText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  uploadContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  uploadButton: {
    width: "100%",
    height: 150,
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderStyle: "dashed",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fff8",
    marginBottom: 15,
  },
  uploadText: {
    fontSize: 16,
    color: "#4CAF50",
    fontWeight: "500",
    marginTop: 10,
  },
  orText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 15,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cameraButtonText: {
    fontSize: 14,
    color: "white",
    fontWeight: "500",
    marginLeft: 8,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 30,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  saveActionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: "#4CAF50",
    marginLeft: 10,
    alignItems: "center",
  },
  saveActionButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledText: {
    opacity: 0.5,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default AddProductScreen;
