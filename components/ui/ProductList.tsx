import React from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  ActivityIndicator, 
  StyleSheet,
  RefreshControl 
} from 'react-native';
import { useProductsInfinite } from '@/hooks/useProduct';
import { useAppStore } from '@/stores/useAppStore';
import ProductCard from '@/components/ui/ProductCard';
import { Colors } from '@/constants/Colors';

interface ProductsListProps {
  horizontal?: boolean;
  showLoadMore?: boolean;
  limit?: number;
  categoryId?: string | null;
}

export default function ProductsList({ 
  horizontal = false, 
  showLoadMore = true,
  limit,
  categoryId 
}: ProductsListProps) {
  const selectedCategoryId = useAppStore((state) => state.selectedCategoryId);
  
  // Use the passed categoryId or fall back to global state
  const activeCategoryId = categoryId !== undefined ? categoryId : selectedCategoryId;
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching
  } = useProductsInfinite({ 
    categoryId: activeCategoryId 
  });

  // Flatten all pages into a single array
  const products = data?.pages.flatMap(page => page.items) ?? [];
  
  // Apply limit if specified (for horizontal lists like homepage)
  const displayProducts = limit ? products.slice(0, limit) : products;

  const renderProduct = ({ item }: { item: any }) => (
    <ProductCard 
      product={item} 
      onPress={() => {
        // Handle product press - navigate to details
        console.log('Product pressed:', item.id);
      }}
    />
  );

  const renderFooter = () => {
    if (!showLoadMore) return null;
    
    if (isFetchingNextPage) {
      return (
        <View style={styles.footerLoader}>
          <ActivityIndicator size="small" color={Colors.tint} />
          <Text style={styles.loadingText}>Loading more...</Text>
        </View>
      );
    }
    
    return null;
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage && showLoadMore) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.tint} />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Error loading products: {error?.message || 'Something went wrong'}
        </Text>
      </View>
    );
  }

  if (displayProducts.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No products found</Text>
      </View>
    );
  }

  if (horizontal) {
    return (
      <FlatList
        data={displayProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalContainer}
        ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
      />
    );
  }

  return (
    <FlatList
      data={displayProducts}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          colors={[Colors.tint]}
          tintColor={Colors.tint}
        />
      }
      contentContainerStyle={[
        styles.verticalContainer,
        displayProducts.length === 0 && styles.emptyContainer
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontalContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  verticalContainer: {
    paddingHorizontal: 6,
    paddingTop: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  footerLoader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.tint,
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});