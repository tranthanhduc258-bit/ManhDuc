"use client";

import { m } from "framer-motion";

/** Hiện dần khi cuộn tới */
export function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </m.div>
  );
}
