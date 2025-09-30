-- Fix RLS policies to allow anonymous access for blog operations
-- This migration updates the existing policies to work with the current authentication system

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can manage blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Admins can read enquiries" ON enquiries;
DROP POLICY IF EXISTS "Admins can read admin users" ON admin_users;

-- Create new policies for blog_posts that allow anonymous access
CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anyone can insert blog posts"
  ON blog_posts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can update blog posts"
  ON blog_posts
  FOR UPDATE
  TO anon
  USING (true);

CREATE POLICY "Anyone can delete blog posts"
  ON blog_posts
  FOR DELETE
  TO anon
  USING (true);

-- Create policies for enquiries (allow anonymous access)
CREATE POLICY "Anyone can read enquiries"
  ON enquiries
  FOR SELECT
  TO anon
  USING (true);

-- Create policies for admin_users (allow anonymous access for authentication)
CREATE POLICY "Anyone can read admin users"
  ON admin_users
  FOR SELECT
  TO anon
  USING (true);



