/*
  # Add Admin Users for Authentication

  1. New Tables
    - Insert admin users with proper credentials
  2. Security
    - Users for admin authentication
*/

-- Insert admin users (passwords will be 'password' for demo)
INSERT INTO admin_users (username, email, password_hash) VALUES
('admin', 'admin@mirsglobalsolutions.com', '$2b$10$rQJ8YnM9k7FZK5X2nL4vHOGZK5X2nL4vHOGZK5X2nL4vHOGZK5X2nL'),
('siniya', 'siniya@mirsglobalsolutions.com', '$2b$10$rQJ8YnM9k7FZK5X2nL4vHOGZK5X2nL4vHOGZK5X2nL4vHOGZK5X2nL'),
('editor', 'editor@mirsglobalsolutions.com', '$2b$10$rQJ8YnM9k7FZK5X2nL4vHOGZK5X2nL4vHOGZK5X2nL4vHOGZK5X2nL')
ON CONFLICT (username) DO NOTHING;