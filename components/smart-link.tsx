"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ExternalLink, Image as ImageIcon, Video as VideoIcon } from "lucide-react"

interface SmartLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function SmartLink({ href, children, className = "" }: SmartLinkProps) {
  const [linkType, setLinkType] = useState<'unknown' | 'image' | 'video' | 'url'>('unknown')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const detectLinkType = async () => {
      try {
        // Check if it's an image URL
        if (isImageUrl(href)) {
          setLinkType('image')
          setIsLoading(false)
          return
        }

        // Check if it's a video URL
        if (isVideoUrl(href)) {
          setLinkType('video')
          setIsLoading(false)
          return
        }

        // Default to URL
        setLinkType('url')
        setIsLoading(false)
      } catch (error) {
        setLinkType('url')
        setIsLoading(false)
      }
    }

    detectLinkType()
  }, [href])

  const isImageUrl = (url: string): boolean => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico']
    const lowerUrl = url.toLowerCase()
    return imageExtensions.some(ext => lowerUrl.includes(ext))
  }

  const isVideoUrl = (url: string): boolean => {
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv', '.mkv']
    const videoDomains = ['youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com']
    const lowerUrl = url.toLowerCase()
    
    return videoExtensions.some(ext => lowerUrl.includes(ext)) || 
           videoDomains.some(domain => lowerUrl.includes(domain))
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <span className="inline-flex items-center text-primary hover:text-primary/80 transition-colors">
          <ExternalLink className="w-4 h-4 mr-1" />
          {children}
        </span>
      )
    }

    switch (linkType) {
      case 'image':
        return (
          <div className="my-4">
            <img 
              src={href} 
              alt={typeof children === 'string' ? children : 'Image'} 
              className="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => window.open(href, '_blank')}
            />
            <p className="text-sm text-muted-foreground mt-2 text-center">
              <ImageIcon className="w-4 h-4 inline mr-1" />
              Click to view full size
            </p>
          </div>
        )
      
      case 'video':
        return (
          <div className="my-4">
            {isYouTubeUrl(href) ? (
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={getYouTubeEmbedUrl(href)}
                  title={typeof children === 'string' ? children : 'Video'}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="aspect-video rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                <video 
                  src={href} 
                  controls 
                  className="w-full h-full"
                  title={typeof children === 'string' ? children : 'Video'}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <p className="text-sm text-muted-foreground mt-2 text-center">
              <VideoIcon className="w-4 h-4 inline mr-1" />
              {typeof children === 'string' ? children : 'Video'}
            </p>
          </div>
        )
      
      default:
        return (
          <Link 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center text-primary hover:text-primary/80 transition-colors ${className}`}
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            {children}
          </Link>
        )
    }
  }

  const isYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be')
  }

  const getYouTubeEmbedUrl = (url: string): string => {
    let videoId = ''
    
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0]
    } else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1])
      videoId = urlParams.get('v') || ''
    }
    
    return `https://www.youtube.com/embed/${videoId}`
  }

  return renderContent()
}
