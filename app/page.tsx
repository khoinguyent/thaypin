import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BenefitsSection from "@/components/benefits-section"
import ServicesSection from "@/components/services-section"
import FeaturedPosts from "@/components/featured-posts"
import { getFeaturedPosts } from "@/lib/blog-actions"
import Footer from "@/components/footer"

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts()
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ServicesSection />
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
      </main>
      <Footer />
    </div>
  )
}
