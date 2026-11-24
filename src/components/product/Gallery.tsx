"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/** Ảnh lớn trượt nhiều ảnh (vuốt trên điện thoại, bấm ảnh nhỏ trên máy tính) */
export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const go = (i: number) => {
    setIdx(i);
    track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: "smooth" });
  };
  return (
    <div>
      <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_50px_-28px_rgba(30,58,120,.45)] ring-1 ring-pg-blue/5">
        <div
          ref={track}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / el.clientWidth);
            if (i !== idx) setIdx(i);
          }}
        >
          {images.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] w-full shrink-0 snap-center">
              <Image id={i === 0 ? "product-main-img" : undefined} src={src} alt={`${alt} – ảnh ${i + 1}`} fill priority={i === 0} sizes="(max-width: 768px) 100vw, 560px" className="object-contain p-4" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
            {images.map((_, i) => (
              <button key={i} onClick={() => go(i)} aria-label={`Ảnh ${i + 1}`} className="grid h-6 w-6 place-items-center">
                <span className={`block h-2 rounded-full transition-all ${i === idx ? "w-6 bg-pg-red" : "w-2 bg-pg-blue/30"}`} />
              </button>
            ))}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3">
          {images.map((src, i) => (
            <button key={src} onClick={() => go(i)} aria-label={`Xem ảnh ${i + 1}`} className={`relative h-16 w-20 overflow-hidden rounded-xl bg-white ring-2 ${i === idx ? "ring-pg-red" : "ring-transparent"}`}>
              <Image src={src} alt="" fill sizes="80px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
