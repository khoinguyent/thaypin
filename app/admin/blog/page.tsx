"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { getAllBlogPosts } from "@/lib/blog-actions"
import { 
  Plus, 
  Edit, 
  Eye, 
  EyeOff, 
  Search, 
  Filter,
  Calendar,
  Clock,
  FileText,
  Users,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

interface BlogPost {
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
  created_at: string
  updated_at: string
  author: string
}

export default function BlogManagementPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
      return
    }

    // Load blog posts
    loadBlogPosts()
  }, [router])

  const loadBlogPosts = async () => {
    try {
      // Fetch real blog posts from database
      const posts = await getAllBlogPosts()
      
      // Transform the data to match the expected interface
      const transformedPosts: BlogPost[] = posts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content,
        category: post.category,
        tags: Array.isArray(post.tags) ? post.tags : (post.tags || "").split(",").filter(tag => tag.trim()),
        featured: post.featured || false,
        is_published: post.published || false,
        image_url: post.image_url || "",
        created_at: post.created_at,
        updated_at: post.updated_at,
        author: "thaypin.vn" // Default author
      }))

      setBlogPosts(transformedPosts)
    } catch (error) {
      console.error("Lỗi khi tải danh sách bài viết:", error)
      // Set empty array on error instead of sample data
      setBlogPosts([])
    } finally {
      setIsLoading(false)
    }
  }

  const togglePublishStatus = async (postId: string) => {
    try {
      // API call to toggle publish status
      console.log("Chuyển đổi trạng thái xuất bản cho bài viết:", postId)
      
      // Update local state
      setBlogPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, is_published: !post.is_published }
          : post
      ))
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error)
    }
  }

  const toggleFeaturedStatus = async (postId: string) => {
    try {
      // API call to toggle featured status
      console.log("Chuyển đổi trạng thái nổi bật cho bài viết:", postId)
      
      // Update local state
      setBlogPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, featured: !post.featured }
          : post
      ))
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái nổi bật:", error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || post.category === filterCategory
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "published" && post.is_published) ||
                         (filterStatus === "draft" && !post.is_published)
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải danh sách bài viết...</p>
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
                <h1 className="text-xl font-bold text-foreground">Quản lý Blog</h1>
                <p className="text-sm text-muted-foreground">
                  Quản lý bài viết, nội dung và xuất bản
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/admin/blog/create">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo bài viết mới
                </Button>
              </Link>
              <Link href="/admin/dashboard">
                <Button variant="outline">
                  ← Quay về Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{blogPosts.length}</div>
                  <div className="text-sm text-muted-foreground">Tổng bài viết</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {blogPosts.filter(p => p.is_published).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Đã xuất bản</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <EyeOff className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {blogPosts.filter(p => !p.is_published).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Bản nháp</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {blogPosts.filter(p => p.featured).length}
                  </div>
                  <div className="text-sm text-muted-foreground">Bài nổi bật</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm bài viết..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Danh mục</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="all">Tất cả danh mục</option>
                  <option value="Hướng dẫn">Hướng dẫn</option>
                  <option value="Kiến thức">Kiến thức</option>
                  <option value="So sánh">So sánh</option>
                  <option value="Tin tức">Tin tức</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Trạng thái</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="published">Đã xuất bản</option>
                  <option value="draft">Bản nháp</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Hành động</label>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterCategory("all")
                    setFilterStatus("all")
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Xóa bộ lọc
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Blog Posts List */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Danh sách bài viết ({filteredPosts.length})</CardTitle>
            <CardDescription>
              Quản lý tất cả bài viết blog của thaypin.vn
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Không tìm thấy bài viết</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterCategory !== "all" || filterStatus !== "all" 
                    ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                    : "Chưa có bài viết nào được tạo"
                  }
                </p>
                {!searchTerm && filterCategory === "all" && filterStatus === "all" && (
                  <Link href="/admin/blog/create">
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Tạo bài viết đầu tiên
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      {/* Thumbnail */}
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={post.image_url || "/placeholder.svg"}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                              {post.excerpt}
                            </p>
                            
                            {/* Meta info */}
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(post.created_at)}
                              </div>
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {Math.ceil(post.content.split(' ').length / 200)} phút đọc
                              </div>
                              <div className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {post.author}
                              </div>
                            </div>

                            {/* Tags and Category */}
                            <div className="flex items-center space-x-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {post.category}
                              </Badge>
                              {post.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                  +{post.tags.length - 3} tags khác
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Status badges */}
                          <div className="flex flex-col items-end space-y-2 ml-4">
                            <div className="flex space-x-2">
                              {post.is_published ? (
                                <Badge className="bg-green-100 text-green-800 text-xs">
                                  <Eye className="w-3 h-3 mr-1" />
                                  Đã xuất bản
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs">
                                  <EyeOff className="w-3 h-3 mr-1" />
                                  Bản nháp
                                </Badge>
                              )}
                              
                              {post.featured && (
                                <Badge className="bg-amber-100 text-amber-800 text-xs">
                                  ⭐ Nổi bật
                                </Badge>
                              )}
                            </div>

                            {/* Action buttons */}
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => togglePublishStatus(post.id)}
                                className="text-xs"
                              >
                                {post.is_published ? (
                                  <>
                                    <EyeOff className="w-3 h-3 mr-1" />
                                    Ẩn
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-3 h-3 mr-1" />
                                    Xuất bản
                                  </>
                                )}
                              </Button>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => toggleFeaturedStatus(post.id)}
                                className={`text-xs ${post.featured ? 'bg-amber-50 border-amber-200' : ''}`}
                              >
                                {post.featured ? 'Bỏ nổi bật' : 'Đánh dấu nổi bật'}
                              </Button>

                              <Link href={`/admin/blog/edit/${post.id}`}>
                                <Button size="sm" className="text-xs">
                                  <Edit className="w-3 h-3 mr-1" />
                                  Chỉnh sửa
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
