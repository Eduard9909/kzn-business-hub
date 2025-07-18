
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

export type Business = Tables<'businesses'> & {
  categories: Tables<'categories'> | null;
};

export type BusinessFormData = {
  name: string;
  description: string;
  location: string;
  category_id: string;
  logo_url?: string;
};

export const useUserBusiness = () => {
  const { user } = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current user's business
  const {
    data: business,
    isLoading,
    error
  } = useQuery({
    queryKey: ['user-business', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      console.log('Fetching business for user:', user.id);
      
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user business:', error);
        throw error;
      }

      console.log('Fetched user business:', data);
      return data as Business | null;
    },
    enabled: !!user?.id,
  });

  // Create business mutation
  const createBusinessMutation = useMutation({
    mutationFn: async (businessData: BusinessFormData) => {
      if (!user?.id) throw new Error('User not authenticated');

      const insertData: TablesInsert<'businesses'> = {
        ...businessData,
        user_id: user.id,
      };

      console.log('Creating business:', insertData);

      const { data, error } = await supabase
        .from('businesses')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error('Error creating business:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-business', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      toast({
        title: 'Success',
        description: 'Your business listing has been created successfully!',
      });
    },
    onError: (error) => {
      console.error('Create business error:', error);
      toast({
        title: 'Error',
        description: 'Failed to create business listing. Please try again.',
        variant: 'destructive',
      });
    },
  });

  // Update business mutation
  const updateBusinessMutation = useMutation({
    mutationFn: async (businessData: BusinessFormData) => {
      if (!user?.id || !business?.id) throw new Error('User not authenticated or no business found');

      const updateData: TablesUpdate<'businesses'> = {
        ...businessData,
        updated_at: new Date().toISOString(),
      };

      console.log('Updating business:', updateData);

      const { data, error } = await supabase
        .from('businesses')
        .update(updateData)
        .eq('id', business.id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) {
        console.error('Error updating business:', error);
        throw error;
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-business', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      toast({
        title: 'Success',
        description: 'Your business listing has been updated successfully!',
      });
    },
    onError: (error) => {
      console.error('Update business error:', error);
      toast({
        title: 'Error',
        description: 'Failed to update business listing. Please try again.',
        variant: 'destructive',
      });
    },
  });

  return {
    business,
    isLoading,
    error,
    createBusiness: createBusinessMutation.mutate,
    updateBusiness: updateBusinessMutation.mutate,
    isCreating: createBusinessMutation.isPending,
    isUpdating: updateBusinessMutation.isPending,
  };
};
