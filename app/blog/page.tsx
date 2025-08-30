import { Suspense } from "react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BlogCard from "@/components/blog-card"
import FeaturedPosts from "@/components/featured-posts"
import BlogSearch from "@/components/blog-search"
import { getBlogPosts, getFeaturedPosts } from "@/lib/blog-actions"
import { BookOpen } from "lucide-react"

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  const [allPosts, featuredPosts] = await Promise.all([getBlogPosts(), getFeaturedPosts()])

  const filteredPosts = allPosts.filter((post) => {
    const matchesCategory =
      !searchParams.category || searchParams.category === "all" || post.category === searchParams.category
    const matchesSearch =
      !searchParams.search ||
      post.title.toLowerCase().includes(searchParams.search.toLowerCase()) ||
      post.content.toLowerCase().includes(searchParams.search.toLowerCase()) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(searchParams.search.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const categories = ["all", ...Array.from(new Set(allPosts.map((post) => post.category)))]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-background via-muted/30 to-primary/5 py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-8 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Blog Thaypin.vn
                </span>
              </div>
              <h1 className="font-bold text-5xl lg:text-6xl text-foreground leading-tight">
                Kiến Thức Chuyên Sâu
                <span className="text-primary block mt-2">Về Pin iPhone</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Khám phá những bí quyết bảo vệ pin iPhone, mẹo kéo dài tuổi thọ pin và các kiến thức chuyên môn từ đội
                ngũ kỹ thuật viên giàu kinh nghiệm.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="font-bold text-3xl text-foreground mb-4">Bài Viết Nổi Bật</h2>
                <p className="text-muted-foreground text-lg">Những bài viết được đọc nhiều nhất và có giá trị cao</p>
              </div>
              <FeaturedPosts posts={featuredPosts} />
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <Suspense fallback={<div>Loading...</div>}>
              <BlogSearch
                categories={categories}
                totalPosts={filteredPosts.length}
                currentCategory={searchParams.category}
                currentSearch={searchParams.search}
              />
            </Suspense>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="p-6 bg-muted/50 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Không tìm thấy bài viết</h3>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Thử thay đổi từ khóa tìm kiếm hoặc chọn danh mục khác để xem thêm nội dung
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Xem tất cả bài viết
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="font-bold text-4xl text-foreground">Đăng Ký Nhận Tin Mới</h2>
                <p className="text-xl text-muted-foreground">
                  Nhận những bài viết mới nhất về pin iPhone, mẹo bảo vệ thiết bị và ưu đãi đặc biệt
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors">
                  Đăng ký
                </button>
              </div>
              <p className="text-sm text-muted-foreground">
                Chúng tôi cam kết không spam và bảo vệ thông tin cá nhân của bạn
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
