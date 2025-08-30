import { Suspense } from "react"
import AdminDashboard from "@/components/admin/admin-dashboard"
import { getBlogPosts } from "@/lib/blog-actions"

export default async function AdminPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-background">
      <Suspense fallback={<div>Loading...</div>}>
        <AdminDashboard initialPosts={posts} />
      </Suspense>
    </div>
  )
}
