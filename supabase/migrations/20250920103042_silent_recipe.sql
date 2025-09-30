/*
  # Create MIRS Global Solutions Database Schema

  1. New Tables
    - `enquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `location` (text)
      - `service` (text)
      - `message` (text)
      - `created_at` (timestamp)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `content` (text)
      - `image` (text)
      - `category` (text)
      - `author` (text)
      - `read_time` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `email` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated access
*/

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  service text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  image text NOT NULL,
  category text NOT NULL,
  author text NOT NULL,
  read_time text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for enquiries
CREATE POLICY "Anyone can insert enquiries"
  ON enquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can read enquiries"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policies for blog_posts
CREATE POLICY "Anyone can read blog posts"
  ON blog_posts
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Authenticated users can manage blog posts"
  ON blog_posts
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for admin_users
CREATE POLICY "Admins can read admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default admin users
INSERT INTO admin_users (username, email, password_hash) VALUES
  ('admin', 'admin@mirsglobalsolutions.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'), -- password: password
  ('siniya', 'siniya@mirsglobalsolutions.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'), -- password: password
  ('editor', 'editor@mirsglobalsolutions.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi') -- password: password
ON CONFLICT (username) DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, description, content, image, category, author, read_time) VALUES
  (
    'The Future of Data Processing in 2024',
    'Explore the latest trends and technologies shaping the data processing industry, including AI-powered automation and cloud-based solutions.',
    '<h2>Introduction</h2><p>The data processing industry is experiencing unprecedented transformation in 2024. With the rapid advancement of artificial intelligence, machine learning, and cloud technologies, businesses are discovering new ways to handle, analyze, and derive insights from their data.</p><h2>Key Trends Shaping Data Processing</h2><p>Several key trends are driving the evolution of data processing services:</p><ul><li><strong>AI-Powered Automation:</strong> Machine learning algorithms are now capable of handling routine data processing tasks with minimal human intervention.</li><li><strong>Cloud-First Approach:</strong> Organizations are moving their data processing operations to cloud platforms for better scalability and cost-effectiveness.</li><li><strong>Real-Time Processing:</strong> The demand for real-time data processing has increased significantly as businesses seek immediate insights.</li><li><strong>Data Privacy and Security:</strong> Enhanced focus on data protection and compliance with regulations like GDPR and CCPA.</li></ul><h2>Impact on Businesses</h2><p>These technological advancements are having a profound impact on businesses across various industries. Companies can now process larger volumes of data more quickly and accurately than ever before.</p><h2>MIRS Global Solutions Approach</h2><p>At MIRS Global Solutions, we are embracing these technologies to provide our clients with cutting-edge data processing services. Our team stays updated with the latest industry trends to ensure we deliver the most effective solutions.</p><h2>Conclusion</h2><p>The future of data processing is bright, with exciting possibilities ahead. Businesses that adapt to these changes will gain a significant competitive advantage in their respective markets.</p>',
    'https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Data Processing',
    'S. Iniya',
    '5 min read'
  ),
  (
    'Best Practices for Data Entry Services',
    'Learn about the essential best practices that ensure accuracy, efficiency, and quality in data entry operations.',
    '<h2>The Importance of Quality Data Entry</h2><p>Data entry forms the foundation of most business operations. Accurate and efficient data entry is crucial for maintaining data integrity and ensuring smooth business processes.</p><h2>Essential Best Practices</h2><h3>1. Establish Clear Guidelines</h3><p>Create comprehensive guidelines that outline data entry procedures, formatting requirements, and quality standards.</p><h3>2. Implement Quality Control Measures</h3><p>Regular quality checks and validation processes help maintain data accuracy and identify potential issues early.</p><h3>3. Use Appropriate Tools and Software</h3><p>Invest in reliable data entry software and tools that can streamline the process and reduce human error.</p><h3>4. Train Your Team</h3><p>Proper training ensures that data entry personnel understand the requirements and can maintain consistency.</p><h2>Common Challenges and Solutions</h2><p>Data entry operations often face challenges such as:</p><ul><li>Human error and inconsistency</li><li>Large volume processing</li><li>Time constraints</li><li>Data security concerns</li></ul><h2>MIRS Global Solutions Expertise</h2><p>Our team at MIRS Global Solutions has extensive experience in providing high-quality data entry services across various industries. We follow strict quality control measures to ensure accuracy and timely delivery.</p>',
    'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'Data Entry',
    'MIRS Team',
    '7 min read'
  )
ON CONFLICT DO NOTHING;