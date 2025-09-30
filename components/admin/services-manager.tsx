'use client'

import { useState, useEffect } from 'react'
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
  Settings,
  ArrowUp,
  ArrowDown,
  Save,
  X
} from 'lucide-react'
import { 
  Service, 
  getAllServices, 
  createService, 
  updateService, 
  deleteService,
  toggleServiceStatus,
  reorderServices,
  CreateServiceData
} from '@/lib/service-actions'

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const { showSuccess, showError } = useToast()
  const [formData, setFormData] = useState<CreateServiceData>({
    title: '',
    icon: 'Battery',
    price: 'Từ 500.000₫',
    description: '',
    options: ['30 phút', '12 tháng bảo hành', 'Chất lượng đảm bảo'],
    highlights: ['Linh kiện chính hãng', 'Bảo hành 12 tháng', 'Thay trong 30 phút', 'Kiểm tra miễn phí'],
    header_tag: '',
    price_min: 0,
    price_max: 0,
    applied_for: [],
    option_1: 'Linh kiện chính hãng',
    option_1_default: true,
    option_2: 'Bảo hành 12 tháng',
    option_2_default: true,
    option_3: 'Thay trong 30 phút',
    option_3_default: true,
    button_text: 'Đặt lịch ngay',
    is_active: true,
    display_order: 0
  })
  const [newOption, setNewOption] = useState('')
  const [newHighlight, setNewHighlight] = useState('')

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    setLoading(true)
    try {
      const data = await getAllServices()
      setServices(data)
    } catch (error) {
      console.error('Error loading services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate new required fields
    if (!formData.icon.trim()) {
      showError('Vui lòng nhập icon cho dịch vụ')
      return
    }
    if (!formData.price.trim()) {
      showError('Vui lòng nhập giá hiển thị cho dịch vụ')
      return
    }
    if (!formData.description.trim()) {
      showError('Vui lòng nhập mô tả cho dịch vụ')
      return
    }
    if (formData.options.length === 0) {
      showError('Vui lòng thêm ít nhất 1 tùy chọn dịch vụ')
      return
    }
    if (formData.highlights.length === 0) {
      showError('Vui lòng thêm ít nhất 1 đặc điểm nổi bật')
      return
    }
    
    try {
      if (editingService) {
        await updateService({ ...formData, id: editingService.id })
        showSuccess('Dịch vụ đã được cập nhật thành công!')
      } else {
        await createService(formData)
        showSuccess('Dịch vụ đã được thêm thành công!')
      }
      
      // Reset form and close modal
      resetForm()
      setShowModal(false)
      setEditingService(null)
      
      // Refresh the list
      loadServices()
      
    } catch (error) {
      console.error('Error:', error)
      showError(
        'Có lỗi xảy ra',
        error instanceof Error ? error.message : 'Vui lòng thử lại sau.'
      )
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      icon: service.icon || 'Battery',
      price: service.price || 'Từ 500.000₫',
      description: service.description || '',
      options: service.options || ['30 phút', '12 tháng bảo hành', 'Chất lượng đảm bảo'],
      highlights: service.highlights || ['Linh kiện chính hãng', 'Bảo hành 12 tháng', 'Thay trong 30 phút', 'Kiểm tra miễn phí'],
      header_tag: service.header_tag || '',
      price_min: service.price_min,
      price_max: service.price_max,
      applied_for: service.applied_for,
      option_1: service.option_1,
      option_1_default: service.option_1_default,
      option_2: service.option_2,
      option_2_default: service.option_2_default,
      option_3: service.option_3,
      option_3_default: service.option_3_default,
      button_text: service.button_text || 'Đặt lịch ngay',
      is_active: service.is_active,
      display_order: service.display_order
    })
    setNewOption('')
    setNewHighlight('')
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa dịch vụ này?')) {
      try {
        await deleteService(id)
        loadServices()
      } catch (error) {
        console.error('Error deleting service:', error)
      }
    }
  }

  const handleToggleStatus = async (id: number) => {
    try {
      await toggleServiceStatus(id)
      loadServices()
    } catch (error) {
      console.error('Error toggling service status:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      icon: 'Battery',
      price: 'Từ 500.000₫',
      description: '',
      options: ['30 phút', '12 tháng bảo hành', 'Chất lượng đảm bảo'],
      highlights: ['Linh kiện chính hãng', 'Bảo hành 12 tháng', 'Thay trong 30 phút', 'Kiểm tra miễn phí'],
      header_tag: '',
      price_min: 0,
      price_max: 0,
      applied_for: [],
      option_1: 'Linh kiện chính hãng',
      option_1_default: true,
      option_2: 'Bảo hành 12 tháng',
      option_2_default: true,
      option_3: 'Thay trong 30 phút',
      option_3_default: true,
      button_text: 'Đặt lịch ngay',
      is_active: true,
      display_order: services.length
    })
    setNewOption('')
    setNewHighlight('')
  }

  const openAddModal = () => {
    setEditingService(null)
    resetForm()
    setShowModal(true)
  }


  const addOption = () => {
    if (newOption.trim() && formData.options.length < 3 && !formData.options.includes(newOption.trim())) {
      setFormData(prev => ({
        ...prev,
        options: [...prev.options, newOption.trim()]
      }))
      setNewOption('')
    }
  }

  const removeOption = (item: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter(option => option !== item)
    }))
  }

  const addHighlight = () => {
    if (newHighlight.trim() && formData.highlights.length < 4 && !formData.highlights.includes(newHighlight.trim())) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }))
      setNewHighlight('')
    }
  }

  const removeHighlight = (item: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter(highlight => highlight !== item)
    }))
  }

  const moveService = async (id: number, direction: 'up' | 'down') => {
    const currentIndex = services.findIndex(s => s.id === id)
    if (currentIndex === -1) return

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    if (newIndex < 0 || newIndex >= services.length) return

    const newServices = [...services]
    const [movedService] = newServices.splice(currentIndex, 1)
    newServices.splice(newIndex, 0, movedService)

    // Update display orders
    const serviceOrders = newServices.map((service, index) => ({
      id: service.id,
      display_order: index
    }))

    try {
      await reorderServices(serviceOrders)
      loadServices()
    } catch (error) {
      console.error('Error reordering services:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Đang tải...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Quản lý dịch vụ thay pin</h3>
          <p className="text-sm text-muted-foreground">
            Tổng cộng {services.length} dịch vụ
          </p>
        </div>
        <Button onClick={openAddModal} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Thêm dịch vụ
        </Button>
      </div>

      {/* Services List */}
      <div className="grid gap-4">
        {services.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8 text-muted-foreground">
              <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Chưa có dịch vụ nào</p>
              <Button onClick={openAddModal} variant="outline" className="mt-4">
                Thêm dịch vụ đầu tiên
              </Button>
            </CardContent>
          </Card>
        ) : (
          services.map((service, index) => (
            <Card key={service.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Order Controls */}
                    <div className="flex flex-col space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveService(service.id, 'up')}
                        disabled={index === 0}
                        className="h-6 w-6 p-0"
                      >
                        <ArrowUp className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveService(service.id, 'down')}
                        disabled={index === services.length - 1}
                        className="h-6 w-6 p-0"
                      >
                        <ArrowDown className="w-3 h-3" />
                      </Button>
                    </div>

                    {/* Service Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{service.title}</h4>
                        {service.header_tag && (
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {service.header_tag}
                          </Badge>
                        )}
                        {service.is_active ? (
                          <Badge className="bg-green-100 text-green-800">
                            <Eye className="w-3 h-3 mr-1" />
                            Hoạt động
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <EyeOff className="w-3 h-3 mr-1" />
                            Tạm dừng
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>Icon:</strong> {service.icon || 'N/A'}</p>
                        <p><strong>Giá hiển thị:</strong> {service.price || 'N/A'}</p>
                        <p><strong>Mô tả:</strong> {service.description ? (service.description.length > 50 ? service.description.substring(0, 50) + '...' : service.description) : 'N/A'}</p>
                        <p><strong>Tùy chọn:</strong> {service.options ? service.options.join(', ') : 'N/A'}</p>
                        <p><strong>Đặc điểm nổi bật:</strong> {service.highlights ? service.highlights.join(', ') : 'N/A'}</p>
                        <p><strong>Thứ tự:</strong> {service.display_order}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleStatus(service.id)}
                    >
                      {service.is_active ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(service)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(service.id)}
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
          <div className="bg-background rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">
              {editingService ? 'Chỉnh sửa dịch vụ' : 'Thêm dịch vụ mới'}
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Tên dịch vụ *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="iPhone 15 Series"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="header_tag">Tag header (tùy chọn)</Label>
                  <Input
                    id="header_tag"
                    value={formData.header_tag}
                    onChange={(e) => setFormData(prev => ({ ...prev, header_tag: e.target.value }))}
                    placeholder="Phổ biến"
                  />
                </div>
              </div>

              {/* New Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="icon">Icon (Lucide React) *</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="Battery, Zap, Wrench, Smartphone"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="price">Giá hiển thị *</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="Từ 500.000₫, Miễn phí, 200.000₫"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Mô tả dịch vụ *</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Thay pin chính hãng cho tất cả các dòng iPhone..."
                  required
                />
              </div>



              {/* Options Section (Max 3 items) */}
              <div>
                <Label>3 Tùy chọn dịch vụ (tối đa 3 mục) *</Label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newOption}
                    onChange={(e) => setNewOption(e.target.value)}
                    placeholder="30 phút, 12 tháng bảo hành, Chất lượng đảm bảo"
                    disabled={formData.options.length >= 3}
                  />
                  <Button 
                    type="button" 
                    onClick={addOption}
                    disabled={formData.options.length >= 3 || !newOption.trim()}
                  >
                    Thêm
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.options.map((item, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{item}</span>
                      <button
                        type="button"
                        className="ml-1 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeOption(item)
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {formData.options.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-1">Vui lòng thêm ít nhất 1 tùy chọn</p>
                )}
              </div>

              {/* Highlights Section (Max 4 items) */}
              <div>
                <Label>4 Đặc điểm nổi bật (tối đa 4 mục) *</Label>
                <div className="flex space-x-2 mb-2">
                  <Input
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Linh kiện chính hãng, Bảo hành 12 tháng, Thay trong 30 phút, Kiểm tra miễn phí"
                    disabled={formData.highlights.length >= 4}
                  />
                  <Button 
                    type="button" 
                    onClick={addHighlight}
                    disabled={formData.highlights.length >= 4 || !newHighlight.trim()}
                  >
                    Thêm
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.highlights.map((item, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{item}</span>
                      <button
                        type="button"
                        className="ml-1 hover:text-red-500 transition-colors"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          removeHighlight(item)
                        }}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
                {formData.highlights.length === 0 && (
                  <p className="text-sm text-muted-foreground mt-1">Vui lòng thêm ít nhất 1 đặc điểm nổi bật</p>
                )}
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
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowModal(false)
                    setEditingService(null)
                    resetForm()
                  }}
                >
                  Hủy
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  {editingService ? 'Cập nhật' : 'Thêm'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
