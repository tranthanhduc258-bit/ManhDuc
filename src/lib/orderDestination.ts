/**
 * NƠI NHẬN ĐƠN – "đổi được nơi nhận"
 *
 * Giao diện web chỉ gọi getDestination().saveOrder(...). Muốn chuyển sang
 * Haravan / Sapo / KiotViet... chỉ cần viết thêm 1 "destination" mới trong file này
 * (cùng 3 hàm saveOrder / saveDealer / saveContact) và đặt ORDER_DESTINATION trong .env.
 *
 * ORDER_DESTINATION:
 *   - "google-sheets" : gửi sang Google Apps Script (GOOGLE_SCRIPT_URL), ghi vào Google Sheet
 *   - "console"       : chỉ in ra log máy chủ (dùng khi thử nghiệm)
 *   (bỏ trống → tự dùng google-sheets nếu có GOOGLE_SCRIPT_URL, ngược lại dùng console)
 */
import type { ContactRecord, DealerRecord, OrderRecord } from "./types";

export interface OrderDestination {
  name: string;
  saveOrder(order: OrderRecord): Promise<void>;
  saveDealer(dealer: DealerRecord): Promise<void>;
  saveContact(contact: ContactRecord): Promise<void>;
}

const consoleDestination: OrderDestination = {
  name: "console",
  async saveOrder(o) {
    console.log("[ĐƠN HÀNG MỚI]", JSON.stringify(o, null, 2));
  },
  async saveDealer(d) {
    console.log("[ĐĂNG KÝ ĐẠI LÝ]", JSON.stringify(d, null, 2));
  },
  async saveContact(c) {
    console.log("[LIÊN HỆ]", JSON.stringify(c, null, 2));
  },
};

async function postToAppsScript(type: "order" | "dealer" | "contact", data: unknown) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) throw new Error("Thiếu GOOGLE_SCRIPT_URL");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ type, secret: process.env.GOOGLE_SCRIPT_SECRET || "", data }),
    redirect: "follow",
    cache: "no-store",
    signal: AbortSignal.timeout(15000),
  });
  const text = await res.text();
  let json: { ok?: boolean; error?: string } = {};
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Apps Script trả về không hợp lệ (HTTP ${res.status})`);
  }
  if (!json.ok) throw new Error(`Apps Script lỗi: ${json.error || "không rõ"}`);
}

const googleSheetsDestination: OrderDestination = {
  name: "google-sheets",
  saveOrder: (o) => postToAppsScript("order", o),
  saveDealer: (d) => postToAppsScript("dealer", d),
  saveContact: (c) => postToAppsScript("contact", c),
};

// Ví dụ sau này:
// const sapoDestination: OrderDestination = { name: "sapo", async saveOrder(o) { /* gọi API Sapo */ }, ... };

export function getDestination(): OrderDestination {
  const choice = (process.env.ORDER_DESTINATION || "").trim().toLowerCase();
  if (choice === "console") return consoleDestination;
  if (choice === "google-sheets" || process.env.GOOGLE_SCRIPT_URL) return googleSheetsDestination;
  return consoleDestination;
}
