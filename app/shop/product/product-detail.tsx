import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailScreen = () => {
  const [selectedSize, setSelectedSize] = useState('7 UK');
  
  const sizes = ['6 UK', '7 UK', '8 UK', '9 UK', '10 UK'];
  const images = [
    require('@/assets/images/product.png'),
    require('@/assets/images/product.png'),
    require('@/assets/images/product.png'),
  ];

  const handleEdit = () => {
    router.push('/shop/product/edit-product');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nike Sneakers</Text>
          <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
            <Ionicons name="create-outline" size={24} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Product Images */}
          <View style={styles.imageContainer}>
            <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
              {images.map((image, index) => (
                <Image key={index} source={image} style={styles.productImage} />
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.imageNavButton}>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
            <View style={styles.imageDots}>
              <View style={[styles.dot, styles.activeDot]} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </View>

          {/* Product Info */}
          <View style={styles.productInfo}>
            {/* Size Selection */}
            <View style={styles.sizeContainer}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.selectedSizeButton
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[
                    styles.sizeText,
                    selectedSize === size && styles.selectedSizeText
                  ]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Rating */}
            <View style={styles.ratingContainer}>
              <View style={styles.stars}>
                {[1, 2, 3, 4].map((star) => (
                  <Ionicons key={star} name="star" size={16} color="#FFD700" />
                ))}
                <Ionicons name="star-half" size={16} color="#FFD700" />
              </View>
              <Text style={styles.ratingText}>56,890</Text>
            </View>

            {/* Price */}
            <View style={styles.priceContainer}>
              <Text style={styles.originalPrice}>₹2,999</Text>
              <Text style={styles.discountPrice}>50% Off</Text>
            </View>

            {/* More Section */}
            <View style={styles.moreSection}>
              <Text style={styles.moreText}>...More</Text>
              
              <View style={styles.storeInfo}>
                <View style={styles.storeButton}>
                  <Ionicons name="storefront-outline" size={16} color="#666" />
                  <Text style={styles.storeText}>K.shoes Store</Text>
                </View>
                <View style={styles.vipButton}>
                  <Ionicons name="diamond-outline" size={16} color="#666" />
                  <Text style={styles.vipText}>VIP</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    height: 400,
    position: 'relative',
  },
  productImage: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
  },
  imageNavButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -20 }],
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
  },
  productInfo: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 100,
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  sizeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSizeButton: {
    backgroundColor: '#4CAF50',
  },
  sizeText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  selectedSizeText: {
    color: 'white',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 15,
  },
  discountPrice: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  moreSection: {
    marginTop: 20,
  },
  moreText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 10,
  },
  storeText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  vipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  vipText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
});

export default ProductDetailScreen;