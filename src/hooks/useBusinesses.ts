
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type Business = Tables<'businesses'> & {
  categories: Tables<'categories'> | null;
};

export const useBusinesses = () => {
  return useQuery({
    queryKey: ['businesses'],
    queryFn: async () => {
      console.log('Fetching businesses from Supabase...');
      
      const { data, error } = await supabase
        .from('businesses')
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }

      console.log('Fetched businesses:', data);
      return data as Business[];
    },
  });
};
