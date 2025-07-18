
-- Update the businesses table to work with Clerk user IDs instead of Supabase auth
ALTER TABLE public.businesses DROP CONSTRAINT IF EXISTS businesses_user_id_fkey;
ALTER TABLE public.businesses ALTER COLUMN user_id TYPE TEXT;

-- Update RLS policies to work with Clerk user IDs
-- Note: Since we're using Clerk, we'll need to pass the user_id in queries rather than using auth.uid()
DROP POLICY IF EXISTS "Users can create their own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can update their own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can delete their own businesses" ON public.businesses;

-- Create new policies that allow authenticated operations
-- We'll handle user ownership validation in the application layer
CREATE POLICY "Authenticated users can create businesses" 
  ON public.businesses 
  FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update businesses" 
  ON public.businesses 
  FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can delete businesses" 
  ON public.businesses 
  FOR DELETE 
  TO authenticated 
  USING (true);
