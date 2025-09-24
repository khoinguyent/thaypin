"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toast-provider"
import { 
  MessageSquare, 
  Search, 
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Phone,
  Mail,
  Clock,
  User,
  ArrowLeft,
  RefreshCw,
  Trash2
} from "lucide-react"
import Link from "next/link"
import { getContactMessagesGrouped, getContactMessages, updateMessageStatus, deleteContactMessage, type ContactMessage } from "@/lib/message-actions"

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [groupedMessages, setGroupedMessages] = useState<{ [key: string]: ContactMessage[] }>({})
  const [stats, setStats] = useState({ total: 0, pending: 0, read: 0, replied: 0, closed: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const router = useRouter()
  const { showError } = useToast()

  const loadMessages = useCallback(async () => {
    try {
      console.log("=== loadMessages called ===")
      console.log("Loading messages with filter:", filterStatus)
      console.log("Current window.location.origin:", typeof window !== 'undefined' ? window.location.origin : 'undefined')
      
      // Try the new grouped API first
      try {
        const result = await getContactMessagesGrouped(filterStatus === "all" ? undefined : filterStatus)
        console.log("Loaded grouped result:", result)
        
        if (result.messages && result.groupedMessages && result.stats) {
          setMessages(result.messages)
          setGroupedMessages(result.groupedMessages)
          setStats(result.stats)
          return
        }
      } catch (groupedError) {
        console.log("Grouped API failed, trying fallback:", groupedError)
      }
      
      // Fallback: Use simple API and create grouping manually
      const simpleResult = await getContactMessages(filterStatus === "all" ? undefined : filterStatus)
      console.log("Loaded simple result:", simpleResult)
      
      setMessages(simpleResult)
      
      // Create grouping manually
      const manualGrouping = groupMessagesByDate(simpleResult)
      setGroupedMessages(manualGrouping)
      
      // Calculate stats manually
      const manualStats = {
        total: simpleResult.length,
        pending: simpleResult.filter((m: ContactMessage) => m.status === "pending").length,
        read: simpleResult.filter((m: ContactMessage) => m.status === "read").length,
        replied: simpleResult.filter((m: ContactMessage) => m.status === "replied").length,
        closed: simpleResult.filter((m: ContactMessage) => m.status === "closed").length,
      }
      setStats(manualStats)
      
    } catch (error) {
      console.error("Lỗi khi tải tin nhắn:", error)
    } finally {
      setIsLoading(false)
    }
  }, [filterStatus])

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("adminToken")
    console.log("Admin token check:", token ? "Token exists" : "No token")
    
    if (!token) {
      console.log("No admin token, redirecting to login")
      router.push("/admin/login")
      return
    }

    console.log("Token found, loading messages...")
    loadMessages()
  }, [router, loadMessages])

  const groupMessagesByDate = (messages: ContactMessage[]) => {
    const groups: { [key: string]: ContactMessage[] } = {}
    
    messages.forEach(message => {
      const date = new Date(message.created_at)
      const dateKey = date.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
      
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      
      groups[dateKey].push(message)
    })
    
    // Sort groups by date (newest first)
    const sortedGroups = Object.keys(groups)
      .sort((a, b) => {
        const dateA = new Date(a.split(' ').reverse().join('-'))
        const dateB = new Date(b.split(' ').reverse().join('-'))
        return dateB.getTime() - dateA.getTime()
      })
      .reduce((result, key) => {
        result[key] = groups[key]
        return result
      }, {} as { [key: string]: ContactMessage[] })
    
    return sortedGroups
  }

  const handleStatusUpdate = async (messageId: string, newStatus: "read" | "replied" | "closed") => {
    setIsUpdating(messageId)
    try {
      const success = await updateMessageStatus(messageId, newStatus)
      if (success) {
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, status: newStatus } : msg
        ))
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error)
      showError("Có lỗi xảy ra khi cập nhật trạng thái")
    } finally {
      setIsUpdating(null)
    }
  }

  const handleDelete = async (messageId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tin nhắn này?")) return

    setIsUpdating(messageId)
    try {
      const success = await deleteContactMessage(messageId)
      if (success) {
        setMessages(prev => prev.filter(msg => msg.id !== messageId))
      }
    } catch (error) {
      console.error("Lỗi khi xóa tin nhắn:", error)
      showError("Có lỗi xảy ra khi xóa tin nhắn")
    } finally {
      setIsUpdating(null)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", text: "Chờ xử lý" },
      read: { color: "bg-blue-100 text-blue-800", text: "Đã đọc" },
      replied: { color: "bg-green-100 text-green-800", text: "Đã phản hồi" },
      closed: { color: "bg-gray-100 text-gray-800", text: "Đã đóng" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return (
      <Badge className={`${config.color} text-xs`}>
        {config.text}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.phone.includes(searchTerm) ||
      (message.email && message.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (message.message && message.message.toLowerCase().includes(searchTerm.toLowerCase()))
    
    return matchesSearch
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải tin nhắn...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Quản lý tin nhắn</h1>
                <p className="text-sm text-muted-foreground">
                  Quản lý tin nhắn liên hệ từ khách hàng
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={loadMessages}
                disabled={isUpdating !== null}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isUpdating !== null ? 'animate-spin' : ''}`} />
                Làm mới
              </Button>
              <Link href="/admin/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Quay về Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                  <div className="text-sm text-muted-foreground">Tổng tin nhắn</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.pending}</div>
                  <div className="text-sm text-muted-foreground">Chờ xử lý</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.replied}</div>
                  <div className="text-sm text-muted-foreground">Đã phản hồi</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stats.closed}</div>
                  <div className="text-sm text-muted-foreground">Đã đóng</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white border-0 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Tìm kiếm</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Tìm kiếm theo tên, SĐT, email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Trạng thái</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full p-2 border border-border rounded-md bg-background"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="pending">Chờ xử lý</option>
                  <option value="read">Đã đọc</option>
                  <option value="replied">Đã phản hồi</option>
                  <option value="closed">Đã đóng</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Hành động</label>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("")
                    setFilterStatus("all")
                  }}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Xóa bộ lọc
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Danh sách tin nhắn ({filteredMessages.length})</CardTitle>
            <CardDescription>
              Quản lý tất cả tin nhắn liên hệ từ khách hàng
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Không có tin nhắn</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "all" 
                    ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm"
                    : "Chưa có tin nhắn nào được gửi"
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                {Object.entries(groupedMessages).map(([date, dateMessages]) => {
                  const filteredDateMessages = dateMessages.filter(message => {
                    const matchesSearch = 
                      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      message.phone.includes(searchTerm) ||
                      (message.email && message.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
                      (message.message && message.message.toLowerCase().includes(searchTerm.toLowerCase()))
                    
                    return matchesSearch
                  })

                  if (filteredDateMessages.length === 0) return null

                  return (
                    <div key={date} className="space-y-4">
                      {/* Date Header */}
                      <div className="flex items-center space-x-3 py-2 border-b border-border">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <h3 className="font-semibold text-foreground text-lg">{date}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {filteredDateMessages.length} tin nhắn
                        </Badge>
                      </div>

                      {/* Messages for this date */}
                      <div className="space-y-4">
                        {filteredDateMessages.map((message) => (
                          <div key={message.id} className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                  <User className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-foreground text-lg">{message.name}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <div className="flex items-center">
                                      <Phone className="w-4 h-4 mr-1" />
                                      {message.phone}
                                    </div>
                                    {message.email && (
                                      <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-1" />
                                        {message.email}
                                      </div>
                                    )}
                                    <div className="flex items-center">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {formatDate(message.created_at)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                {getStatusBadge(message.status)}
                              </div>
                            </div>

                            {message.service && (
                              <div className="mb-3">
                                <Badge variant="outline" className="text-xs">
                                  Dịch vụ: {message.service}
                                </Badge>
                              </div>
                            )}

                            {message.message && (
                              <div className="mb-4">
                                <p className="text-muted-foreground leading-relaxed bg-slate-50 p-4 rounded-lg">
                                  {message.message}
                                </p>
                              </div>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(message.id, "read")}
                                  disabled={isUpdating === message.id || message.status === "read"}
                                  className="text-xs"
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  Đánh dấu đã đọc
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(message.id, "replied")}
                                  disabled={isUpdating === message.id || message.status === "replied"}
                                  className="text-xs"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Đánh dấu đã phản hồi
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleStatusUpdate(message.id, "closed")}
                                  disabled={isUpdating === message.id || message.status === "closed"}
                                  className="text-xs"
                                >
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Đóng
                                </Button>
                              </div>

                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(message.id)}
                                disabled={isUpdating === message.id}
                                className="text-red-600 border-red-200 hover:bg-red-50 text-xs"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Xóa
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
