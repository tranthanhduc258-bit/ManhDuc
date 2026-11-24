# Hướng dẫn nhận đơn hàng vào Google Sheet + báo Telegram

Làm 1 lần, khoảng 10 phút. Sau đó mỗi đơn hàng, đăng ký đại lý, liên hệ trên web sẽ tự ghi thành 1 dòng trong Google Sheet.

## Phần A – Tạo Google Sheet và Apps Script

1. Vào <https://sheets.google.com> → **Trang tính trống**. Đặt tên, ví dụ `PG Food – Đơn hàng`.
2. Trên thanh menu chọn **Tiện ích mở rộng → Apps Script**.
3. Xóa hết nội dung có sẵn trong file `Code.gs`, dán toàn bộ nội dung file `google-apps-script/Code.gs` của dự án vào.
4. Ở dòng `var SECRET = 'DOI-MAT-KHAU-NAY';` đổi thành một mật khẩu riêng (chỉ chữ và số, ví dụ `PgFood2026xyz`). **Ghi lại** mật khẩu này.
5. Bấm biểu tượng 💾 **Lưu**.
6. Ở ô chọn hàm phía trên, chọn **setup** → bấm **Chạy**. Google sẽ hỏi cấp quyền → chọn tài khoản → **Nâng cao → Đi tới dự án (không an toàn) → Cho phép**. (Đây là script của chính anh nên an toàn.)
   Quay lại Sheet sẽ thấy 3 tab: **Đơn hàng**, **Đại lý**, **Liên hệ**.
7. Bấm **Triển khai → Tùy chọn triển khai mới**:
   - Bấm bánh răng ⚙ → chọn **Ứng dụng web**.
   - *Thực thi với tư cách*: **Tôi**.
   - *Người có quyền truy cập*: **Bất kỳ ai**.
   - Bấm **Triển khai** → sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).

> Khi sửa `Code.gs` sau này: **Triển khai → Quản lý triển khai → ✏ Chỉnh sửa → Phiên bản: Phiên bản mới → Triển khai**. Giữ nguyên URL.

## Phần B – Tạo bot Telegram báo đơn

1. Mở Telegram, tìm **@BotFather** → gửi `/newbot` → đặt tên (vd `PG Food Báo Đơn`) và username (vd `pgfood_baodon_bot`).
2. BotFather gửi lại **token** dạng `123456789:AAE...` → ghi lại.
3. Tìm bot vừa tạo, bấm **Start** và gửi 1 tin bất kỳ.
   - Muốn báo vào **nhóm**: tạo nhóm, thêm bot vào nhóm, gửi 1 tin trong nhóm.
4. Mở trình duyệt: `https://api.telegram.org/bot<TOKEN>/getUpdates` (thay `<TOKEN>`). Tìm `"chat":{"id": ...}` → đó là **Chat ID** (nhóm thì là số âm, ví dụ `-100123...`).

## Phần C – Nhập vào Vercel

Vercel → chọn dự án → **Settings → Environment Variables**, thêm:

| Tên biến | Giá trị |
|---|---|
| `ORDER_DESTINATION` | `google-sheets` |
| `GOOGLE_SCRIPT_URL` | URL ứng dụng web ở bước A7 |
| `GOOGLE_SCRIPT_SECRET` | mật khẩu ở bước A4 |
| `TELEGRAM_BOT_TOKEN` | token ở bước B2 |
| `TELEGRAM_CHAT_ID` | Chat ID ở bước B4 |

Sau đó vào **Deployments → … → Redeploy** để áp dụng.

**Email (không bắt buộc):** đăng ký <https://resend.com>, tạo API key, thêm `EMAIL_ENABLED=true`, `RESEND_API_KEY`, `NOTIFY_EMAIL_TO=email-nhan@gmail.com`.

## Kiểm tra

Đặt thử 1 đơn trên web (cần có ít nhất 1 sản phẩm đã điền giá) → xem tab **Đơn hàng** trong Sheet và tin nhắn Telegram.
Cột **Trạng thái** để anh tự đổi: Mới → Đã gọi → Đang giao → Hoàn thành.

## Gặp lỗi?

- Web báo "Hệ thống đang bận": kiểm tra lại `GOOGLE_SCRIPT_URL` (phải kết thúc bằng `/exec`) và `GOOGLE_SCRIPT_SECRET` khớp với `SECRET` trong Code.gs; quyền truy cập Web App phải là **Bất kỳ ai**.
- Không nhận Telegram: đảm bảo đã bấm Start với bot / bot đã ở trong nhóm; Chat ID đúng.
- Xem log lỗi: Vercel → dự án → **Logs**.
