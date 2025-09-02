import { createOrUpdateShop, type Shop } from '@/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from './useAuth';

// Create or update shop mutation
export const useCreateOrUpdateShop = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ 
      ownerId, 
      shopData 
    }: { 
      ownerId: string; 
      shopData: Omit<Shop, 'id' | 'owner'> 
    }) => createOrUpdateShop(ownerId, shopData),
    onSuccess: (data) => {
      if (data.success && data.shop) {
        // Update the current user query to include the shop data
        queryClient.setQueryData(authKeys.currentUser, (old: any) => ({
          ...old,
          shop: data.shop,
        }));
      }
    },
  });
};