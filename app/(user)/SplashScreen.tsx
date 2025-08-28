
import { router } from "expo-router";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

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
    backgroundColor: "#fff",
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 40,
    marginHorizontal: 10,
    
  },
  image: {
    width: width * 0.42,
    height: width * 0.55,
    borderRadius: 12,
    margin: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
  bottomCard: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
    height: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
    color:"#7CB342" ,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#28a745",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
