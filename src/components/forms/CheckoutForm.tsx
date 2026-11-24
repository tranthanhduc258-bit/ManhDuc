"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Price } from "@/components/ui/Price";
import { provinces } from "@/data/provinces";
import { site } from "@/data/site";
import { formatVnd } from "@/lib/format";
import { t } from "@/i18n";
import { Consent, Field, FormMessage, Honeypot, formToObject, useSubmit, validate } from "./FormKit";

export function CheckoutForm() {
  const { ready, rows, subtotal, clear } = useCart();
  const router = useRouter();
  const { submit, sending, errors, setErrors, message } = useSubmit("/api/order");
  const [payment, setPayment] = useState<"cod" | "bank">("cod");

  if (!ready) return <div className="h-64 animate-pulse rounded-3xl bg-cream" />;
  if (!rows.length)
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-cream p-8 text-center">
        <p className="text-lg font-semibold text-pg-blue">{t.cart.empty}</p>
        <Link href="/san-pham" className="btn btn-red mt-5">{t.cart.continue}</Link>
      </div>
    );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = formToObject(e.currentTarget);
    const errs = validate(data, ["name", "phone", "province", "address"]);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    const code = await submit({ ...data, payment, items: rows.map((r) => ({ slug: r.slug, qty: r.qty })) });
    if (code) {
      clear();
      router.push(`/dat-hang/thanh-cong?ma=${encodeURIComponent(code)}&tt=${payment}`);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <div className="space-y-4 rounded-3xl bg-white p-5 ring-1 ring-pg-blue/5 md:p-7">
        <Honeypot />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="name" label={t.checkout.name} required autoComplete="name" error={errors.name} />
          <Field name="phone" label={t.checkout.phone} required type="tel" inputMode="tel" autoComplete="tel" placeholder="0856 791 816" error={errors.phone} />
        </div>
        <Field as="select" name="province" label={t.checkout.province} required error={errors.province} defaultValue="">
          <option value="" disabled>{t.form.chooseProvince}</option>
          {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
        </Field>
        <Field name="address" label={t.checkout.address} required autoComplete="street-address" placeholder="Số nhà, thôn/xóm, xã/phường" error={errors.address} />
        <Field as="textarea" name="note" label={t.checkout.note} placeholder="Thời gian nhận hàng, lưu ý khác..." />

        <fieldset>
          <legend className="label">{t.checkout.payment}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {([["cod", t.checkout.cod], ["bank", t.checkout.bank]] as const).map(([v, label]) => (
              <label key={v} className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-2xl border-2 px-4 transition ${payment === v ? "border-pg-blue bg-pg-blue/5" : "border-pg-blue/15"}`}>
                <input type="radio" name="payment" value={v} checked={payment === v} onChange={() => setPayment(v)} className="h-5 w-5 accent-pg-blue" />
                <span className="font-semibold text-pg-blue">{label}</span>
              </label>
            ))}
          </div>
          {payment === "bank" && (
            <p className="mt-3 rounded-2xl bg-cream p-4 text-sm leading-relaxed">
              {site.bank.accountNumber ? (
                <>Chuyển khoản tới <b>{site.bank.bankName}</b> – STK <b>{site.bank.accountNumber}</b> – Chủ TK <b>{site.bank.accountName}</b>. Nội dung: <b>mã đơn hàng</b> (hiện sau khi đặt).</>
              ) : (
                <>Sau khi xác nhận đơn, nhân viên PG Food sẽ gửi thông tin chuyển khoản. Nội dung chuyển khoản: <b>mã đơn hàng</b>.</>
              )}
            </p>
          )}
        </fieldset>
        <Consent error={errors.consent} />
        <FormMessage text={message} />
      </div>

      <aside className="h-fit space-y-4 rounded-3xl bg-cream p-5 lg:sticky lg:top-24">
        <h2 className="text-lg font-extrabold">{t.checkout.yourOrder}</h2>
        <ul className="space-y-3">
          {rows.map((r) => (
            <li key={r.slug} className="flex items-center gap-3">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white">
                <Image src={r.product.images[0]} alt="" fill sizes="56px" className="object-contain" />
                <span className="absolute -right-0 -top-0 grid h-5 min-w-5 place-items-center rounded-full bg-pg-blue px-1 text-[11px] font-bold text-white">{r.qty}</span>
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-pg-blue">{r.product.name}</span>
              <span className="text-sm font-bold">{formatVnd(r.lineTotal)}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-baseline justify-between border-t border-pg-blue/10 pt-4">
          <span className="font-semibold text-pg-blue">{t.cart.subtotal}</span>
          <Price value={subtotal} className="text-2xl" />
        </div>
        <p className="text-xs text-ink/70">{t.cart.shippingNote}</p>
        <button type="submit" disabled={sending} className="btn btn-red w-full text-lg">
          {sending ? t.checkout.sending : t.checkout.submit}
        </button>
      </aside>
    </form>
  );
}
