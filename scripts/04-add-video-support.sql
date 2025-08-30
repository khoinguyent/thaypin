-- Add video support to blog_posts table
ALTER TABLE blog_posts 
ADD COLUMN IF NOT EXISTS video_url TEXT,
ADD COLUMN IF NOT EXISTS video_file_url TEXT,
ADD COLUMN IF NOT EXISTS video_type TEXT CHECK (video_type IN ('url', 'upload', 'none')) DEFAULT 'none',
ADD COLUMN IF NOT EXISTS video_thumbnail TEXT;

-- Create an index on video_type for filtering posts with videos
CREATE INDEX IF NOT EXISTS idx_blog_posts_video_type ON blog_posts(video_type);

-- Add a constraint to ensure only one video source is used
ALTER TABLE blog_posts 
ADD CONSTRAINT check_video_source 
CHECK (
  (video_type = 'none' AND video_url IS NULL AND video_file_url IS NULL) OR
  (video_type = 'url' AND video_url IS NOT NULL AND video_file_url IS NULL) OR
  (video_type = 'upload' AND video_file_url IS NOT NULL AND video_url IS NULL)
);

-- Update existing posts to have video_type = 'none'
UPDATE blog_posts SET video_type = 'none' WHERE video_type IS NULL;
