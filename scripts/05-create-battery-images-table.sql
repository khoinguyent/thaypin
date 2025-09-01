-- Create table for battery images used in image slider
CREATE TABLE IF NOT EXISTS battery_images (
    id SERIAL PRIMARY KEY,
    set_name VARCHAR(100) NOT NULL,
    url TEXT NOT NULL,
    caption VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_battery_images_set_name ON battery_images(set_name);
CREATE INDEX IF NOT EXISTS idx_battery_images_order ON battery_images(order_index);

-- Insert sample data for iPhone battery images
INSERT INTO battery_images (set_name, url, caption, alt_text, order_index) VALUES
('battery-images-set', 'https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/iphone-15-battery.jpg', 'iPhone 15 Series - Pin Li-ion 3.87V 3349mAh', 'iPhone 15 battery replacement', 1),
('battery-images-set', 'https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/iphone-14-battery.jpg', 'iPhone 14 Series - Pin Li-ion 3.87V 3247mAh', 'iPhone 14 battery replacement', 2),
('battery-images-set', 'https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/iphone-13-battery.jpg', 'iPhone 13 Series - Pin Li-ion 3.87V 3240mAh', 'iPhone 13 battery replacement', 3),
('battery-images-set', 'https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/iphone-12-battery.jpg', 'iPhone 12 Series - Pin Li-ion 3.87V 2815mAh', 'iPhone 12 battery replacement', 4),
('battery-images-set', 'https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/iphone-11-battery.jpg', 'iPhone 11 Series - Pin Li-ion 3.87V 3110mAh', 'iPhone 11 battery replacement', 5),
('battery-images-set', 'https://pub-2c329f0e1a104718865ba6bcce019dec.r2.dev/iphone-xs-battery.jpg', 'iPhone XS/XR Series - Pin Li-ion 3.87V 2658mAh', 'iPhone XS battery replacement', 6);

-- Enable Row Level Security
ALTER TABLE battery_images ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access to battery_images" ON battery_images
    FOR SELECT USING (true);
