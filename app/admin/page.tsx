import { Suspense } from "react"
import AdminPageClient from "@/components/admin/admin-page-client"
import { getBlogPosts } from "@/lib/blog-actions"

export default async function AdminPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <AdminPageClient initialPosts={posts} />
      </Suspense>
    </div>
  )
}
