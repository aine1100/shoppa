import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    // Navigate to main app
    router.push('/(tabs)');
  };

  const handleForgotPassword = () => {
    console.log('Forgot password pressed');
  };

  const handleGoogleLogin = () => {
    console.log('Google login pressed');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            showPasswordToggle
          />

          <Button
            title="Login"
            onPress={handleLogin}
            variant="primary"
            style={styles.loginButton}
          />

          {/* Remember Me and Forgot Password */}
          <View style={styles.optionsContainer}>
            <Checkbox
              checked={rememberMe}
              onPress={() => setRememberMe(!rememberMe)}
              label="Remember Me"
            />
            <Button
              title="Forgot Password?"
              onPress={handleForgotPassword}
              variant="secondary"
              style={styles.forgotButton}
              textStyle={styles.forgotButtonText}
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
            title="G Continue with Google"
            onPress={handleGoogleLogin}
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
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#7CB342',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  progressDot: {
    width: 60,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  forgotButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    minHeight: 'auto',
  },
  forgotButtonText: {
    color: '#7CB342',
    fontWeight: '500',
    fontSize: 14,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#999999',
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 40,
  },
  googleButtonText: {
    color: '#333333',
    fontWeight: '500',
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000000',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 20,
  },
});