"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { BlogPost } from "@/lib/supabase/client"

const SAMPLE_BLOG_POSTS: BlogPost[] = [
  {
    id: "sample-1",
    title: "Cách Kiểm Tra Tình Trạng Pin iPhone Của Bạn",
    slug: "cach-kiem-tra-tinh-trang-pin-iphone",
    excerpt: "Hướng dẫn chi tiết cách kiểm tra độ chai pin iPhone qua Settings và các ứng dụng chuyên dụng.",
    content: `# Cách Kiểm Tra Tình Trạng Pin iPhone Của Bạn

Pin iPhone là một trong những linh kiện quan trọng nhất quyết định hiệu suất và thời gian sử dụng của thiết bị. Việc kiểm tra tình trạng pin định kỳ sẽ giúp bạn biết khi nào cần thay pin mới.

## 1. Kiểm Tra Qua Settings

Cách đơn giản nhất là vào **Settings > Battery > Battery Health & Charging**. Tại đây bạn sẽ thấy:
- **Maximum Capacity**: Dung lượng pin hiện tại so với lúc mới
- **Peak Performance Capability**: Khả năng hoạt động tối đa

## 2. Các Dấu Hiệu Pin Chai

- Pin xuống nhanh bất thường
- Máy tự tắt khi còn pin
- Sạc chậm hoặc không sạc được
- Máy nóng khi sử dụng

## 3. Khi Nào Cần Thay Pin?

Apple khuyến nghị thay pin khi Maximum Capacity dưới 80%. Tại Thaypin.vn, chúng tôi sử dụng linh kiện chính hãng với bảo hành 12 tháng.

**Liên hệ ngay: 0123.456.789 để được tư vấn miễn phí!**`,
    category: "Hướng dẫn",
    featured: true,
    published: true,
    image_url: "/placeholder.svg?height=400&width=600",
    meta_description: "Hướng dẫn kiểm tra tình trạng pin iPhone qua Settings và nhận biết dấu hiệu pin chai",
    tags: ["pin iPhone", "kiểm tra pin", "battery health"],
    video_type: "url",
    video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    video_file_url: undefined,
    video_thumbnail: "/placeholder.svg?height=300&width=500",
    created_at: "2024-01-15T10:00:00Z",
    updated_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "sample-2",
    title: "10 Mẹo Kéo Dài Tuổi Thọ Pin iPhone",
    slug: "10-meo-keo-dai-tuoi-tho-pin-iphone",
    excerpt: "Những thói quen sử dụng đơn giản giúp pin iPhone bền hơn và kéo dài thời gian thay pin.",
    content: `# 10 Mẹo Kéo Dài Tuổi Thọ Pin iPhone

Việc chăm sóc pin iPhone đúng cách sẽ giúp kéo dài tuổi thọ và tiết kiệm chi phí thay pin. Dưới đây là 10 mẹo hiệu quả:

## 1. Tránh Sạc Qua Đêm
Sạc pin đến 100% và để máy cắm sạc cả đêm sẽ làm pin nóng và giảm tuổi thọ.

## 2. Sử dụng Optimized Battery Charging
Tính năng này học thói quen sạc của bạn và tự động điều chỉnh.

## 3. Tránh Nhiệt Độ Cực Đoan
- Không để iPhone dưới ánh nắng trực tiếp
- Tránh sử dụng trong môi trường quá lạnh

## 4. Sạc Pin Từ 20% - 80%
Đây là khoảng pin tối ưu, tránh để pin xuống 0% hoặc sạc đến 100% thường xuyên.

## 5. Tắt Background App Refresh
Vào Settings > General > Background App Refresh và tắt các ứng dụng không cần thiết.

**Cần thay pin iPhone? Liên hệ Thaypin.vn - Chuyên gia thay pin iPhone uy tín!**`,
    category: "Mẹo hay",
    featured: true,
    published: true,
    image_url: "/placeholder.svg?height=400&width=600",
    meta_description: "10 mẹo đơn giản giúp kéo dài tuổi thọ pin iPhone và tiết kiệm chi phí thay pin",
    tags: ["mẹo pin iPhone", "tiết kiệm pin", "chăm sóc iPhone"],
    video_type: "none",
    video_url: undefined,
    video_file_url: undefined,
    video_thumbnail: undefined,
    created_at: "2024-01-10T14:30:00Z",
    updated_at: "2024-01-10T14:30:00Z",
  },
  {
    id: "sample-3",
    title: "Nguyên Nhân Khiến Pin iPhone Chai Nhanh",
    slug: "nguyen-nhan-khien-pin-iphone-chai-nhanh",
    excerpt: "Tìm hiểu các nguyên nhân chính làm pin iPhone bị chai và cách phòng tránh hiệu quả.",
    content: `# Nguyên Nhân Khiến Pin iPhone Chai Nhanh

Pin iPhone chai là vấn đề phổ biến sau một thời gian sử dụng. Hiểu rõ nguyên nhân sẽ giúp bạn sử dụng iPhone bền hơn.

## 1. Chu Kỳ Sạc Không Đúng Cách
- Sạc pin từ 0% lên 100% thường xuyên
- Để pin xuống quá thấp trước khi sạc
- Sạc qua đêm thường xuyên

## 2. Nhiệt Độ Môi Trường
Pin lithium-ion rất nhạy cảm với nhiệt độ:
- Nhiệt độ cao (>35°C) làm pin chai nhanh
- Nhiệt độ thấp (<0°C) giảm hiệu suất tạm thời

## 3. Thói Quen Sử Dụng
- Chơi game nặng trong thời gian dài
- Sử dụng nhiều ứng dụng cùng lúc
- Bật sáng màn hình quá cao

## 4. Tuổi Thọ Tự Nhiên
Pin iPhone có tuổi thọ khoảng 500-1000 chu kỳ sạc (2-3 năm sử dụng bình thường).

**Thaypin.vn - Thay pin iPhone chính hãng, bảo hành 12 tháng!**`,
    category: "Kiến thức",
    featured: false,
    published: true,
    image_url: "/placeholder.svg?height=400&width=600",
    meta_description: "Các nguyên nhân chính khiến pin iPhone chai nhanh và cách phòng tránh",
    tags: ["pin chai", "nguyên nhân", "iPhone"],
    video_type: "none",
    video_url: undefined,
    video_file_url: undefined,
    video_thumbnail: undefined,
    created_at: "2024-01-05T09:15:00Z",
    updated_at: "2024-01-05T09:15:00Z",
  },
  {
    id: "sample-4",
    title: "So Sánh Pin Zin Và Pin Thay Thế iPhone",
    slug: "so-sanh-pin-zin-va-pin-thay-the-iphone",
    excerpt: "Phân tích ưu nhược điểm giữa pin zin và pin thay thế để đưa ra lựa chọn phù hợp.",
    content: `# So Sánh Pin Zin Và Pin Thay Thế iPhone

Khi cần thay pin iPhone, bạn sẽ có 2 lựa chọn chính: pin zin (chính hãng) và pin thay thế. Mỗi loại đều có ưu nhược điểm riêng.

## Pin Zin (Chính Hãng)

### Ưu điểm:
- Chất lượng cao nhất, đúng tiêu chuẩn Apple
- Tuổi thọ lâu dài (2-3 năm)
- Tương thích hoàn hảo với iOS
- Bảo hành chính thức

### Nhược điểm:
- Giá thành cao hơn
- Khó tìm nguồn cung uy tín

## Pin Thay Thế Chất Lượng Cao

### Ưu điểm:
- Giá thành hợp lý hơn
- Chất lượng tốt nếu chọn đúng nhà cung cấp
- Dễ tìm mua

### Nhược điểm:
- Chất lượng không đồng đều
- Tuổi thọ có thể thấp hơn pin zin
- Cần chọn cửa hàng uy tín

## Khuyến Nghị Của Thaypin.vn

Chúng tôi khuyên dùng linh kiện chính hãng hoặc pin thay thế chất lượng cao từ các nhà sản xuất uy tín. Tại thaypin.vn, chúng tôi chỉ sử dụng pin đạt chuẩn với bảo hành 12 tháng.

**Liên hệ 0123.456.789 để được tư vấn loại pin phù hợp!**`,
    category: "So sánh",
    featured: false,
    published: true,
    image_url: "/placeholder.svg?height=400&width=600",
    meta_description: "So sánh chi tiết pin zin và pin thay thế iPhone để lựa chọn phù hợp",
    tags: ["pin zin", "pin thay thế", "so sánh"],
    video_type: "none",
    video_url: undefined,
    video_file_url: undefined,
    video_thumbnail: undefined,
    created_at: "2024-01-01T16:45:00Z",
    updated_at: "2024-01-01T16:45:00Z",
  },
]

async function handleVideoUpload(videoFile: File): Promise<string | null> {
  try {
    // For now, return a placeholder URL
    // In production, this would upload to Vercel Blob or similar service
    console.log("[v0] Video file upload:", videoFile.name, videoFile.size)

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return a placeholder URL - in production this would be the actual uploaded file URL
    return `/uploads/videos/${videoFile.name}`
  } catch (error) {
    console.error("Error uploading video:", error)
    return null
  }
}

function validateVideoUrl(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const hostname = urlObj.hostname.toLowerCase()

    // Support YouTube, Vimeo, and other common video platforms
    const supportedPlatforms = [
      "youtube.com",
      "www.youtube.com",
      "youtu.be",
      "vimeo.com",
      "www.vimeo.com",
      "player.vimeo.com",
    ]

    return (
      supportedPlatforms.some((platform) => hostname.includes(platform)) || url.match(/\.(mp4|webm|ogg|mov)$/i) !== null
    )
  } catch {
    return false
  }
}

async function isDatabaseAvailable(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { error } = await supabase.from("blog_posts").select("id").limit(1)
    return !error || !error.message.includes("Could not find the table")
  } catch {
    return false
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    console.log("[v0] Database not available, returning sample blog posts")
    return SAMPLE_BLOG_POSTS
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blog posts:", error.message)
    console.error("Error details:", error)
    return SAMPLE_BLOG_POSTS // Return sample data on error
  }

  return data || []
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    console.log("[v0] Database not available, searching sample posts")
    return SAMPLE_BLOG_POSTS.find((post) => post.slug === slug) || null
  }

  const supabase = await createClient()

  const { data, error } = await supabase.from("blog_posts").select("*").eq("slug", slug).eq("published", true).single()

  if (error) {
    console.error("Error fetching blog post:", error.message)
    return SAMPLE_BLOG_POSTS.find((post) => post.slug === slug) || null // Fallback to sample data
  }

  return data
}

export async function getFeaturedPosts(): Promise<BlogPost[]> {
  const dbAvailable = await isDatabaseAvailable()
  if (!dbAvailable) {
    console.log("[v0] Database not available, returning sample featured posts")
    return SAMPLE_BLOG_POSTS.filter((post) => post.featured)
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(3)

  if (error) {
    console.error("Error fetching featured posts:", error)
    return SAMPLE_BLOG_POSTS.filter((post) => post.featured) // Return sample featured posts
  }

  return data || []
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .eq("category", category)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching posts by category:", error)
    return []
  }

  return data || []
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .or(`title.ilike.%${query}%,content.ilike.%${query}%,excerpt.ilike.%${query}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching posts:", error)
    return []
  }

  return data || []
}

export async function createBlogPost(formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const featured = formData.get("featured") === "on"
  const imageUrl = formData.get("image_url") as string
  const metaDescription = formData.get("meta_description") as string
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())

  const videoType = (formData.get("video_type") as string) || "none"
  const videoUrl = formData.get("video_url") as string
  const videoFile = formData.get("video_file") as File
  const videoThumbnail = formData.get("video_thumbnail") as string

  let processedVideoUrl: string | null = null
  let processedVideoFileUrl: string | null = null

  // Process video based on type
  if (videoType === "url" && videoUrl) {
    if (validateVideoUrl(videoUrl)) {
      processedVideoUrl = videoUrl
    } else {
      throw new Error("URL video không hợp lệ")
    }
  } else if (videoType === "upload" && videoFile && videoFile.size > 0) {
    // Validate file size (max 100MB)
    if (videoFile.size > 100 * 1024 * 1024) {
      throw new Error("File video quá lớn (tối đa 100MB)")
    }

    // Validate file type
    if (!videoFile.type.startsWith("video/")) {
      throw new Error("File không phải là video")
    }

    processedVideoFileUrl = await handleVideoUpload(videoFile)
    if (!processedVideoFileUrl) {
      throw new Error("Không thể tải lên video")
    }
  }

  const { error } = await supabase.from("blog_posts").insert({
    title,
    slug,
    excerpt,
    content,
    category,
    featured,
    image_url: imageUrl || null,
    meta_description: metaDescription || null,
    tags,
    video_type: videoType,
    video_url: processedVideoUrl,
    video_file_url: processedVideoFileUrl,
    video_thumbnail: videoThumbnail || null,
    published: true,
  })

  if (error) {
    console.error("Error creating blog post:", error)
    throw new Error("Failed to create blog post")
  }

  revalidatePath("/blog")
  revalidatePath("/admin")
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await createClient()

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const featured = formData.get("featured") === "on"
  const imageUrl = formData.get("image_url") as string
  const metaDescription = formData.get("meta_description") as string
  const tags = (formData.get("tags") as string).split(",").map((tag) => tag.trim())

  const videoType = (formData.get("video_type") as string) || "none"
  const videoUrl = formData.get("video_url") as string
  const videoFile = formData.get("video_file") as File
  const videoThumbnail = formData.get("video_thumbnail") as string

  let processedVideoUrl: string | null = null
  let processedVideoFileUrl: string | null = null

  // Process video based on type
  if (videoType === "url" && videoUrl) {
    if (validateVideoUrl(videoUrl)) {
      processedVideoUrl = videoUrl
    } else {
      throw new Error("URL video không hợp lệ")
    }
  } else if (videoType === "upload" && videoFile && videoFile.size > 0) {
    // Validate file size (max 100MB)
    if (videoFile.size > 100 * 1024 * 1024) {
      throw new Error("File video quá lớn (tối đa 100MB)")
    }

    // Validate file type
    if (!videoFile.type.startsWith("video/")) {
      throw new Error("File không phải là video")
    }

    processedVideoFileUrl = await handleVideoUpload(videoFile)
    if (!processedVideoFileUrl) {
      throw new Error("Không thể tải lên video")
    }
  }

  const updateData: {
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    featured: boolean
    image_url: string | null
    meta_description: string | null
    tags: string[]
    video_type: string
    video_thumbnail: string | null
    video_url?: string | null
    video_file_url?: string | null
  } = {
    title,
    slug,
    excerpt,
    content,
    category,
    featured,
    image_url: imageUrl || null,
    meta_description: metaDescription || null,
    tags,
    video_type: videoType,
    video_thumbnail: videoThumbnail || null,
  }

  // Only update video fields if they're being changed
  if (videoType === "url") {
    updateData.video_url = processedVideoUrl
    updateData.video_file_url = null
  } else if (videoType === "upload") {
    updateData.video_url = null
    updateData.video_file_url = processedVideoFileUrl
  } else {
    updateData.video_url = null
    updateData.video_file_url = null
  }

  const { error } = await supabase.from("blog_posts").update(updateData).eq("id", id)

  if (error) {
    console.error("Error updating blog post:", error)
    throw new Error("Failed to update blog post")
  }

  revalidatePath("/blog")
  revalidatePath("/admin")
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()

  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog post:", error)
    throw new Error("Failed to delete blog post")
  }

  revalidatePath("/blog")
  revalidatePath("/admin")
}

export const getBlogPostBySlug = getBlogPost
