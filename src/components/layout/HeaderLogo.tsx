"use client";

import Image from "next/image";
import Link from "next/link";
import { m, useAnimationControls } from "framer-motion";
import { site } from "@/data/site";

/**
 * Logo header: rơi xuống & nảy khi tải trang (CSS), lơ lửng nhẹ (CSS),
 * rê chuột lắc lư + phóng to, bấm nảy "boing" (Framer Motion).
 */
export function HeaderLogo() {
  const controls = useAnimationControls();
  return (
    <Link href="/" className="logo-drop relative z-10 flex shrink-0 items-center" aria-label="PG Food – Trang chủ">
      <span className="logo-float block">
        <m.span
          className="block origin-bottom"
          animate={controls}
          whileHover={{ rotate: [0, -8, 8, -6, 5, 0], scale: 1.1, transition: { duration: 0.8 } }}
          onTapStart={() => controls.start({ scale: 0.9, transition: { duration: 0.1 } })}
          onTap={() => controls.start({ scale: [0.9, 1.15, 1], transition: { duration: 0.45, ease: "easeOut" } })}
          onTapCancel={() => controls.start({ scale: 1 })}
        >
          <Image src={site.logo} alt="PG Food" width={462} height={394} priority className="h-16 w-auto md:h-[84px]" sizes="100px" />
        </m.span>
      </span>
    </Link>
  );
}
