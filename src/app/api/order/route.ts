import { getProduct, canBuy } from "@/data/products";
import { makeCode, vnNow } from "@/lib/codes";
import { notifyAll, orderMessage } from "@/lib/notify";
import { getDestination } from "@/lib/orderDestination";
import { fail, preflight, withDedupe } from "@/lib/submit";
import type { OrderItem, OrderRecord } from "@/lib/types";
import { clean, isValidVnPhone, normalizePhone } from "@/lib/validation";

export async function POST(req: Request) {
  const pre = await preflight(req, "PG");
  if ("stop" in pre) return pre.stop;
  const { body, submissionId } = pre;

  const name = clean(body.name, 100);
  const phone = normalizePhone(clean(body.phone, 20));
  const province = clean(body.province, 60);
  const address = clean(body.address, 300);
  const note = clean(body.note, 1000);
  const payment = body.payment === "bank" ? "Chuyển khoản" : "COD";

  const fields: Record<string, string> = {};
  if (!name) fields.name = "required";
  if (!isValidVnPhone(phone)) fields.phone = "invalid";
  if (!province) fields.province = "required";
  if (!address) fields.address = "required";
  if (Object.keys(fields).length) return fail(400, "Vui lòng kiểm tra lại thông tin", fields);

  // Giá luôn lấy từ dữ liệu trên máy chủ, không tin giá gửi từ trình duyệt
  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
  const items: OrderItem[] = [];
  for (const it of rawItems as { slug?: unknown; qty?: unknown }[]) {
    const p = getProduct(String(it?.slug ?? ""));
    const qty = Math.floor(Number(it?.qty));
    if (!p || !canBuy(p) || !Number.isFinite(qty) || qty < 1 || qty > 999) continue;
    items.push({ slug: p.slug, name: p.name, size: p.size, qty, unitPrice: p.retailPrice, lineTotal: p.retailPrice * qty });
  }
  if (!items.length) return fail(400, "Giỏ hàng trống hoặc sản phẩm chưa có giá bán online.");

  const total = items.reduce((s, i) => s + i.lineTotal, 0);
  const contentKey = `order:${phone}:${items.map((i) => `${i.slug}x${i.qty}`).join(",")}`;

  return withDedupe([`order:${submissionId}`, contentKey], async () => {
    const order: OrderRecord = {
      code: makeCode("PG"),
      createdAt: vnNow(),
      submissionId,
      name, phone, province, address, note, payment, items, total,
      status: "Mới",
    };
    await getDestination().saveOrder(order);
    await notifyAll(`Đơn hàng mới ${order.code}`, orderMessage(order));
    return order.code;
  });
}
