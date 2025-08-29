import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleContinue = () => {
    // Navigate to verification screen
    router.push("/shop/auth/verify");
  };

  const handleLogin = () => {
    // Navigate to login screen
    router.push("/shop/auth/login");
  };

  const handleGoogleSignUp = () => {
    console.log("Google sign up pressed");
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
            Sign Up
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Start Your Digital Shop Today
          </ThemedText>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.nameRow}>
            <Input
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.halfInput}
              leftIconName="person"
            />
            <Input
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.halfInput}
              leftIconName="person"
            />
          </View>

          <Input
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            leftIconName="mail"
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showPasswordToggle
            leftIconName="lock-closed"
          />

          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            showPasswordToggle
            leftIconName="lock-closed"
          />

          <Button
            title="Continue →"
            onPress={handleContinue}
            variant="primary"
            style={styles.continueButton}
          />

          {/* Login Link */}
          <View style={styles.loginContainer}>
            <ThemedText style={styles.loginText}>
              Already got an account?{" "}
            </ThemedText>
            <Button
              title="Login"
              onPress={handleLogin}
              variant="secondary"
              style={styles.loginButton}
              textStyle={styles.loginButtonText}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <ThemedText style={styles.dividerText}>Or</ThemedText>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Sign Up */}
          <Button
            title="Continue with Google"
            onPress={handleGoogleSignUp}
            variant="secondary"
            style={styles.googleButton}
            textStyle={styles.googleButtonText}
          />
        </View>

        {/* Bottom Indicator */}
      </ScrollView>
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#68AE3C",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: "#666666",
    textAlign: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  progressDot: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
  },
  progressDotActive: {
    backgroundColor: "#68AE3C",
  },
  formContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  continueButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 32,
  },
  loginText: {
    fontSize: 16,
    color: "#666666",
  },
  loginButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: "auto",
  },
  loginButtonText: {
    color: "#68AE3C",
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#999999",
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 40,
  },
  googleButtonText: {
    color: "#333333",
    fontWeight: "500",
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: "#000000",
    borderRadius: 2.5,
    alignSelf: "center",
    marginBottom: 20,
  },
});
