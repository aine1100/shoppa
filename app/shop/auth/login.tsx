import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { useGoogleSignIn, useResetPassword, useSignIn } from "@/hooks/useAuth";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const signInMutation = useSignIn();
  const googleSignInMutation = useGoogleSignIn();
  const resetPasswordMutation = useResetPassword();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const result = await signInMutation.mutateAsync({
        email: email.trim(),
        password,
      });

      if (!result.success) {
        Alert.alert("Login Failed", result.error || "Invalid credentials");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to sign in. Please try again.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address first");
      return;
    }

    try {
      const result = await resetPasswordMutation.mutateAsync(email.trim());
      if (result.success) {
        Alert.alert("Success", "Password reset email sent. Please check your inbox.");
      } else {
        Alert.alert("Error", result.error || "Failed to send reset email");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to send reset email. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleSignInMutation.mutateAsync();
      if (!result.success) {
        Alert.alert("Google Sign In Failed", result.error || "An error occurred");
      }
    } catch (err) {
      Alert.alert("Error", "Failed to sign in with Google. Please try again.");
    };
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
            Login
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Start Your Digital Shop Today
          </ThemedText>
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
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

          <Button
            title={signInMutation.isPending ? "Signing in..." : "Login"}
            onPress={handleLogin}
            variant="primary"
            style={styles.loginButton}
            disabled={signInMutation.isPending}
          />

          {/* Remember Me and Forgot Password */}
          <View style={styles.optionsContainer}>
            <Checkbox
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              label="Remember Me"
            />
            <Button
              title={resetPasswordMutation.isPending ? "Sending..." : "Forgot Password?"}
              onPress={handleForgotPassword}
              variant="secondary"
              style={styles.forgotButton}
              textStyle={styles.forgotButtonText}
              disabled={resetPasswordMutation.isPending}
            />
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <ThemedText style={styles.dividerText}>Or</ThemedText>
            <View style={styles.dividerLine} />
          </View>

          {/* Google Login */}
          <Button
            title={googleSignInMutation.isPending ? "Signing in..." : "G Continue with Google"}
            onPress={handleGoogleLogin}
            variant="secondary"
            style={styles.googleButton}
            textStyle={styles.googleButtonText}
            disabled={googleSignInMutation.isPending}
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
  formContainer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  loginButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  forgotButton: {
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: "auto",
  },
  forgotButtonText: {
    color: "#68AE3C",
    fontWeight: "500",
    fontSize: 14,
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
