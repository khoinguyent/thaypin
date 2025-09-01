'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Image as ImageIcon,
  Upload,
  X
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
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
      
      // If there's a selected file, upload it first
      if (selectedFile) {
        setUploading(true)
        
        const uploadFormData = new FormData()
        uploadFormData.append('image', selectedFile)
        
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
        
        // Clear the selected file after successful upload
        setSelectedFile(null)
      }
      
      // Now insert/update in database with the final URL
      if (editingImage) {
        await updateBatteryImage(editingImage.id, { ...formData, url: finalUrl })
        alert('Hình ảnh đã được cập nhật thành công!')
      } else {
        await createBatteryImage({ ...formData, url: finalUrl })
        alert('Hình ảnh đã được thêm thành công!')
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
      alert(error instanceof Error ? error.message : 'Có lỗi xảy ra')
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
    setSelectedFile(null)
  }

  const openAddModal = () => {
    setEditingImage(null)
    resetForm()
    setSelectedFile(null)
    setFormData(prev => ({ ...prev, order_index: images.length }))
    setShowModal(true)
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Vui lòng chọn file hình ảnh')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File quá lớn. Vui lòng chọn file nhỏ hơn 5MB')
        return
      }
      
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Vui lòng chọn file để upload')
      return
    }

    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      
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
      setSelectedFile(null)
      
      alert('Upload thành công!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload thất bại. Vui lòng thử lại.')
    } finally {
      setUploading(false)
    }
  }

  const removeSelectedFile = () => {
    setSelectedFile(null)
  }

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Danh sách hình ảnh pin</h3>
          <p className="text-sm text-muted-foreground">
            Tổng cộng {images.length} hình ảnh
          </p>
        </div>
        <Button onClick={openAddModal} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Thêm hình ảnh
        </Button>
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
        ) : (
          images.map((image) => (
            <Card key={image.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  {/* Image Preview */}
                  <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={image.url}
                      alt={image.alt_text || image.caption}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-muted-foreground"><ImageIcon class="w-8 h-8" /></div>'
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
                <Label htmlFor="url">URL hình ảnh</Label>
                <div className="space-y-2">
                  <Input
                    id="url"
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                  
                  {/* Upload Section */}
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                    <div className="text-center space-y-2">
                      <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Hoặc upload hình ảnh từ máy tính
                      </p>
                      
                      {selectedFile ? (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between bg-muted p-2 rounded">
                            <span className="text-sm truncate">{selectedFile.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={removeSelectedFile}
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            type="button"
                            onClick={handleUpload}
                            disabled={uploading}
                            className="w-full"
                          >
                            {uploading ? 'Đang upload...' : 'Upload hình ảnh'}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <Button 
                            type="button" 
                            variant="outline" 
                            className="w-full cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                          >
                            Chọn file
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
