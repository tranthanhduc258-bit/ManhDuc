"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckIcon } from "@/components/Icons";
import { Price } from "@/components/ui/Price";
import { QtyInput } from "@/components/ui/QtyInput";
import { products } from "@/data/products";
import { provinces } from "@/data/provinces";
import { formatVnd } from "@/lib/format";
import { t } from "@/i18n";
import { Consent, Field, FormMessage, Honeypot, formToObject, useSubmit, validate } from "./FormKit";

const available = products.filter((p) => p.status === "available");

/** Form "Liên hệ mua hàng": tích chọn sản phẩm + để lại thông tin. Không thanh toán trên web. */
export function OrderForm() {
  const params = useSearchParams();
  const router = useRouter();
  const { submit, sending, errors, setErrors, message, clearError } = useSubmit("/api/order");

  // ?sp=slug&sl=2 → chọn sẵn sản phẩm từ trang sản phẩm
  const [picked, setPicked] = useState<Record<string, number>>(() => {
    const sp = params.get("sp");
    const sl = Math.max(1, Math.min(999, parseInt(params.get("sl") || "1") || 1));
    return sp && available.some((p) => p.slug === sp) ? { [sp]: sl } : {};
  });

  const toggle = (slug: string) => {
    if (errors.products) setErrors(({ products: _removed, ...rest }) => rest);
    setPicked((prev) => {
      const next = { ...prev };
      if (next[slug]) delete next[slug];
      else next[slug] = 1;
      return next;
    });
  };

  const items = available.filter((p) => picked[p.slug]).map((p) => ({ product: p, qty: picked[p.slug] }));
  const allPriced = items.length > 0 && items.every((i) => i.product.retailPrice > 0);
  const estimate = items.reduce((s, i) => s + i.product.retailPrice * i.qty, 0);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = formToObject(e.currentTarget);
    const errs = validate(data, ["name", "phone", "province", "address"]);
    if (!items.length) errs.products = t.order.productsRequired;
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(first === "products" ? "chon-san-pham" : `f-${first}`)?.focus();
      return;
    }
    const code = await submit({ ...data, items: items.map((i) => ({ slug: i.product.slug, qty: i.qty })) });
    if (code) router.push(`/mua-hang/thanh-cong?ma=${encodeURIComponent(code)}`);
  }

  return (
    <form onSubmit={onSubmit} onChange={clearError} noValidate className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      <Honeypot />
      <fieldset id="chon-san-pham" tabIndex={-1} className="h-fit rounded-3xl bg-white p-5 ring-1 ring-pg-blue/5 focus:outline-none md:p-7">
        <legend className="sr-only">{t.order.chooseProducts}</legend>
        <h2 className="text-xl font-extrabold">1. {t.order.chooseProducts}</h2>
        <p className="mt-1 text-sm text-ink/70">{t.order.chooseProductsHint}</p>
        <ul className="mt-4 space-y-3">
          {available.map((p) => {
            const on = !!picked[p.slug];
            return (
              <li key={p.slug} className={`rounded-2xl border-2 p-3 transition ${on ? "border-pg-red bg-pg-red/[.03]" : "border-pg-blue/10"}`}>
                <label className="flex cursor-pointer items-center gap-3">
                  <input type="checkbox" checked={on} onChange={() => toggle(p.slug)} className="sr-only" />
                  <span aria-hidden className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 transition ${on ? "border-pg-red bg-pg-red text-white" : "border-pg-blue/25 bg-white"}`}>
                    {on && <CheckIcon width={18} height={18} />}
                  </span>
                  <span className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                    <Image src={p.images[0]} alt="" fill sizes="80px" className="object-contain p-1" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-snug text-pg-blue">{p.name.replace("Sữa chua uống lợi khuẩn ", "")}</span>
                    <span className="block text-sm text-ink/70">{p.size}</span>
                    <Price value={p.retailPrice} className="text-base" />
                  </span>
                </label>
                {on && (
                  <div className="mt-3 flex items-center justify-end gap-3 border-t border-pg-blue/10 pt-3">
                    <span className="text-sm font-semibold text-pg-blue">{t.common.quantity}</span>
                    <QtyInput value={picked[p.slug]} onChange={(n) => setPicked((prev) => ({ ...prev, [p.slug]: n }))} label={`Số lượng ${p.size}`} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {errors.products && <p className="mt-3 text-sm font-medium text-pg-red">{errors.products}</p>}
        {allPriced && (
          <div className="mt-5 flex items-baseline justify-between rounded-2xl bg-cream px-4 py-3">
            <span className="font-semibold text-pg-blue">{t.order.estimate}</span>
            <span className="neon-red text-2xl font-extrabold">{formatVnd(estimate)}</span>
          </div>
        )}
        <p className="mt-3 text-xs text-ink/70">{t.order.estimateNote}</p>
      </fieldset>

      <div className="h-fit space-y-4 rounded-3xl bg-cream p-5 md:p-7 lg:sticky lg:top-24">
        <h2 className="text-xl font-extrabold">2. {t.order.yourInfo}</h2>
        <Field name="name" label={t.order.name} required autoComplete="name" error={errors.name} />
        <Field name="phone" label={t.order.phone} required type="tel" inputMode="tel" autoComplete="tel" placeholder="0856 791 816" error={errors.phone} />
        <Field as="select" name="province" label={t.order.province} required error={errors.province} defaultValue="">
          <option value="" disabled>{t.form.chooseProvince}</option>
          {provinces.map((p) => <option key={p} value={p}>{p}</option>)}
        </Field>
        <Field name="address" label={t.order.address} required autoComplete="street-address" placeholder="Số nhà, thôn/xóm, xã/phường" error={errors.address} />
        <Field as="textarea" name="note" label={t.order.note} placeholder="Thời gian tiện nghe máy, giao hàng..." />
        <p className="flex gap-2 rounded-2xl bg-pg-green/10 px-4 py-3 text-sm font-medium text-pg-green">
          <CheckIcon width={18} height={18} className="mt-0.5 shrink-0" /> {t.order.noPrepay}
        </p>
        <Consent error={errors.consent} />
        <FormMessage text={message} />
        <button type="submit" disabled={sending} className="btn btn-red w-full text-lg">
          {sending ? t.order.sending : t.order.submit}
        </button>
      </div>
    </form>
  );
}
