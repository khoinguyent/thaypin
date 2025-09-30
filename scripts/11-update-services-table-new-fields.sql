-- Update services table to add new fields for the updated service component
-- This migration adds the new fields: icon, price, description, options, highlights

-- Add new columns to services table
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS icon VARCHAR(100) NOT NULL DEFAULT 'Battery',
ADD COLUMN IF NOT EXISTS price VARCHAR(255) NOT NULL DEFAULT 'Từ 500.000₫',
ADD COLUMN IF NOT EXISTS description TEXT NOT NULL DEFAULT '',
ADD COLUMN IF NOT EXISTS options TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS highlights TEXT[] NOT NULL DEFAULT '{}';

-- Update existing records with default values that match the new design
UPDATE services SET 
  icon = CASE 
    WHEN title LIKE '%iPhone 15%' THEN 'Battery'
    WHEN title LIKE '%iPhone 14%' THEN 'Battery'
    WHEN title LIKE '%iPhone 13%' THEN 'Battery'
    WHEN title LIKE '%iPhone 12%' THEN 'Battery'
    ELSE 'Battery'
  END,
  price = CASE 
    WHEN title LIKE '%iPhone 15%' THEN 'Từ 900.000₫'
    WHEN title LIKE '%iPhone 14%' THEN 'Từ 800.000₫'
    WHEN title LIKE '%iPhone 13%' THEN 'Từ 700.000₫'
    WHEN title LIKE '%iPhone 12%' THEN 'Từ 500.000₫'
    ELSE 'Từ 500.000₫'
  END,
  description = CASE 
    WHEN title LIKE '%iPhone 15%' THEN 'Thay pin chính hãng cho iPhone 15 Series với công nghệ tiên tiến nhất'
    WHEN title LIKE '%iPhone 14%' THEN 'Thay pin chính hãng cho iPhone 14 Series với hiệu suất cao'
    WHEN title LIKE '%iPhone 13%' THEN 'Thay pin chính hãng cho iPhone 13 Series với chất lượng đảm bảo'
    WHEN title LIKE '%iPhone 12%' THEN 'Thay pin chính hãng cho iPhone 12 Series và các dòng iPhone cũ hơn'
    ELSE 'Thay pin chính hãng cho tất cả các dòng iPhone'
  END,
  options = ARRAY['30 phút', '12 tháng bảo hành', 'Chất lượng đảm bảo'],
  highlights = ARRAY['Linh kiện chính hãng', 'Bảo hành 12 tháng', 'Thay trong 30 phút', 'Kiểm tra miễn phí']
WHERE icon = 'Battery' AND price = 'Từ 500.000₫' AND description = '' AND options = '{}' AND highlights = '{}';

-- Add constraints to ensure data quality
ALTER TABLE services 
ADD CONSTRAINT chk_options_max_3 CHECK (array_length(options, 1) <= 3),
ADD CONSTRAINT chk_highlights_max_4 CHECK (array_length(highlights, 1) <= 4),
ADD CONSTRAINT chk_options_not_empty CHECK (array_length(options, 1) > 0),
ADD CONSTRAINT chk_highlights_not_empty CHECK (array_length(highlights, 1) > 0);

-- Create indexes for better performance on new columns
CREATE INDEX IF NOT EXISTS idx_services_icon ON services(icon);
CREATE INDEX IF NOT EXISTS idx_services_price ON services(price);

-- Update the updated_at timestamp for all records
UPDATE services SET updated_at = NOW();
