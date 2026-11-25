"use client";

import { useState } from "react";

/**
 * Slogan "Plan Growth" theo màu logo: P đỏ, G xanh dương, còn lại xanh lá.
 * Bản neon: chữ sáng – nét, vệt nắng quét qua từng chữ, sao lấp lánh; bấm vào thì từng chữ nảy lên.
 */
const letters: { ch: string; t: "p" | "g" | "r"; gap?: boolean }[] = [
  { ch: "P", t: "p" }, { ch: "l", t: "r" }, { ch: "a", t: "r" }, { ch: "n", t: "r" },
  { ch: "G", t: "g", gap: true }, { ch: "r", t: "r" }, { ch: "o", t: "r" }, { ch: "w", t: "r" }, { ch: "t", t: "r" }, { ch: "h", t: "r" },
];

export function Slogan({ neon = false, className = "" }: { neon?: boolean; className?: string }) {
  const [jump, setJump] = useState(0);
  if (!neon)
    return (
      <span className={`font-bold text-pg-green ${className}`}>
        <span className="text-pg-red">P</span>lan <span className="text-pg-logo-blue">G</span>rowth
      </span>
    );
  return (
    <button
      type="button"
      className={`sun-slogan font-extrabold ${jump ? "is-jumping" : ""} ${className}`}
      onPointerDown={() => setJump((j) => j + 1)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setJump((j) => j + 1)}
      key={jump}
      aria-label="Plan Growth"
    >
      {letters.map((l, i) => (
        <span key={i} aria-hidden className={`chw ${l.gap ? "ml-[0.22em]" : ""}`} style={{ ["--i" as string]: i }}>
          <span className={`ch ch-${l.t}`}>{l.ch}</span>
        </span>
      ))}
      {/* sao lấp lánh như nắng chiếu */}
      <span aria-hidden className="spark" style={{ left: "4%", top: "8%", animationDelay: "0.4s" }} />
      <span aria-hidden className="spark spark-sm" style={{ left: "37%", top: "62%", animationDelay: "1.7s" }} />
      <span aria-hidden className="spark" style={{ left: "58%", top: "2%", animationDelay: "2.9s" }} />
      <span aria-hidden className="spark spark-sm" style={{ left: "93%", top: "30%", animationDelay: "3.8s" }} />
    </button>
  );
}
