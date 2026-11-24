/**
 * Chống spam & chống gửi trùng (bộ nhớ tạm trên máy chủ).
 * Apps Script cũng kiểm tra trùng theo submissionId để chắc chắn hơn.
 */
type Entry = { code: string; at: number };
const g = globalThis as unknown as { __pgSeen?: Map<string, Entry>; __pgRate?: Map<string, number[]> };
const seen = (g.__pgSeen ??= new Map());
const rate = (g.__pgRate ??= new Map());

const TTL = 10 * 60 * 1000;

export function findDuplicate(keys: string[]): string | null {
  const now = Date.now();
  for (const [k, v] of seen) if (now - v.at > TTL) seen.delete(k);
  for (const k of keys) {
    const hit = seen.get(k);
    if (hit) return hit.code;
  }
  return null;
}

export function remember(keys: string[], code: string) {
  const at = Date.now();
  keys.forEach((k) => seen.set(k, { code, at }));
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
