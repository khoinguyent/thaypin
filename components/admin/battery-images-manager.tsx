'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast-provider'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  Upload,
  X,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react'
import { 
  BatteryImage, 
  getAllBatteryImages, 
  createBatteryImage, 
  updateBatteryImage, 
  deleteBatteryImage 
} from '@/lib/battery-images-actions'


export default function BatteryImagesManager() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [images, setImages] = useState<BatteryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingImage, setEditingImage] = useState<BatteryImage | null>(null)
  const [uploading, setUploading] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'none'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { showSuccess, showError } = useToast()
  const [formData, setFormData] = useState({
    set_name: 'battery-images-set',
    url: '',
    caption: '',
    alt_text: '',
    order_index: 0,
    is_active: true,
    visible: true
  })

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    setLoading(true)
    try {
      const data = await getAllBatteryImages()
      setImages(data)
    } catch (error) {
      console.error('Error loading images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      let finalUrl = formData.url
      
      // If there are selected files, upload the first one
      if (selectedFiles.length > 0) {
        setUploading(true)
        
        const uploadFormData = new FormData()
        uploadFormData.append('image', selectedFiles[0])
        
        const uploadResponse = await fetch('/api/upload-image?type=battery', {
          method: 'POST',
          body: uploadFormData,
        })
        
        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json()
          throw new Error(`Upload failed: ${errorData.details || errorData.error || 'Unknown error'}`)
        }
        
        const uploadResult = await uploadResponse.json()
        finalUrl = uploadResult.url
        setUploading(false)
        
        // Clear the selected files after successful upload
        setSelectedFiles([])
      } else if (!finalUrl) {
        showError('Vui lòng chọn hình ảnh để upload')
        return
      }
      
      // Now insert/update in database with the final URL
      if (editingImage) {
        await updateBatteryImage(editingImage.id, { ...formData, url: finalUrl })
        showSuccess('Hình ảnh đã được cập nhật thành công!')
      } else {
        await createBatteryImage({ ...formData, url: finalUrl })
        showSuccess('Hình ảnh đã được thêm thành công!')
      }
      
      // Reset form and close modal
      setFormData({
        set_name: 'battery-images-set',
        url: '',
        caption: '',
        alt_text: '',
        order_index: 0,
        is_active: true,
        visible: true
      })
      setShowModal(false)
      setEditingImage(null)
      
      // Refresh the list
      loadImages()
      
    } catch (error) {
      setUploading(false)
      console.error('Error:', error)
      showError(
        'Có lỗi xảy ra',
        error instanceof Error ? error.message : 'Vui lòng thử lại sau.'
      )
    }
  }

  const handleEdit = (image: BatteryImage) => {
    setEditingImage(image)
    setFormData({
      set_name: image.set_name,
      url: image.url,
      caption: image.caption,
      alt_text: image.alt_text || '',
      order_index: image.order_index,
      is_active: image.is_active,
      visible: image.visible
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      try {
        await deleteBatteryImage(id)
        loadImages()
      } catch (error) {
        console.error('Error deleting image:', error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      set_name: 'battery-images-set',
      url: '',
      caption: '',
      alt_text: '',
      order_index: 0,
      is_active: true,
      visible: true
    })
    setSelectedFiles([])
  }

  const openAddModal = () => {
    setEditingImage(null)
    resetForm()
    setSelectedFiles([])
    setFormData(prev => ({ ...prev, order_index: images.length }))
    setShowModal(true)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    // Validate number of files (max 10)
    if (files.length > 10) {
      showError('Quá nhiều file', 'Vui lòng chọn tối đa 10 file')
      return
    }

    const validFiles: File[] = []
    
    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        showError('Vui lòng chọn file hình ảnh', `File "${file.name}" không phải là hình ảnh`)
        continue
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showError('File quá lớn', `File "${file.name}" quá lớn. Vui lòng chọn file nhỏ hơn 5MB`)
        continue
      }
      
      validFiles.push(file)
    }
    
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles)
      if (validFiles.length !== files.length) {
        showError('Một số file không hợp lệ', `${validFiles.length}/${files.length} file đã được chọn`)
      }
    }
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      showError('Vui lòng chọn file để upload')
      return
    }

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFiles[0])
      
      const response = await fetch('/api/upload-image?type=battery', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      const result = await response.json()
      
      // Update the URL field with the uploaded image URL
      setFormData(prev => ({ ...prev, url: result.url }))
      setSelectedFiles([])
      
      showSuccess('Upload thành công!')
    } catch (error) {
      console.error('Upload error:', error)
      showError('Upload thất bại', 'Vui lòng thử lại.')
    } finally {
      setUploading(false)
    }
  }

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const removeAllSelectedFiles = () => {
    setSelectedFiles([])
  }

  // Filter and sort images
  const getFilteredAndSortedImages = () => {
    let filtered = images

    // Filter by search term (search in caption and alt_text)
    if (searchTerm.trim()) {
      filtered = images.filter(image => 
        image.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (image.alt_text && image.alt_text.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Sort by created date
    if (sortOrder !== 'none') {
      filtered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.created_at || 0).getTime()
        const dateB = new Date(b.created_at || 0).getTime()
        
        if (sortOrder === 'asc') {
          return dateA - dateB
        } else {
          return dateB - dateA
        }
      })
    }

    return filtered
  }

  // Get paginated images
  const getPaginatedImages = () => {
    const filteredImages = getFilteredAndSortedImages()
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredImages.slice(startIndex, endIndex)
  }

  // Get pagination info
  const getPaginationInfo = () => {
    const filteredImages = getFilteredAndSortedImages()
    const totalItems = filteredImages.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    return {
      totalItems,
      totalPages,
      startItem,
      endItem,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    }
  }

  const handleSortToggle = () => {
    if (sortOrder === 'desc') {
      setSortOrder('asc')
    } else if (sortOrder === 'asc') {
      setSortOrder('none')
    } else {
      setSortOrder('desc')
    }
  }

  const getSortIcon = () => {
    switch (sortOrder) {
      case 'asc':
        return <ArrowUp className="w-4 h-4" />
      case 'desc':
        return <ArrowDown className="w-4 h-4" />
      default:
        return <ArrowUpDown className="w-4 h-4" />
    }
  }

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1)
  const goToPrevPage = () => setCurrentPage(prev => Math.max(1, prev - 1))
  const goToNextPage = () => {
    const { totalPages } = getPaginationInfo()
    setCurrentPage(prev => Math.min(totalPages, prev + 1))
  }
  const goToLastPage = () => {
    const { totalPages } = getPaginationInfo()
    setCurrentPage(totalPages)
  }
  const goToPage = (page: number) => setCurrentPage(page)

  // Reset to first page when search or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortOrder, itemsPerPage])

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header with Search, Sort, and Add Button */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Danh sách hình ảnh pin</h3>
            <p className="text-sm text-muted-foreground">
              {(() => {
                const paginationInfo = getPaginationInfo()
                if (paginationInfo.totalItems === 0) {
                  return 'Không có hình ảnh nào'
                }
                return `Hiển thị ${paginationInfo.startItem}-${paginationInfo.endItem} trong tổng số ${paginationInfo.totalItems} hình ảnh`
              })()}
            </p>
          </div>
          <Button onClick={openAddModal} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Thêm hình ảnh
          </Button>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Tìm kiếm theo mô tả..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Items Per Page Selector */}
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value={5}>5 / trang</option>
            <option value={10}>10 / trang</option>
            <option value={20}>20 / trang</option>
            <option value={50}>50 / trang</option>
          </select>

          {/* Sort Button */}
          <Button
            variant="outline"
            onClick={handleSortToggle}
            className="flex items-center space-x-2"
          >
            {getSortIcon()}
            <span>
              {sortOrder === 'asc' && 'Cũ nhất'}
              {sortOrder === 'desc' && 'Mới nhất'}
              {sortOrder === 'none' && 'Sắp xếp'}
            </span>
          </Button>
        </div>
      </div>

      {/* Images List */}
      <div className="grid gap-4">
        {images.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <ImageIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Chưa có hình ảnh nào</p>
              <Button onClick={openAddModal} variant="outline" className="mt-4">
                Thêm hình ảnh đầu tiên
              </Button>
            </CardContent>
          </Card>
        ) : getFilteredAndSortedImages().length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Không tìm thấy hình ảnh nào</p>
              <p className="text-sm mt-2">Thử thay đổi từ khóa tìm kiếm</p>
            </CardContent>
          </Card>
        ) : (
          getPaginatedImages().map((image) => (
            <Card key={image.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Image Preview */}
                  <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0 relative" data-image-id={image.id}>
                    <Image
                      src={image.url}
                      alt={image.alt_text || image.caption}
                      fill
                      className="object-cover"
                      onError={() => {
                        // Handle error by hiding the image
                        const container = document.querySelector(`[data-image-id="${image.id}"]`) as HTMLElement
                        if (container) {
                          container.innerHTML = '<div class="w-full h-full flex items-center justify-center text-muted-foreground"><svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'
                        }
                      }}
                    />
                  </div>

                  {/* Image Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold truncate">{image.caption}</h4>
                      <Badge variant="outline">{image.set_name}</Badge>
                      {image.visible ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Eye className="w-3 h-3 mr-1" />
                          Hiển thị
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <EyeOff className="w-3 h-3 mr-1" />
                          Ẩn
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{image.url}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <span>Thứ tự: {image.order_index}</span>
                      <span>•</span>
                      <span>Trạng thái: {image.is_active ? 'Hoạt động' : 'Không hoạt động'}</span>
                      <span>•</span>
                      <span>Tạo: {new Date(image.created_at || '').toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(image)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(image.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {(() => {
        const paginationInfo = getPaginationInfo()
        if (paginationInfo.totalPages <= 1) return null

        const generatePageNumbers = () => {
          const pages = []
          const { totalPages } = paginationInfo
          
          // Show first page
          if (currentPage > 3) {
            pages.push(1)
            if (currentPage > 4) pages.push('...')
          }
          
          // Show pages around current page
          const start = Math.max(1, currentPage - 2)
          const end = Math.min(totalPages, currentPage + 2)
          
          for (let i = start; i <= end; i++) {
            pages.push(i)
          }
          
          // Show last page
          if (currentPage < totalPages - 2) {
            if (currentPage < totalPages - 3) pages.push('...')
            pages.push(totalPages)
          }
          
          return pages
        }

        return (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-6 border-t border-border">
            {/* Pagination Info */}
            <div className="text-sm text-muted-foreground">
              Hiển thị {startItem}-{endItem} trong tổng số {paginationInfo.totalItems} kết quả
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center space-x-2">
              {/* First Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={goToFirstPage}
                disabled={!paginationInfo.hasPrevPage}
                className="p-2"
              >
                <ChevronsLeft className="w-4 h-4" />
              </Button>

              {/* Previous Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={goToPrevPage}
                disabled={!paginationInfo.hasPrevPage}
                className="p-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1">
                {generatePageNumbers().map((page, index) => (
                  page === '...' ? (
                    <span key={index} className="px-2 py-1 text-muted-foreground">...</span>
                  ) : (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => goToPage(page as number)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  )
                ))}
              </div>

              {/* Next Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={goToNextPage}
                disabled={!paginationInfo.hasNextPage}
                className="p-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              {/* Last Page */}
              <Button
                variant="outline"
                size="sm"
                onClick={goToLastPage}
                disabled={!paginationInfo.hasNextPage}
                className="p-2"
              >
                <ChevronsRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )
      })()}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">
              {editingImage ? 'Chỉnh sửa hình ảnh' : 'Thêm hình ảnh mới'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="set_name">Tên bộ hình ảnh</Label>
                <Input
                  id="set_name"
                  value={formData.set_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, set_name: e.target.value }))}
                  placeholder="battery-images-set"
                  required
                />
              </div>

              <div>
                <Label>Upload hình ảnh</Label>
                <div className="space-y-2">
                  {/* Hidden URL field for storing uploaded image URL */}
                  <input
                    type="hidden"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  />
                  
                  {/* Upload Section */}
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                    <div className="text-center space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Chọn hình ảnh từ máy tính để upload (tối đa 10 file cùng lúc)
                      </p>
                      
                      {formData.url ? (
                        <div className="space-y-2">
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-800 font-medium">✓ Hình ảnh đã được upload thành công</p>
                            <p className="text-xs text-green-600 truncate mt-1">{formData.url}</p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFormData(prev => ({ ...prev, url: '' }))}
                            className="w-full"
                          >
                            Chọn hình ảnh khác
                          </Button>
                        </div>
                      ) : selectedFiles.length > 0 ? (
                        <div className="space-y-2">
                          <div className="space-y-2">
                            {selectedFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                                <span className="text-sm truncate">{file.name}</span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeSelectedFile(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={removeAllSelectedFiles}
                              className="flex-1"
                            >
                              Xóa tất cả
                            </Button>
                            <Button
                              type="button"
                              onClick={handleUpload}
                              disabled={uploading}
                              className="flex-1"
                            >
                              {uploading ? 'Đang upload...' : 'Upload hình ảnh đầu tiên'}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground text-center">
                            Chỉ upload hình ảnh đầu tiên. Để upload nhiều hình, hãy thêm từng hình một.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="w-full cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Chọn file (tối đa 10)
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="caption">Chú thích</Label>
                <Input
                  id="caption"
                  value={formData.caption}
                  onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
                  placeholder="iPhone 15 Series - Pin Li-ion 3.87V 3349mAh"
                  required
                />
              </div>

              <div>
                <Label htmlFor="alt_text">Alt text (tùy chọn)</Label>
                <Input
                  id="alt_text"
                  value={formData.alt_text}
                  onChange={(e) => setFormData(prev => ({ ...prev, alt_text: e.target.value }))}
                  placeholder="iPhone 15 battery replacement"
                />
              </div>

              <div>
                <Label htmlFor="order_index">Thứ tự hiển thị</Label>
                <Input
                  id="order_index"
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) }))}
                  min="0"
                  required
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                  />
                  <Label htmlFor="is_active">Hoạt động</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="visible"
                    checked={formData.visible}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, visible: checked }))}
                  />
                  <Label htmlFor="visible">Hiển thị trên web</Label>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowModal(false)
                    setEditingImage(null)
                    resetForm()
                  }}
                >
                  Hủy
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  {editingImage ? 'Cập nhật' : 'Thêm'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
