"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { deleteBlogPost } from "@/lib/blog-actions"
import { Search, Edit, Trash2, Eye, Star, Calendar, Filter } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/toast-provider"

interface BlogPostsListProps {
  posts: BlogPost[]
  onPostsChange: (posts: BlogPost[]) => void
}

export default function BlogPostsList({ posts, onPostsChange }: BlogPostsListProps) {
  const [isPending, startTransition] = useTransition()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const { showError } = useToast()

  const categories = ["all", ...Array.from(new Set(posts.map((post) => post.category)))]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      startTransition(async () => {
        try {
          await deleteBlogPost(id)
          onPostsChange(posts.filter((post) => post.id !== id))
        } catch (error) {
          console.error("Error deleting post:", error)
          showError("Có lỗi xảy ra khi xóa bài viết")
        }
      })
    }
  }

  const formatCategory = (category: string): string => {
    const categoryMap: { [key: string]: string } = {
      all: "Tất cả",
      "hướng dẫn": "Hướng Dẫn",
      "mẹo hay": "Mẹo Hay",
      "kiến thức": "Kiến Thức",
      "so sánh": "So Sánh",
      general: "Tổng Hợp",
    }
    return categoryMap[category] || category
  }

  return (
    <div className="space-y-6">
      <Card className="bg-background border-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Quản lý bài viết ({filteredPosts.length})</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {formatCategory(category)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-muted/30 border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg text-foreground truncate">{post.title}</h3>
                        {post.featured && (
                          <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                            <Star className="w-3 h-3 mr-1" />
                            Nổi bật
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground line-clamp-2 mb-3">
                        {post.excerpt || post.content.substring(0, 150) + "..."}
                      </p>

                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Badge variant="outline">{formatCategory(post.category)}</Badge>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.created_at).toLocaleDateString("vi-VN")}</span>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex items-center space-x-1">
                            <span>Tags:</span>
                            <div className="flex space-x-1">
                              {post.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {post.tags.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{post.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(post.id)}
                        disabled={isPending}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Không tìm thấy bài viết</h3>
                <p className="text-muted-foreground">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
