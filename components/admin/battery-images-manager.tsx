'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  Image as ImageIcon
} from 'lucide-react'
import { 
  BatteryImage, 
  getAllBatteryImages, 
  createBatteryImage, 
  updateBatteryImage, 
  deleteBatteryImage 
} from '@/lib/battery-images-actions'

export default function BatteryImagesManager() {
  const [images, setImages] = useState<BatteryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingImage, setEditingImage] = useState<BatteryImage | null>(null)
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
      if (editingImage) {
        await updateBatteryImage(editingImage.id, formData)
      } else {
        await createBatteryImage(formData)
      }
      
      setShowModal(false)
      setEditingImage(null)
      resetForm()
      loadImages()
    } catch (error) {
      console.error('Error saving image:', error)
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
  }

  const openAddModal = () => {
    setEditingImage(null)
    resetForm()
    setFormData(prev => ({ ...prev, order_index: images.length }))
    setShowModal(true)
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
                <Input
                  id="url"
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                  required
                />
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
