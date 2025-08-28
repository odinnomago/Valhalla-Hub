-- Supabase Schema for Studio App
-- Run these commands in your Supabase SQL editor to create the necessary tables

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Beat', 'Merch', 'Course', 'Sound Kit')),
    image_url TEXT NOT NULL,
    seller_id UUID NOT NULL,
    seller TEXT NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    buyer_id UUID NOT NULL,
    stripe_payment_intent_id TEXT NOT NULL UNIQUE,
    items JSONB NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    shipping_details JSONB,
    status TEXT NOT NULL CHECK (status IN ('Paid', 'Shipped', 'Delivered')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create releases table
CREATE TABLE IF NOT EXISTS releases (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    artist_id UUID NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('Single', 'EP', 'Album')),
    release_date DATE NOT NULL,
    cover_art TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('Live', 'Pending', 'Rejected', 'Draft')),
    platforms TEXT[] DEFAULT ARRAY['spotify', 'apple', 'deezer'],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    author_id UUID NOT NULL,
    author_name TEXT NOT NULL,
    author_photo_url TEXT,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    instructor TEXT NOT NULL,
    instructor_id UUID NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('Production', 'Business', 'Instrument', 'Theory')),
    level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
    duration TEXT NOT NULL,
    rating DECIMAL(3,2) DEFAULT 0,
    students INTEGER DEFAULT 0,
    price DECIMAL(10,2) NOT NULL,
    modules JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_releases_artist_id ON releases(artist_id);
CREATE INDEX IF NOT EXISTS idx_releases_status ON releases(status);

CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_author_id ON reviews(author_id);

CREATE INDEX IF NOT EXISTS idx_courses_instructor_id ON courses(instructor_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE releases ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- RLS Policies (basic examples - adjust based on your needs)

-- Products: Everyone can read, only authenticated users can insert, only owners can update/delete
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);
CREATE POLICY "Users can insert products" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update their own products" ON products FOR UPDATE USING (auth.uid() = seller_id);
CREATE POLICY "Users can delete their own products" ON products FOR DELETE USING (auth.uid() = seller_id);

-- Orders: Only the buyer can see their orders
CREATE POLICY "Users can view their own orders" ON orders FOR SELECT USING (auth.uid() = buyer_id);
CREATE POLICY "System can insert orders" ON orders FOR INSERT WITH CHECK (true);

-- Releases: Only the artist can manage their releases
CREATE POLICY "Users can view all releases" ON releases FOR SELECT USING (true);
CREATE POLICY "Users can insert releases" ON releases FOR INSERT WITH CHECK (auth.uid() = artist_id);
CREATE POLICY "Users can update their own releases" ON releases FOR UPDATE USING (auth.uid() = artist_id);
CREATE POLICY "Users can delete their own releases" ON releases FOR DELETE USING (auth.uid() = artist_id);

-- Reviews: Everyone can read, authenticated users can insert
CREATE POLICY "Reviews are viewable by everyone" ON reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert reviews" ON reviews FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Courses: Everyone can read, only instructors can manage their courses
CREATE POLICY "Courses are viewable by everyone" ON courses FOR SELECT USING (true);
CREATE POLICY "Users can insert courses" ON courses FOR INSERT WITH CHECK (auth.uid() = instructor_id);
CREATE POLICY "Users can update their own courses" ON courses FOR UPDATE USING (auth.uid() = instructor_id);
CREATE POLICY "Users can delete their own courses" ON courses FOR DELETE USING (auth.uid() = instructor_id);