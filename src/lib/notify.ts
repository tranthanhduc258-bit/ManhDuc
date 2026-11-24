/**
 * BÁO ĐƠN TỨC THÌ – Telegram và/hoặc Email (Resend). Bật/tắt bằng .env.
 * Lỗi gửi thông báo không làm hỏng đơn hàng (chỉ ghi log).
 */
import { formatVnd } from "./format";
import type { ContactRecord, DealerRecord, OrderRecord } from "./types";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const on = (v: string | undefined, dflt: boolean) =>
  v === undefined || v === "" ? dflt : !["0", "false", "off", "no"].includes(v.toLowerCase());

export function orderMessage(o: OrderRecord) {
  const lines = o.items.map((i) => `• ${esc(i.name)} x${i.qty} = ${formatVnd(i.lineTotal)}`).join("\n");
  return [
    `🛒 <b>ĐƠN HÀNG MỚI ${o.code}</b>`,
    `🕒 ${o.createdAt}`,
    `👤 ${esc(o.name)} – <b>${esc(o.phone)}</b>`,
    `📍 ${esc(o.address)}, ${esc(o.province)}`,
    lines,
    `💰 Tổng: <b>${formatVnd(o.total)}</b> (${o.payment})`,
    o.note ? `📝 ${esc(o.note)}` : "",
  ].filter(Boolean).join("\n");
}

export function dealerMessage(d: DealerRecord) {
  return [
    `🤝 <b>ĐĂNG KÝ ĐẠI LÝ ${d.code}</b>`,
    `🕒 ${d.createdAt}`,
    `👤 ${esc(d.name)} – <b>${esc(d.phone)}</b>`,
    `🏷 ${esc(d.dealerType)}${d.business ? " – " + esc(d.business) : ""}`,
    `📍 ${esc(d.address ? d.address + ", " : "")}${esc(d.province)}`,
    d.note ? `📝 ${esc(d.note)}` : "",
  ].filter(Boolean).join("\n");
}

export function contactMessage(c: ContactRecord) {
  return [
    `✉️ <b>LIÊN HỆ MỚI ${c.code}</b>`,
    `🕒 ${c.createdAt}`,
    `👤 ${esc(c.name)} – <b>${esc(c.phone)}</b>${c.email ? " – " + esc(c.email) : ""}`,
    `📝 ${esc(c.message)}`,
  ].join("\n");
}

async function sendTelegram(html: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!on(process.env.TELEGRAM_ENABLED, true) || !token || !chatId) return;
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: html, parse_mode: "HTML", disable_web_page_preview: true }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Telegram HTTP ${res.status}: ${await res.text()}`);
}

async function sendEmail(subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL_TO;
  if (!on(process.env.EMAIL_ENABLED, false) || !key || !to) return;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "PG Food <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      subject,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6">${html.replace(/\n/g, "<br>")}</div>`,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Resend HTTP ${res.status}: ${await res.text()}`);
}

export async function notifyAll(subject: string, html: string) {
  const results = await Promise.allSettled([sendTelegram(html), sendEmail(subject, html)]);
  results.forEach((r) => r.status === "rejected" && console.error("[notify]", r.reason));
}
