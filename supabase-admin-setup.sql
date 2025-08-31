-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  full_name VARCHAR(100),
  role VARCHAR(20) DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on username for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_username ON admin_users(username);

-- Insert default admin user (password: thaypinadmin@)
-- Note: This password hash should be generated using bcrypt with salt rounds
-- For now, we'll use a placeholder that you'll need to replace with the actual hash
INSERT INTO admin_users (username, password_hash, email, full_name, role) 
VALUES (
  'admin', 
  '$2b$10$placeholder_hash_here_replace_with_actual_bcrypt_hash', 
  'admin@thaypin.vn', 
  'Administrator', 
  'admin'
) ON CONFLICT (username) DO NOTHING;

-- Create RLS policies (Row Level Security)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only read their own data
CREATE POLICY "Users can view own profile" ON admin_users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Policy: Only authenticated users can update their own data
CREATE POLICY "Users can update own profile" ON admin_users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Note: For admin authentication, you might want to disable RLS or create specific policies
-- depending on your security requirements
