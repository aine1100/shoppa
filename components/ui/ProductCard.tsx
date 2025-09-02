import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface ProductCardProps {
  product?: {
    id: string;
    title: string;
    description?: string;
    price: number;
    image_url?: string;
    shops?: {
      title: string;
    };
    categories?: {
      name: string;
    };
  };
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  // Fallback data when no product is provided (for demo purposes)
  const displayProduct = product || {
    id: 'demo',
    title: 'Nike Air Force',
    description: 'This is air force shoes',
    price: 20000,
    image_url: null,
    shops: { title: 'Kanakuze shop' },
    categories: { name: 'Shoes' }
  };

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} Frw`;
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    // Navigate to product details or handle product selection
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <View style={styles.imageWrap}>
        {displayProduct.image_url ? (
          <Image
            source={{ uri: displayProduct.image_url }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../../assets/images/airForce.png")}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {displayProduct.title}
        </Text>
        {displayProduct.description && (
          <Text style={styles.description} numberOfLines={2}>
            {displayProduct.description}
          </Text>
        )}
        <Text style={styles.price}>
          {formatPrice(displayProduct.price)}
        </Text>
        {displayProduct.shops?.title && (
          <Text style={styles.shop} numberOfLines={1}>
            {displayProduct.shops.title}
          </Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 12,
    margin: 10,
    alignItems: "center",
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  imageWrap: {
    flex: 0.60,             
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",          
    height: 150,            
    borderRadius: 12,
  },

  info: {
    flex: 0.40,             
    justifyContent: "center",
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.tint,
    marginBottom: 4,
  },
  shop: {
    fontSize: 14,
    color: "#444",
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.tint,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
});