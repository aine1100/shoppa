import { Product } from '@/api/auth';
import {
  createProduct,
  deleteProduct,
  getCategories,
  getProduct,
  getProductsByShop,
  searchProducts,
  updateProduct
} from '@/api/products';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Query keys
export const productKeys = {
  all: ['products'] as const,
  categories: ['categories'] as const,
  byShop: (shopId: string) => ['products', 'shop', shopId] as const,
  detail: (id: string) => ['products', 'detail', id] as const,
  search: (shopId: string, query: string) => ['products', 'search', shopId, query] as const,
};

// Get all categories
export const useCategories = () => {
  return useQuery({
    queryKey: productKeys.categories,
    queryFn: getCategories,
  });
};

// Get products by shop
export const useProductsByShop = (shopId: string | undefined) => {
  return useQuery({
    queryKey: productKeys.byShop(shopId || ''),
    queryFn: () => getProductsByShop(shopId!),
    enabled: !!shopId,
  });
};

// Get single product
export const useProduct = (productId: string | undefined) => {
  return useQuery({
    queryKey: productKeys.detail(productId || ''),
    queryFn: () => getProduct(productId!),
    enabled: !!productId,
  });
};

// Search products
export const useSearchProducts = (shopId: string | undefined, query: string) => {
  return useQuery({
    queryKey: productKeys.search(shopId || '', query),
    queryFn: () => searchProducts(shopId!, query),
    enabled: !!shopId && query.length > 0,
  });
};

// Create product mutation
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => 
      createProduct(productData),
    onSuccess: (data, variables) => {
      if (data.success && data.product) {
        // Invalidate and refetch products for this shop
        queryClient.invalidateQueries({ 
          queryKey: productKeys.byShop(variables.shop_id) 
        });
        // Add the new product to the cache
        queryClient.setQueryData(
          productKeys.detail(data.product.id),
          data
        );
      }
    },
  });
};

// Update product mutation
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      productId, 
      updates 
    }: { 
      productId: string; 
      updates: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>> 
    }) => updateProduct(productId, updates),
    onSuccess: (data, variables) => {
      if (data.success && data.product) {
        // Update the product detail cache
        queryClient.setQueryData(
          productKeys.detail(variables.productId),
          data
        );
        // Invalidate shop products list
        queryClient.invalidateQueries({ 
          queryKey: productKeys.byShop(data.product.shop_id) 
        });
      }
    },
  });
};

// Delete product mutation
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ productId, shopId }: { productId: string; shopId: string }) => 
      deleteProduct(productId),
    onSuccess: (data, variables) => {
      if (data.success) {
        // Remove from cache
        queryClient.removeQueries({ 
          queryKey: productKeys.detail(variables.productId) 
        });
        // Invalidate shop products list
        queryClient.invalidateQueries({ 
          queryKey: productKeys.byShop(variables.shopId) 
        });
      }
    },
  });
};