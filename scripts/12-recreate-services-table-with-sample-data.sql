-- Drop and recreate services table with proper columns for new design
-- This script completely rebuilds the services table with the new structure

-- Drop existing services table and related objects
DROP TABLE IF EXISTS services CASCADE;

-- Create services table with new structure
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  icon VARCHAR(100) NOT NULL DEFAULT 'Battery',
  price VARCHAR(255) NOT NULL DEFAULT 'Từ 500.000₫',
  description TEXT NOT NULL DEFAULT '',
  options TEXT[] NOT NULL DEFAULT '{}',
  highlights TEXT[] NOT NULL DEFAULT '{}',
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
  button_text VARCHAR(255) NOT NULL DEFAULT 'Đặt lịch ngay',
  is_active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add constraints to ensure data quality
ALTER TABLE services 
ADD CONSTRAINT chk_options_max_3 CHECK (array_length(options, 1) <= 3),
ADD CONSTRAINT chk_highlights_max_4 CHECK (array_length(highlights, 1) <= 4),
ADD CONSTRAINT chk_options_not_empty CHECK (array_length(options, 1) > 0),
ADD CONSTRAINT chk_highlights_not_empty CHECK (array_length(highlights, 1) > 0);

-- Create indexes for better performance
CREATE INDEX idx_services_active_order ON services(is_active, display_order);
CREATE INDEX idx_services_icon ON services(icon);
CREATE INDEX idx_services_price ON services(price);

-- Enable RLS (Row Level Security)
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (is_active = true);

-- Create policies for admin access
CREATE POLICY "Admins can manage services" ON services
  FOR ALL USING (true);

-- Insert sample data based on the design
INSERT INTO services (
  title, 
  icon, 
  price, 
  description, 
  options, 
  highlights, 
  header_tag, 
  price_min, 
  price_max, 
  applied_for, 
  button_text, 
  display_order
) VALUES 
-- 1. iPhone Battery Replacement (Thay Pin iPhone)
(
  'Thay Pin iPhone',
  'Battery',
  'Từ 500.000₫',
  'Thay pin chính hãng cho tất cả các dòng iPhone từ iPhone 6 đến iPhone 15 Pro Max',
  ARRAY['30 phút', '12 tháng bảo hành', 'Chất lượng đảm bảo'],
  ARRAY[
    'Linh kiện chính hãng',
    'Bảo hành 12 tháng', 
    'Thay trong 30 phút',
    'Kiểm tra miễn phí trước khi thay'
  ],
  'Phổ biến nhất',
  500000,
  1200000,
  ARRAY['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 13', 'iPhone 13 mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 12', 'iPhone 11', 'iPhone XS', 'iPhone X', 'iPhone 8', 'iPhone 7'],
  'Đặt lịch ngay',
  1
),

-- 2. Battery Check (Kiểm Tra Pin)
(
  'Kiểm Tra Pin',
  'Zap',
  'Miễn phí',
  'Kiểm tra tình trạng pin iPhone miễn phí, đánh giá độ chai pin và khả năng hoạt động',
  ARRAY['10 phút', 'Không áp dụng', 'Chất lượng đảm bảo'],
  ARRAY[
    'Kiểm tra hoàn toàn miễn phí',
    'Báo cáo chi tiết về tình trạng pin',
    'Tư vấn chuyên nghiệp',
    'Đánh giá độ chai pin'
  ],
  NULL,
  0,
  0,
  ARRAY['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 13', 'iPhone 13 mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 12', 'iPhone 11', 'iPhone XS', 'iPhone X', 'iPhone 8', 'iPhone 7'],
  'Đặt lịch ngay',
  2
),

-- 3. Battery Maintenance (Bảo Trì Pin)
(
  'Bảo Trì Pin',
  'Settings',
  '200.000₫',
  'Dịch vụ bảo trì và tối ưu hóa pin iPhone để kéo dài tuổi thọ pin',
  ARRAY['45 phút', '3 tháng', 'Chất lượng đảm bảo'],
  ARRAY[
    'Tối ưu hóa hiệu suất pin',
    'Làm sạch cổng sạc',
    'Kiểm tra toàn diện hệ thống',
    'Cài đặt tối ưu'
  ],
  NULL,
  200000,
  200000,
  ARRAY['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 13', 'iPhone 13 mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 12', 'iPhone 11', 'iPhone XS', 'iPhone X', 'iPhone 8', 'iPhone 7'],
  'Đặt lịch ngay',
  3
),

-- 4. General Repair (Sửa Chữa Tổng Hợp)
(
  'Sửa Chữa Tổng Hợp',
  'Smartphone',
  'Từ 200.000₫',
  'Dịch vụ sửa chữa tổng hợp iPhone bao gồm ép kính, ép cảm ứng, sửa Face ID và thay kính lưng',
  ARRAY['1-2 giờ', '6 tháng', 'Chất lượng đảm bảo'],
  ARRAY[
    'Ép kính, ép cảm ứng',
    'Sửa Face ID, sửa camera',
    'Thay kính lưng',
    'Thay thế linh kiện chính hãng'
  ],
  NULL,
  200000,
  2000000,
  ARRAY['iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max', 'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max', 'iPhone 13', 'iPhone 13 mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone 12', 'iPhone 11', 'iPhone XS', 'iPhone X', 'iPhone 8', 'iPhone 7'],
  'Đặt lịch ngay',
  4
);

-- Update the updated_at timestamp for all records
UPDATE services SET updated_at = NOW();

-- Verify the data
SELECT 
  id,
  title,
  icon,
  price,
  description,
  options,
  highlights,
  header_tag,
  display_order
FROM services 
ORDER BY display_order;
