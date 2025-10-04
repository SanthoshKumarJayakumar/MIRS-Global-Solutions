# 🔧 Fix Supabase RLS Policies - Step by Step Guide

## The Problem
Your blog post INSERT operations are blocked by Row Level Security (RLS) policies, while other operations (READ, UPDATE, DELETE) work fine.

## Quick Fix (5 minutes)

### Method 1: Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `tgwagohstfjhevvocyni`

2. **Navigate to Policies**
   - Click on **"Authentication"** in the left sidebar
   - Click on **"Policies"** tab

3. **Find blog_posts table**
   - Look for `blog_posts` in the table list
   - Click on it to see current policies

4. **Delete existing policies**
   - Delete ALL existing policies for `blog_posts`
   - Click the trash icon next to each policy

5. **Create new comprehensive policy**
   - Click **"New Policy"**
   - **Policy name:** `Allow all operations`
   - **Allowed operation:** `ALL`
   - **Target roles:** `anon`
   - **USING expression:** `true`
   - **WITH CHECK expression:** `true`
   - Click **"Save"**

6. **Test the fix**
   - Go back to your app: http://localhost:5173/admin/login
   - Login with: `admin` / `password`
   - Try creating a new blog post

### Method 2: SQL Editor (Alternative)

1. **Open SQL Editor**
   - In Supabase dashboard, go to **"SQL Editor"**
   - Click **"New Query"**

2. **Run this SQL command:**
```sql
-- Drop existing policies
DROP POLICY IF EXISTS "Allow all operations on blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can read blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can insert blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can update blog posts" ON blog_posts;
DROP POLICY IF EXISTS "Anyone can delete blog posts" ON blog_posts;

-- Create comprehensive policy
CREATE POLICY "Allow all operations on blog_posts"
  ON blog_posts
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);
```

3. **Click "Run"**

## Verification

After applying the fix, test these operations:
- ✅ **Create new post** - Should work
- ✅ **Edit existing post** - Should work  
- ✅ **Delete post** - Should work
- ✅ **View posts** - Should work

## Current Status
- READ: ✅ Working
- UPDATE: ✅ Working
- DELETE: ✅ Working
- INSERT: ❌ Blocked (needs fix)

Once you complete the fix, all CRUD operations will work perfectly!


