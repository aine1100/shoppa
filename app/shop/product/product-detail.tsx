import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useProduct } from '@/hooks/useProducts';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDeleteProduct } from '@/hooks/useProducts';

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const productId = Array.isArray(id) ? id[0] : id || '';
  
  const { data: productData, isLoading: productLoading } = useProduct(productId);
  const deleteProductMutation = useDeleteProduct();

  if (productLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <LoadingSpinner />
      </View>
    );
  }

  if (!productData?.success || !productData.product) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backToShopButton}>
          <Text style={styles.backToShopText}>Back to Shop</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const product = productData.product;

  const handleEdit = () => {
    router.push(`/shop/product/edit-product?id=${productId}`);
  };

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await deleteProductMutation.mutateAsync({
                productId,
                shopId: product.shop_id
              });

              if (result.success) {
                Alert.alert("Success", "Product deleted successfully!", [
                  { text: "OK", onPress: () => router.back() },
                ]);
              } else {
                Alert.alert("Error", result.error || "Failed to delete product");
              }
            } catch (error) {
              Alert.alert("Error", "Failed to delete product. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{product.name}</Text>
        <TouchableOpacity onPress={handleEdit}>
          <Ionicons name="create-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.productImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons name="image-outline" size={60} color="#ccc" />
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{product.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>

          {/* Stock Info */}
          <View style={styles.stockContainer}>
            <Ionicons name="cube-outline" size={16} color="#666" />
            <Text style={styles.stockText}>
              {product.amount} in stock
            </Text>
          </View>

          {/* Category */}
          {product.category && (
            <View style={styles.categoryContainer}>
              <Ionicons name="pricetag-outline" size={16} color="#666" />
              <Text style={styles.categoryText}>
                {product.category.name}
              </Text>
            </View>
          )}

          {/* Description */}
          {product.description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons name="create-outline" size={20} color="white" />
              <Text style={styles.editButtonText}>Edit Product</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.deleteButton, deleteProductMutation.isPending && styles.disabledButton]} 
              onPress={handleDelete}
              disabled={deleteProductMutation.isPending}
            >
              {deleteProductMutation.isPending ? (
                <LoadingSpinner size={16} color="white" />
              ) : (
                <>
                  <Ionicons name="trash-outline" size={20} color="white" />
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4CAF50',
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
  },
  backToShopButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backToShopText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 10,
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#f5f5f5',
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholderImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#ccc',
  },
  productInfo: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  priceContainer: {
    marginBottom: 15,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stockText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
  },
  descriptionContainer: {
    marginBottom: 30,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f44336',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
});

export default ProductDetailScreen;