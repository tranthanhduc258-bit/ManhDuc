# Hướng dẫn nhận đơn hàng qua Gmail + Google Sheet

Làm 1 lần, khoảng 10 phút. Sau đó mỗi **đơn mua hàng**, **đăng ký đại lý**, **liên hệ** trên web sẽ:
1. Gửi **email thông báo** về Gmail (mặc định `manhducai1989@gmail.com`), có sẵn nút 📞 Gọi / 💬 Zalo cho khách.
2. Ghi thành **1 dòng trong Google Sheet** để theo dõi, phân công nhân viên.

> Nên làm bằng **chính tài khoản Gmail sẽ nhận đơn**. Mail sẽ được gửi từ tài khoản đó (Google cho phép khoảng 100 mail/ngày với Gmail thường – đủ cho bán hàng hằng ngày).

## Bước 1 – Tạo Google Sheet và dán mã

1. Vào <https://sheets.google.com> → **Trang tính trống**. Đặt tên, ví dụ `PG Food – Đơn hàng`.
2. Menu **Tiện ích mở rộng → Apps Script**.
3. Xóa hết nội dung trong `Code.gs`, dán toàn bộ nội dung file [`google-apps-script/Code.gs`](google-apps-script/Code.gs) vào.
4. Sửa 2 dòng đầu:
   - `var SECRET = 'DOI-MAT-KHAU-NAY';` → đổi thành mật khẩu riêng (chỉ chữ và số, ví dụ `PgFood2026xyz`). **Ghi lại**.
   - `var EMAIL_TO = 'manhducai1989@gmail.com';` → email nhận đơn (nhiều email cách nhau dấu phẩy).
5. Bấm 💾 **Lưu**.

## Bước 2 – Cấp quyền và gửi mail thử

1. Ở ô chọn hàm phía trên, chọn **setup** → bấm **▶ Chạy**.
2. Google hỏi cấp quyền → chọn tài khoản → **Nâng cao → Đi tới dự án (không an toàn) → Cho phép**. (Đây là mã của chính anh, chỉ dùng Sheet + gửi mail.)
3. Kiểm tra hộp thư: có mail **"✅ PG Food – kết nối Gmail thành công"**. Trong Sheet xuất hiện 3 tab **Đơn hàng / Đại lý / Liên hệ**.

## Bước 3 – Triển khai thành Web App

1. **Triển khai → Tùy chọn triển khai mới** → bánh răng ⚙ → **Ứng dụng web**.
2. *Thực thi với tư cách*: **Tôi** · *Người có quyền truy cập*: **Bất kỳ ai**.
3. **Triển khai** → sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).

> Sửa `Code.gs` sau này (ví dụ đổi email): **Triển khai → Quản lý triển khai → ✏ → Phiên bản: Phiên bản mới → Triển khai**. URL giữ nguyên.

## Bước 4 – Nhập vào Vercel

Vercel → dự án **pg-food** → **Settings → Environment Variables**, thêm:

| Tên biến | Giá trị |
|---|---|
| `ORDER_DESTINATION` | `google-sheets` |
| `GOOGLE_SCRIPT_URL` | URL ở Bước 3 |
| `GOOGLE_SCRIPT_SECRET` | mật khẩu ở Bước 1 |

Rồi **Deployments → … → Redeploy**. (Hoặc gửi 2 giá trị này cho Claude để nhập và deploy giúp.)

## Kiểm tra

Vào trang **Liên hệ mua hàng** trên web → tích 1 sản phẩm → điền thông tin → **Gửi yêu cầu mua hàng**.
Trong vòng vài giây: có mail báo đơn + dòng mới trong tab **Đơn hàng**.
Cột **Trạng thái** để nhân viên tự cập nhật: Mới → Đã gọi → Đã chốt → Đang giao → Hoàn thành.

## Tùy chọn thêm: báo qua Telegram

Tạo bot với **@BotFather** (`/newbot`) → lấy token; nhắn bot 1 tin; mở `https://api.telegram.org/bot<TOKEN>/getUpdates` để lấy `chat.id`. Thêm biến `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` trên Vercel → Redeploy.

## Gặp lỗi?

- Web báo "Hệ thống đang bận": kiểm tra `GOOGLE_SCRIPT_URL` (kết thúc bằng `/exec`), `GOOGLE_SCRIPT_SECRET` khớp `SECRET`, quyền Web App là **Bất kỳ ai**.
- Có dòng trong Sheet nhưng không có mail: xem thư mục Spam; chạy lại hàm `setup` để cấp quyền gửi mail; kiểm tra `EMAIL_TO`.
- Xem log: Vercel → dự án → **Logs**; Apps Script → **Lần thực thi**.
