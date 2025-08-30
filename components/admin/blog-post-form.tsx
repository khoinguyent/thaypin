"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { createBlogPost } from "@/lib/blog-actions"
import { Save, Loader2, Plus, X, Eye, Video, Upload, Link } from "lucide-react"
import type { BlogPost } from "@/lib/supabase/client"

interface BlogPostFormProps {
  onSuccess?: (post: BlogPost) => void
  editingPost?: BlogPost | null
}

export default function BlogPostForm({ onSuccess, editingPost }: BlogPostFormProps) {
  const [isPending, startTransition] = useTransition()
  const [tags, setTags] = useState<string[]>(editingPost?.tags || [])
  const [newTag, setNewTag] = useState("")
  const [previewMode, setPreviewMode] = useState(false)
  const [videoType, setVideoType] = useState<"none" | "url" | "upload">((editingPost as BlogPost & { video_type?: string })?.video_type || "none")
  const [imageUploadStatus, setImageUploadStatus] = useState<string>("")
  const [imageUrl, setImageUrl] = useState<string>(editingPost?.image_url || "")

  const handleSubmit = async (formData: FormData) => {
    formData.set("tags", tags.join(","))
    formData.set("video_type", videoType)

    startTransition(async () => {
      try {
        await createBlogPost(formData)
        if (onSuccess) {
          const newPost: BlogPost = {
            id: Date.now().toString(),
            title: formData.get("title") as string,
            slug: formData.get("slug") as string,
            excerpt: formData.get("excerpt") as string,
            content: formData.get("content") as string,
            category: formData.get("category") as string,
            featured: formData.get("featured") === "on",
            image_url: formData.get("image_url") as string,
            meta_description: formData.get("meta_description") as string,
            tags,
            published: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          }
          onSuccess(newPost)
        }
        const form = document.getElementById("blog-form") as HTMLFormElement
        form?.reset()
        setTags([])
        setVideoType("none")
      } catch (error) {
        console.error("Error creating post:", error)
        alert("Có lỗi xảy ra khi tạo bài viết")
      }
    })
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setImageUploadStatus('Chỉ hỗ trợ file ảnh')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setImageUploadStatus('File ảnh quá lớn (tối đa 5MB)')
      return
    }

    setImageUploadStatus('Đang tải lên...')

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const result = await response.json()
      setImageUrl(result.url)
      setImageUploadStatus('Tải lên thành công!')
      
      // Clear the file input
      event.target.value = ''
    } catch (error) {
      console.error('Image upload error:', error)
      setImageUploadStatus('Lỗi tải lên ảnh')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-background border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>{editingPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}</span>
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{previewMode ? "Chỉnh sửa" : "Xem trước"}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form id="blog-form" action={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề bài viết *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Nhập tiêu đề bài viết"
                    defaultValue={editingPost?.title}
                    required
                    onChange={(e) => {
                      const slugInput = document.getElementById("slug") as HTMLInputElement
                      if (slugInput && !editingPost) {
                        slugInput.value = generateSlug(e.target.value)
                      }
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL) *</Label>
                  <Input id="slug" name="slug" placeholder="url-bai-viet" defaultValue={editingPost?.slug} required />
                  <p className="text-xs text-muted-foreground">URL của bài viết sẽ là: /blog/[slug]</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Mô tả ngắn</Label>
                  <Textarea
                    id="excerpt"
                    name="excerpt"
                    placeholder="Mô tả ngắn gọn về nội dung bài viết"
                    rows={3}
                    defaultValue={editingPost?.excerpt || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục *</Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="VD: hướng dẫn, mẹo hay, kiến thức"
                    defaultValue={editingPost?.category}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Hình ảnh bài viết</Label>
                  <div className="space-y-3">
                    <Input
                      id="image_url"
                      name="image_url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">hoặc</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById('image_file')?.click()}
                        className="flex items-center space-x-2"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Tải lên ảnh</span>
                      </Button>
                      <input
                        id="image_file"
                        name="image_file"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                    {imageUploadStatus && (
                      <div className="text-sm text-muted-foreground">
                        {imageUploadStatus}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <Separator />
                  <div className="space-y-3">
                    <Label className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>Video</span>
                    </Label>

                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="video_type_radio"
                          value="none"
                          checked={videoType === "none"}
                          onChange={() => setVideoType("none")}
                          className="text-primary"
                        />
                        <span className="text-sm">Không có video</span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="video_type_radio"
                          value="url"
                          checked={videoType === "url"}
                          onChange={() => setVideoType("url")}
                          className="text-primary"
                        />
                        <span className="text-sm flex items-center space-x-1">
                          <Link className="w-3 h-3" />
                          <span>URL Video</span>
                        </span>
                      </label>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="video_type_radio"
                          value="upload"
                          checked={videoType === "upload"}
                          onChange={() => setVideoType("upload")}
                          className="text-primary"
                        />
                        <span className="text-sm flex items-center space-x-1">
                          <Upload className="w-3 h-3" />
                          <span>Tải lên</span>
                        </span>
                      </label>
                    </div>

                    {videoType === "url" && (
                      <div className="space-y-2">
                        <Label htmlFor="video_url">URL Video</Label>
                        <Input
                          id="video_url"
                          name="video_url"
                          placeholder="https://youtube.com/watch?v=... hoặc https://vimeo.com/..."
                          defaultValue={(editingPost as BlogPost & { video_url?: string })?.video_url || ""}
                        />
                        <p className="text-xs text-muted-foreground">
                          Hỗ trợ YouTube, Vimeo và các nền tảng video khác
                        </p>
                      </div>
                    )}

                    {videoType === "upload" && (
                      <div className="space-y-2">
                        <Label htmlFor="video_file">Tải lên video</Label>
                        <Input
                          id="video_file"
                          name="video_file"
                          type="file"
                          accept="video/*"
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                        <p className="text-xs text-muted-foreground">Hỗ trợ MP4, WebM, MOV (tối đa 100MB)</p>
                      </div>
                    )}

                    {videoType !== "none" && (
                      <div className="space-y-2">
                        <Label htmlFor="video_thumbnail">Ảnh thumbnail video (tùy chọn)</Label>
                        <Input
                          id="video_thumbnail"
                          name="video_thumbnail"
                          placeholder="https://example.com/thumbnail.jpg"
                          defaultValue={(editingPost as BlogPost & { video_thumbnail?: string })?.video_thumbnail || ""}
                        />
                        <p className="text-xs text-muted-foreground">Ảnh hiển thị trước khi phát video</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description (SEO)</Label>
                  <Textarea
                    id="meta_description"
                    name="meta_description"
                    placeholder="Mô tả cho công cụ tìm kiếm (150-160 ký tự)"
                    rows={3}
                    maxLength={160}
                    defaultValue={editingPost?.meta_description || ""}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex space-x-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Thêm tag"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      Thêm
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                        <span>{tag}</span>
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Separator />
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Bài viết nổi bật</Label>
                    <Switch id="featured" name="featured" defaultChecked={editingPost?.featured} />
                  </div>
                  <p className="text-xs text-muted-foreground">Bài viết nổi bật sẽ hiển thị ở phần đầu trang blog</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="content">Nội dung bài viết *</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Viết nội dung bài viết ở đây. Hỗ trợ Markdown formatting."
                rows={20}
                defaultValue={editingPost?.content}
                required
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Hỗ trợ Markdown: **bold**, *italic*, # heading, - list, [link](url)
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline">
                Lưu nháp
              </Button>
              <Button type="submit" disabled={isPending} className="bg-primary hover:bg-primary/90">
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {editingPost ? "Cập nhật" : "Xuất bản"}
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
