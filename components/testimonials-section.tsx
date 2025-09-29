import Image from "next/image"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import testimonials from "@/data/testimonials.json"

type Testimonial = {
  id: string
  name: string
  location: string
  rating: number
  avatarUrl: string
  quote: string
}

export default function TestimonialsSection() {
  const items = testimonials as Testimonial[]

  return (
    <section aria-label="Testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-space-grotesk font-bold text-3xl lg:text-4xl text-foreground mb-2">
            Khách Hàng Nói Gì Về ThayPin.vn?
          </h2>
          {/* <p className="text-muted-foreground">Được đánh giá 4.9/5 trên Google</p> */}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((t) => (
            <Card key={t.id} className="bg-card border-border">
              <CardContent className="p-6">
                <p className="text-lg text-muted-foreground italic leading-relaxed mb-6">“{t.quote}”</p>
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12">
                    <Image
                      src={t.avatarUrl}
                      alt={t.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className="text-base">{t.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}


