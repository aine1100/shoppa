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
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, price, stock, sales
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const [shopProducts, setShopProducts] = useState([
    {
      id: 1,
      name: "Nike Air Jordan 1",
      image: require('@/assets/images/product.png'),
      price: 149.99,
      originalPrice: 199.99,
      stock: 25,
      size: "9 UK",
      color: "Black/Red",
      inStock: true,
      rating: 4.5,
      reviews: 1250,
      sales: 45,
    },
    {
      id: 2,
      name: "Adidas Ultraboost 22",
      image: require('@/assets/images/product.png'),
      price: 89.99,
      originalPrice: 129.99,
      stock: 18,
      size: "8.5 UK",
      color: "White/Green",
      inStock: true,
      rating: 4.3,
      reviews: 890,
      sales: 32,
    },
    {
      id: 3,
      name: "Puma RS-X Sneakers",
      image: require('@/assets/images/product.png'),
      price: 65.99,
      originalPrice: 95.99,
      stock: 0,
      size: "10 UK",
      color: "Blue/Orange",
      inStock: false,
      rating: 4.1,
      reviews: 456,
      sales: 12,
    },
    {
      id: 4,
      name: "Converse Chuck Taylor",
      image: require('@/assets/images/product.png'),
      price: 45.99,
      originalPrice: 65.99,
      stock: 42,
      size: "9.5 UK",
      color: "Black",
      inStock: true,
      rating: 4.7,
      reviews: 2100,
      sales: 78,
    },
    {
      id: 5,
      name: "Vans Old Skool",
      image: require('@/assets/images/product.png'),
      price: 55.99,
      originalPrice: 75.99,
      stock: 15,
      size: "8 UK",
      color: "Black/White",
      inStock: true,
      rating: 4.4,
      reviews: 567,
      sales: 23,
    },
    {
      id: 6,
      name: "New Balance 990v5",
      image: require('@/assets/images/product.png'),
      price: 175.99,
      originalPrice: 199.99,
      stock: 8,
      size: "9.5 UK",
      color: "Grey",
      inStock: true,
      rating: 4.8,
      reviews: 234,
      sales: 15,
    },
  ]);

  const updateStock = (id: number, change: number) => {
    setShopProducts((products) =>
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              stock: Math.max(0, product.stock + change),
              inStock: product.stock + change > 0,
            }
          : product
      )
    );
  };

  const removeProduct = (id: number) => {
    setShopProducts((products) =>
      products.filter((product) => product.id !== id)
    );
  };

  const handleProductPress = (productId: number) => {
    router.push("/shop/product/product-detail");
  };

  const handleEditProduct = (productId: number) => {
    router.push("/shop/product/edit-product");
  };

  const getTotalProducts = () => {
    return shopProducts.length;
  };

  const getTotalStock = () => {
    return shopProducts.reduce((total, product) => total + product.stock, 0);
  };

  const getTotalSales = () => {
    return shopProducts.reduce((total, product) => total + product.sales, 0);
  };

  const handleAddProduct = () => {
    router.push("/shop/product/add-product");
  };

  const filteredAndSortedProducts = () => {
    let filtered = shopProducts.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.size.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'stock':
          return b.stock - a.stock;
        case 'sales':
          return b.sales - a.sales;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });
  };

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
    setShowSortModal(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header with Logo */}
      <View style={styles.topHeader}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="storefront" size={20} color="white" />
          </View>
          <Text style={styles.logoText}>Shopa</Text>
        </View>
        <Image 
          source={require("@/assets/images/avatar.png")} 
          style={styles.avatar} 
        />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search any Product..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={20} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Your Products Header */}
      <View style={styles.productsHeader}>
        <Text style={styles.productsTitle}>Your Products</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.sortButton}
            onPress={() => setShowSortModal(true)}
          >
            <Text style={styles.sortText}>Sort</Text>
            <Ionicons name="swap-vertical" size={16} color="#4CAF50" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilterModal(true)}
          >
            <Text style={styles.filterText}>Filter</Text>
            <Ionicons name="funnel" size={16} color="#4CAF50" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Shop Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getTotalProducts()}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getTotalStock()}</Text>
            <Text style={styles.statLabel}>Total Stock</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{getTotalSales()}</Text>
            <Text style={styles.statLabel}>Total Sales</Text>
          </View>
        </View>

        {filteredAndSortedProducts().length === 0 ? (
          <View style={styles.emptyShop}>
            <Ionicons name="storefront-outline" size={80} color="#ccc" />
            <Text style={styles.emptyShopTitle}>No products in your shop</Text>
            <Text style={styles.emptyShopText}>
              Add your first product to get started
            </Text>
            <TouchableOpacity
              style={styles.addProductButton}
              onPress={handleAddProduct}
            >
              <Text style={styles.addProductButtonText}>Add Product</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.productsGrid}>
              {filteredAndSortedProducts().map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => handleProductPress(product.id)}
                >
                  <View style={styles.productImageContainer}>
                    <Image
                      source={product.image}
                      style={styles.productImage}
                    />
                    <View style={styles.stockBadge}>
                      <Text style={styles.stockBadgeText}>Stock: {product.stock}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.editButton}
                      onPress={() => handleEditProduct(product.id)}
                    >
                      <Ionicons name="create-outline" size={16} color="white" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.productInfo}>
                    <Text style={styles.productName} numberOfLines={2}>
                      {product.name}
                    </Text>

                    <Text style={styles.productDetails}>
                      {product.size} • {product.color}
                    </Text>

                    <View style={styles.ratingRow}>
                      <View style={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Ionicons
                            key={star}
                            name={
                              star <= Math.floor(product.rating)
                                ? "star"
                                : "star-outline"
                            }
                            size={12}
                            color="#FFD700"
                          />
                        ))}
                      </View>
                      <Text style={styles.reviewCount}>({product.reviews})</Text>
                    </View>

                    <View style={styles.priceContainer}>
                      <Text style={styles.price}>${product.price}</Text>
                      <Text style={styles.originalPrice}>
                        ${product.originalPrice}
                      </Text>
                    </View>

                    <View style={styles.salesInfo}>
                      <View style={styles.stockStatus}>
                        <Ionicons
                          name={
                            product.inStock ? "checkmark-circle" : "close-circle"
                          }
                          size={14}
                          color={product.inStock ? "#4CAF50" : "#F44336"}
                        />
                        <Text
                          style={[
                            styles.stockText,
                            { color: product.inStock ? "#4CAF50" : "#F44336" },
                          ]}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Text>
                      </View>
                      <Text style={styles.salesText}>Sales: {product.sales}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => removeProduct(product.id)}
                    >
                      <Ionicons name="trash-outline" size={16} color="#F44336" />
                      <Text style={styles.deleteButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Shop Actions */}
            <View style={styles.shopActions}>
              <TouchableOpacity
                style={styles.addMoreButton}
                onPress={handleAddProduct}
              >
                <Ionicons name="add-circle-outline" size={20} color="#4CAF50" />
                <Text style={styles.addMoreButtonText}>Add More Products</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      {/* Sort Modal */}
      {showSortModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort by</Text>
            {[
              { key: 'name', label: 'Name (A-Z)' },
              { key: 'price', label: 'Price (Low to High)' },
              { key: 'stock', label: 'Stock (High to Low)' },
              { key: 'sales', label: 'Sales (High to Low)' },
              { key: 'rating', label: 'Rating (High to Low)' }
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[styles.modalOption, sortBy === option.key && styles.selectedOption]}
                onPress={() => handleSort(option.key)}
              >
                <Text style={[styles.modalOptionText, sortBy === option.key && styles.selectedOptionText]}>
                  {option.label}
                </Text>
                {sortBy === option.key && <Ionicons name="checkmark" size={20} color="#4CAF50" />}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowSortModal(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Products</Text>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>In Stock Only</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Out of Stock</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>High Sales (50+)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Low Stock</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  statCard: {
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  emptyShop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
  },
  emptyShopTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  emptyShopText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  addProductButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  addProductButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  productCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  stockBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#4CAF50",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  stockBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  editButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
    lineHeight: 18,
  },
  productDetails: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  stars: {
    flexDirection: "row",
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
  },
  salesInfo: {
    marginBottom: 10,
  },
  stockStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  stockText: {
    fontSize: 11,
    fontWeight: "500",
    marginLeft: 4,
  },
  salesText: {
    fontSize: 11,
    color: "#666",
    fontWeight: "500",
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFE8E8",
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    fontSize: 11,
    color: "#F44336",
    fontWeight: "500",
    marginLeft: 4,
  },
  shopActions: {
    marginTop: 20,
    marginBottom: 30,
  },
  addMoreButton: {
    flexDirection: "row",
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addMoreButtonText: {
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f8f8',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    backgroundColor: '#4CAF50',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f8f8',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  micButton: {
    padding: 5,
  },
  productsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
  },
  productsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  sortText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
    marginRight: 5,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '500',
    marginRight: 5,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#E8F5E8',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  modalCloseText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
