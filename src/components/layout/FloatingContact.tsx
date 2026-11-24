import { PhoneIcon, ZaloIcon } from "@/components/Icons";
import { site } from "@/data/site";
import { t } from "@/i18n";

/** Nút nổi góc phải dưới: Zalo + Gọi điện, luôn hiện */
export function FloatingContact() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      <a
        href={site.zaloUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${t.common.chatZalo} ${site.hotline}`}
        className="neon-box-blue grid h-14 w-14 place-items-center rounded-full bg-[#0068ff] text-white transition hover:scale-105"
      >
        <ZaloIcon width={34} height={34} />
      </a>
      <a
        href={`tel:${site.hotlineRaw}`}
        aria-label={`${t.common.callNow} ${site.hotline}`}
        className="neon-box-blue group flex h-14 items-center gap-2 rounded-full bg-pg-blue pl-4 pr-4 text-white transition hover:scale-105"
      >
        <PhoneIcon width={24} height={24} className="animate-[wiggle_2.5s_ease-in-out_infinite]" />
        <span className="hidden font-bold sm:inline">{site.hotline}</span>
      </a>
    </div>
  );
}
