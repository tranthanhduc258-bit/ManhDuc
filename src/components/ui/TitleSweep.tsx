"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Khi tiêu đề có class "title-grad" hiện trên màn hình → thêm "is-visible" để chạy vệt sáng lướt qua 1 lần */
export function TitleSweep() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".title-grad:not(.is-visible)"));
    if (!("IntersectionObserver" in window)) return els.forEach((e) => e.classList.add("is-visible"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            io.unobserve(en.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
