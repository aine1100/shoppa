import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  FlatList, 
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl
} from "react-native";
 
import ProductCard from "@/components/ui/ProductCard";
import { useCategories } from "@/hooks/useCategories";
import { useProductsInfinite } from "@/hooks/useProduct";
import { useAppStore } from "@/stores/useAppStore";
import { Colors } from "@/constants/Colors";

const ProductsScreen = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useAppStore();
  const [refreshing, setRefreshing] = useState(false);

  // Fetch categories
  const { 
    data: categories, 
    isLoading: categoriesLoading, 
    error: categoriesError,
    refetch: refetchCategories
  } = useCategories();

  // Fetch products based on selected category
  const { 
    data: productsData, 
    isLoading: productsLoading, 
    error: productsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchProducts
  } = useProductsInfinite({ 
    categoryId: selectedCategoryId === 'all' ? null : selectedCategoryId 
  });

  // Get all products from all pages
  const allProducts = productsData?.pages?.flatMap(page => page.items) || [];

  // Build categories array with "All" option
  const categoriesWithAll = [
    { id: 'all', name: 'All' },
    ...(categories || [])
  ];

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  // Handle pull to refresh
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchCategories(),
        refetchProducts()
      ]);
    } finally {
      setRefreshing(false);
    }
  };

  // Handle load more products
  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Set initial category to "All" if not set
  useEffect(() => {
    if (!selectedCategoryId) {
      setSelectedCategoryId('all');
    }
  }, [selectedCategoryId, setSelectedCategoryId]);

  const renderProductCard = ({ item }: { item: any }) => (
    <View style={styles.productCardContainer}>
      <ProductCard product={item} />
    </View>
  );

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;
    
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color={Colors.tint} />
        <Text style={styles.footerText}>Loading more products...</Text>
      </View>
    );
  };

  const renderEmptyState = () => {
    const selectedCategory = categoriesWithAll.find(cat => cat.id === selectedCategoryId);
    const categoryName = selectedCategory?.name || 'this category';
    
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No products found</Text>
        <Text style={styles.emptySubtitle}>
          There are no products in {categoryName.toLowerCase()} at the moment.
        </Text>
      </View>
    );
  };

  const renderCategoriesSection = () => {
    if (categoriesLoading) {
      return (
        <View style={styles.categoriesLoadingContainer}>
          <ActivityIndicator size="small" color={Colors.tint} />
          <Text style={styles.loadingText}>Loading categories...</Text>
        </View>
      );
    }

    if (categoriesError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load categories</Text>
        </View>
      );
    }

    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryRow}
        contentContainerStyle={styles.categoryRowContent}
      >
        {categoriesWithAll.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategoryId === category.id && styles.activeCategoryButton
            ]}
            onPress={() => handleCategorySelect(category.id)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategoryId === category.id && styles.activeCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Products</Text>

      {/* Categories Section */}
      {renderCategoriesSection()}

      {/* Products Header */}
      <View style={styles.productHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategoryId === 'all' ? 'Latest' : 
           categoriesWithAll.find(cat => cat.id === selectedCategoryId)?.name || 'Products'}
        </Text>
        <TouchableOpacity 
          onPress={() => setSelectedCategoryId('all')}
          disabled={selectedCategoryId === 'all'}
        >
          <Text style={[
            styles.seeAll,
            selectedCategoryId === 'all' && styles.seeAllDisabled
          ]}>
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* Products List */}
      {productsLoading && allProducts.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.tint} />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      ) : productsError ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Failed to load products</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => refetchProducts()}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={allProducts}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productsList}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[Colors.tint]}
              tintColor={Colors.tint}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingTop: 40,
  },

  screenTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2c2c2c",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.tint,
    marginBottom: 10,
  },

  // Categories styles
  categoryRow: {
    marginBottom: 20,
  },
  categoryRowContent: {
    paddingRight: 15,
  },
  categoriesLoadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "transparent",
  },
  activeCategoryButton: {
    backgroundColor: Colors.tint,
    borderColor: Colors.tint,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  activeCategoryText: {
    color: "#fff",
  },

  // Product header styles
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    alignItems: "center",
  },
  seeAll: { 
    color: Colors.tint, 
    fontWeight: "500",
    fontSize: 13,
  },
  seeAllDisabled: {
    color: "#ccc",
  },

  // Products list styles
  productsList: {
    paddingBottom: 20,
  },
  productCardContainer: {
    marginBottom: 16,
  },

  // Loading states
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  loadingText: {
    marginLeft: 8,
    marginTop: 8,
    color: "#666",
    fontSize: 14,
  },
  footerLoader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  footerText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },

  // Error states
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: Colors.tint,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ProductsScreen;