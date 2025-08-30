import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { BlogPost } from "@/lib/supabase/client"

interface BlogCardProps {
  post: BlogPost
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

export default function BlogCard({ post }: BlogCardProps) {
  const readTime = calculateReadTime(post.content)
  const formattedDate = new Date(post.created_at).toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card className="bg-card border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={post.image_url || "/placeholder.svg?height=240&width=400&query=iPhone battery replacement"}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs font-medium bg-primary/10 text-primary hover:bg-primary/20">
            {formatCategory(post.category)}
          </Badge>
          {post.featured && (
            <Badge className="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white">Nổi bật</Badge>
          )}
        </div>

        <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200 line-clamp-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-muted-foreground line-clamp-3 leading-relaxed">
          {post.excerpt || post.content.substring(0, 150) + "..."}
        </CardDescription>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {readTime} phút đọc
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formattedDate}
            </div>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs hover:bg-primary/10">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="pt-2">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
          >
            Đọc tiếp
            <ArrowRight className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
