"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoPlayerProps {
  videoType: "url" | "upload" | "none"
  videoUrl?: string
  videoFileUrl?: string
  videoThumbnail?: string
  title: string
  className?: string
}

export default function VideoPlayer({
  videoType,
  videoUrl,
  videoFileUrl,
  videoThumbnail,
  title,
  className = "",
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (videoType === "none" || (!videoUrl && !videoFileUrl)) {
    return null
  }

  // Extract video ID for YouTube and Vimeo
  const getEmbedUrl = (url: string) => {
    // YouTube
    const youtubeMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=0&rel=0`
    }

    // Vimeo
    const vimeoMatch = url.match(/(?:vimeo\.com\/)([0-9]+)/)
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`
    }

    // Return original URL for other platforms
    return url
  }

  const renderVideoPlayer = () => {
    if (videoType === "url" && videoUrl) {
      const embedUrl = getEmbedUrl(videoUrl)

      // Check if it's a YouTube or Vimeo embed
      if (embedUrl.includes("youtube.com/embed") || embedUrl.includes("player.vimeo.com")) {
        return (
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={title}
              className="w-full h-full rounded-lg"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )
      }

      // For other video URLs, use HTML5 video
      return (
        <video className="w-full aspect-video rounded-lg" controls poster={videoThumbnail} preload="metadata">
          <source src={videoUrl} type="video/mp4" />
          <p>Trình duyệt của bạn không hỗ trợ video HTML5.</p>
        </video>
      )
    }

    if (videoType === "upload" && videoFileUrl) {
      return (
        <video className="w-full aspect-video rounded-lg" controls poster={videoThumbnail} preload="metadata">
          <source src={videoFileUrl} type="video/mp4" />
          <source src={videoFileUrl} type="video/webm" />
          <source src={videoFileUrl} type="video/mov" />
          <p>Trình duyệt của bạn không hỗ trợ video HTML5.</p>
        </video>
      )
    }

    return null
  }

  return (
    <div className={`video-player ${className}`}>
      <div className="relative">
        {renderVideoPlayer()}

        {/* Video overlay with thumbnail for custom styling */}
        {videoThumbnail && !isPlaying && (
          <div className="absolute inset-0 bg-black/20 rounded-lg flex items-center justify-center group cursor-pointer">
            <Button
              size="lg"
              className="bg-white/90 hover:bg-white text-black rounded-full p-4"
              onClick={() => setIsPlaying(true)}
            >
              <Play className="w-8 h-8 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
