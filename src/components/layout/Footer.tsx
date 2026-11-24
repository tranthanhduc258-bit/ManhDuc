import Image from "next/image";
import Link from "next/link";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/Icons";
import { Slogan } from "@/components/ui/Slogan";
import { policies } from "@/data/policies";
import { site } from "@/data/site";
import { t } from "@/i18n";
import { navItems } from "./nav";

export function Footer() {
  return (
    <footer className="relative mt-16 bg-pg-blue text-white/85">
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute -top-[39px] left-0 h-10 w-full text-pg-blue">
        <path fill="currentColor" d="M0 40c160-30 320-30 480 0s320 30 480 0 320-30 480 0v20H0z" />
      </svg>
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 px-4 py-12 md:grid-cols-12 md:gap-10">
        <div className="col-span-2 md:col-span-5">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-milk px-3 py-2">
            <Image src={site.logo} alt="PG Food" width={462} height={394} className="h-14 w-auto" sizes="70px" />
            <Slogan className="text-lg text-pg-blue" />
          </div>
          <p className="mt-4 text-[15px] font-bold uppercase tracking-wide text-white">{site.companyName}</p>
          <p className="text-sm text-white/70">{site.companyNameEn}</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>{t.footer.taxCode}: <span className="font-semibold text-white">{site.taxCode}</span></li>
            <li>{t.footer.representative}: {site.representative}</li>
            <li className="flex gap-2"><PinIcon width={18} height={18} className="mt-0.5 shrink-0 text-pg-gold" />{site.address}</li>
            <li className="flex gap-2"><PhoneIcon width={18} height={18} className="mt-0.5 shrink-0 text-pg-gold" />
              <a href={`tel:${site.hotlineRaw}`} className="font-semibold text-white hover:text-pg-gold">Hotline / Zalo: {site.hotline}</a>
            </li>
            <li className="flex gap-2"><MailIcon width={18} height={18} className="mt-0.5 shrink-0 text-pg-gold" />
              <a href={`mailto:${site.email}`} className="break-all hover:text-pg-gold">{site.email}</a>
            </li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3">
          <h2 className="text-base font-bold text-white">PG Food</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {navItems.map((n) => (
              <li key={n.href}><Link href={n.href} className="inline-flex min-h-9 items-center hover:text-pg-gold">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="col-span-1 md:col-span-4">
          <h2 className="text-base font-bold text-white">{t.footer.policies}</h2>
          <ul className="mt-3 space-y-1 text-sm">
            {policies.map((p) => (
              <li key={p.slug}><Link href={`/chinh-sach/${p.slug}`} className="inline-flex min-h-9 items-center hover:text-pg-gold">{p.title}</Link></li>
            ))}
          </ul>
          {site.bctNotified.enabled && (
            <a href={site.bctNotified.url || "#"} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
              <Image src={site.bctNotified.image} alt="Đã thông báo Bộ Công Thương" width={150} height={57} />
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 px-4 pb-24 pt-4 text-center text-xs md:pb-4 text-white/60">
        © {new Date().getFullYear()} {t.footer.rights} {site.companyName}
      </div>
    </footer>
  );
}
