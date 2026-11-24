import { formatVnd } from "@/lib/format";
import { t } from "@/i18n";

/** Giá bán lẻ – neon đỏ. retailPrice = 0 → "Liên hệ" */
export function Price({ value, className = "" }: { value: number; className?: string }) {
  if (!value) return <span className={`font-bold text-pg-red ${className}`}>{t.common.contactPrice}</span>;
  return <span className={`neon-red font-extrabold ${className}`}>{formatVnd(value)}</span>;
}
