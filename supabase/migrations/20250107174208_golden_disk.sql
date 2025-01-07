/*
  # Update schema to use slug-based references
  
  1. Changes
    - Modify occasions table to use slug as primary key
    - Update templates table to reference occasion_slug
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read occasions" ON occasions;
DROP POLICY IF EXISTS "Public can read templates" ON templates;

-- Create occasions table with slug as primary key
CREATE TABLE IF NOT EXISTS occasions (
  slug text PRIMARY KEY,
  name text NOT NULL,
  template jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create templates table with occasion_slug reference
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  occasion_slug text REFERENCES occasions(slug),
  name text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE occasions ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read occasions" 
  ON occasions
  FOR SELECT 
  TO PUBLIC
  USING (true);

CREATE POLICY "Public can read templates" 
  ON templates
  FOR SELECT 
  TO PUBLIC
  USING (true);