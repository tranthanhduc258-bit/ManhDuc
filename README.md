# Website PG Food – Phạm Group

Website bán hàng & tuyển đại lý cho **PG Food** (Công ty TNHH Tập đoàn Phạm Group).
Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Framer Motion · deploy trên Vercel.

## Chạy trên máy tính

```bash
npm install
npm run dev        # mở http://localhost:3000
npm run build      # kiểm tra trước khi đưa lên
```

## Sửa nội dung – tất cả nằm trong `src/data/`

| File | Nội dung |
|---|---|
| `site.ts` | Tên công ty, MST, địa chỉ, hotline, email, tài khoản ngân hàng, logo Bộ Công Thương, ảnh giấy phép, bật/tắt vệt sáng con trỏ |
| `products.ts` | **Sản phẩm & giá** |
| `categories.ts` | Danh mục sản phẩm |
| `articles.ts` | Bài viết Kiến thức |
| `policies.ts` | 4 trang chính sách |
| `dealer.ts` | Quyền lợi, cấp đại lý, quy trình |
| `about.ts`, `home.ts` | Trang Giới thiệu, 3 điểm mạnh trang chủ |
| `provinces.ts` | Danh sách tỉnh/thành trong form |
| `src/i18n/vi.ts` | Chữ trên nút, menu, form (sẵn sàng thêm tiếng Anh) |

### Sửa giá
Mở `src/data/products.ts`, đổi `retailPrice: 0` thành giá (đơn vị đồng, không dấu chấm), ví dụ `retailPrice: 25000`.
- `0` → web hiện **"Liên hệ"** và ẩn nút thêm vào giỏ.
- Giá tính tiền luôn lấy từ file này trên máy chủ (khách không sửa được giá).

### Thêm sản phẩm
1. Chép ảnh vào `public/products/` (ví dụ `sua-chua-dau.jpg`).
2. Trong `products.ts` chép 1 khối `{ ... }` rồi sửa `slug` (không dấu, gạch ngang), `name`, `size`, `retailPrice`, `images`, `highlights`.
3. `status: "coming-soon"` để hiện ô "Sắp ra mắt". `featured: true` để hiện ở trang chủ (tối đa 3).
4. Muốn tab Thành phần / Giấy công bố riêng: thêm `ingredients`, `declarationImages: ["/cong-bo/abc.jpg"]`.

### Ảnh giấy phép kinh doanh, logo Bộ Công Thương
Chép ảnh vào `public/`, rồi khai báo trong `site.ts` (`businessLicenseImage`, `bctNotified`).
⚠️ Ảnh giấy phép nên **che số định danh cá nhân và ngày sinh** trước khi đưa lên.

## Nơi nhận đơn

Đơn hàng, đăng ký đại lý, liên hệ → `src/lib/orderDestination.ts`, chọn bằng biến `ORDER_DESTINATION`:
- `google-sheets` – ghi vào Google Sheet (mặc định). Hướng dẫn: **[HUONG-DAN-GOOGLE-SHEET.md](HUONG-DAN-GOOGLE-SHEET.md)**
- `console` – chỉ ghi log (thử nghiệm)

Báo đơn tức thì: Telegram (`TELEGRAM_*`) và/hoặc email Resend (`EMAIL_*`). Xem `.env.example`.

**Đổi sang Haravan / Sapo / KiotViet sau này:** viết thêm 1 "destination" trong `orderDestination.ts` (3 hàm `saveOrder`, `saveDealer`, `saveContact`) – không phải sửa giao diện.

Đã có sẵn: kiểm tra SĐT Việt Nam, chống gửi trùng (máy chủ + Apps Script), ô bẫy spam (honeypot), giới hạn tốc độ gửi, bắt buộc đồng ý chính sách bảo mật, mã đơn dạng `PG-YYMMDD-XXXX`, giỏ hàng lưu trong trình duyệt.

## Đưa lên Vercel

1. Đăng nhập <https://vercel.com> bằng GitHub → **Add New → Project** → chọn repo này → **Deploy** (không cần chỉnh gì).
2. **Settings → Environment Variables**: nhập các biến trong `.env.example` → **Redeploy**.
3. Mỗi lần sửa code và đẩy lên GitHub, Vercel tự cập nhật web.

## Gắn tên miền (ví dụ pgfood.vn)

1. Vercel → dự án → **Settings → Domains** → nhập `pgfood.vn` → **Add** (thêm cả `www.pgfood.vn`).
2. Vào trang quản lý tên miền (Mắt Bão, PA Việt Nam, Nhân Hòa...) → phần **DNS**, thêm đúng bản ghi Vercel hiển thị, thường là:
   - `A` · `@` · `76.76.21.21`
   - `CNAME` · `www` · `cname.vercel-dns.com`
3. Chờ 5–60 phút, Vercel tự cấp HTTPS.
4. Đặt biến `NEXT_PUBLIC_SITE_URL=https://pgfood.vn` rồi Redeploy (để sitemap, SEO dùng đúng tên miền).
5. Khai báo sitemap `https://pgfood.vn/sitemap.xml` trên Google Search Console.

## Cấu trúc trang

`/` Trang chủ · `/gioi-thieu` · `/san-pham` · `/san-pham/[slug]` · `/gio-hang` · `/dat-hang` · `/dai-ly` · `/kien-thuc` · `/kien-thuc/[slug]` · `/lien-he` · `/chinh-sach/(giao-hang|doi-tra|bao-mat|thanh-toan)`

## Việc anh cần điền (tìm chữ `TODO` trong `src/data/`)

- [ ] Giá bán lẻ 3 sản phẩm
- [ ] Thành phần sản phẩm theo nhãn phụ / hồ sơ công bố, ảnh giấy công bố
- [ ] Thời gian, phí giao hàng; thời hạn đổi trả
- [ ] Thông tin tài khoản ngân hàng
- [ ] Ảnh giấy phép kinh doanh (đã che thông tin cá nhân), logo Bộ Công Thương khi có
