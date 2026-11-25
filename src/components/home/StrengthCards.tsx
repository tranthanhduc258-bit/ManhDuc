"use client";

import { animate, m, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { BacteriaIcon, ClockIcon, TruckIcon } from "@/components/Icons";
import { strengths } from "@/data/home";

const icon = { ferment: ClockIcon, probiotic: BacteriaIcon, delivery: TruckIcon } as const;
/** Mỗi ô một nền nhạt riêng: xanh lá nhạt, vàng kem, xanh dương nhạt */
const tone = {
  ferment: { card: "bg-[#EAF6EA] ring-pg-green/15", icon: "bg-white text-pg-green shadow-[0_8px_20px_-10px_rgba(58,154,63,.6)]" },
  probiotic: { card: "bg-[#FDF3D6] ring-pg-gold/25", icon: "bg-white text-[#B07D00] shadow-[0_8px_20px_-10px_rgba(242,180,16,.7)]" },
  delivery: { card: "bg-[#E8EEF8] ring-pg-blue/10", icon: "bg-white text-pg-blue shadow-[0_8px_20px_-10px_rgba(30,58,120,.55)]" },
} as const;

/** Số đếm chạy từ 0 lên `to` khi cuộn tới (giữ nguyên số nếu tắt chuyển động) */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [val, setVal] = useState(to);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!inView) {
      setVal(0);
      setArmed(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!inView || !armed) return;
    const c = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, armed, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {val}
    </span>
  );
}

export function StrengthCards() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {strengths.map((s, i) => {
        const Icon = icon[s.key];
        const num = s.title.match(/^(\d+)(.*)$/);
        return (
          <m.li
            key={s.key}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <m.div
              whileHover="hover"
              className={`group flex h-full gap-4 rounded-3xl p-5 ring-1 transition-shadow duration-300 hover:shadow-[0_18px_36px_-22px_rgba(30,58,120,.45)] md:flex-col md:p-6 ${tone[s.key].card}`}
            >
              <m.span
                variants={{ hover: { y: [0, -12, 0, -5, 0], rotate: [0, -6, 6, 0] } }}
                transition={{ duration: 0.7 }}
                className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl md:h-24 md:w-24 md:rounded-3xl ${tone[s.key].icon}`}
              >
                <Icon className="h-9 w-9 md:h-[52px] md:w-[52px]" />
              </m.span>
              <div>
                <h2 className={`text-lg font-extrabold md:text-xl ${s.neon === "green" ? "neon-green-strong" : ""}`}>
                  {num ? (
                    <>
                      <CountUp to={Number(num[1])} />
                      {num[2]}
                    </>
                  ) : (
                    s.title
                  )}
                </h2>
                <p className="mt-1 text-[15px] leading-relaxed text-ink/75">{s.text}</p>
              </div>
            </m.div>
          </m.li>
        );
      })}
    </ul>
  );
}
