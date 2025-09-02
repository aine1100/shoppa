import { getCurrentUser, onAuthStateChange, Shop, User } from '@/api/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  shop: Shop | null;
  loading: boolean;
  isAuthenticated: boolean;
  isShopOwner: boolean;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const result = await getCurrentUser();
      if (result.success && result.user) {
        setUser(result.user);
        setShop(result.shop || null);
      } else {
        setUser(null);
        setShop(null);
      }
    } catch (error) {
      console.error('Error refreshing auth:', error);
      setUser(null);
      setShop(null);
    }
  };

  useEffect(() => {
    // Initial auth check
    refreshAuth().finally(() => setLoading(false));

    // Listen to auth state changes
    const { data: { subscription } } = onAuthStateChange((authUser) => {
      if (authUser) {
        refreshAuth();
      } else {
        setUser(null);
        setShop(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    shop,
    loading,
    isAuthenticated: !!user,
    isShopOwner: user?.role === 'shop_owner',
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};