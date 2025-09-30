-- Fix RLS policies for blog_posts to allow CRUD operations
-- This migration ensures that all CRUD operations work properly

-- First, disable RLS temporarily to fix the policies
ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Anyone can read blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can delete blog posts" ON blog_posts;

-- Re-enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create new policies that allow all operations for anonymous users
CREATE POLICY "Allow all operations on blog_posts"
  ON blog_posts
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Also create policies for authenticated users (in case authentication is used later)
CREATE POLICY "Allow all operations on blog_posts for authenticated users"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
