"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { CartIcon, CheckIcon } from "@/components/Icons";
import { t } from "@/i18n";

export function AddToCartButton({
  slug,
  qty = 1,
  imgSelector,
  className = "btn btn-red",
  label = t.common.addToCart,
}: {
  slug: string;
  qty?: number;
  /** CSS selector của ảnh để làm hiệu ứng bay vào giỏ */
  imgSelector?: string;
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={(e) => {
        const card = (e.currentTarget.closest("[data-product-card]") as HTMLElement | null) ?? document;
        const img = imgSelector ? document.querySelector<HTMLElement>(imgSelector) : card.querySelector<HTMLElement>("img");
        add(slug, qty, img);
        setDone(true);
        setTimeout(() => setDone(false), 1400);
      }}
    >
      {done ? <CheckIcon width={20} height={20} /> : <CartIcon width={20} height={20} />}
      <span>{done ? t.products.added : label}</span>
    </button>
  );
}
