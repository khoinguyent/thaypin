import { ShieldCheck, Check, Zap, Eye } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const ITEMS = [
  {
    id: "warranty",
    icon: ShieldCheck,
    title: "Bảo Hành 12 Tháng",
  },
  {
    id: "genuine",
    icon: Check,
    title: "Linh Kiện Chính Hãng",
  },
  {
    id: "fast",
    icon: Zap,
    title: "Thay Lấy Ngay (30')",
  },
  {
    id: "watch",
    icon: Eye,
    title: "Xem Trực Tiếp",
  },
]

export default function BenefitsSection() {
  return (
    <section aria-label="Benefits" className="py-10 bg-muted/40">
      <div className="container mx-auto px-4">
        <Card className="bg-card border-border">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {ITEMS.map(({ id, icon: Icon, title }) => (
                <div key={id} className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className="text-lg font-semibold text-foreground leading-snug">
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}


