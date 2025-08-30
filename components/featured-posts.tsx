import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, Star } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/supabase/client"

interface FeaturedPostsProps {
  posts: BlogPost[]
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

function formatCategory(category: string): string {
  const categoryMap: { [key: string]: string } = {
    "hướng dẫn": "Hướng Dẫn",
    "mẹo hay": "Mẹo Hay",
    "kiến thức": "Kiến Thức",
    "so sánh": "So Sánh",
    general: "Tổng Hợp",
  }
  return categoryMap[category] || category
}

export default function FeaturedPosts({ posts }: FeaturedPostsProps) {
  if (posts.length === 0) return null

  const [mainPost, ...otherPosts] = posts

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Main Featured Post */}
      <Card className="lg:row-span-2 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group overflow-hidden">
        <Link href={`/blog/${mainPost.slug}`}>
          <div className="aspect-[16/10] overflow-hidden">
            <img
              src={mainPost.image_url || "/placeholder.svg?height=300&width=500&query=featured iPhone battery"}
              alt={mainPost.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>

        <CardContent className="p-8">
          <div className="flex items-center space-x-3 mb-4">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              Nổi bật
            </Badge>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {formatCategory(mainPost.category)}
            </Badge>
          </div>

          <h3 className="font-bold text-2xl leading-tight mb-4 group-hover:text-primary transition-colors">
            <Link href={`/blog/${mainPost.slug}`}>{mainPost.title}</Link>
          </h3>

          <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
            {mainPost.excerpt || mainPost.content.substring(0, 200) + "..."}
          </p>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {calculateReadTime(mainPost.content)} phút đọc
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(mainPost.created_at).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Other Featured Posts */}
      <div className="space-y-6">
        {otherPosts.map((post) => (
          <Card
            key={post.id}
            className="bg-card border-border hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
          >
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Link href={`/blog/${post.slug}`} className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img
                      src={post.image_url || "/placeholder.svg?height=96&width=96&query=iPhone battery"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {formatCategory(post.category)}
                    </Badge>
                    <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white">Nổi bật</Badge>
                  </div>

                  <h4 className="font-semibold text-lg leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h4>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {post.excerpt || post.content.substring(0, 100) + "..."}
                  </p>

                  <div className="flex items-center text-xs text-muted-foreground space-x-3">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {calculateReadTime(post.content)} phút
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.created_at).toLocaleDateString("vi-VN")}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
