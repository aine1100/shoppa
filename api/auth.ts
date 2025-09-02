import { supabase } from "../lib/supabase";

export interface User {
  id: string;
  full_name: string;
  email: string;
  password?: string;
  google_id?: string;
  role: "client" | "shop owner";
  phone_number?: string;
  created_at: string;
  updated_at: string;
}

export interface Shop {
  id: string;
  title: string;
  description?: string;
  image?: string;
  size?: string;
  owner: string;
  latitude?: number;
  longitude?: number;
  embedding?: number[];
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  amount: number;
  shop_id: string;
  image?: string;
  image_embedding?: any;
  text_embedding?: any;
  category_id?: string;
  created_at: string;
  updated_at: string;
  category?: Category;
  shop?: Shop;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  shop?: Shop;
  error?: string;
}

// Sign up new shop owner
export const signUpShopOwner = async (
  email: string,
  password: string,
  fullName: string,
  phoneNumber?: string
): Promise<AuthResponse> => {
  try {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: "shop_owner",
        },
      },
    });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: "Failed to create user account" };
    }

    // 2. Insert user data into users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        full_name: fullName,
        email,
        role: "shop_owner",
        phone_number: phoneNumber,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (userError) {
      // If user creation fails, clean up auth user
      await supabase.auth.admin.deleteUser(authData.user.id);
      return { success: false, error: userError.message };
    }

    return {
      success: true,
      user: userData as User,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Sign in shop owner
export const signInShopOwner = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      return { success: false, error: authError.message };
    }

    if (!authData.user) {
      return { success: false, error: "Authentication failed" };
    }

    // Get user data from users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .eq("role", "shop_owner")
      .single();

    if (userError || !userData) {
      return { success: false, error: "Shop owner account not found" };
    }

    // Get shop data if exists
    const { data: shopData } = await supabase
      .from("shops")
      .select("*")
      .eq("owner", authData.user.id)
      .single();

    return {
      success: true,
      user: userData as User,
      shop: (shopData as Shop) || undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Get current user session
export const getCurrentUser = async (): Promise<AuthResponse> => {
  try {
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return { success: false, error: "No active session" };
    }

    // Get user data from users table
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (userError || !userData) {
      return { success: false, error: "User data not found" };
    }

    // Get shop data if user is shop owner
    let shopData = null;
    if (userData.role === "shop_owner") {
      const { data } = await supabase
        .from("shops")
        .select("*")
        .eq("owner", authUser.id)
        .single();
      shopData = data;
    }

    return {
      success: true,
      user: userData as User,
      shop: (shopData as Shop) || undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Sign out
export const signOut = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Update user profile
export const updateUserProfile = async (
  userId: string,
  updates: Partial<Pick<User, "full_name" | "phone_number">>
): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, user: data as User };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Create or update shop
export const createOrUpdateShop = async (
  ownerId: string,
  shopData: Omit<Shop, "id" | "owner">
): Promise<{ success: boolean; shop?: Shop; error?: string }> => {
  try {
    // Check if shop already exists
    const { data: existingShop } = await supabase
      .from("shops")
      .select("id")
      .eq("owner", ownerId)
      .single();

    let result;
    if (existingShop) {
      // Update existing shop
      result = await supabase
        .from("shops")
        .update(shopData)
        .eq("owner", ownerId)
        .select()
        .single();
    } else {
      // Create new shop
      result = await supabase
        .from("shops")
        .insert({
          ...shopData,
          owner: ownerId,
        })
        .select()
        .single();
    }

    if (result.error) {
      return { success: false, error: result.error.message };
    }

    return { success: true, shop: result.data as Shop };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Reset password
export const resetPassword = async (
  email: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "your-app://reset-password",
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Google Sign In
export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "shoppa://auth/callback",
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Check if we got a URL to open
    if (data?.url) {
      // In a React Native app, we need to open the URL
      const { Linking } = require("react-native");
      const canOpen = await Linking.canOpenURL(data.url);

      if (canOpen) {
        await Linking.openURL(data.url);
        return { success: true };
      } else {
        return {
          success: false,
          error: "Cannot open Google authentication URL",
        };
      }
    } else {
      return {
        success: false,
        error: "No authentication URL received from Google",
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Google sign in failed",
    };
  }
};

// Handle OAuth callback
export const handleOAuthCallback = async (
  url: string
): Promise<AuthResponse> => {
  try {
    // Parse the URL to extract tokens
    const urlObj = new URL(url);
    const accessToken = urlObj.searchParams.get("access_token");
    const refreshToken = urlObj.searchParams.get("refresh_token");

    if (!accessToken) {
      return { success: false, error: "No access token found in callback URL" };
    }

    // Set the session with the tokens
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken || "",
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (data.session?.user) {
      // Check if user exists in our users table
      const { data: existingUser } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.session.user.id)
        .single();

      if (!existingUser) {
        // Create user record for Google sign-in
        const { data: userData, error: userError } = await supabase
          .from("users")
          .insert({
            id: data.session.user.id,
            full_name:
              data.session.user.user_metadata?.full_name ||
              data.session.user.email?.split("@")[0] ||
              "User",
            email: data.session.user.email || "",
            role: "shop_owner",
            google_id: data.session.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .select()
          .single();

        if (userError) {
          return { success: false, error: userError.message };
        }

        return { success: true, user: userData as User };
      } else {
        // Get shop data if exists
        const { data: shopData } = await supabase
          .from("shops")
          .select("*")
          .eq("owner", existingUser.id)
          .single();

        return {
          success: true,
          user: existingUser as User,
          shop: (shopData as Shop) || undefined,
        };
      }
    }

    return { success: false, error: "No user session found" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "OAuth callback failed",
    };
  }
};

// Listen to auth state changes
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      const { data: userData } = await supabase
        .from("users")
        .select("*")
        .eq("id", session.user.id)
        .single();

      callback((userData as User) || null);
    } else {
      callback(null);
    }
  });
};
