"use client";

import Link from "next/link";
import { useState } from "react";
import { QtyInput } from "@/components/ui/QtyInput";
import { t } from "@/i18n";

/** Trang chi tiết: chọn số lượng → sang trang Liên hệ mua hàng, sản phẩm được chọn sẵn */
export function OrderButton({ slug }: { slug: string }) {
  const [qty, setQty] = useState(1);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="font-semibold text-pg-blue">{t.common.quantity}</span>
        <QtyInput value={qty} onChange={setQty} />
      </div>
      <Link href={`/mua-hang?sp=${slug}&sl=${qty}`} className="btn btn-red btn-shine w-full text-lg sm:w-auto sm:px-10">
        {t.common.orderNow}
      </Link>
    </div>
  );
}
