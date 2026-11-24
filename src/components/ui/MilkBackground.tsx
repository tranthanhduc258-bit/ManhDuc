"use client";

import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

/**
 * Hình nền minh họa sữa & lợi khuẩn – SVG tự vẽ.
 * - Lợi khuẩn hình viên nang/que bo tròn (xanh lá, vàng nhạt), độ mờ 8–15%, trôi chậm.
 * - Giọt sữa, vệt sữa gợn sóng, bong bóng nhỏ.
 * - Parallax nhẹ khi cuộn và khi di chuột (máy tính). Trên điện thoại giảm số họa tiết.
 */

type Capsule = { x: number; y: number; w: number; h: number; r: number; c: "g" | "y"; o: number; anim: "a" | "b"; delay: number; mobile?: boolean };

const capsules: Capsule[] = [
  { x: 90, y: 120, w: 86, h: 30, r: -25, c: "g", o: 0.14, anim: "a", delay: 0, mobile: true },
  { x: 260, y: 520, w: 60, h: 22, r: 30, c: "y", o: 0.15, anim: "b", delay: -4 },
  { x: 1240, y: 140, w: 96, h: 34, r: 20, c: "y", o: 0.15, anim: "b", delay: -2, mobile: true },
  { x: 1320, y: 520, w: 70, h: 26, r: -35, c: "g", o: 0.12, anim: "a", delay: -6 },
  { x: 640, y: 80, w: 52, h: 20, r: 12, c: "g", o: 0.1, anim: "b", delay: -8 },
  { x: 980, y: 640, w: 64, h: 24, r: -15, c: "g", o: 0.12, anim: "a", delay: -3, mobile: true },
  { x: 470, y: 690, w: 44, h: 18, r: 50, c: "y", o: 0.13, anim: "a", delay: -9 },
  { x: 1100, y: 330, w: 40, h: 16, r: 70, c: "g", o: 0.09, anim: "b", delay: -5 },
  { x: 40, y: 400, w: 54, h: 20, r: 80, c: "y", o: 0.12, anim: "b", delay: -7, mobile: true },
];

const COLORS = { g: "#3A9A3F", y: "#F2B410" };

function CapsuleShape({ c }: { c: Capsule }) {
  const fill = COLORS[c.c];
  return (
    <g transform={`translate(${c.x} ${c.y}) rotate(${c.r})`} className={c.mobile ? "" : "max-md:hidden"}>
      <g className={c.anim === "a" ? "float-a" : "float-b"} style={{ animationDelay: `${c.delay}s` }}>
        <rect x={-c.w / 2} y={-c.h / 2} width={c.w} height={c.h} rx={c.h / 2} fill={fill} opacity={c.o} />
        <rect x={-c.w / 2 + 5} y={-c.h / 2 + 4} width={c.w * 0.45} height={c.h * 0.28} rx={c.h * 0.14} fill="#fff" opacity={0.35} />
        {/* lông roi nhỏ */}
        <path d={`M${c.w / 2} 0 q 10 -6 18 0 t 16 0`} stroke={fill} strokeWidth="2.5" fill="none" opacity={c.o * 0.9} strokeLinecap="round" />
      </g>
    </g>
  );
}

function Drop({ x, y, s, o, cls }: { x: number; y: number; s: number; o: number; cls?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={cls}>
      <path d="M0 -28 C 10 -12 18 -2 18 10 A 18 18 0 0 1 -18 10 C -18 -2 -10 -12 0 -28 Z" fill="#fff" stroke="#1E3A78" strokeOpacity={0.08} strokeWidth="2" opacity={o} />
      <ellipse cx="-6" cy="6" rx="4" ry="7" fill="#fff" opacity={0.9} />
    </g>
  );
}

export function MilkBackground({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const { scrollY } = useScroll();
  const farY = useTransform(scrollY, [0, 800], [0, 80]);
  const nearY = useTransform(scrollY, [0, 800], [0, 160]);
  const farMX = useTransform(sx, (v) => v * 10);
  const farMY = useTransform(() => farY.get() + sy.get() * 10);
  const nearMX = useTransform(sx, (v) => v * -22);
  const nearMY = useTransform(() => nearY.get() + sy.get() * -22);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  const short = variant === "page";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* quầng sáng nền */}
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-pg-gold/15 blur-3xl" />
      <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-pg-blue/10 blur-3xl" />
      {!short && <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-pg-green/10 blur-3xl" />}

      {/* lớp xa: lợi khuẩn */}
      <m.div className="absolute inset-0" style={{ x: farMX, y: farMY }}>
        <svg className="h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          {capsules.slice(0, short ? 5 : capsules.length).map((c, i) => (
            <CapsuleShape key={i} c={c} />
          ))}
          {/* cụm cầu khuẩn nhỏ */}
          <g opacity={0.12} fill="#3A9A3F" className="max-md:hidden">
            <circle cx="820" cy="210" r="7" /><circle cx="836" cy="214" r="6" /><circle cx="828" cy="226" r="6.5" />
            <circle cx="180" cy="300" r="6" /><circle cx="193" cy="306" r="5" />
          </g>
        </svg>
      </m.div>

      {/* lớp gần: giọt sữa, vệt sữa, bong bóng */}
      <m.div className="absolute inset-0" style={{ x: nearMX, y: nearMY }}>
        <svg className="h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          {/* vệt sữa gợn sóng (giống đường lượn xanh lá dưới logo) */}
          <path d="M-20 260 C 220 200 420 320 660 250 S 1100 180 1460 240" stroke="#3A9A3F" strokeOpacity="0.1" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M-20 600 C 260 540 520 660 820 590 S 1240 520 1460 580" stroke="#F2B410" strokeOpacity="0.14" strokeWidth="4" fill="none" strokeLinecap="round" className="max-md:hidden" />
          <Drop x={1180} y={420} s={1.1} o={0.95} cls="float-a" />
          <Drop x={170} y={640} s={0.8} o={0.9} cls="float-b max-md:hidden" />
          {!short && <Drop x={760} y={120} s={0.6} o={0.85} cls="float-b max-md:hidden" />}
          {/* bong bóng */}
          {[
            [300, 760, 6], [340, 760, 4], [720, 780, 5], [1020, 770, 7], [1260, 790, 4], [560, 790, 3],
          ].map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#1E3A78" strokeOpacity="0.18" strokeWidth="1.5" className={`bubble ${i > 2 ? "max-md:hidden" : ""}`} style={{ animationDelay: `${-i * 1.6}s` }} />
          ))}
        </svg>
      </m.div>
    </div>
  );
}

/** Sóng sữa trắng uốn lượn ở đáy hero, chuyển động rất chậm */
export function MilkWave({ color = "#FFFDF6" }: { color?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden md:h-24">
      <svg className="wave-move-slow absolute bottom-0 left-0 h-full w-[200%]" viewBox="0 0 2880 100" preserveAspectRatio="none">
        <path fill={color} opacity="0.55" d="M0 50 C 240 10 480 10 720 50 S 1200 90 1440 50 S 1920 10 2160 50 S 2640 90 2880 50 V100 H0Z" />
      </svg>
      <svg className="wave-move absolute bottom-0 left-0 h-[80%] w-[200%]" viewBox="0 0 2880 100" preserveAspectRatio="none">
        <path fill={color} d="M0 60 C 120 30 240 30 360 60 S 600 90 720 60 S 960 30 1080 60 S 1320 90 1440 60 S 1680 30 1800 60 S 2040 90 2160 60 S 2400 30 2520 60 S 2760 90 2880 60 V100 H0Z" />
      </svg>
    </div>
  );
}
