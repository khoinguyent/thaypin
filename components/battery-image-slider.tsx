'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { BatteryImage } from '@/lib/battery-images-actions'

interface BatteryImageSliderProps {
  images: BatteryImage[]
  autoPlayInterval?: number // in milliseconds
  showControls?: boolean
}

export default function BatteryImageSlider({ 
  images, 
  autoPlayInterval = 4000, 
  showControls = true 
}: BatteryImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, autoPlayInterval, images.length])

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  if (!images || images.length === 0) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="p-8 text-center text-muted-foreground">
          Không có hình ảnh để hiển thị
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="relative">
      {/* Main Image Display */}
      <Card className="bg-card border-border overflow-hidden">
        <CardContent className="p-0">
          <div className="relative aspect-video">
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt_text || images[currentIndex].caption}
              className="w-full h-full object-cover"
            />
            
            {/* Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
              <h3 className="font-semibold text-lg">{images[currentIndex].caption}</h3>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      {showControls && images.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-border"
            onClick={goToNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Play/Pause Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-white/90 hover:bg-white border-border"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? 'bg-primary'
                  : 'bg-muted hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center mt-2 text-sm text-muted-foreground">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
}
