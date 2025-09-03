import { useCurrentUser } from "@/hooks/useAuth";
import { useProductsByShop } from "@/hooks/useProducts";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomNavigation from "../../components/ui/BottomNavigation";
import Calendar from "../../components/ui/Calendar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

const RecentlyViewedScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { data: authData, isLoading: authLoading } = useCurrentUser();
  const shopId = authData?.shop?.id;
  const { data: productsData, isLoading: productsLoading } = useProductsByShop(
    shopId || ""
  );

  const products = productsData?.success ? productsData.products || [] : [];

  if (authLoading || productsLoading) {
    return (
      <View style={[styles.wrapper, styles.centered]}>
        <LoadingSpinner />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    // Filter products based on selected date
    console.log("Selected date:", date);
  };

  const handleProductPress = (productId: string) => {
    router.push(`/shop/product/product-detail?id=${productId}`);
  };

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Recently viewed</Text>

          <Calendar
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            style={styles.calendar}
          />

          <View style={styles.productsGrid}>
            {products.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="time-outline" size={64} color="#ccc" />
                <Text style={styles.emptyTitle}>No Products Yet</Text>
                <Text style={styles.emptyText}>
                  Add some products to see them here
                </Text>
              </View>
            ) : (
              products.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productCard}
                  onPress={() => handleProductPress(product.id)}
                >
                  <Image 
                    source={
                      product.image 
                        ? { uri: product.image } 
                        : require("@/assets/images/product.png")
                    } 
                    style={styles.productImage} 
                  />
                  <Text style={styles.productTitle}>{product.name}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                    <TouchableOpacity style={styles.whatsappButton}>
                      <Ionicons name="logo-whatsapp" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  calendar: {
    marginBottom: 30,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    marginBottom: 20,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    lineHeight: 18,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  whatsappButton: {
    backgroundColor: "#25D366",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default RecentlyViewedScreen;
