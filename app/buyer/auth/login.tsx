import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function BuyerLoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.replace('/(user)/Home');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Buyer Login</ThemedText>
          <ThemedText style={styles.subtitle}>Shop faster with your buyer account</ThemedText>
        </View>
        <View style={styles.formContainer}>
          <Input placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" leftIconName="mail" />
          <Input placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry showPasswordToggle leftIconName="lock-closed" />
          <Button title="Login" onPress={handleLogin} variant="primary" style={styles.loginButton} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingTop: 60 },
  titleContainer: { alignItems: 'center', marginBottom: 24, paddingHorizontal: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#68AE3C', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666666', textAlign: 'center' },
  formContainer: { paddingHorizontal: 32, paddingBottom: 40 },
  loginButton: { marginTop: 8 },
});


