-- Add visible column to battery_images table
ALTER TABLE battery_images ADD COLUMN IF NOT EXISTS visible BOOLEAN DEFAULT true;

-- Update existing records to be visible by default
UPDATE battery_images SET visible = true WHERE visible IS NULL;

-- Create index for better performance on visible column
CREATE INDEX IF NOT EXISTS idx_battery_images_visible ON battery_images(visible);

-- Update the RLS policy to only show visible images
DROP POLICY IF EXISTS "Allow public read access to battery_images" ON battery_images;
CREATE POLICY "Allow public read access to visible battery_images" ON battery_images
    FOR SELECT USING (visible = true AND is_active = true);
