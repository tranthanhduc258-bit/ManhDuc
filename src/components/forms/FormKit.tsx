"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { t } from "@/i18n";
import { isValidVnPhone } from "@/lib/validation";

export type Errors = Record<string, string>;

const uid = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

/** Gửi form tới API: chống bấm 2 lần, giữ submissionId để máy chủ chống trùng */
export function useSubmit(endpoint: string) {
  const idRef = useRef<string>("");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [message, setMessage] = useState("");

  async function submit(payload: Record<string, unknown>): Promise<string | null> {
    if (sending) return null;
    if (!idRef.current) idRef.current = uid();
    setSending(true);
    setMessage("");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, submissionId: idRef.current }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        idRef.current = "";
        return json.code as string;
      }
      if (json.fields) setErrors(mapServerErrors(json.fields));
      setMessage(json.error || t.form.error);
      return null;
    } catch {
      setMessage(t.form.error);
      return null;
    } finally {
      setSending(false);
    }
  }
  /** Gắn vào <form onChange>: xóa lỗi của ô khách vừa sửa */
  const clearError = (e: React.FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name;
    if (name && errors[name]) setErrors(({ [name]: _removed, ...rest }) => rest);
  };
  return { submit, sending, errors, setErrors, message, clearError };
}

function mapServerErrors(fields: Record<string, string>): Errors {
  const out: Errors = {};
  for (const k of Object.keys(fields)) {
    out[k] = k === "phone" ? t.form.phoneInvalid : k === "consent" ? t.form.consentRequired : k === "products" ? t.order.productsRequired : t.form.required;
  }
  return out;
}

/** Kiểm tra nhanh phía trình duyệt */
export function validate(data: Record<string, unknown>, required: string[], phoneKey = "phone"): Errors {
  const e: Errors = {};
  for (const k of required) if (!String(data[k] ?? "").trim()) e[k] = t.form.required;
  if (phoneKey && String(data[phoneKey] ?? "").trim() && !isValidVnPhone(String(data[phoneKey]))) e[phoneKey] = t.form.phoneInvalid;
  if (data.consent !== true) e.consent = t.form.consentRequired;
  return e;
}

export function formToObject(form: HTMLFormElement) {
  const fd = new FormData(form);
  const obj: Record<string, unknown> = {};
  fd.forEach((v, k) => (obj[k] = typeof v === "string" ? v : ""));
  obj.consent = fd.get("consent") === "on";
  return obj;
}

export function Field({
  name, label, error, required, as = "input", children, className = "", ...rest
}: {
  name: string; label: string; error?: string; required?: boolean; as?: "input" | "textarea" | "select"; children?: React.ReactNode; className?: string;
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement> & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const id = `f-${name}`;
  // Đánh dấu ô đã điền hợp lệ → viền xanh lá + dấu ✓ (CSS: .field[data-filled="true"])
  const mark = (e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const el = e.currentTarget;
    const v = el.value.trim();
    let ok = v.length > 0;
    if (name === "phone") ok = isValidVnPhone(v);
    if (name === "email" && v) ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    el.dataset.filled = ok ? "true" : "false";
  };
  const common = {
    id, name, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-err` : undefined, className: "field", required,
    onInput: mark, onBlur: mark,
  };
  return (
    <div className={`field-wrap ${className}`}>
      <label htmlFor={id} className="label">
        {label} {required && <span className="text-pg-red">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea rows={3} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} {...common} />
      ) : as === "select" ? (
        <select {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)} {...common} onChange={mark}>{children}</select>
      ) : (
        <input {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} {...common} />
      )}
      {error && <p id={`${id}-err`} className="field-error mt-1 text-sm font-medium text-pg-red">{error}</p>}
    </div>
  );
}

/** Ô bẫy spam – người thật không nhìn thấy */
export function Honeypot() {
  return (
    <div className="hp" aria-hidden>
      <label htmlFor="f-website">Website</label>
      <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function Consent({ error }: { error?: string }) {
  return (
    <div>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 text-[15px]">
        <input type="checkbox" id="f-consent" name="consent" className="mt-1 h-5 w-5 shrink-0 accent-pg-blue" aria-invalid={error ? true : undefined} />
        <span>
          {t.form.consent}{" "}
          <Link href="/chinh-sach/bao-mat" target="_blank" className="font-semibold text-pg-blue underline underline-offset-2">{t.form.privacy}</Link>{" "}
          và đồng ý để PG Food liên hệ với tôi.
        </span>
      </label>
      {error && <p className="mt-1 text-sm font-medium text-pg-red">{error}</p>}
    </div>
  );
}

export function FormMessage({ text }: { text: string }) {
  if (!text) return null;
  return <p role="alert" className="rounded-xl bg-pg-red/10 px-4 py-3 text-sm font-medium text-pg-red">{text}</p>;
}

const FIELD_NAMES: Record<string, string> = {
  products: "chọn sản phẩm", name: "họ tên", phone: "số điện thoại", province: "tỉnh/thành", address: "địa chỉ",
  dealerType: "hình thức hợp tác", email: "email", message: "nội dung", consent: "tích ô đồng ý chính sách",
};

/**
 * Khi khách điền thiếu: trả về câu thông báo và cuộn + đặt con trỏ vào ô thiếu đầu tiên.
 * `order` = thứ tự các ô trên form (từ trên xuống) để chọn đúng ô đầu tiên.
 */
export function reportMissing(errs: Errors, order: string[], title: string, targetIds: Record<string, string> = {}) {
  const keys = order.filter((k) => errs[k]);
  const first = keys[0];
  if (first) {
    const el = document.getElementById(targetIds[first] || `f-${first}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => el?.focus({ preventScroll: true }), 400);
  }
  return `${title} Vui lòng bổ sung: ${keys.map((k) => FIELD_NAMES[k] || k).join(", ")}.`;
}

/** Thông báo nổi ở trên màn hình, tự ẩn sau 6 giây */
export function FormToast({ text, onClose }: { text: string; onClose: () => void }) {
  useEffect(() => {
    if (!text) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [text, onClose]);
  return (
    <AnimatePresence>
      {text && (
        <m.div
          key={text}
          role="alert"
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16 }}
          className="fixed inset-x-3 top-[86px] z-[60] mx-auto flex max-w-md items-start gap-3 rounded-2xl bg-pg-red px-4 py-3 text-[15px] font-semibold text-white shadow-[0_14px_34px_-12px_rgba(215,25,32,.7)] md:top-[108px]"
        >
          <span aria-hidden className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-sm font-black text-pg-red">!</span>
          <span className="flex-1">{text}</span>
          <button type="button" onClick={onClose} aria-label="Đóng" className="-mr-1 grid h-7 w-7 shrink-0 place-items-center rounded-full text-white/90 hover:bg-white/15">✕</button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
