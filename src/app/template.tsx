"use client";

import { AnimatePresence, m } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Lần tải trang đầu tiên không chạy hiệu ứng (giúp hiển thị nhanh, điểm Lighthouse tốt)
let firstLoad = true;

/** Chuyển trang: mờ dần + trượt nhẹ */
export default function Template({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const skip = firstLoad;
  useEffect(() => {
    firstLoad = false;
  }, []);
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={path}
        initial={skip ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
