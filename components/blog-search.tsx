"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter } from "lucide-react"

interface BlogSearchProps {
  categories: string[]
  totalPosts: number
  currentCategory?: string
  currentSearch?: string
}

function formatCategory(category: string): string {
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

export default function BlogSearch({
  categories,
  totalPosts,
  currentCategory = "all",
  currentSearch = "",
}: BlogSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [searchQuery, setSearchQuery] = useState(currentSearch)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams)

    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim())
    } else {
      params.delete("search")
    }

    startTransition(() => {
      router.push(`/blog?${params.toString()}`)
    })
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams)

    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    startTransition(() => {
      router.push(`/blog?${params.toString()}`)
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search */}
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm bài viết về pin iPhone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-4 py-3 text-lg bg-background border-border focus:border-primary focus:ring-2 focus:ring-primary/20"
          disabled={isPending}
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary/90"
          disabled={isPending}
        >
          Tìm kiếm
        </Button>
      </form>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" />
          <span>Lọc theo danh mục:</span>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={currentCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              disabled={isPending}
              className={
                currentCategory === category
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary hover:bg-primary/5"
              }
            >
              {formatCategory(category)}
            </Button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="text-center">
        <p className="text-muted-foreground">
          Tìm thấy <span className="font-semibold text-foreground">{totalPosts}</span> bài viết
          {currentCategory && currentCategory !== "all" && (
            <span>
              {" "}
              trong danh mục &quot;<span className="font-medium">{formatCategory(currentCategory)}</span>&quot;
            </span>
          )}
          {currentSearch && (
            <span>
              {" "}
              cho từ khóa &quot;<span className="font-medium">{currentSearch}</span>&quot;
            </span>
          )}
        </p>
      </div>
    </div>
  )
}
