import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = (p: P) => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  ...p,
});

export const CartIcon = (p: P) => (
  <svg {...base(p)}><path d="M3 4h2l2.2 10.4a2 2 0 0 0 2 1.6h7.6a2 2 0 0 0 2-1.5L21 8H6" /><circle cx="10" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /></svg>
);
export const MenuIcon = (p: P) => (<svg {...base(p)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const CloseIcon = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const PhoneIcon = (p: P) => (
  <svg {...base(p)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const MailIcon = (p: P) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);
export const PinIcon = (p: P) => (<svg {...base(p)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const ClockIcon = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const LeafIcon = (p: P) => (<svg {...base(p)}><path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" /><path d="M5 19l7-7" /></svg>);
export const TruckIcon = (p: P) => (<svg {...base(p)}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17" cy="18" r="1.8" /></svg>);
export const TagIcon = (p: P) => (<svg {...base(p)}><path d="M3 12V4h8l10 10-8 8z" /><circle cx="7.5" cy="8.5" r="1.3" /></svg>);
export const MegaphoneIcon = (p: P) => (<svg {...base(p)}><path d="M3 10v4h4l8 5V5L7 10zM18 9a4 4 0 0 1 0 6" /></svg>);
export const ShieldIcon = (p: P) => (<svg {...base(p)}><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>);
export const UsersIcon = (p: P) => (<svg {...base(p)}><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 4.5a3 3 0 0 1 0 6M21 20c0-2.6-1.6-4.8-4-5.6" /></svg>);
export const MapIcon = (p: P) => (<svg {...base(p)}><path d="M3 6l6-2 6 2 6-2v14l-6 2-6-2-6 2z" /><path d="M9 4v14M15 6v14" /></svg>);
export const ArrowRightIcon = (p: P) => (<svg {...base(p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const CheckIcon = (p: P) => (<svg {...base(p)}><path d="M5 12.5l4.5 4.5L19 7" /></svg>);
export const TrashIcon = (p: P) => (<svg {...base(p)}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" /></svg>);
export const MinusIcon = (p: P) => (<svg {...base(p)}><path d="M5 12h14" /></svg>);
export const PlusIcon = (p: P) => (<svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>);
export const ChevronIcon = (p: P) => (<svg {...base(p)}><path d="M9 6l6 6-6 6" /></svg>);
export const SparkIcon = (p: P) => (<svg {...base(p)}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></svg>);
export const BacteriaIcon = (p: P) => (
  <svg {...base(p)}><rect x="3" y="8" width="13" height="7" rx="3.5" transform="rotate(-20 9.5 11.5)" /><rect x="11" y="12" width="10" height="5.5" rx="2.75" transform="rotate(25 16 14.75)" /></svg>
);
export const FlaskIcon = (p: P) => (<svg {...base(p)}><path d="M9 3h6M10 3v6L4.5 18.5A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.5-2.5L14 9V3" /><path d="M7 15h10" /></svg>);

export const BottleIcon = (p: P) => (<svg {...base(p)}><path d="M9.5 2.5h5v3l1.5 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 8 20V8l1.5-2.5z" /><path d="M8 12.5h8M8 16.5h8" /></svg>);
export const HomeIcon = (p: P) => (<svg {...base(p)}><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-5h4v5" /></svg>);
export const StoreIcon = (p: P) => (<svg {...base(p)}><path d="M4 9l1.5-5h13L20 9" /><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9" /><path d="M5 11.5V20h14v-8.5" /><path d="M10 20v-4.5h4V20" /></svg>);

export const ZaloIcon = (p: P) => (
  <svg width={24} height={24} viewBox="0 0 48 48" aria-hidden {...p}>
    <text x="24" y="30" textAnchor="middle" fontSize="16" fontWeight="800" fontFamily="Arial, sans-serif" fill="currentColor">Zalo</text>
  </svg>
);

export const iconByName = {
  tag: TagIcon,
  truck: TruckIcon,
  megaphone: MegaphoneIcon,
  shield: ShieldIcon,
  users: UsersIcon,
  map: MapIcon,
} as const;
