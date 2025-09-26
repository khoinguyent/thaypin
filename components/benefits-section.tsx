import { ShieldCheck, Check, Zap, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const ITEMS = [
  {
    id: "warranty",
    icon: ShieldCheck,
    title: "Bảo Hành 12 Tháng",
    description: "Bảo hành dài hạn cho tất cả dịch vụ thay pin",
  },
  {
    id: "genuine",
    icon: Check,
    title: "Linh Kiện Chính Hãng",
    description: "Chỉ sử dụng linh kiện đạt chuẩn, nguồn gốc rõ ràng",
  },
  {
    id: "fast",
    icon: Zap,
    title: "Thay Lấy Ngay (30')",
    description: "Hoàn tất nhanh chóng, tiết kiệm thời gian của bạn",
  },
  {
    id: "watch",
    icon: Eye,
    title: "Xem Trực Tiếp",
    description: "Theo dõi toàn bộ quy trình thay pin minh bạch",
  },
]

export default function BenefitsSection() {
  return (
    <section aria-label="Benefits" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map(({ id, icon: Icon, title, description }) => (
            <Card
              key={id}
              className="bg-card border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
                {description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


