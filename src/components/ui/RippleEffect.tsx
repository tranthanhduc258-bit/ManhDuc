"use client";

import { useEffect } from "react";

/** Gợn sóng khi bấm vào bất kỳ phần tử có class "btn" (nút hoặc link) */
export function RippleEffect() {
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>(".btn");
      if (!el || (el as HTMLButtonElement).disabled) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const r = el.getBoundingClientRect();
      const size = Math.max(r.width, r.height);
      const span = document.createElement("span");
      span.className = "ripple";
      span.style.width = span.style.height = `${size}px`;
      span.style.left = `${e.clientX - r.left - size / 2}px`;
      span.style.top = `${e.clientY - r.top - size / 2}px`;
      el.appendChild(span);
      span.addEventListener("animationend", () => span.remove());
    };
    document.addEventListener("pointerdown", onDown, { passive: true });
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);
  return null;
}
