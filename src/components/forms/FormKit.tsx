"use client";

import Link from "next/link";
import { useRef, useState } from "react";
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
  return { submit, sending, errors, setErrors, message };
}

function mapServerErrors(fields: Record<string, string>): Errors {
  const out: Errors = {};
  for (const k of Object.keys(fields)) {
    out[k] = k === "phone" ? t.form.phoneInvalid : k === "consent" ? t.form.consentRequired : t.form.required;
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
  const common = {
    id, name, "aria-invalid": error ? true : undefined, "aria-describedby": error ? `${id}-err` : undefined, className: "field", required,
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="label">
        {label} {required && <span className="text-pg-red">*</span>}
      </label>
      {as === "textarea" ? (
        <textarea rows={3} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} {...common} />
      ) : as === "select" ? (
        <select {...(rest as React.SelectHTMLAttributes<HTMLSelectElement>)} {...common}>{children}</select>
      ) : (
        <input {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} {...common} />
      )}
      {error && <p id={`${id}-err`} className="mt-1 text-sm font-medium text-pg-red">{error}</p>}
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
        <input type="checkbox" name="consent" className="mt-1 h-5 w-5 shrink-0 accent-pg-blue" aria-invalid={error ? true : undefined} />
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
