"use client";

import Image from "next/image";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/** Ảnh sản phẩm ở hero: vòng sáng xoay chậm, bong bóng sữa bay lên, nghiêng 3D theo chuột (tối đa 8°) */
const bubbles = [
  { left: "12%", s: 12, dur: 6.5, delay: 0 },
  { left: "24%", s: 8, dur: 8, delay: -2 },
  { left: "38%", s: 14, dur: 7, delay: -4.5 },
  { left: "55%", s: 9, dur: 6, delay: -1 },
  { left: "68%", s: 12, dur: 7.5, delay: -3 },
  { left: "82%", s: 7, dur: 6.8, delay: -5.5 },
  { left: "90%", s: 10, dur: 8.2, delay: -2.8 },
];

export function HeroVisual({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState(false);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

  useEffect(() => {
    const ok = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTilt(ok);
  }, []);

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-lg [perspective:1000px]"
      onPointerMove={(e) => {
        if (!tilt || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width - 0.5);
        py.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
    >
      {/* vòng sáng tỏa ra, xoay chậm */}
      <div aria-hidden className="hero-rays absolute left-1/2 top-1/2 aspect-square w-[135%]" />
      <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(255,236,170,.75),rgba(242,180,16,.18)_45%,rgba(242,180,16,0)_70%)]" />
      <div aria-hidden className="absolute inset-x-10 bottom-2 h-10 rounded-[50%] bg-pg-blue/15 blur-xl" />

      {/* bong bóng sữa bay lên */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 top-0 overflow-visible">
        {bubbles.map((b, i) => (
          <span
            key={i}
            className={`milk-bubble absolute bottom-0 rounded-full ${i % 2 ? "max-md:hidden" : ""}`}
            style={{ left: b.left, width: b.s, height: b.s, animationDuration: `${b.dur}s`, animationDelay: `${b.delay}s` }}
          />
        ))}
      </div>

      <m.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative">
        <Image
          src={src}
          alt={alt}
          width={900}
          height={572}
          priority
          sizes="(max-width: 768px) 92vw, 520px"
          className="relative mx-auto h-auto w-full rounded-[2rem] bg-white p-3 shadow-[0_28px_60px_-26px_rgba(30,58,120,.5)] ring-1 ring-pg-gold/40"
        />
        {/* hai nhãn lơ lửng so le */}
        <span className="hero-badge bob-badge absolute -left-1 top-2 md:left-0" style={{ ["--r" as string]: "-6deg" }}>
          <span className="neon-green">72 giờ lên men</span>
        </span>
        <span className="hero-badge bob-badge absolute -right-1 bottom-6 md:right-0" style={{ ["--r" as string]: "5deg", animationDelay: "-1.6s" }}>
          <span className="neon-green">Bổ sung lợi khuẩn</span>
        </span>
      </m.div>
    </div>
  );
}
