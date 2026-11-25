import Link from "next/link";
import { MilkBackground, MilkWave } from "./MilkBackground";
import { ChevronIcon } from "@/components/Icons";

type Crumb = { href?: string; label: string };
type Accent = "blue" | "red" | "green" | "gold";

const accentBar: Record<Accent, string> = {
  blue: "from-pg-blue to-pg-gold",
  red: "from-pg-red to-pg-blue",
  green: "from-pg-green to-pg-gold",
  gold: "from-pg-gold to-pg-blue",
};

/** Đầu trang con: tiêu đề + breadcrumb + nền minh họa nhẹ */
export function PageHero({
  title,
  intro,
  crumbs = [],
  accent = "blue",
  kicker,
}: {
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs?: Crumb[];
  accent?: Accent;
  kicker?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-cream/70 pb-14 pt-8 md:pb-20 md:pt-12">
      <MilkBackground variant="page" />
      <div className="mx-auto max-w-6xl px-4">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4 text-sm">
            <ol className="flex flex-wrap items-center gap-1 text-pg-blue/70">
              <li><Link href="/" className="hover:text-pg-blue">Trang chủ</Link></li>
              {crumbs.map((c, i) => (
                <li key={i} className="flex items-center gap-1">
                  <ChevronIcon width={14} height={14} />
                  {c.href ? <Link href={c.href} className="hover:text-pg-blue">{c.label}</Link> : <span aria-current="page" className="font-semibold text-pg-blue">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {kicker && <p className="mb-2 text-sm font-bold uppercase tracking-wider text-pg-green">{kicker}</p>}
        <h1 className="title-grad max-w-3xl text-3xl font-extrabold leading-tight md:text-5xl">{title}</h1>
        <span className={`mt-4 block h-1.5 w-20 rounded-full bg-gradient-to-r ${accentBar[accent]}`} />
        {intro && <div className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">{intro}</div>}
      </div>
      <MilkWave />
    </section>
  );
}
