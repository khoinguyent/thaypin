# Battery Images Table & Image Slider Component

## Database Table: `battery_images`

The `battery_images` table stores information about battery images used in the image slider component.

### Table Structure

| Field | Type | Description |
|-------|------|-------------|
| `id` | SERIAL | Primary key, auto-incrementing |
| `set_name` | VARCHAR(100) | Name of the image set (e.g., 'iphone-batteries') |
| `url` | TEXT | URL to the image or video file |
| `caption` | VARCHAR(255) | Display caption for the image |
| `alt_text` | VARCHAR(255) | Alt text for accessibility (optional) |
| `order_index` | INTEGER | Display order within the set (default: 0) |
| `is_active` | BOOLEAN | Whether the image is active (default: true) |
| `created_at` | TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | Last update timestamp |

### Additional Fields (Optional)

You can extend the table with these additional fields if needed:

- `file_type` - To distinguish between images and videos
- `file_size` - File size in bytes
- `dimensions` - Image dimensions (width x height)
- `tags` - JSON array of tags for categorization
- `category` - Category for grouping (e.g., 'iphone', 'ipad', 'macbook')

## Usage

### 1. Setup Database

Run the SQL script to create the table and insert sample data:

```bash
psql -d your_database -f scripts/05-create-battery-images-table.sql
```

### 2. Use the Component

```tsx
import BatteryImageSlider from "@/components/battery-image-slider"
import { getBatteryImagesBySet } from "@/lib/battery-images-actions"

// In your async component
const batteryImages = await getBatteryImagesBySet('iphone-batteries')

// Render the slider
<BatteryImageSlider 
  images={batteryImages} 
  autoPlayInterval={5000}
  showControls={true}
/>
```

### 3. Component Props

- `images`: Array of BatteryImage objects
- `autoPlayInterval`: Time between auto-advance (default: 4000ms)
- `showControls`: Whether to show navigation controls (default: true)

## Features

- **Auto-play**: Images automatically advance every 4 seconds (configurable)
- **Manual Navigation**: Previous/Next buttons and dot indicators
- **Play/Pause Control**: Toggle auto-play functionality
- **Responsive Design**: Works on all screen sizes
- **Accessibility**: Proper ARIA labels and alt text support
- **Caption Overlay**: Displays image captions over the images

## Adding New Images

To add new battery images:

1. Insert into the database:
```sql
INSERT INTO battery_images (set_name, url, caption, alt_text, order_index) 
VALUES ('iphone-batteries', 'https://example.com/image.jpg', 'iPhone 16 Battery', 'iPhone 16 battery replacement', 7);
```

2. The component will automatically load and display new images

## Image Requirements

- **Format**: JPG, PNG, WebP recommended
- **Aspect Ratio**: 16:9 (aspect-video) works best
- **Size**: Optimize for web (max 2MB recommended)
- **Quality**: High quality, clear images of iPhone batteries

## Future Enhancements

- Video support for battery replacement process
- Multiple image sets for different device categories
- Admin interface for managing images
- Image lazy loading for better performance
- Touch/swipe support for mobile devices
