"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react"
import type { BlogPost } from "@/lib/supabase/client"

interface FeaturedPostsSliderProps {
  posts: BlogPost[]
}

export default function FeaturedPostsSlider({ posts }: FeaturedPostsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || posts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlaying, posts.length])

  if (posts.length === 0) return null

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + posts.length) % posts.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % posts.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <section className="py-16 bg-gradient-to-br from-background via-muted/20 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl lg:text-4xl text-foreground mb-4">
            Bài Viết Nổi Bật
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Những bài viết được đọc nhiều nhất và có giá trị cao về pin iPhone
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Slider Container */}
          <div className="relative overflow-hidden rounded-2xl bg-card shadow-2xl">
            {/* Main Featured Post */}
            <div className="relative h-[500px] lg:h-[600px]">
              <Image
                src={posts[currentIndex].image_url || "/placeholder.svg"}
                alt={posts[currentIndex].title}
                fill
                className="object-cover"
                priority={currentIndex === 0}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                <div className="max-w-2xl">
                  {/* Category Badge */}
                  <div className="inline-block mb-4">
                    <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                      {posts[currentIndex].category}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="font-bold text-2xl lg:text-4xl text-white mb-4 leading-tight">
                    {posts[currentIndex].title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-white/90 text-lg mb-6 line-clamp-3">
                    {posts[currentIndex].excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center space-x-6 text-white/80 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {formatDate(posts[currentIndex].updated_at)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">Thaypin.vn</span>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <Link
                    href={`/blog/${posts[currentIndex].slug}`}
                    className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
                    onMouseEnter={() => setIsAutoPlaying(false)}
                  >
                    Đọc bài viết
                  </Link>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {posts.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Side Posts Grid */}
          {posts.length > 1 && (
            <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {posts.slice(0, 4).map((post, index) => (
                <div
                  key={post.id}
                  className={`relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? "ring-2 ring-primary shadow-lg scale-105"
                      : "hover:scale-105 shadow-md"
                  }`}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                >
                  <div className="relative h-32 lg:h-40">
                    <Image
                      src={post.image_url || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <h4 className="text-white text-sm font-medium line-clamp-2">
                      {post.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Dots Indicator */}
          {posts.length > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
