"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { MinusIcon, PhoneIcon, PlusIcon, ZaloIcon } from "@/components/Icons";
import { AddToCartButton } from "./AddToCartButton";
import { site } from "@/data/site";
import { t } from "@/i18n";

export function QtyInput({ value, onChange, label = t.common.quantity }: { value: number; onChange: (n: number) => void; label?: string }) {
  return (
    <div className="inline-flex items-center rounded-full bg-cream ring-1 ring-pg-blue/10" role="group" aria-label={label}>
      <button type="button" className="grid h-11 w-11 place-items-center rounded-full text-pg-blue hover:bg-white" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Giảm">
        <MinusIcon width={18} height={18} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={999}
        value={value}
        onChange={(e) => onChange(Math.max(1, Math.min(999, parseInt(e.target.value) || 1)))}
        className="h-11 w-12 bg-transparent text-center text-lg font-bold text-pg-blue [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label={label}
      />
      <button type="button" className="grid h-11 w-11 place-items-center rounded-full text-pg-blue hover:bg-white" onClick={() => onChange(Math.min(999, value + 1))} aria-label="Tăng">
        <PlusIcon width={18} height={18} />
      </button>
    </div>
  );
}

export function BuyBox({ slug, buyable }: { slug: string; buyable: boolean }) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const router = useRouter();

  if (!buyable)
    return (
      <div className="rounded-3xl bg-cream p-5">
        <p className="font-semibold text-pg-blue">{t.products.contactForPrice}</p>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <a href={`tel:${site.hotlineRaw}`} className="btn btn-red flex-1"><PhoneIcon width={20} height={20} /> {site.hotline}</a>
          <a href={site.zaloUrl} target="_blank" rel="noopener noreferrer" className="btn btn-blue flex-1"><ZaloIcon width={30} height={30} /> {t.common.chatZalo}</a>
        </div>
      </div>
    );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-pg-blue">{t.common.quantity}</span>
        <QtyInput value={qty} onChange={setQty} />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <AddToCartButton slug={slug} qty={qty} imgSelector="#product-main-img" className="btn btn-ghost flex-1" />
        <button
          type="button"
          className="btn btn-red flex-1"
          onClick={() => {
            add(slug, qty);
            router.push("/dat-hang");
          }}
        >
          {t.common.buyNow}
        </button>
      </div>
    </div>
  );
}
