import { notFound } from "next/navigation"
import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import VideoPlayer from "@/components/video-player"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Clock, Calendar, Tag, Video, User, Share2, Phone } from "lucide-react"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"




interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  const post = await getBlogPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const allPosts = await getBlogPosts()
  const relatedPosts = allPosts
    .filter((p) => p.category === post.category && (p.slug || p.id) !== slug)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-br from-background to-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link href="/blog">
                <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay lại blog
                </Button>
              </Link>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.video_type && post.video_type !== "none" && (
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Video className="w-3 h-3" />
                      <span>Video</span>
                    </Badge>
                  )}
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {Math.ceil(post.content.split(' ').length / 200)} phút đọc
                  </div>
                </div>

                <h1 className="font-space-grotesk font-bold text-3xl lg:text-5xl text-foreground leading-tight">
                  {post.title}
                </h1>

                <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      thaypin.vn
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(post.created_at).toLocaleDateString("vi-VN")}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Media Section */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {post.video_type && post.video_type !== "none" ? (
                <VideoPlayer
                  videoType={post.video_type}
                  videoUrl={post.video_url}
                  videoFileUrl={post.video_file_url}
                  videoThumbnail={post.video_thumbnail}
                  title={post.title}
                  className="mb-4"
                />
              ) : (
                <div className="aspect-video overflow-hidden rounded-lg">
                  <img src={post.image_url || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="pb-12 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-3">
                  <Card className="bg-card border-border">
                    <CardContent className="p-8">
                      <div className="prose prose-lg max-w-none prose-headings:font-space-grotesk prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-primary">
                        <ReactMarkdown 
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({children}) => <h1 className="text-3xl font-bold text-foreground mb-6 mt-8 pb-2 border-b-2 border-primary/20">{children}</h1>,
                            h2: ({children}) => <h2 className="text-2xl font-bold text-foreground mb-4 mt-6 text-primary/80">{children}</h2>,
                            h3: ({children}) => <h3 className="text-xl font-semibold text-foreground mb-3 mt-5">{children}</h3>,
                            h4: ({children}) => <h4 className="text-lg font-semibold text-foreground mb-2 mt-4">{children}</h4>,
                            p: ({children}) => <p className="text-muted-foreground mb-4 leading-relaxed text-base">{children}</p>,
                            strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
                            ul: ({children}) => <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2 ml-4">{children}</ul>,
                            ol: ({children}) => <ol className="list-decimal list-inside text-muted-foreground mb-6 space-y-2 ml-4">{children}</ol>,
                            li: ({children}) => <li className="text-muted-foreground leading-relaxed">{children}</li>,
                            blockquote: ({children}) => <blockquote className="border-l-4 border-primary pl-6 italic text-muted-foreground mb-6 bg-primary/5 py-4 rounded-r-lg">{children}</blockquote>,
                            code: ({children}) => <code className="bg-muted px-2 py-1 rounded text-sm font-mono text-primary">{children}</code>,
                            pre: ({children}) => <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-6 border border-border">{children}</pre>,
                          }}
                        >
                          {post.content}
                        </ReactMarkdown>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Tags */}
                  <div className="mt-8">
                    <div className="flex items-center space-x-2 mb-4">
                      <Tag className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags && post.tags.length > 0 ? (
                        post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="p-6 text-center space-y-4">
                      <h3 className="font-space-grotesk font-semibold text-foreground">Cần Hỗ Trợ?</h3>
                      <p className="text-sm text-muted-foreground">Liên hệ với chuyên gia để được tư vấn miễn phí</p>
                      <Button 
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm px-4 py-2 h-auto"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Gọi ngay: 0906 674 679
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="font-space-grotesk font-semibold text-foreground">Dịch Vụ Nổi Bật</h3>
                      <div className="space-y-2">
                        <Link
                          href="/dich-vu/thay-pin"
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          → Thay pin iPhone
                        </Link>
                        <Link
                          href="/dich-vu/kiem-tra-pin"
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          → Kiểm tra pin miễn phí
                        </Link>
                        <Link
                          href="/dich-vu/bao-tri-pin"
                          className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          → Bảo trì pin
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-muted">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="font-space-grotesk font-bold text-3xl text-foreground text-center mb-12">
                  Bài Viết Liên Quan
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.id} className="bg-card border-border hover:shadow-lg transition-shadow">
                      <Link href={`/blog/${relatedPost.slug || relatedPost.id}`}>
                        <div className="aspect-video overflow-hidden rounded-t-lg relative">
                          <img
                            src={relatedPost.image_url || "/placeholder.svg"}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          {relatedPost.video_type && relatedPost.video_type !== "none" && (
                            <div className="absolute top-2 right-2 bg-black/70 rounded-full p-1">
                              <Video className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                      </Link>
                      <CardContent className="p-6 space-y-3">
                        <Badge variant="secondary" className="text-xs">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-space-grotesk font-semibold text-lg leading-tight">
                          <Link
                            href={`/blog/${relatedPost.slug || relatedPost.id}`}
                            className="hover:text-primary transition-colors"
                          >
                            {relatedPost.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{relatedPost.excerpt}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {Math.ceil(relatedPost.content.split(' ').length / 200)} phút đọc
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
