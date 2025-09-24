"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/toast-provider"
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus, 
  X,
  FileText,
  Image as ImageIcon,
  Tag,
  User,
  Trash2
} from "lucide-react"
import Link from "next/link"
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/lib/blog-actions"

interface BlogPostForm {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  featured: boolean
  is_published: boolean
  image_url: string
  author: string
  created_at: string
  updated_at: string
}

export default function EditBlogPostPage() {
  const [formData, setFormData] = useState<BlogPostForm | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [imageUploadStatus, setImageUploadStatus] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string
  const { showSuccess, showError } = useToast()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }

    // Load blog post data
    loadBlogPost()
  }, [postId, router])

  const loadBlogPost = async () => {
    try {
      const blogPost = await getBlogPostById(postId)
      
      if (!blogPost) {
        console.error("Không tìm thấy bài viết với ID:", postId)
        setIsLoading(false)
        return
      }

      // Transform the blog post data to match the form interface
      const formData: BlogPostForm = {
        id: blogPost.id,
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt || "",
        content: blogPost.content,
        category: blogPost.category,
        tags: Array.isArray(blogPost.tags) ? blogPost.tags : 
              typeof blogPost.tags === 'string' ? 
              (blogPost.tags as string).split(",").filter(tag => tag.trim()) : [],
        featured: blogPost.featured || false,
        is_published: blogPost.published || false,
        image_url: blogPost.image_url || "",
        author: "thaypin.vn", // Default author
        created_at: blogPost.created_at,
        updated_at: blogPost.updated_at
      }

      setFormData(formData)
      setImageUrl(formData.image_url)
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: keyof BlogPostForm, value: string | boolean | string[]) => {
    if (!formData) return
    
    setFormData(prev => {
      if (!prev) return prev
      return { ...prev, [field]: value }
    })
  }

  const addTag = () => {
    if (!formData || !newTag.trim() || formData.tags.includes(newTag.trim())) return
    
    setFormData(prev => {
      if (!prev) return prev
      return { ...prev, tags: [...prev.tags, newTag.trim()] }
    })
    setNewTag("")
  }

  const removeTag = (tagToRemove: string) => {
    if (!formData) return
    
    setFormData(prev => {
      if (!prev) return prev
      return { ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove) }
    })
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
      formData.append('image', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setImageUrl(data.url)
        handleInputChange("image_url", data.url)
        setImageUploadStatus("Tải lên thành công!")
      } else {
        const error = await response.json()
        setImageUploadStatus(`Lỗi: ${error.error}`)
      }
    } catch {
      setImageUploadStatus("Lỗi kết nối. Vui lòng thử lại.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return
    
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formData.title || !formData.content) {
        showError("Vui lòng điền đầy đủ tiêu đề và nội dung bài viết")
        return
      }

      // Create FormData object for the update
      const updateFormData = new FormData()
      updateFormData.append("title", formData.title)
      updateFormData.append("slug", formData.slug)
      updateFormData.append("excerpt", formData.excerpt)
      updateFormData.append("content", formData.content)
      updateFormData.append("category", formData.category)
      updateFormData.append("featured", formData.featured ? "on" : "off")
      updateFormData.append("published", formData.is_published ? "on" : "off")
      updateFormData.append("image_url", formData.image_url)
      updateFormData.append("meta_description", formData.excerpt) // Using excerpt as meta description
      updateFormData.append("tags", formData.tags.join(","))
      updateFormData.append("video_type", "none") // Default to no video for now

      // Call the update API
      await updateBlogPost(postId, updateFormData)
      
      showSuccess("Cập nhật bài viết thành công!")
      router.push("/admin/blog")
      
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error)
      showError("Có lỗi xảy ra khi cập nhật bài viết", "Vui lòng thử lại.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Bạn có chắc chắn muốn xóa bài viết này?")) return

    try {
      // Call the delete API
      await deleteBlogPost(postId)
      
      showSuccess("Xóa bài viết thành công!")
      router.push("/admin/blog")
      
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error)
      showError("Có lỗi xảy ra khi xóa bài viết", "Vui lòng thử lại.")
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải bài viết...</p>
        </div>
      </div>
    )
  }

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">Không tìm thấy bài viết</h3>
          <p className="text-muted-foreground mb-4">Bài viết bạn đang tìm kiếm không tồn tại.</p>
          <Link href="/admin/blog">
            <Button>Quay lại danh sách</Button>
          </Link>
        </div>
      </div>
    )
  }

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
                <h1 className="text-xl font-bold text-foreground">Chỉnh sửa bài viết</h1>
                <p className="text-sm text-muted-foreground">
                  Cập nhật nội dung và cài đặt bài viết
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={handleDelete}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Xóa bài viết
              </Button>
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
                    Cập nhật thông tin chính của bài viết
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
                    Cập nhật hình ảnh đại diện cho bài viết
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="image">Chọn hình ảnh mới</Label>
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
                      <Label>Hình ảnh hiện tại</Label>
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
                    <Label htmlFor="is_published">Xuất bản</Label>
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
                          Đang cập nhật...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Cập nhật bài viết
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

              {/* Post Information */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>Thông tin bài viết</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID:</span>
                    <span className="font-mono">{formData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày tạo:</span>
                    <span>{new Date(formData.created_at).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cập nhật lần cuối:</span>
                    <span>{new Date(formData.updated_at).toLocaleDateString("vi-VN")}</span>
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
