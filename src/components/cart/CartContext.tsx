"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { canBuy, getProduct, type Product } from "@/data/products";

const KEY = "pgfood-cart-v1";

export type CartLine = { slug: string; qty: number };
export type CartRow = CartLine & { product: Product; lineTotal: number };

type CartCtx = {
  ready: boolean;
  lines: CartLine[];
  rows: CartRow[];
  count: number;
  subtotal: number;
  bump: number;
  add: (slug: string, qty?: number, fromEl?: HTMLElement | null) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);

/** Hiệu ứng ảnh sản phẩm "bay" vào biểu tượng giỏ hàng */
function flyToCart(fromEl?: HTMLElement | null) {
  if (!fromEl || typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-cart-target]"));
  const target = targets.find((t) => t.offsetParent !== null);
  if (!target) return;
  const a = fromEl.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const size = Math.min(a.width, a.height, 140);
  const clone = document.createElement("div");
  const img = fromEl instanceof HTMLImageElement ? fromEl : fromEl.querySelector("img");
  Object.assign(clone.style, {
    position: "fixed",
    left: `${a.left + a.width / 2 - size / 2}px`,
    top: `${a.top + a.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "50%",
    backgroundImage: img ? `url("${img.currentSrc || img.src}")` : "none",
    backgroundColor: "#fff",
    backgroundSize: "cover",
    backgroundPosition: "center",
    boxShadow: "0 10px 30px rgba(30,58,120,.35), 0 0 0 3px #F2B410",
    zIndex: "9999",
    pointerEvents: "none",
  } as CSSStyleDeclaration);
  document.body.appendChild(clone);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const anim = clone.animate(
    [
      { transform: "translate(0,0) scale(1)", opacity: 1 },
      { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 80}px) scale(.55)`, opacity: 0.95, offset: 0.55 },
      { transform: `translate(${dx}px, ${dy}px) scale(.12)`, opacity: 0.4 },
    ],
    { duration: 750, easing: "cubic-bezier(.5,0,.3,1)" },
  );
  anim.onfinish = () => clone.remove();
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed.filter((l) => l && typeof l.slug === "string" && l.qty > 0));
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  // Đồng bộ giữa các tab
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== KEY) return;
      try {
        setLines(e.newValue ? JSON.parse(e.newValue) : []);
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const add = useCallback((slug: string, qty = 1, fromEl?: HTMLElement | null) => {
    const p = getProduct(slug);
    if (!p || !canBuy(p)) return;
    flyToCart(fromEl);
    setLines((prev) => {
      const found = prev.find((l) => l.slug === slug);
      if (found) return prev.map((l) => (l.slug === slug ? { ...l, qty: Math.min(999, l.qty + qty) } : l));
      return [...prev, { slug, qty }];
    });
    setTimeout(() => setBump((b) => b + 1), fromEl ? 650 : 0);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, Math.min(999, Math.floor(qty) || 1)) } : l)));
  }, []);
  const remove = useCallback((slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartCtx>(() => {
    const rows: CartRow[] = [];
    for (const l of lines) {
      const product = getProduct(l.slug);
      if (product && canBuy(product)) rows.push({ ...l, product, lineTotal: product.retailPrice * l.qty });
    }
    return {
      ready,
      lines,
      rows,
      count: rows.reduce((s, r) => s + r.qty, 0),
      subtotal: rows.reduce((s, r) => s + r.lineTotal, 0),
      bump,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, ready, bump, add, setQty, remove, clear]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart phải nằm trong CartProvider");
  return c;
}
