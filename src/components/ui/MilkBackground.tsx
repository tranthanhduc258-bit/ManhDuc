"use client";

import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { ProbioticBuddy, RoundBuddy, VIEWBOX } from "./Mascots";

/**
 * Hình nền minh họa sữa & lợi khuẩn – SVG tự vẽ.
 * - Nhân vật lợi khuẩn tròn mặt cười + hiệp sĩ lợi khuẩn, độ mờ 15–25%, bay lơ lửng.
 * - Giọt sữa rơi chậm, vệt sữa gợn sóng, ánh nắng vàng tỏa từ góc trên phải.
 * - Mỗi họa tiết đặt theo % khung nên tự co giãn theo màn hình.
 *   `mobile: true` → vẫn hiện trên điện thoại (còn khoảng một nửa số họa tiết).
 * - Parallax nhẹ khi cuộn và khi di chuột (máy tính).
 */

type Item = {
  kind: "round" | "knight";
  tone: "green" | "gold" | "mint";
  face?: "happy" | "open";
  wave?: "left" | "right" | "both";
  flip?: boolean;
  /** vị trí theo % khung; right/bottom dùng khi neo theo cạnh phải/dưới */
  left?: string;
  right?: string;
  top: string;
  /** vị trí dọc riêng cho điện thoại (nếu khác) */
  topm?: string;
  /** chiều rộng (px) trên máy tính / điện thoại */
  w: number;
  wm?: number;
  rot?: number;
  op: number;
  dur: number;
  delay: number;
  mobile?: boolean;
};

const heroItems: Item[] = [
  { kind: "round", tone: "green", face: "happy", wave: "left", left: "2%", top: "10%", topm: "2%", w: 70, wm: 46, rot: -8, op: 0.24, dur: 7, delay: 0, mobile: true },
  { kind: "round", tone: "gold", face: "open", wave: "right", left: "41%", top: "5%", w: 50, rot: 6, op: 0.22, dur: 8, delay: -2 },
  { kind: "knight", tone: "green", flip: true, right: "3%", top: "9%", topm: "0.5%", w: 84, wm: 58, op: 0.25, dur: 9, delay: -4, mobile: true },
  { kind: "round", tone: "mint", face: "open", wave: "both", left: "46%", top: "74%", topm: "57%", w: 76, wm: 48, rot: 4, op: 0.24, dur: 7.5, delay: -1, mobile: true },
  { kind: "knight", tone: "gold", left: "3%", top: "64%", w: 78, op: 0.24, dur: 8.5, delay: -3 },
  { kind: "round", tone: "gold", face: "happy", wave: "left", right: "5%", top: "66%", topm: "57%", w: 62, wm: 44, rot: -6, op: 0.24, dur: 6.5, delay: -5, mobile: true },
  { kind: "round", tone: "green", face: "open", wave: "right", left: "27%", top: "86%", w: 44, rot: 10, op: 0.2, dur: 7, delay: -2.5 },
  { kind: "round", tone: "mint", face: "happy", wave: "both", left: "62%", top: "3%", w: 42, op: 0.2, dur: 6, delay: -3.5 },
  { kind: "round", tone: "green", face: "happy", wave: "right", right: "16%", top: "86%", w: 48, rot: -8, op: 0.2, dur: 8, delay: -6 },
  { kind: "round", tone: "gold", face: "open", wave: "left", left: "20%", top: "44%", w: 36, op: 0.16, dur: 7, delay: -1.5 },
];

const pageItems: Item[] = [
  { kind: "knight", tone: "green", right: "4%", top: "8%", w: 96, wm: 62, op: 0.25, dur: 9, delay: 0, mobile: true },
  { kind: "round", tone: "gold", face: "happy", wave: "right", right: "20%", top: "52%", w: 62, op: 0.23, dur: 7, delay: -2 },
  { kind: "round", tone: "green", face: "open", wave: "left", right: "30%", top: "10%", w: 46, wm: 38, op: 0.22, dur: 6.5, delay: -4, mobile: true },
  { kind: "round", tone: "mint", face: "happy", wave: "both", left: "46%", top: "62%", w: 50, op: 0.2, dur: 8, delay: -1 },
  { kind: "round", tone: "gold", face: "open", wave: "left", right: "2%", top: "66%", w: 44, op: 0.22, dur: 7.5, delay: -3 },
];

/** Giọt sữa rơi chậm */
const drops = [
  { left: "14%", w: 18, dur: 11, delay: 0, mobile: true },
  { left: "36%", w: 12, dur: 13, delay: -6, mobile: false },
  { left: "71%", w: 16, dur: 12, delay: -3, mobile: true },
  { left: "88%", w: 11, dur: 14, delay: -9, mobile: false },
];

function MascotItem({ it }: { it: Item }) {
  const isKnight = it.kind === "knight";
  const style: React.CSSProperties = {
    ["--t" as string]: it.top,
    ["--tm" as string]: it.topm ?? it.top,
    left: it.left,
    right: it.right,
    opacity: it.op,
    // biến CSS: rộng trên máy tính / điện thoại
    ["--w" as string]: `${it.w}px`,
    ["--wm" as string]: `${it.wm ?? Math.round(it.w * 0.7)}px`,
  };
  return (
    <span className={`bg-mascot absolute ${it.mobile ? "" : "max-md:hidden"}`} style={style}>
      <span className="bob block" style={{ animationDuration: `${it.dur}s`, animationDelay: `${it.delay}s` }}>
        <svg viewBox={isKnight ? VIEWBOX.knight : VIEWBOX.round} className="block h-auto w-full" style={{ transform: `rotate(${it.rot ?? 0}deg)` }} aria-hidden>
          {isKnight ? <ProbioticBuddy tone={it.tone === "mint" ? "green" : it.tone} flip={it.flip} /> : <RoundBuddy tone={it.tone} face={it.face} wave={it.wave} />}
        </svg>
      </span>
    </span>
  );
}

export function MilkBackground({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const { scrollY } = useScroll();
  const farY = useTransform(scrollY, [0, 800], [0, 70]);
  const nearY = useTransform(scrollY, [0, 800], [0, 140]);
  const farMX = useTransform(sx, (v) => v * 12);
  const farMY = useTransform(() => farY.get() + sy.get() * 12);
  const nearMX = useTransform(sx, (v) => v * -20);
  const nearMY = useTransform(() => nearY.get() + sy.get() * -20);

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
  const items = short ? pageItems : heroItems;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* ánh nắng vàng tỏa từ góc trên phải */}
      <div className="sun-glow absolute -right-40 -top-48 h-[520px] w-[520px] md:h-[680px] md:w-[680px]" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-pg-green/10 blur-3xl max-md:hidden" />

      {/* lớp xa: nhân vật lợi khuẩn */}
      <m.div className="absolute inset-0" style={{ x: farMX, y: farMY }}>
        {items.map((it, i) => (
          <MascotItem key={i} it={it} />
        ))}
      </m.div>

      {/* lớp gần: vệt sữa gợn sóng + giọt sữa rơi */}
      <m.div className="absolute inset-0" style={{ x: nearMX, y: nearMY }}>
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice">
          <path d="M-20 260 C 220 200 420 320 660 250 S 1100 180 1460 240" stroke="#3A9A3F" strokeOpacity="0.1" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M-20 600 C 260 540 520 660 820 590 S 1240 520 1460 580" stroke="#F2B410" strokeOpacity="0.16" strokeWidth="4" fill="none" strokeLinecap="round" className="max-md:hidden" />
        </svg>
        {drops.map((d, i) => (
          <span key={i} className={`milk-drop absolute top-0 ${d.mobile ? "" : "max-md:hidden"}`} style={{ left: d.left, width: d.w, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }}>
            <svg viewBox="-20 -30 40 52" className="block h-auto w-full">
              <path d="M0 -28 C 10 -12 18 -2 18 10 A 18 18 0 0 1 -18 10 C -18 -2 -10 -12 0 -28 Z" fill="#fff" stroke="#1E3A78" strokeOpacity="0.12" strokeWidth="2" />
              <ellipse cx="-6" cy="6" rx="4" ry="7" fill="#EAF2FF" />
            </svg>
          </span>
        ))}
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
