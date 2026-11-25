# Hướng dẫn cho Claude – dự án PG Food

## Tiết kiệm hạn mức (bắt buộc, mọi phiên)
- Trả lời tiếng Việt, ngắn gọn; tóm tắt cuối việc tối đa 5 dòng. Không nhắc lại yêu cầu, không giải thích dài.
- Không đọc lại file vừa sửa; chỉ đọc đúng đoạn cần (grep / sed -n) thay vì cả file.
- Gộp nhiều lệnh vào một lần chạy; sửa bằng thay thế nhỏ, không viết lại cả file nếu không cần.
- Ảnh chụp: chỉ khi cần duyệt giao diện, chụp đúng vùng cần xem, 1 lần; không chụp toàn trang dài.
- Không chạy Lighthouse, quay video, kiểm thử bằng trình duyệt trừ khi được yêu cầu hoặc sửa phần có rủi ro (form đặt hàng).
- Không dùng subagent. Hỏi lại chỉ khi thật sự không tự quyết được.

## Dự án (đã biết, không cần dò lại)
- Next.js 16 App Router + TypeScript + Tailwind 4 + Framer Motion. Build: `npx next build`.
- Nội dung sửa ở `src/data/*.ts` (site, products, articles, policies, dealer, about, home, provinces); chữ giao diện `src/i18n/vi.ts`.
- Màu/hiệu ứng: `src/app/globals.css`. Nền & nhân vật: `src/components/ui/MilkBackground.tsx`, `Mascots.tsx`.
- Đặt hàng: trang `/mua-hang` (không giỏ hàng, không thanh toán online) → `src/app/api/order` → `src/lib/orderDestination.ts` → Google Apps Script (`google-apps-script/Code.gs`) ghi Google Sheet + gửi Gmail. Biến môi trường trên Vercel: ORDER_DESTINATION, GOOGLE_SCRIPT_URL, GOOGLE_SCRIPT_SECRET.
- Deploy: push nhánh `claude/pg-food-web-vercel-rists8` → Vercel tự build lên https://pg-food-gamma.vercel.app. Push = đưa lên web thật, nên khi anh yêu cầu "duyệt trước" thì chỉ commit, chưa push.
- Không đưa số định danh cá nhân / ngày sinh lên web; không viết công dụng chữa bệnh.
