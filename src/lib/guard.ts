/**
 * Chống spam & chống gửi trùng (bộ nhớ tạm trên máy chủ).
 * Apps Script cũng kiểm tra trùng theo submissionId để chắc chắn hơn.
 */
type Entry = { code: string; at: number; ttl: number };
const g = globalThis as unknown as { __pgSeen?: Map<string, Entry>; __pgRate?: Map<string, number[]> };
const seen = (g.__pgSeen ??= new Map());
const rate = (g.__pgRate ??= new Map());

/** submissionId (bấm gửi 2 lần cùng 1 form): nhớ 10 phút. Nội dung giống hệt (SĐT + sản phẩm): chỉ 90 giây. */
const TTL_ID = 10 * 60 * 1000;
const TTL_CONTENT = 90 * 1000;

export function findDuplicate(keys: string[]): string | null {
  const now = Date.now();
  for (const [k, v] of seen) if (now - v.at > v.ttl) seen.delete(k);
  for (const k of keys) {
    const hit = seen.get(k);
    if (hit) return hit.code;
  }
  return null;
}

/** keys[0] là submissionId, các key sau là theo nội dung */
export function remember(keys: string[], code: string) {
  const at = Date.now();
  keys.forEach((k, i) => seen.set(k, { code, at, ttl: i === 0 ? TTL_ID : TTL_CONTENT }));
}

/** Giới hạn 8 lần gửi / phút / IP */
export function rateLimited(ip: string, limit = 8) {
  const now = Date.now();
  const list = (rate.get(ip) || []).filter((t: number) => now - t < 60_000);
  list.push(now);
  rate.set(ip, list);
  return list.length > limit;
}

export const clientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
