-- Complete setup script for Tiny Treasures Hub
-- Copy and paste this entire script into Supabase SQL Editor (agnxpbpgmyxaiiytxrrg)

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.favorites CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert products" ON public.products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update products" ON public.products FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can delete products" ON public.products FOR DELETE USING (auth.role() = 'authenticated');

-- Favorites table
CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can remove favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial products with proper image URLs (Indian Pricing in INR)
INSERT INTO public.products (title, description, price, image_url, category) VALUES
(
  'Minimalist Desk Lamp',
  'A sleek, modern desk lamp with adjustable brightness and elegant design. Perfect for any workspace.',
  3499,
  'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&h=400&fit=crop',
  'Lighting'
),
(
  'Ceramic Coffee Mug',
  'Handcrafted ceramic mug with a smooth glaze finish. Ideal for your morning coffee or tea.',
  349,
  'https://images.unsplash.com/photo-1514432324607-2e467f4af445?w=500&h=400&fit=crop',
  'Kitchenware'
),
(
  'Wooden Desk Organizer',
  'Stylish bamboo desk organizer to keep your workspace tidy and organized.',
  1299,
  'https://images.unsplash.com/photo-1545308477-20c50c08c4ca?w=500&h=400&fit=crop',
  'Office'
),
(
  'Wireless Earbuds',
  'High-quality wireless earbuds with noise cancellation and extended battery life.',
  2999,
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=400&fit=crop',
  'Electronics'
),
(
  'Premium Notebook',
  'Thick, high-quality paper notebook with a leather cover. Great for journaling and sketching.',
  599,
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=400&fit=crop',
  'Stationery'
),
(
  'Succulent Plant Pot',
  'Beautiful ceramic pot perfect for displaying your favorite succulents or small plants.',
  499,
  'https://images.unsplash.com/photo-1587308411516-653cc7280f64?w=500&h=400&fit=crop',
  'Home Decor'
),
(
  'Leather Desk Pad',
  'Premium leather desk pad to protect your desk surface and add a professional touch.',
  1599,
  'https://images.unsplash.com/photo-1520491028774-86c47c537f42?w=500&h=400&fit=crop',
  'Office'
),
(
  'USB-C Hub',
  'Multi-port USB-C hub with fast charging and multiple connectivity options.',
  1899,
  'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=500&h=400&fit=crop',
  'Electronics'
);
