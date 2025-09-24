"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  GripVertical, 
  Eye, 
  EyeOff,
  Save,
  X
} from "lucide-react"
import { 
  PricingItem, 
  CreatePricingData, 
  UpdatePricingData,
  getAllPricingItems,
  createPricingItem,
  updatePricingItem,
  deletePricingItem,
  togglePricingItemStatus,
  reorderPricingItems
} from "@/lib/pricing-actions"

export default function PricingManager() {
  const [pricingItems, setPricingItems] = useState<PricingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<PricingItem | null>(null)
  const [formData, setFormData] = useState<CreatePricingData>({
    model: '',
    price: 0,
    original_price: 0,
    is_popular: false,
    is_active: true,
    display_order: 0
  })

  useEffect(() => {
    loadPricingItems()
  }, [])

  const loadPricingItems = async () => {
    try {
      setLoading(true)
      const items = await getAllPricingItems()
      setPricingItems(items)
    } catch (error) {
      console.error('Error loading pricing items:', error)
      alert('Lỗi khi tải danh sách giá')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingItem) {
        await updatePricingItem(editingItem.id, formData)
        alert('Cập nhật giá thành công!')
      } else {
        await createPricingItem(formData)
        alert('Thêm giá thành công!')
      }
      
      setShowModal(false)
      setEditingItem(null)
      setFormData({
        model: '',
        price: 0,
        original_price: 0,
        is_popular: false,
        is_active: true,
        display_order: 0
      })
      loadPricingItems()
    } catch (error) {
      console.error('Error saving pricing item:', error)
      alert('Lỗi khi lưu giá')
    }
  }

  const handleEdit = (item: PricingItem) => {
    setEditingItem(item)
    setFormData({
      model: item.model,
      price: item.price,
      original_price: item.original_price,
      is_popular: item.is_popular,
      is_active: item.is_active,
      display_order: item.display_order
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xóa giá này?')) {
      try {
        await deletePricingItem(id)
        alert('Xóa giá thành công!')
        loadPricingItems()
      } catch (error) {
        console.error('Error deleting pricing item:', error)
        alert('Lỗi khi xóa giá')
      }
    }
  }

  const handleToggleStatus = async (id: number) => {
    try {
      await togglePricingItemStatus(id)
      loadPricingItems()
    } catch (error) {
      console.error('Error toggling pricing item status:', error)
      alert('Lỗi khi thay đổi trạng thái')
    }
  }

  const handleReorder = async (fromIndex: number, toIndex: number) => {
    const newItems = [...pricingItems]
    const [movedItem] = newItems.splice(fromIndex, 1)
    newItems.splice(toIndex, 0, movedItem)
    
    // Update display_order for all items
    const reorderedItems = newItems.map((item, index) => ({
      id: item.id,
      display_order: index + 1
    }))
    
    try {
      await reorderPricingItems(reorderedItems)
      setPricingItems(newItems)
    } catch (error) {
      console.error('Error reordering pricing items:', error)
      alert('Lỗi khi sắp xếp lại')
    }
  }

  const calculateSavings = (price: number, originalPrice: number) => {
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Quản lý bảng giá</h2>
          <p className="text-muted-foreground">Quản lý giá thay pin iPhone hiển thị trên trang chủ</p>
        </div>
        <Button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm giá mới</span>
        </Button>
      </div>

      {/* Pricing Items List */}
      <div className="grid gap-4">
        {pricingItems.map((item, index) => (
          <Card key={item.id} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
                    <span className="text-sm text-muted-foreground">#{item.display_order}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">{item.model}</h3>
                      {item.is_popular && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          Phổ biến
                        </Badge>
                      )}
                      <Badge variant={item.is_active ? "default" : "secondary"}>
                        {item.is_active ? "Hiển thị" : "Ẩn"}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-primary font-semibold">
                        {item.price.toLocaleString('vi-VN')}₫
                      </span>
                      <span className="text-muted-foreground line-through">
                        {item.original_price.toLocaleString('vi-VN')}₫
                      </span>
                      <span className="text-green-600 font-medium">
                        Tiết kiệm {calculateSavings(item.price, item.original_price)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleStatus(item.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {item.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-background">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {editingItem ? 'Chỉnh sửa giá' : 'Thêm giá mới'}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setShowModal(false)
                    setEditingItem(null)
                    setFormData({
                      model: '',
                      price: 0,
                      original_price: 0,
                      is_popular: false,
                      is_active: true,
                      display_order: 0
                    })
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="model">Model iPhone</Label>
                  <Input
                    id="model"
                    value={formData.model}
                    onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
                    placeholder="iPhone 15 Pro Max"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Giá hiện tại (₫)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                      placeholder="1200000"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="original_price">Giá gốc (₫)</Label>
                    <Input
                      id="original_price"
                      type="number"
                      value={formData.original_price}
                      onChange={(e) => setFormData(prev => ({ ...prev, original_price: parseInt(e.target.value) || 0 }))}
                      placeholder="1500000"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="display_order">Thứ tự hiển thị</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    placeholder="1"
                    required
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_popular"
                      checked={formData.is_popular}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_popular: checked }))}
                    />
                    <Label htmlFor="is_popular">Phổ biến</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
                    />
                    <Label htmlFor="is_active">Hiển thị</Label>
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowModal(false)
                      setEditingItem(null)
                      setFormData({
                        model: '',
                        price: 0,
                        original_price: 0,
                        is_popular: false,
                        is_active: true,
                        display_order: 0
                      })
                    }}
                  >
                    Hủy
                  </Button>
                  <Button type="submit" className="flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>{editingItem ? 'Cập nhật' : 'Thêm'}</span>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
