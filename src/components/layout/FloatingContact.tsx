import { PhoneIcon, ZaloIcon } from "@/components/Icons";
import { site } from "@/data/site";
import { t } from "@/i18n";

/**
 * Liên hệ nhanh:
 * - Máy tính/máy tính bảng: 2 nút tròn nhỏ sát mép phải, không che nội dung.
 * - Điện thoại: thanh nhỏ cố định ở đáy màn hình (có khoảng trống bù để không che chân trang).
 */
export function FloatingContact() {
  return (
    <>
      {/* máy tính */}
      <div className="fixed bottom-6 right-3 z-40 hidden flex-col items-end gap-2.5 md:flex">
        <a
          href={site.zaloUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t.common.chatZalo} ${site.hotline}`}
          className="fab group relative grid h-12 w-12 place-items-center rounded-full bg-[#0068ff] text-white"
        >
          <ZaloIcon width={30} height={30} />
          <span className="fab-tip">Chat Zalo</span>
        </a>
        <a href={`tel:${site.hotlineRaw}`} aria-label={`${t.common.callNow} ${site.hotline}`} className="fab neon-box-blue group relative grid h-12 w-12 place-items-center rounded-full bg-pg-blue text-white">
          <PhoneIcon width={22} height={22} className="animate-[wiggle_2.5s_ease-in-out_infinite]" />
          <span className="fab-tip neon-blue-tip">{site.hotline}</span>
        </a>
      </div>

      {/* điện thoại: thanh cố định ở đáy */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-pg-blue/10 bg-milk/95 px-3 pt-2 shadow-[0_-8px_24px_-16px_rgba(30,58,120,.45)] backdrop-blur-md md:hidden" style={{ paddingBottom: "max(8px, env(safe-area-inset-bottom))" }}>
        <div className="mx-auto grid max-w-md grid-cols-[auto_1fr] gap-2">
          <a href={site.zaloUrl} target="_blank" rel="noopener noreferrer" aria-label={`${t.common.chatZalo} ${site.hotline}`} className="grid h-11 place-items-center rounded-full bg-[#0068ff] px-5 text-white">
            <ZaloIcon width={34} height={34} />
          </a>
          <a href={`tel:${site.hotlineRaw}`} aria-label={`${t.common.callNow} ${site.hotline}`} className="neon-box-blue flex h-11 items-center justify-center gap-2 rounded-full bg-pg-blue px-4 font-bold text-white">
            <PhoneIcon width={20} height={20} className="animate-[wiggle_2.5s_ease-in-out_infinite]" />
            <span className="neon-hotline">{site.hotline}</span>
          </a>
        </div>
      </div>
      {/* khoảng trống bù cho thanh đáy trên điện thoại */}
      <div aria-hidden className="h-[68px] md:hidden" />
    </>
  );
}
