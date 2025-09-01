'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from 'lucide-react'
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
  const [isFullscreen, setIsFullscreen] = useState(false)

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

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
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
      <Card className="bg-card border-border overflow-hidden shadow-xl">
        <CardContent className="p-0">
          <div className={`relative transition-all duration-300 ${
            isFullscreen 
              ? 'aspect-[4/5] max-h-[80vh]' 
              : 'aspect-[4/3] max-h-[600px]'
          }`}>
            <img
              src={images[currentIndex].url}
              alt={images[currentIndex].alt_text || images[currentIndex].caption}
              className="w-full h-full object-contain bg-gradient-to-br from-slate-50 to-slate-100"
            />
            
            {/* Enhanced Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent text-white p-6">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="font-bold text-xl mb-2 drop-shadow-lg">
                  {images[currentIndex].caption}
                </h3>
                <p className="text-sm text-gray-200 opacity-90">
                  Pin chính hãng chất lượng cao
                </p>
              </div>
            </div>

            {/* Top-right Badge */}
            <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
              Pin Chính Hãng
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Navigation Controls */}
      {showControls && images.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white border-border shadow-lg hover:shadow-xl transition-all duration-200 w-12 h-12"
            onClick={goToPrevious}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white border-border shadow-lg hover:shadow-xl transition-all duration-200 w-12 h-12"
            onClick={goToNext}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Control Buttons Group */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {/* Play/Pause Button */}
            <Button
              variant="outline"
              size="icon"
              className="bg-white/95 hover:bg-white border-border shadow-lg hover:shadow-xl transition-all duration-200 w-10 h-10"
              onClick={togglePlayPause}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>

            {/* Fullscreen Button */}
            <Button
              variant="outline"
              size="icon"
              className="bg-white/95 hover:bg-white border-border shadow-lg hover:shadow-xl transition-all duration-200 w-10 h-10"
              onClick={toggleFullscreen}
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}

      {/* Enhanced Dots Indicator */}
      {images.length > 1 && (
        <div className="flex justify-center space-x-3 mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary scale-125 shadow-lg'
                  : 'bg-muted hover:bg-muted-foreground/50 hover:scale-110'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Enhanced Image Counter */}
      {images.length > 1 && (
        <div className="text-center mt-4">
          <div className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            <span className="text-sm font-medium text-gray-700">
              {currentIndex + 1} / {images.length}
            </span>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      {isPlaying && images.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
          <div 
            className="h-full bg-primary transition-all duration-100 ease-linear"
            style={{ 
              width: `${((currentIndex + 1) / images.length) * 100}%` 
            }}
          />
        </div>
      )}
    </div>
  )
}
