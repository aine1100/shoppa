import { ThemedText } from '@/components/ThemedText';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useOAuthCallback } from '@/hooks/useAuth';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

export default function AuthCallbackScreen() {
  const params = useLocalSearchParams();
  const oauthCallbackMutation = useOAuthCallback();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const url = params.url as string;
        
        if (url) {
          const result = await oauthCallbackMutation.mutateAsync(url);
          if (!result.success) {
            Alert.alert('Authentication Failed', result.error || 'An error occurred');
            router.replace('/shop/auth/login');
          }
          // Success navigation is handled in the mutation's onSuccess callback
        } else {
          console.error('No URL provided in callback');
          router.replace('/shop/auth/login');
        }
      } catch (error) {
        console.error('Callback handling error:', error);
        Alert.alert('Error', 'Failed to process authentication. Please try again.');
        router.replace('/shop/auth/login');
      }
    };

    handleCallback();
  }, [params, oauthCallbackMutation]);

  return (
    <View style={styles.container}>
      <LoadingSpinner />
      <ThemedText style={styles.text}>
        Completing authentication...
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
});