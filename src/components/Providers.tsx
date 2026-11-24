"use client";

import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { RippleEffect } from "./ui/RippleEffect";
import { CursorGlow } from "./ui/CursorGlow";
import { site } from "@/data/site";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
        <RippleEffect />
        {site.features.cursorGlow && <CursorGlow />}
      </MotionConfig>
    </LazyMotion>
  );
}
