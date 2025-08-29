
import { router } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/splash.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.darkOverlay} />
        <View style={styles.content}>
          <Text style={styles.title}>You want{"\n"}Authentic, here{"\n"}you go!</Text>
          <Text style={styles.subtitle}>Find it here, buy it now!</Text>
          <TouchableOpacity style={styles.button} onPress={() => { router.push("/auth/welcome") }}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  background: {
    flex: 1,
    justifyContent: "flex-end",
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  title: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    color: "#E5E7EB",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#68AE3C",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    minWidth: 220,
    alignItems: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
