import { supabase } from "../lib/supabase";
import { Category, Product } from "./auth";

export interface ProductResponse {
  success: boolean;
  product?: Product;
  products?: Product[];
  error?: string;
}

export interface CategoryResponse {
  success: boolean;
  category?: Category;
  categories?: Category[];
  error?: string;
}

// Get all categories
export const getCategories = async (): Promise<CategoryResponse> => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name");

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, categories: data as Category[] };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Get products by shop
export const getProductsByShop = async (shopId: string): Promise<ProductResponse> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*)
      `)
      .eq("shop_id", shopId)
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, products: data as Product[] };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Get single product
export const getProduct = async (productId: string): Promise<ProductResponse> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*),
        shop:shops(*)
      `)
      .eq("id", productId)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, product: data as Product };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Create product
export const createProduct = async (
  productData: Omit<Product, "id" | "created_at" | "updated_at">
): Promise<ProductResponse> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert({
        ...productData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select(`
        *,
        category:categories(*)
      `)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, product: data as Product };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Update product
export const updateProduct = async (
  productId: string,
  updates: Partial<Omit<Product, "id" | "created_at" | "updated_at">>
): Promise<ProductResponse> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", productId)
      .select(`
        *,
        category:categories(*)
      `)
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, product: data as Product };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Delete product
export const deleteProduct = async (productId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

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

// Search products (for shop owner to see their products)
export const searchProducts = async (
  shopId: string,
  query: string
): Promise<ProductResponse> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(*)
      `)
      .eq("shop_id", shopId)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order("created_at", { ascending: false });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, products: data as Product[] };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};