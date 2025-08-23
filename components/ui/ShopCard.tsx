import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ShopCard() {
  return (
    <View style={styles.shopCard}>
      <Image
        source={require("../../assets/images/shop.jpg")}
        style={styles.shopImage}
      />
      <Text style={styles.shopTitle}>Simba Supermarket</Text>
      <TouchableOpacity style={styles.shopButton} onPress={() => router.push("/(user)/ShopDetail")}>
        <Text style={styles.shopButtonText}>View shop</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  shopCard: {
    width: 155,
    borderRadius: 16,
    backgroundColor: "#fff",
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    overflow: "hidden",
  },
  shopImage: {
    width: "100%",
    height: 140,
  },
  shopTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2c2c2c",
    marginHorizontal: 12,
    marginTop: 10,
  },
  shopButton: {
    backgroundColor: Colors.tint,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
    marginVertical: 12,
  },
  shopButtonText: { color: "#fff", fontWeight: "700" },
});
