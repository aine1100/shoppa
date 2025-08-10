import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const stats = [
    {
      label: "Total Reviews",
      value: "1000",
      change: "12.5%",
      isPositive: true,
    },
    { label: "Total Views", value: "1000", change: "12.5%", isPositive: true },
    { label: "Total Likes", value: "1000", change: "12.5%", isPositive: false },
    {
      label: "Total Bookings",
      value: "1000",
      change: "12.5%",
      isPositive: true,
    },
  ];

  const recentlyViewed = [
    { id: 1, image: require('@/assets/images/product.png') },
    { id: 2, image: require('@/assets/images/product.png') },
    { id: 3, image: require('@/assets/images/product.png') },
    { id: 4, image: require('@/assets/images/product.png') },
    { id: 5, image: require('@/assets/images/product.png') },
  ];

  const topProducts = [
    {
      id: 1,
      image: require('@/assets/images/product.png'),
      title: "Black Winter...",
      subtitle: "Autumn and winter casual cotton padded jacket...",
      price: "$49",
      rating: 4.5,
      reviews: "4.5k",
    },
    {
      id: 2,
      image: require('@/assets/images/product.png'),
      title: "Mens Starry",
      subtitle: "New Starry sky Printed shirt long Sleeve Fabric",
      price: "$49",
      rating: 4.5,
      reviews: "1.2k",
    },
  ];

  const reviews = [
    {
      id: 1,
      user: "User Name",
      avatar: require('@/assets/images/avatar.png'),
      title: "Great shirt!",
      rating: 4.5,
      date: "Dec 23, 2022",
      comment:
        "The material is great and the fit is perfect. I bought it for my son and he loves it.",
    },
    {
      id: 2,
      user: "User Name",
      avatar: require('@/assets/images/avatar.png'),
      title: "Great shirt!",
      rating: 4.5,
      date: "Dec 23, 2022",
      comment:
        "The material is great and the fit is perfect. I bought it for my son and he loves it.",
    },
  ];

  const handleRecentlyViewedPress = () => {
    // Navigate to favorites tab which shows recently viewed
    router.push("/(main)/favorites");
  };

  const handleAddProductPress = () => {
    router.push("/shop/product/add-product");
  };

  const handleProductPress = (productId: number) => {
    router.push("/shop/product/product-detail");
  };

  const handleReviewsPress = () => {
    // Navigate to orders tab which shows reviews
    router.push("/(main)/orders");
  };

  const handleCalendarPress = () => {
    router.push("/calendar-demo");
  };

  const handleProfilePress = () => {
    router.push("/shop/profile/profile");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Ionicons name="storefront" size={20} color="white" />
          </View>
          <Text style={styles.logoText}>Shopa</Text>
        </View>
        <TouchableOpacity onPress={handleProfilePress}>
          <Image
            source={require('@/assets/images/avatar.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>My Shop</Text>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statLabel}>{stat.label}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <View style={styles.changeContainer}>
                <Ionicons
                  name={stat.isPositive ? "trending-up" : "trending-down"}
                  size={16}
                  color={stat.isPositive ? "#4CAF50" : "#F44336"}
                />
                <Text
                  style={[
                    styles.changeText,
                    { color: stat.isPositive ? "#4CAF50" : "#F44336" },
                  ]}
                >
                  {stat.change}
                </Text>
              </View>
            </View>
          ))}
        </View>

        
        {/* Recently Viewed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently viewed</Text>
            <TouchableOpacity onPress={handleRecentlyViewedPress}>
              <Text style={styles.viewAll}>View all products →</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.recentlyViewedList}
          >
            {recentlyViewed.map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => handleProductPress(item.id)}
              >
                <Image
                  source={item.image}
                  style={styles.recentlyViewedItem}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Top Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Products</Text>
            <TouchableOpacity onPress={handleAddProductPress}>
              <Text style={styles.addProduct}>Add a product →</Text>
            </TouchableOpacity>
          </View>
          {topProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => handleProductPress(product.id)}
            >
              <Image
                source={product.image}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text style={styles.productTitle}>{product.title}</Text>
                <Text style={styles.productSubtitle}>{product.subtitle}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
                <View style={styles.ratingContainer}>
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
              </View>
              <TouchableOpacity style={styles.productButton}>
                <Ionicons name="logo-whatsapp" size={20} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Reviews */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            <TouchableOpacity onPress={handleReviewsPress}>
              <Text style={styles.viewAll}>View all →</Text>
            </TouchableOpacity>
          </View>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <Image
                source={review.avatar}
                style={styles.reviewAvatar}
              />
              <View style={styles.reviewContent}>
                <Text style={styles.reviewTitle}>{review.title}</Text>
                <View style={styles.reviewMeta}>
                  <Text style={styles.reviewRating}>{review.rating} star</Text>
                  <Text style={styles.reviewDate}>• {review.date}</Text>
                </View>
                <Text style={styles.reviewStatus}>Respond on</Text>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
              <TouchableOpacity style={styles.respondButton}>
                <Ionicons name="logo-whatsapp" size={16} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
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
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    backgroundColor: "#4CAF50",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    marginRight: "2%",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  announcementCard: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  announcementContent: {
    flex: 1,
  },
  announcementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  announcementText: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  announcementButton: {
    backgroundColor: "#4CAF50",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  viewAll: {
    fontSize: 12,
    color: "#4CAF50",
  },
  addProduct: {
    fontSize: 12,
    color: "#4CAF50",
  },
  recentlyViewedList: {
    flexDirection: "row",
  },
  recentlyViewedItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: "center",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  productSubtitle: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: "#666",
  },
  productButton: {
    backgroundColor: "#4CAF50",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  reviewCard: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-start",
  },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 2,
  },
  reviewMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  reviewRating: {
    fontSize: 12,
    color: "#666",
  },
  reviewDate: {
    fontSize: 12,
    color: "#666",
  },
  reviewStatus: {
    fontSize: 12,
    color: "#4CAF50",
    marginBottom: 5,
  },
  reviewComment: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
  },
  respondButton: {
    backgroundColor: "#4CAF50",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
