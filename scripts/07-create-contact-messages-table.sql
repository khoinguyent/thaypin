-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  service VARCHAR(100),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'read', 'replied', 'closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow public to insert messages (for contact form)
CREATE POLICY "Anyone can insert contact messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all messages (for admin)
CREATE POLICY "Authenticated users can read contact messages" ON contact_messages
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update messages (for admin)
CREATE POLICY "Authenticated users can update contact messages" ON contact_messages
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_contact_messages_updated_at_trigger
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_messages_updated_at();

-- Insert sample data for testing
INSERT INTO contact_messages (name, phone, email, service, message, status) VALUES
('Nguyễn Văn A', '0901234567', 'nguyenvana@email.com', 'thay-pin', 'iPhone 12 của tôi pin xuống rất nhanh, cần thay pin không?', 'pending'),
('Trần Thị B', '0987654321', 'tranthib@email.com', 'kiem-tra', 'Máy iPhone 13 của tôi bị nóng khi sạc, có thể kiểm tra giúp không?', 'read'),
('Lê Văn C', '0912345678', NULL, 'sua-chua', 'iPhone 11 bị chai pin, cần tư vấn về giá thay pin', 'replied');
