"use client";

import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { BadGerm, GuardScene, ProbioticBuddy } from "./Mascots";

/**
 * Hình nền minh họa sữa & lợi khuẩn – SVG tự vẽ.
 * - Nhân vật lợi khuẩn hoạt hình cầm khiên chặn vi khuẩn xấu, vẽ mờ, trôi chậm.
 * - Giọt sữa, vệt sữa gợn sóng, bong bóng nhỏ.
 * - Parallax nhẹ khi cuộn và khi di chuột (máy tính). Trên điện thoại giảm số họa tiết.
 */

type Mascot = { x: number; y: number; s: number; kind: "guard" | "buddy" | "germ"; tone?: "green" | "gold"; flip?: boolean; rot?: number; anim: "a" | "b"; delay: number; mobile?: boolean };

/**
 * Vị trí nhân vật trong khung 1440 x 800 (khung bị cắt bớt trên/dưới tùy chiều cao vùng chứa).
 * hero: trang chủ – đặt ở khoảng trống quanh chữ & ảnh. page: đầu trang con – lệch phải, giữa chiều cao.
 * Trên điện thoại khung lớn bị cắt nhiều nên dùng lớp MobileMascots riêng (đặt theo góc).
 */
const heroMascots: Mascot[] = [
  { x: 990, y: 158, s: 0.55, kind: "guard", tone: "green", rot: -4, anim: "a", delay: 0 },
  { x: 610, y: 640, s: 0.7, kind: "guard", tone: "gold", rot: 3, anim: "b", delay: -4 },
  { x: 1385, y: 640, s: 0.65, kind: "guard", tone: "green", flip: true, rot: -3, anim: "a", delay: -6 },
  { x: 50, y: 262, s: 0.46, kind: "buddy", tone: "gold", rot: 8, anim: "b", delay: -2 },
  { x: 820, y: 330, s: 0.42, kind: "buddy", tone: "green", rot: -8, anim: "a", delay: -8 },
];
const pageMascots: Mascot[] = [
  { x: 1060, y: 420, s: 0.8, kind: "guard", tone: "green", rot: -3, anim: "a", delay: 0 },
  { x: 1370, y: 330, s: 0.55, kind: "buddy", tone: "gold", flip: true, rot: 8, anim: "b", delay: -4 },
];

/** Hình nhỏ cho điện thoại: mỗi nhân vật là 1 SVG riêng, neo theo góc trên để không đè chữ */
const VB_KNIGHT = "-75 -102 162 158";
const VB_GUARD = "-75 -102 256 158";

function MobileMascots({ variant }: { variant: "hero" | "page" }) {
  if (variant === "hero") {
    // Trang chủ: 2 hiệp sĩ hai bên nhãn "Sữa chua uống lợi khuẩn"
    return (
      <div className="md:hidden">
        <svg viewBox={VB_KNIGHT} className="absolute left-1 top-1 w-[62px]" overflow="visible" aria-hidden>
          <g opacity={0.5}><g className="float-b"><ProbioticBuddy tone="gold" /></g></g>
        </svg>
        <svg viewBox={VB_KNIGHT} className="absolute right-1 top-1 w-[62px]" overflow="visible" aria-hidden>
          <g opacity={0.5}><g className="float-a"><ProbioticBuddy tone="green" flip /></g></g>
        </svg>
      </div>
    );
  }
  // Trang con: hiệp sĩ chặn vi khuẩn ở góc trên bên phải
  return (
    <div className="md:hidden">
      <svg viewBox={VB_GUARD} className="absolute right-2 top-1 w-[124px]" overflow="visible" aria-hidden>
        <g opacity={0.5}><g className="float-a"><GuardScene tone="green" /></g></g>
      </svg>
    </div>
  );
}

function MascotShape({ m }: { m: Mascot }) {
  const hide = m.mobile ? "" : "max-md:hidden";
  return (
    <g transform={`translate(${m.x} ${m.y}) rotate(${m.rot ?? 0}) scale(${m.s})`} className={hide}>
      <g className={m.anim === "a" ? "float-a" : "float-b"} style={{ animationDelay: `${m.delay}s` }}>
        {m.kind === "guard" ? <GuardScene tone={m.tone} flip={m.flip} /> : m.kind === "buddy" ? <ProbioticBuddy tone={m.tone} flip={m.flip} /> : <BadGerm />}
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

      <MobileMascots variant={short ? "page" : "hero"} />

      {/* lớp xa: lợi khuẩn (máy tính / máy tính bảng) */}
      <m.div className="absolute inset-0" style={{ x: farMX, y: farMY }}>
        <svg className="h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <g opacity={0.32}>
            {(short ? pageMascots : heroMascots).map((m, i) => (
              <MascotShape key={i} m={m} />
            ))}
          </g>
        </svg>
      </m.div>

      {/* lớp gần: giọt sữa, vệt sữa, bong bóng */}
      <m.div className="absolute inset-0" style={{ x: nearMX, y: nearMY }}>
        <svg className="h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          {/* vệt sữa gợn sóng (giống đường lượn xanh lá dưới logo) */}
          <path d="M-20 260 C 220 200 420 320 660 250 S 1100 180 1460 240" stroke="#3A9A3F" strokeOpacity="0.1" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M-20 600 C 260 540 520 660 820 590 S 1240 520 1460 580" stroke="#F2B410" strokeOpacity="0.14" strokeWidth="4" fill="none" strokeLinecap="round" className="max-md:hidden" />
          <Drop x={1250} y={540} s={0.9} o={0.95} cls="float-a" />
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
