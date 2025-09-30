import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Environment variables check:');
console.log('VITE_SUPABASE_URL:', supabaseUrl);
console.log('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('VITE_SUPABASE_URL:', supabaseUrl);
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey);
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      enquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string;
          location: string;
          service: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone: string;
          location: string;
          service: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string;
          location?: string;
          service?: string;
          message?: string;
          created_at?: string;
        };
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          description: string;
          content: string;
          image: string;
          category: string;
          author: string;
          created_at: string;
          updated_at: string;
          read_time: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          content: string;
          image: string;
          category: string;
          author: string;
          created_at?: string;
          updated_at?: string;
          read_time: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          content?: string;
          image?: string;
          category?: string;
          author?: string;
          created_at?: string;
          updated_at?: string;
          read_time?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          username: string;
          email: string;
          password_hash: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          email: string;
          password_hash: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          email?: string;
          password_hash?: string;
          created_at?: string;
        };
      };
    };
  };
};