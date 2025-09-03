import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  RefreshControl 
} from "react-native";
import ShopCard from "@/components/ui/ShopCard"; 
import SearchBar from "@/components/ui/SearchBar";
import { useInfiniteShops } from "@/hooks/useShops";
import { Colors } from "@/constants/Colors";
import { Tables } from "@/types/database.types";

type Shop = Tables<'shops'>;

const ShopsScreen = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useInfiniteShops();

  const shops = data?.pages.flatMap(page => page.data) || [];

  const renderShop = ({ item, index }: { item: Shop; index: number }) => (
    <View style={[
      styles.shopCardContainer,
      { marginRight: index % 2 === 0 ? 10 : 0 }
    ]}>
      <ShopCard shop={item} />
    </View>
  );

  const renderFooter = () => {
    if (isFetchingNextPage) {
      return (
        <View style={styles.loadingFooter}>
          <ActivityIndicator color={Colors.tint} />
          <Text style={styles.loadingText}>Loading more shops...</Text>
        </View>
      );
    }
    return null;
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.tint} />
        <Text style={styles.loadingText}>Loading shops...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading shops: {error?.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Shops</Text>
        <Text style={styles.seeAll}>See all</Text>
      </View>

      <FlatList
        data={shops}
        renderItem={renderShop}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            colors={[Colors.tint]}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    paddingHorizontal: 15, 
    paddingTop: 40 
  },
  sectionHeader: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 10 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "green" 
  },
  seeAll: { 
    color: "green" 
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  shopCardContainer: {
    flex: 0.48,
    marginBottom: 15,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingFooter: {
    padding: 20,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    color: Colors.tint,
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  errorText: {
    color: "#ff4444",
    fontSize: 16,
    textAlign: "center",
  },
});

export default ShopsScreen;