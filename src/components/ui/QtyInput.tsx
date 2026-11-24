"use client";

import { MinusIcon, PlusIcon } from "@/components/Icons";
import { t } from "@/i18n";

export function QtyInput({ value, onChange, label = t.common.quantity, disabled }: { value: number; onChange: (n: number) => void; label?: string; disabled?: boolean }) {
  return (
    <div className={`inline-flex items-center rounded-full bg-cream ring-1 ring-pg-blue/10 ${disabled ? "opacity-50" : ""}`} role="group" aria-label={label}>
      <button type="button" disabled={disabled} className="grid h-11 w-11 place-items-center rounded-full text-pg-blue hover:bg-white" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Giảm">
        <MinusIcon width={18} height={18} />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={1}
        max={999}
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(Math.max(1, Math.min(999, parseInt(e.target.value) || 1)))}
        className="h-11 w-12 bg-transparent text-center text-lg font-bold text-pg-blue [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none"
        aria-label={label}
      />
      <button type="button" disabled={disabled} className="grid h-11 w-11 place-items-center rounded-full text-pg-blue hover:bg-white" onClick={() => onChange(Math.min(999, value + 1))} aria-label="Tăng">
        <PlusIcon width={18} height={18} />
      </button>
    </div>
  );
}
