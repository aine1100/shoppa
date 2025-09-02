import { ThemedText } from '@/components/ThemedText';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useCurrentUser } from '@/hooks/useAuth';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface AuthGuardProps {
  children: React.ReactNode;
  requireShopOwner?: boolean;
  requireShop?: boolean;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireShopOwner = false,
  requireShop = false 
}) => {
  const { data: authData, isLoading, error } = useCurrentUser();
  
  const user = authData?.user;
  const shop = authData?.shop;
  const isShopOwner = user?.role === 'shop owner';

  if (isLoading) {
    return (
      <View style={styles.container}>
        <LoadingSpinner size={20} />
        <ThemedText style={styles.loadingText}>Loading...</ThemedText>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.title}>Authentication Required</ThemedText>
        <ThemedText style={styles.message}>
          Please sign in to access this feature.
        </ThemedText>
        <Button
          title="Go to Sign In"
          onPress={() => router.push('/shop/auth/login')}
          variant="primary"
          style={styles.button}
        />
      </View>
    );
  }

  if (requireShopOwner && !isShopOwner) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.title}>Shop Owner Access Required</ThemedText>
        <ThemedText style={styles.message}>
          This feature is only available for shop owners.
        </ThemedText>
        <Button
          title="Go Back"
          onPress={() => router.back()}
          variant="primary"
          style={styles.button}
        />
      </View>
    );
  }

  if (requireShop && !shop) {
    return (
      <View style={styles.container}>
        <ThemedText style={styles.title}>Shop Setup Required</ThemedText>
        <ThemedText style={styles.message}>
          Please complete your shop setup to access this feature.
        </ThemedText>
        <Button
          title="Setup Shop"
          onPress={() => router.push('/shop/profile/store')}
          variant="primary"
          style={styles.button}
        />
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#7CB342',
  },
  button: {
    minWidth: 200,
  },
});