
-- Create categories table first
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert some default categories
INSERT INTO public.categories (name) VALUES 
  ('Food & Drink'),
  ('Plumbing'),
  ('Beauty & Wellness'),
  ('Technology'),
  ('Home & Garden'),
  ('Professional Services');

-- Create businesses table
CREATE TABLE public.businesses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  logo_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  user_id UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;

-- Create policies for categories (public read access)
CREATE POLICY "Categories are viewable by everyone" 
  ON public.categories 
  FOR SELECT 
  USING (true);

-- Create policies for businesses (public read access for directory)
CREATE POLICY "Businesses are viewable by everyone" 
  ON public.businesses 
  FOR SELECT 
  USING (true);

-- Users can insert their own businesses
CREATE POLICY "Users can create their own businesses" 
  ON public.businesses 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own businesses
CREATE POLICY "Users can update their own businesses" 
  ON public.businesses 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can delete their own businesses
CREATE POLICY "Users can delete their own businesses" 
  ON public.businesses 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Insert some sample business data
INSERT INTO public.businesses (name, description, location, logo_url, category_id) 
SELECT 
  'Ocean View Restaurant',
  'Fresh seafood and stunning ocean views in the heart of Durban',
  'Durban',
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  (SELECT id FROM public.categories WHERE name = 'Food & Drink')
UNION ALL
SELECT 
  'Quick Fix Plumbing',
  'Professional plumbing services available 24/7',
  'Pietermaritzburg',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80',
  (SELECT id FROM public.categories WHERE name = 'Plumbing')
UNION ALL
SELECT 
  'Style Studio Salon',
  'Premium beauty and wellness services',
  'Durban',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  (SELECT id FROM public.categories WHERE name = 'Beauty & Wellness')
UNION ALL
SELECT 
  'Tech Solutions KZN',
  'IT support and technology solutions for businesses',
  'Newcastle',
  'https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80',
  (SELECT id FROM public.categories WHERE name = 'Technology')
UNION ALL
SELECT 
  'Green Garden Services',
  'Professional landscaping and garden maintenance',
  'Richards Bay',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  (SELECT id FROM public.categories WHERE name = 'Home & Garden')
UNION ALL
SELECT 
  'Legal Eagles Law Firm',
  'Expert legal advice and representation',
  'Durban',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
  (SELECT id FROM public.categories WHERE name = 'Professional Services');
