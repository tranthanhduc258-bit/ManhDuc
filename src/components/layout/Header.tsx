"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { useCart } from "@/components/cart/CartContext";
import { CartIcon, CloseIcon, MenuIcon, PhoneIcon } from "@/components/Icons";
import { site } from "@/data/site";
import { t } from "@/i18n";
import { navItems } from "./nav";



const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href + "/"));

function CartButton() {
  const { count, bump, ready } = useCart();
  return (
    <Link
      href="/gio-hang"
      data-cart-target
      aria-label={`${t.nav.cart}${ready && count ? ` (${count})` : ""}`}
      className="relative grid h-11 w-11 place-items-center rounded-full bg-cream text-pg-blue transition hover:bg-pg-blue hover:text-white"
    >
      <CartIcon />
      {ready && count > 0 && (
        <span
          key={bump}
          className="cart-bump absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-pg-red px-1 text-[11px] font-bold text-white ring-2 ring-milk"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}

export function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-milk/90 shadow-[0_6px_24px_-12px_rgba(30,58,120,.3)] backdrop-blur-md" : "bg-milk/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[72px]">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="PG Food – Trang chủ">
          <Image src={site.logo} alt="PG Food" width={462} height={394} priority className="h-12 w-auto md:h-14" sizes="70px" />
        </Link>

        <nav aria-label="Menu chính" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {navItems.map((it) => {
              const active = isActive(path, it.href);
              return (
                <li key={it.href} className="flex items-center gap-1.5">
                  {active && <span className="nav-dot" aria-hidden />}
                  <Link href={it.href} className="nav-link" aria-current={active ? "page" : undefined}>
                    {it.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <CartButton />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full bg-pg-blue text-white lg:hidden"
            aria-label={t.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="overlay"
              className="fixed inset-0 z-50 h-dvh bg-pg-blue/40 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <m.nav
              key="drawer"
              id="mobile-menu"
              aria-label="Menu"
              className="fixed right-0 top-0 z-50 flex h-dvh w-[82%] max-w-sm flex-col bg-milk shadow-2xl lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.3, 0.7, 0.2, 1] }}
            >
              <div className="flex items-center justify-between border-b border-pg-blue/10 px-4 py-3">
                <Image src={site.logo} alt="PG Food" width={462} height={394} className="h-11 w-auto" sizes="60px" />
                <button type="button" onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-cream text-pg-blue" aria-label={t.nav.close}>
                  <CloseIcon />
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto px-3 py-4">
                {navItems.map((it, i) => {
                  const active = isActive(path, it.href);
                  return (
                    <m.li key={it.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                      <Link
                        href={it.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-12 items-center gap-3 rounded-2xl px-4 text-lg font-semibold ${active ? "bg-cream text-pg-blue" : "text-pg-blue/85"}`}
                      >
                        <span className={active ? "nav-dot" : "h-[7px] w-[7px]"} aria-hidden />
                        {it.label}
                      </Link>
                    </m.li>
                  );
                })}
              </ul>
              <div className="space-y-3 border-t border-pg-blue/10 p-4">
                <a href={`tel:${site.hotlineRaw}`} className="btn btn-blue w-full">
                  <PhoneIcon width={20} height={20} /> {site.hotline}
                </a>
                <Link href="/dai-ly" className="btn neon-border-gold btn-gold w-full">{t.common.registerDealer}</Link>
              </div>
            </m.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
