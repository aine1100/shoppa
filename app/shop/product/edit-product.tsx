import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useCategories, useProduct, useUpdateProduct } from '@/hooks/useProducts';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditProductScreen = () => {
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id || '';
  
  const { data: productData, isLoading: productLoading } = useProduct(productId);
  const { data: categoriesData } = useCategories();
  const updateProductMutation = useUpdateProduct();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    amount: '',
    category_id: '',
    description: ''
  });

  // Load product data when component mounts
  useEffect(() => {
    if (productData?.success && productData.product) {
      const product = productData.product;
      setFormData({
        name: product.name,
        price: product.price.toString(),
        amount: product.amount.toString(),
        category_id: product.category_id || '',
        description: product.description || ''
      });
    }
  }, [productData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
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

    try {
      const result = await updateProductMutation.mutateAsync({
        productId,
        updates: {
          name: formData.name.trim(),
          description: formData.description.trim() || undefined,
          price,
          amount,
          category_id: formData.category_id || undefined,
        }
      });

      if (result.success) {
        Alert.alert("Success", "Product updated successfully!", [
          { text: "OK", onPress: () => router.back() },
        ]);
      } else {
        Alert.alert("Error", result.error || "Failed to update product");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update product. Please try again.");
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (productLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <LoadingSpinner />
        <Text style={styles.loadingText}>Loading product...</Text>
      </View>
    );
  }

  if (!productData?.success || !productData.product) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleCancel}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Product</Text>
        <TouchableOpacity onPress={handleSave} disabled={updateProductMutation.isPending}>
          <Text style={[styles.saveButton, updateProductMutation.isPending && styles.disabledText]}>
            {updateProductMutation.isPending ? "Saving..." : "Save"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Product Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            placeholder="Product name"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Price *</Text>
          <TextInput
            style={styles.input}
            value={formData.price}
            onChangeText={(value) => handleInputChange('price', value)}
            placeholder="Price"
            placeholderTextColor="#999"
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Stock Quantity</Text>
          <TextInput
            style={styles.input}
            value={formData.amount}
            onChangeText={(value) => handleInputChange('amount', value)}
            placeholder="Quantity"
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
            onChangeText={(value) => handleInputChange('description', value)}
            placeholder="Product description..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.saveActionButton, updateProductMutation.isPending && styles.disabledButton]}
            onPress={handleSave}
            disabled={updateProductMutation.isPending}
          >
            {updateProductMutation.isPending ? (
              <LoadingSpinner size={16} color="white" />
            ) : (
              <Text style={styles.saveActionButtonText}>Save Changes</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  saveButton: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
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
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f8f8',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  selectInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#f8f8f8',
  },
  selectText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  saveActionButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginLeft: 10,
    alignItems: 'center',
  },
  saveActionButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.5,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default EditProductScreen;