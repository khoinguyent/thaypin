"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileText, Plus, TrendingUp, Users, Eye, Calendar, Settings, Home, ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/supabase/client"
import BlogPostForm from "./blog-post-form"
import BlogPostsList from "./blog-posts-list"

interface AdminDashboardProps {
  initialPosts: BlogPost[]
}

export default function AdminDashboard({ initialPosts }: AdminDashboardProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Calculate statistics
  const totalPosts = posts.length
  const featuredPosts = posts.filter((post) => post.featured).length
  const categories = Array.from(new Set(posts.map((post) => post.category)))
  const recentPosts = posts.slice(0, 5)

  const stats = [
    {
      title: "Tổng bài viết",
      value: totalPosts,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Bài viết nổi bật",
      value: featuredPosts,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Danh mục",
      value: categories.length,
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Lượt xem (ước tính)",
      value: totalPosts * 150,
      icon: Eye,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <Home className="w-4 h-4" />
                <span>Về trang chủ</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Quản lý blog Thaypin.vn</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className="bg-primary/10 text-primary">
                <Users className="w-3 h-3 mr-1" />
                Admin
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Bài viết</span>
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Tạo mới</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Cài đặt</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-background border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Posts */}
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Bài viết gần đây</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div key={post.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">{post.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                            {post.featured && (
                              <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                                Nổi bật
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(post.created_at).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories Overview */}
              <Card className="bg-background border-border">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Danh mục bài viết</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categories.map((category) => {
                      const categoryPosts = posts.filter((post) => post.category === category)
                      const percentage = (categoryPosts.length / totalPosts) * 100

                      return (
                        <div key={category} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{category}</span>
                            <span className="text-sm text-muted-foreground">{categoryPosts.length} bài viết</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Posts Management Tab */}
          <TabsContent value="posts">
            <BlogPostsList posts={posts} onPostsChange={setPosts} />
          </TabsContent>

          {/* Create Post Tab */}
          <TabsContent value="create">
            <BlogPostForm onSuccess={(newPost) => setPosts([newPost, ...posts])} />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle>Cài đặt hệ thống</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">Thông tin hệ thống</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Database: Supabase PostgreSQL</p>
                    <p>• Framework: Next.js 14 với App Router</p>
                    <p>• Styling: Tailwind CSS</p>
                    <p>• Deployment: Vercel</p>
                  </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Hướng dẫn sử dụng</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Sử dụng tab &quot;Tạo mới&quot; để thêm bài viết</li>
                    <li>• Tab &quot;Bài viết&quot; để quản lý nội dung hiện có</li>
                    <li>• Đánh dấu &quot;Nổi bật&quot; để hiển thị bài viết ở trang chủ</li>
                    <li>• Sử dụng Markdown để định dạng nội dung</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
