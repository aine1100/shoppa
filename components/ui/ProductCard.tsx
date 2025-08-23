import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function ProductCard() {
  return (
    <View style={styles.card}>
     
      <View style={styles.imageWrap}>
        <Image
          source={require("../../assets/images/airForce.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title}>Nike Air Force</Text>
        <Text style={styles.description}>This is air force shoes</Text>
        <Text style={styles.price}>20000 Frw</Text>
        <Text style={styles.shop}>Kanakuze shop</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
      </View>
    </View>
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
