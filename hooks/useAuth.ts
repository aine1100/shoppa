import {
    getCurrentUser,
    handleOAuthCallback,
    resetPassword,
    signInShopOwner,
    signInWithGoogle,
    signOut,
    signUpShopOwner,
    updateUserProfile,
    type AuthResponse,
    type User
} from '@/api/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';

// Query keys
export const authKeys = {
  currentUser: ['auth', 'currentUser'] as const,
};

// Get current user query
export const useCurrentUser = () => {
  return useQuery({
    queryKey: authKeys.currentUser,
    queryFn: getCurrentUser,
    retry: false,
  });
};

// Sign up mutation
export const useSignUp = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      email, 
      password, 
      fullName, 
      phoneNumber 
    }: {
      email: string;
      password: string;
      fullName: string;
      phoneNumber?: string;
    }) => signUpShopOwner(email, password, fullName, phoneNumber),
    onSuccess: (data) => {
      if (data.success && data.user) {
        queryClient.setQueryData(authKeys.currentUser, data);
        router.push('/shop/auth/verify');
      }
    },
  });
};

// Sign in mutation
export const useSignIn = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      signInShopOwner(email, password),
    onSuccess: (data) => {
      if (data.success && data.user) {
        queryClient.setQueryData(authKeys.currentUser, data);
        router.push('/shop/profile/store');
      }
    },
  });
};

// Sign out mutation
export const useSignOut = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
      router.push('/shop/auth/login');
    },
  });
};

// Update profile mutation
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      userId, 
      updates 
    }: { 
      userId: string; 
      updates: Partial<Pick<User, 'full_name' | 'phone_number'>> 
    }) => updateUserProfile(userId, updates),
    onSuccess: (data) => {
      if (data.success && data.user) {
        queryClient.setQueryData(authKeys.currentUser, (old: AuthResponse | undefined) => ({
          ...old,
          user: data.user,
        }));
      }
    },
  });
};

// Reset password mutation
export const useResetPassword = () => {
  return useMutation({
    mutationFn: (email: string) => resetPassword(email),
  });
};

// Google sign in mutation
export const useGoogleSignIn = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: (data) => {
      if (data.success && data.user) {
        queryClient.setQueryData(authKeys.currentUser, data);
        router.push('/shop/profile/store');
      }
    },
  });
};

// OAuth callback mutation
export const useOAuthCallback = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (url: string) => handleOAuthCallback(url),
    onSuccess: (data) => {
      if (data.success && data.user) {
        queryClient.setQueryData(authKeys.currentUser, data);
        router.push('/shop/profile/store');
      }
    },
  });
};