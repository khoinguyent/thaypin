"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/toast-provider"
import { createBlogPost } from "@/lib/blog-actions"

import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus, 
  X,
  FileText,
  Image as ImageIcon,
  Video as VideoIcon,
  Tag,
  User
} from "lucide-react"
import Link from "next/link"

interface BlogPostForm {
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  featured: boolean
  is_published: boolean
  image_url: string
  video_url: string
  video_type: string
  author: string
}

export default function CreateBlogPostPage() {
  const [formData, setFormData] = useState<BlogPostForm>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "Hướng dẫn",
    tags: [],
    featured: false,
    is_published: false,
    image_url: "",
    video_url: "",
    video_type: "none",
    author: "thaypin.vn"
  })
  const { showSuccess, showError } = useToast()
  
  const [newTag, setNewTag] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imageUploadStatus, setImageUploadStatus] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [videoUploadStatus, setVideoUploadStatus] = useState("")
  const [videoUrl, setVideoUrl] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }

    // Auto-generate slug from title
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[đĐ]/g, "d")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()
      
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, router])

  const handleInputChange = (field: keyof BlogPostForm, value: string | boolean | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Client-side validation
    if (!file.type.startsWith('image/')) {
      setImageUploadStatus("Lỗi: Chỉ chấp nhận file hình ảnh")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setImageUploadStatus("Lỗi: File quá lớn (tối đa 5MB)")
      return
    }

    setImageUploadStatus("Đang tải lên...")

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setImageUrl(data.url)
        setFormData(prev => ({ ...prev, image_url: data.url }))
        setImageUploadStatus("Tải lên thành công!")
      } else {
        const error = await response.json()
        setImageUploadStatus(`Lỗi: ${error.error}`)
      }
    } catch {
      setImageUploadStatus("Lỗi kết nối. Vui lòng thử lại.")
    }
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Client-side validation
    if (!file.type.startsWith('video/')) {
      setVideoUploadStatus("Lỗi: Chỉ chấp nhận file video")
      return
    }

    if (file.size > 50 * 1024 * 1024) {
      setVideoUploadStatus("Lỗi: File quá lớn (tối đa 50MB)")
      return
    }

    setVideoUploadStatus("Đang tải lên...")

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setVideoUrl(data.url)
        setFormData(prev => ({ 
          ...prev, 
          video_url: data.url,
          video_type: "upload"
        }))
        setVideoUploadStatus("Tải lên thành công!")
      } else {
        const error = await response.json()
        setVideoUploadStatus(`Lỗi: ${error.error}`)
      }
    } catch {
      setVideoUploadStatus("Lỗi kết nối. Vui lòng thử lại.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.content) {
        showError("Vui lòng điền đầy đủ tiêu đề và nội dung bài viết")
        return
      }

      // Create FormData for the API call
      const submitFormData = new FormData()
      submitFormData.set("title", formData.title)
      submitFormData.set("slug", formData.slug)
      submitFormData.set("excerpt", formData.excerpt)
      submitFormData.set("content", formData.content)
      submitFormData.set("category", formData.category)
      submitFormData.set("tags", formData.tags.join(","))
      submitFormData.set("featured", formData.featured ? "on" : "off")
      submitFormData.set("image_url", formData.image_url)
      submitFormData.set("video_url", formData.video_url)
      submitFormData.set("video_type", formData.video_type)
      submitFormData.set("meta_description", formData.excerpt) // Use excerpt as meta description

      // Call the createBlogPost function
      await createBlogPost(submitFormData)
      
      // Show success message and redirect
      showSuccess("Tạo bài viết thành công!")
      router.push("/admin/blog")
      
    } catch (error) {
      console.error("Error creating blog post:", error)
      showError("Có lỗi xảy ra khi tạo bài viết", "Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const categories = [
    "Hướng dẫn",
    "Kiến thức", 
    "So sánh",
    "Tin tức",
    "Đánh giá",
    "Mẹo và thủ thuật"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Tạo bài viết mới</h1>
                <p className="text-sm text-muted-foreground">
                  Tạo và xuất bản bài viết blog mới
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/admin/blog">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại danh sách
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>Thông tin cơ bản</span>
                  </CardTitle>
                  <CardDescription>
                    Điền thông tin chính của bài viết
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tiêu đề bài viết *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Nhập tiêu đề bài viết..."
                      required
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="slug">URL slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => handleInputChange("slug", e.target.value)}
                      placeholder="URL tự động tạo từ tiêu đề..."
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      URL sẽ là: /blog/{formData.slug || "ten-bai-viet"}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="excerpt">Tóm tắt</Label>
                    <Textarea
                      id="excerpt"
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange("excerpt", e.target.value)}
                      placeholder="Mô tả ngắn gọn về bài viết..."
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      {formData.excerpt.length}/200 ký tự
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="content">Nội dung bài viết *</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => handleInputChange("content", e.target.value)}
                      placeholder="Viết nội dung bài viết ở đây. Hỗ trợ Markdown formatting."
                      rows={20}
                      required
                      className="font-mono"
                    />
                    <p className="text-xs text-muted-foreground">
                      Hỗ trợ Markdown: **bold**, *italic*, # heading, - list, [link](url)
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Image Upload */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-primary" />
                    <span>Hình ảnh bài viết</span>
                  </CardTitle>
                  <CardDescription>
                    Tải lên hình ảnh đại diện cho bài viết
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Chọn hình ảnh</Label>
                    <div className="flex items-center space-x-4">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image')?.click()}
                      >
                        <ImageIcon className="w-4 h-4 mr-2" />
                        Chọn file
                      </Button>
                    </div>
                    {imageUploadStatus && (
                      <p className={`text-sm ${
                        imageUploadStatus.includes("Lỗi") 
                          ? "text-red-600" 
                          : imageUploadStatus.includes("thành công") 
                            ? "text-green-600" 
                            : "text-blue-600"
                      }`}>
                        {imageUploadStatus}
                      </p>
                    )}
                  </div>

                  {imageUrl && (
                    <div className="space-y-2">
                      <Label>Hình ảnh đã tải lên</Label>
                      <div className="relative w-48 h-32 rounded-lg overflow-hidden border">
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Input
                        value={imageUrl}
                        onChange={(e) => handleInputChange("image_url", e.target.value)}
                        placeholder="URL hình ảnh..."
                        className="text-sm"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Video Upload */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <VideoIcon className="w-5 h-5 text-primary" />
                    <span>Video bài viết</span>
                  </CardTitle>
                  <CardDescription>
                    Tải lên video hoặc nhập URL video cho bài viết
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="video-type">Loại video</Label>
                    <select
                      id="video-type"
                      value={formData.video_type}
                      onChange={(e) => handleInputChange("video_type", e.target.value)}
                      className="w-full p-2 border border-border rounded-md bg-background"
                    >
                      <option value="none">Không có video</option>
                      <option value="upload">Tải lên video</option>
                      <option value="youtube">YouTube URL</option>
                      <option value="url">URL video khác</option>
                    </select>
                  </div>

                  {formData.video_type === "upload" && (
                    <div className="space-y-2">
                      <Label htmlFor="video">Chọn video</Label>
                      <div className="flex items-center space-x-4">
                        <Input
                          id="video"
                          type="file"
                          accept="video/*"
                          onChange={handleVideoUpload}
                          className="flex-1"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('video')?.click()}
                        >
                          <VideoIcon className="w-4 h-4 mr-2" />
                          Chọn file
                        </Button>
                      </div>
                      {videoUploadStatus && (
                        <p className={`text-sm ${
                          videoUploadStatus.includes("Lỗi") 
                            ? "text-red-600" 
                            : videoUploadStatus.includes("thành công") 
                              ? "text-green-600" 
                              : "text-blue-600"
                        }`}>
                          {videoUploadStatus}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Hỗ trợ: MP4, WebM, OGG (tối đa 50MB)
                      </p>
                    </div>
                  )}

                  {(formData.video_type === "youtube" || formData.video_type === "url") && (
                    <div className="space-y-2">
                      <Label htmlFor="video-url">URL video</Label>
                      <Input
                        id="video-url"
                        value={formData.video_url}
                        onChange={(e) => handleInputChange("video_url", e.target.value)}
                        placeholder={
                          formData.video_type === "youtube" 
                            ? "https://www.youtube.com/watch?v=..." 
                            : "https://example.com/video.mp4"
                        }
                        className="text-sm"
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.video_type === "youtube" 
                          ? "Nhập URL YouTube (watch hoặc embed)" 
                          : "Nhập URL video trực tiếp"}
                      </p>
                    </div>
                  )}

                  {videoUrl && (
                    <div className="space-y-2">
                      <Label>Video đã tải lên</Label>
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border bg-gray-100">
                        <video
                          src={videoUrl}
                          controls
                          className="w-full h-full object-contain"
                        >
                          Trình duyệt không hỗ trợ video.
                        </video>
                      </div>
                      <Input
                        value={videoUrl}
                        onChange={(e) => handleInputChange("video_url", e.target.value)}
                        placeholder="URL video..."
                        className="text-sm"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Publishing Options */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-primary" />
                    <span>Tùy chọn xuất bản</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="is_published">Xuất bản ngay</Label>
                    <Switch
                      id="is_published"
                      checked={formData.is_published}
                      onCheckedChange={(checked) => handleInputChange("is_published", checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Bài viết nổi bật</Label>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleInputChange("featured", checked)}
                    />
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                          Đang tạo...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Tạo bài viết
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Category and Tags */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Tag className="w-5 h-5 text-primary" />
                    <span>Phân loại</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full p-2 border border-border rounded-md bg-background"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Thêm tag..."
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={addTag}
                        disabled={!newTag.trim()}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {formData.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-sm">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-2 hover:text-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Author Information */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-primary" />
                    <span>Thông tin tác giả</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="author">Tác giả</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => handleInputChange("author", e.target.value)}
                      placeholder="Tên tác giả..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
