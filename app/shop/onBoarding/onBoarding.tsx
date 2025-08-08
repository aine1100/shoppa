import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export function OnBoardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to sign up screen
    router.push("/shop/auth/signUp");
  };

  const handleSignIn = () => {
    // Navigate to login screen
    router.push("/shop/auth/login");
  };

  return (
    <ThemedView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <ThemedText style={styles.logoIcon}>🛒</ThemedText>
        </View>
        <ThemedText type="title" style={styles.appName}>
          Shopa
        </ThemedText>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <ThemedText style={styles.description}>
          Beautiful Digital Shop for your{"\n"}online store
        </ThemedText>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonsContainer}>
        <Button
          title="Let's get started"
          onPress={handleGetStarted}
          variant="primary"
          style={styles.primaryButton}
        />

        <Button
          title="Already have an account →"
          onPress={handleSignIn}
          variant="secondary"
          style={styles.secondaryButton}
          textStyle={styles.secondaryButtonText}
        />
      </View>

      {/* Bottom Indicator */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 120,
    paddingBottom: 60,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#7CB342",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoIcon: {
    fontSize: 48,
    color: "#FFFFFF",
  },
  appName: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#7CB342",
  },
  descriptionContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    lineHeight: 28,
    color: "#666666",
  },
  buttonsContainer: {
    gap: 16,
  },
  primaryButton: {
    marginBottom: 8,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  secondaryButtonText: {
    color: "#666666",
    fontWeight: "500",
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#000000",
    borderRadius: 2.5,
    alignSelf: "center",
    marginTop: 20,
  },
});
