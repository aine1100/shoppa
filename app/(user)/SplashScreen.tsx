
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageGrid}>
        <Image source={require("../../assets/images/image_1.png")} 
        style={{
          position: "absolute",
          left: -40,
          width: 100,
          height: 250,
          borderRadius: 20,
          marginTop: 30
        }} 
        />
        <Image source={require("../../assets/images/image_2.png")} 
        style={{
          position: "absolute", 
          right: -38,
          width: 100,
          height: 250,
          borderRadius: 20,
          marginTop: 30
        }}
         />
        <Image source={require("../../assets/images/image_3.png")}
        style={{
          position: "absolute",
          left: 90,
          width: 170,
          height: 250,
          borderRadius: 20,
          top: 50,
          marginTop: 20
        }} />
        <Image source={require("../../assets/images/image_4.png")} style={{
          position: "absolute",
          left: -17,
          width: 170,
          height: 250,
          top: 320,
          borderRadius: 20,
          marginTop: 18

        }} />
        <Image source={require("../../assets/images/image_5.png")} style={{
          position: "absolute",
          left: 165,
          width: 170,
          height: 250,
          top: 320,
          borderRadius: 20,
          marginTop: 18
        }} />
        <View style={styles.overlay} />
      </View>

      
      <View style={styles.bottomCard}>
        <Text style={styles.title}>Connect With Different Shops</Text>
        <Text style={styles.subtitle}>
          Get to know and buy with inhand with different shops near your home with us
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => { router.push("/(user)/Home") }}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        <View style={{marginBottom: 5}} />
        <TouchableOpacity style={styles.button} onPress={() => { router.push("/shop/onBoarding/OnBoardingScreen") }}>
          <Text style={styles.buttonText}>Your part</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageGrid: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomCard: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    color: "#2c2c2c",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#68AE3C",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 220,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
