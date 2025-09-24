-- Create services table for battery replacement services
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  header_tag VARCHAR(100),
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  applied_for TEXT[] NOT NULL DEFAULT '{}',
  option_1 VARCHAR(255) NOT NULL DEFAULT 'Linh kiện chính hãng',
  option_1_default BOOLEAN NOT NULL DEFAULT true,
  option_2 VARCHAR(255) NOT NULL DEFAULT 'Bảo hành 12 tháng',
  option_2_default BOOLEAN NOT NULL DEFAULT true,
  option_3 VARCHAR(255) NOT NULL DEFAULT 'Thay trong 30 phút',
  option_3_default BOOLEAN NOT NULL DEFAULT true,
  button_text VARCHAR(255) NOT NULL DEFAULT 'Đặt lịch thay pin',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_services_active_order ON services(is_active, display_order);

-- Insert sample data
INSERT INTO services (title, header_tag, price_min, price_max, applied_for, display_order) VALUES
('iPhone 15 Series', 'Phổ biến', 900000, 1200000, ARRAY['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max'], 1),
('iPhone 14 Series', 'Phổ biến', 800000, 1000000, ARRAY['iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max'], 2),
('iPhone 13 Series', NULL, 700000, 850000, ARRAY['iPhone 13 mini', 'iPhone 13', 'iPhone 13 Pro', 'iPhone 13 Pro Max'], 3),
('iPhone 12 Series & Cũ hơn', NULL, 500000, 650000, ARRAY['iPhone 12', 'iPhone 11', 'iPhone XS', 'iPhone X', 'iPhone 8', 'iPhone 7'], 4);

-- Enable RLS (Row Level Security)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (is_active = true);

-- Create policies for admin access (you'll need to adjust based on your auth system)
CREATE POLICY "Admins can manage services" ON services
  FOR ALL USING (true); -- Adjust this based on your admin authentication
