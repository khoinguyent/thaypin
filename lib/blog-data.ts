export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  category: string
  readTime: number
  image: string
  tags: string[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "cach-kiem-tra-tinh-trang-pin-iphone",
    title: "Cách Kiểm Tra Tình Trạng Pin iPhone Tại Nhà",
    excerpt:
      "Hướng dẫn chi tiết cách kiểm tra độ chai pin, dung lượng pin và tình trạng sức khỏe pin iPhone một cách đơn giản.",
    content: `
# Cách Kiểm Tra Tình Trạng Pin iPhone Tại Nhà

Pin iPhone là một trong những linh kiện quan trọng nhất quyết định đến trải nghiệm sử dụng thiết bị. Theo thời gian, pin sẽ bị chai và giảm hiệu suất. Việc kiểm tra tình trạng pin định kỳ sẽ giúp bạn biết khi nào cần thay pin mới.

## Kiểm Tra Qua Cài Đặt iOS

### Bước 1: Truy cập Battery Health
- Mở **Cài đặt** > **Pin** > **Tình trạng Pin & Sạc**
- Xem mục **Dung lượng tối đa**

### Bước 2: Đánh giá kết quả
- **100-80%**: Pin còn tốt, không cần thay
- **80-70%**: Pin bắt đầu chai, nên theo dõi
- **Dưới 70%**: Nên thay pin mới

## Các Dấu Hiệu Pin Cần Thay

### Dấu hiệu rõ ràng:
- iPhone tắt đột ngột khi còn pin
- Pin tụt nhanh bất thường
- Sạc chậm hoặc không sạc được
- Máy nóng khi sạc

### Kiểm tra bằng ứng dụng

Bạn có thể sử dụng các ứng dụng như **Battery Life** hoặc **CoconutBattery** để kiểm tra chi tiết hơn.

## Khi Nào Nên Thay Pin?

Theo Apple, pin iPhone được thiết kế để giữ được 80% dung lượng sau 500 chu kỳ sạc. Nếu pin của bạn xuống dưới 80%, đây là lúc nên cân nhắc thay pin mới.

## Lời Khuyên Từ Chuyên Gia

Tại **Thaypin.vn**, chúng tôi khuyên bạn nên kiểm tra pin định kỳ 3-6 tháng một lần. Nếu phát hiện bất kỳ dấu hiệu bất thường nào, hãy mang iPhone đến kiểm tra miễn phí tại cửa hàng.

*Liên hệ ngay: 0123 456 789 để được tư vấn miễn phí!*
    `,
    author: "Nguyễn Văn A",
    publishedAt: "2024-01-15",
    category: "Hướng dẫn",
    readTime: 5,
    image: "/placeholder.svg?height=400&width=600&text=Kiểm+tra+pin+iPhone",
    tags: ["kiểm tra pin", "iPhone", "battery health", "hướng dẫn"],
  },
  {
    slug: "meo-keo-dai-tuoi-tho-pin-iphone",
    title: "10 Mẹo Kéo Dài Tuổi Thọ Pin iPhone Hiệu Quả",
    excerpt: "Những mẹo đơn giản nhưng hiệu quả giúp bạn kéo dài tuổi thọ pin iPhone và tiết kiệm chi phí thay pin.",
    content: `
# 10 Mẹo Kéo Dài Tuổi Thọ Pin iPhone Hiệu Quả

Pin iPhone có thể kéo dài tuổi thọ đáng kể nếu bạn biết cách sử dụng và bảo quản đúng cách. Dưới đây là 10 mẹo được các chuyên gia khuyên dùng.

## 1. Tránh Sạc Qua Đêm Thường Xuyên

Mặc dù iPhone có tính năng tối ưu hóa sạc pin, việc sạc qua đêm thường xuyên vẫn có thể ảnh hưởng đến tuổi thọ pin.

**Lời khuyên**: Sạc đến 80-90% và rút sạc, sạc lại khi pin xuống 20-30%.

## 2. Sử dụng Sạc Chính Hãng

Sạc kém chất lượng có thể làm hỏng pin và các linh kiện khác.

**Nên dùng**:
- Sạc Apple chính hãng
- Sạc MFi certified
- Sạc từ thương hiệu uy tín

## 3. Tránh Nhiệt Độ Cực Đoan

Pin lithium-ion rất nhạy cảm với nhiệt độ.

**Tránh**:
- Để iPhone dưới ánh nắng trực tiếp
- Sử dụng trong môi trường quá nóng (>35°C)
- Để trong xe hơi nóng

## 4. Cập Nhật iOS Thường Xuyên

Apple liên tục tối ưu hóa quản lý pin qua các bản cập nhật iOS.

## 5. Quản Lý Ứng Dụng Chạy Nền

Kiểm tra và tắt các ứng dụng tiêu tốn pin không cần thiết:
- **Cài đặt** > **Pin** > xem ứng dụng tiêu tốn pin nhiều nhất

## 6. Tối Ưu Hóa Cài Đặt Màn Hình

- Giảm độ sáng màn hình
- Bật Auto-Brightness
- Sử dụng Dark Mode (iPhone OLED)
- Giảm thời gian tự động khóa màn hình

## 7. Quản Lý Kết Nối

- Tắt WiFi, Bluetooth khi không dùng
- Tắt AirDrop khi không cần
- Sử dụng chế độ máy bay ở vùng sóng yếu

## 8. Sử dụng Low Power Mode

Bật chế độ tiết kiệm pin khi pin dưới 20% hoặc khi cần kéo dài thời gian sử dụng.

## 9. Kiểm Tra Pin Định Kỳ

Theo dõi tình trạng pin qua **Cài đặt** > **Pin** > **Tình trạng Pin**.

## 10. Bảo Trì Pin Chuyên Nghiệp

Mang iPhone đến bảo trì pin định kỳ 6-12 tháng một lần tại các cửa hàng uy tín.

## Kết Luận

Việc áp dụng những mẹo trên sẽ giúp pin iPhone của bạn hoạt động tốt hơn và bền bỉ hơn. Nếu pin đã bị chai nghiêm trọng, hãy liên hệ **Thaypin.vn** để được tư vấn thay linh kiện chính hãng.

*Đặt lịch thay pin: 0123 456 789*
    `,
    author: "Trần Thị B",
    publishedAt: "2024-01-10",
    category: "Mẹo hay",
    readTime: 7,
    image: "/placeholder.svg?height=400&width=600&text=Mẹo+kéo+dài+tuổi+thọ+pin",
    tags: ["tiết kiệm pin", "mẹo hay", "bảo vệ pin", "iPhone"],
  },
  {
    slug: "tai-sao-pin-iphone-chai-nhanh",
    title: "Tại Sao Pin iPhone Chai Nhanh? Nguyên Nhân Và Cách Khắc Phục",
    excerpt: "Phân tích các nguyên nhân khiến pin iPhone bị chai nhanh và đưa ra giải pháp khắc phục hiệu quả.",
    content: `
# Tại Sao Pin iPhone Chai Nhanh? Nguyên Nhân Và Cách Khắc Phục

Pin iPhone bị chai là vấn đề phổ biến mà nhiều người dùng gặp phải. Hiểu rõ nguyên nhân sẽ giúp bạn có cách khắc phục phù hợp.

## Nguyên Nhân Pin iPhone Chai Nhanh

### 1. Chu Kỳ Sạc Tự Nhiên

Pin lithium-ion có tuổi thọ giới hạn, thường là 300-500 chu kỳ sạc đầy.

**Một chu kỳ sạc** = sạc từ 0% lên 100% (có thể chia thành nhiều lần sạc)

### 2. Thói Quen Sạc Không Đúng

- Sạc qua đêm thường xuyên
- Để pin xuống 0% rồi mới sạc
- Sạc khi đang sử dụng ứng dụng nặng

### 3. Nhiệt Độ Môi Trường

Pin hoạt động tốt nhất ở 16-22°C. Nhiệt độ cao làm tăng tốc độ lão hóa pin.

### 4. Sử dụng Sạc Kém Chất Lượng

Sạc không chính hãng có thể:
- Cung cấp dòng điện không ổn định
- Làm nóng pin
- Gây hỏng mạch sạc

### 5. Ứng Dụng Chạy Nền

Nhiều ứng dụng chạy ngầm tiêu tốn pin liên tục, khiến pin phải làm việc nhiều hơn.

## Dấu Hiệu Pin Bị Chai

### Dấu hiệu sớm:
- Pin tụt nhanh hơn bình thường
- Thời gian sạc lâu hơn
- Máy hơi nóng khi sạc

### Dấu hiệu nghiêm trọng:
- iPhone tắt đột ngột khi còn pin
- Pin phồng (màn hình bị đẩy lên)
- Không sạc được hoặc sạc rất chậm

## Cách Khắc Phục

### 1. Thay Đổi Thói Quen Sạc

- Sạc khi pin còn 20-30%
- Rút sạc khi đạt 80-90%
- Tránh sạc qua đêm thường xuyên

### 2. Sử dụng Sạc Chính Hãng

Đầu tư sạc Apple chính hãng hoặc sạc MFi certified chất lượng cao.

### 3. Quản Lý Nhiệt Độ

- Tránh để iPhone ở nơi nóng
- Tháo ốp lưng khi sạc
- Không sử dụng khi đang sạc

### 4. Tối Ưu Hóa Cài Đặt

- Bật Low Power Mode khi cần
- Tắt Background App Refresh
- Giảm độ sáng màn hình

### 5. Cập Nhật Phần Mềm

Luôn cập nhật iOS mới nhất để có các tối ưu hóa pin tốt nhất.

## Khi Nào Cần Thay Pin?

Theo Apple, nên thay pin khi:
- Battery Health dưới 80%
- iPhone hiển thị thông báo "Service"
- Pin không đáp ứng nhu cầu sử dụng hàng ngày

## Lời Khuyên Từ Chuyên Gia

Tại **Thaypin.vn**, chúng tôi thường xuyên gặp các trường hợp pin chai do thói quen sử dụng không đúng. Việc thay đổi thói quen sớm có thể kéo dài tuổi thọ pin đáng kể.

**Dịch vụ của chúng tôi**:
- Kiểm tra pin miễn phí
- Thay linh kiện chính hãng
- Tư vấn cách sử dụng đúng

*Liên hệ ngay: 0123 456 789 để được tư vấn!*
    `,
    author: "Lê Văn C",
    publishedAt: "2024-01-05",
    category: "Kiến thức",
    readTime: 8,
    image: "/placeholder.svg?height=400&width=600&text=Pin+iPhone+chai+nhanh",
    tags: ["pin chai", "nguyên nhân", "khắc phục", "iPhone"],
  },
  {
    slug: "so-sanh-pin-chinh-hang-va-pin-zin",
    title: "So Sánh Linh Kiện Chính Hãng Và Pin Zin: Nên Chọn Loại Nào?",
    excerpt: "Phân tích chi tiết sự khác biệt giữa pin chính hãng Apple và pin zin, giúp bạn đưa ra lựa chọn phù hợp.",
    content: `
# So Sánh Pin Chính Hãng Và Pin Zin: Nên Chọn Loại Nào?

Khi cần thay pin iPhone, nhiều người băn khoăn giữa pin chính hãng Apple và pin zin. Bài viết này sẽ giúp bạn hiểu rõ sự khác biệt để đưa ra lựa chọn phù hợp.

## Pin Chính Hãng Apple

### Ưu điểm:
- **Chất lượng đảm bảo**: Được sản xuất theo tiêu chuẩn Apple
- **Tuổi thọ cao**: Thường kéo dài 2-3 năm
- **An toàn tuyệt đối**: Không có nguy cơ cháy nổ
- **Tương thích hoàn hảo**: Hoạt động tối ưu với iOS
- **Bảo hành chính thức**: Được Apple bảo hành

### Nhược điểm:
- **Giá cao**: Thường đắt hơn 30-50% so với pin zin
- **Khó kiếm**: Không phải cửa hàng nào cũng có
- **Thời gian chờ**: Có thể phải đặt trước

## Pin Zin (Pin Tháo Máy)

### Ưu điểm:
- **Giá rẻ hơn**: Tiết kiệm 30-50% chi phí
- **Dễ tìm**: Có sẵn tại nhiều cửa hàng
- **Chất lượng tốt**: Nếu chọn đúng nguồn

### Nhược điểm:
- **Không rõ nguồn gốc**: Khó biết pin đã qua sử dụng bao lâu
- **Tuổi thọ không đảm bảo**: Có thể chỉ kéo dài 6-12 tháng
- **Rủi ro về chất lượng**: Pin kém có thể gây hỏng máy
- **Không có bảo hành chính thức**

## Bảng So Sánh Chi Tiết

| Tiêu chí | Pin Chính Hãng | Pin Zin |
|----------|----------------|---------|
| **Giá cả** | 1.000.000 - 1.500.000đ | 600.000 - 900.000đ |
| **Tuổi thọ** | 2-3 năm | 6-18 tháng |
| **Bảo hành** | 12 tháng | 3-6 tháng |
| **An toàn** | Rất cao | Trung bình |
| **Hiệu suất** | 100% | 80-95% |

## Cách Nhận Biết Pin Chính Hãng

### Kiểm tra bao bì:
- Logo Apple rõ nét
- Mã vạch và serial number
- Chất liệu bao bì cao cấp

### Kiểm tra pin:
- Có logo Apple trên pin
- Chữ in rõ nét, không bị mờ
- Kích thước chuẩn xác

### Kiểm tra sau khi lắp:
- iOS nhận diện đúng
- Không có cảnh báo về pin
- Hiệu suất ổn định

## Lời Khuyên Từ Chuyên Gia

### Nên chọn pin chính hãng khi:
- iPhone còn mới (dưới 3 năm tuổi)
- Sử dụng iPhone làm công việc quan trọng
- Có điều kiện tài chính

### Có thể chọn pin zin khi:
- iPhone đã cũ (trên 4 năm tuổi)
- Sử dụng iPhone dự phòng
- Ngân sách hạn chế

## Cam Kết Của Thaypin.vn

Tại **Thaypin.vn**, chúng tôi:
- **Chỉ sử dụng pin chính hãng Apple 100%**
- **Bảo hành 12 tháng** cho tất cả dịch vụ thay pin
- **Kiểm tra miễn phí** trước khi thay
- **Tư vấn trung thực** về tình trạng pin

### Bảng Giá Pin Chính Hãng

- **iPhone 15 Series**: 1.200.000 - 1.500.000đ
- **iPhone 14 Series**: 1.000.000 - 1.300.000đ  
- **iPhone 13 Series**: 850.000 - 1.100.000đ
- **iPhone 12 & cũ hơn**: 650.000 - 900.000đ

## Kết Luận

Pin chính hãng Apple luôn là lựa chọn tốt nhất về chất lượng và độ an toàn. Tuy nhiên, pin zin chất lượng cao cũng có thể là giải pháp tạm thời phù hợp với ngân sách.

**Quan trọng nhất** là chọn cửa hàng uy tín, có kinh nghiệm và cam kết về chất lượng dịch vụ.

*Liên hệ Thaypin.vn: 0123 456 789 để được tư vấn chi tiết!*
    `,
    author: "Phạm Văn D",
    publishedAt: "2024-01-01",
    category: "So sánh",
    readTime: 10,
    image: "/placeholder.svg?height=400&width=600&text=So+sánh+pin+iPhone",
    tags: ["pin chính hãng", "pin zin", "so sánh", "lựa chọn"],
  },
]

export const categories = ["Tất cả", "Hướng dẫn", "Mẹo hay", "Kiến thức", "So sánh"]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === "Tất cả") {
    return blogPosts
  }
  return blogPosts.filter((post) => post.category === category)
}
