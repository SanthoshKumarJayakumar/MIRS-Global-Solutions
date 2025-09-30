-- Create careers applications table
CREATE TABLE IF NOT EXISTS career_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  position text NOT NULL,
  experience text NOT NULL,
  resume text NOT NULL,
  cover_letter text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Create policies for career_applications (allow anonymous access)
CREATE POLICY "Anyone can insert career applications"
  ON career_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read career applications"
  ON career_applications
  FOR SELECT
  TO anon
  USING (true);



