/*
  # Initial Schema Setup for Multi-Occasion Wishing App

  1. New Tables
    - `admins`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamp)
    - `occasions`
      - `id` (uuid, primary key)
      - `slug` (text, unique)
      - `name` (text)
      - `template` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `templates`
      - `id` (uuid, primary key)
      - `occasion_id` (uuid, foreign key)
      - `name` (text)
      - `content` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
*/

-- Create admins table
CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create occasions table
CREATE TABLE IF NOT EXISTS occasions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  template jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create templates table
CREATE TABLE IF NOT EXISTS templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  occasion_id uuid REFERENCES occasions(id),
  name text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE occasions ENABLE ROW LEVEL SECURITY;
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Admins can read all data" 
  ON admins
  FOR SELECT 
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Public can read occasions" 
  ON occasions
  FOR SELECT 
  TO PUBLIC
  USING (true);

CREATE POLICY "Admins can modify occasions" 
  ON occasions
  FOR ALL 
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admins));

CREATE POLICY "Public can read templates" 
  ON templates
  FOR SELECT 
  TO PUBLIC
  USING (true);

CREATE POLICY "Admins can modify templates" 
  ON templates
  FOR ALL 
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM admins));