import { router } from 'expo-router';
import { useEffect } from 'react';
import { Linking } from 'react-native';

export const useDeepLinking = () => {
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      console.log('Deep link received:', url);
      
      // Handle OAuth callback
      if (url.includes('auth/callback')) {
        router.push(`/auth/callback?url=${encodeURIComponent(url)}`);
      }
    };

    // Handle initial URL if app was opened via deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    // Listen for deep links while app is running
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    return () => {
      subscription?.remove();
    };
  }, []);
};