-- Create contact submissions table
CREATE TABLE contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new',
  email_status TEXT DEFAULT 'pending',
  admin_email_id TEXT,
  user_email_id TEXT
);

-- Create quote submissions table
CREATE TABLE quote_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_type TEXT NOT NULL,
  service_type_display TEXT NOT NULL,
  pickup_location TEXT NOT NULL,
  delivery_location TEXT NOT NULL,
  requested_date TEXT,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'new',
  email_status TEXT DEFAULT 'pending',
  admin_email_id TEXT,
  user_email_id TEXT
);

-- Create RLS policies to allow inserts but restrict reads to authenticated users
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert data (for form submissions)
CREATE POLICY "Allow public to insert contact submissions"
ON contact_submissions FOR INSERT TO anon
WITH CHECK (true);

CREATE POLICY "Allow public to insert quote submissions"
ON quote_submissions FOR INSERT TO anon
WITH CHECK (true);

-- Only allow authenticated users to read data (for admin access)
CREATE POLICY "Allow authenticated users to read contact submissions"
ON contact_submissions FOR SELECT TO authenticated
USING (true);

CREATE POLICY "Allow authenticated users to read quote submissions"
ON quote_submissions FOR SELECT TO authenticated
USING (true); 