/**
 * Nhân vật hoạt hình cho hình nền: hiệp sĩ lợi khuẩn PG Food + vi khuẩn xấu.
 * Vẽ bằng SVG tự tạo, toạ độ gốc ở tâm thân nhân vật (~ 120 x 120).
 */

type Tone = "green" | "gold";

const TONES: Record<Tone, { body: string; dark: string; light: string }> = {
  green: { body: "#6CC070", dark: "#3A9A3F", light: "#B9E4B4" },
  gold: { body: "#F7CD4A", dark: "#D89A00", light: "#FCE7A6" },
};

/** Bông lúa nhỏ (gợi hình bông lúa trong logo PG Food) */
function WheatEar({ x = 0, y = 0, scale = 1, rotate = 0 }: { x?: number; y?: number; scale?: number; rotate?: number }) {
  const grains = [0, 1, 2, 3];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M0 0 V-34" stroke="#D89A00" strokeWidth="2.4" strokeLinecap="round" />
      {grains.map((i) => (
        <g key={i}>
          <ellipse cx="-4.5" cy={-8 - i * 7} rx="3.4" ry="6" transform={`rotate(-28 -4.5 ${-8 - i * 7})`} fill="#F2B410" stroke="#D89A00" strokeWidth="1.2" />
          <ellipse cx="4.5" cy={-8 - i * 7} rx="3.4" ry="6" transform={`rotate(28 4.5 ${-8 - i * 7})`} fill="#F2B410" stroke="#D89A00" strokeWidth="1.2" />
        </g>
      ))}
      <ellipse cx="0" cy="-38" rx="3.2" ry="6" fill="#F2B410" stroke="#D89A00" strokeWidth="1.2" />
    </g>
  );
}

/**
 * Hiệp sĩ lợi khuẩn PG Food (thiết kế riêng):
 * thân que bo tròn màu logo, mũ hiệp sĩ xanh PG có chùm bông lúa, áo choàng xanh lá uốn sóng,
 * ngọn giáo đầu bông lúa và khiên in chữ PG.
 */
/** outerFlip: nhân vật đang nằm trong một nhóm đã bị lật – để giữ chữ "PG" trên khiên không bị ngược */
export function ProbioticBuddy({ tone = "green", flip = false, outerFlip = false }: { tone?: Tone; flip?: boolean; outerFlip?: boolean }) {
  const c = TONES[tone];
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      {/* áo choàng xanh lá uốn sóng (phía sau) */}
      <path d="M-22 -14 C -46 0 -56 22 -66 46 C -54 40 -48 50 -38 44 C -30 52 -22 44 -14 48 L 4 -10 Z" fill="#2F7D33" />
      <path d="M-66 46 C -54 40 -48 50 -38 44 C -30 52 -22 44 -14 48" stroke="#7CCB7F" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* ngọn giáo bông lúa (tay trái) */}
      <path d="M-44 52 V-48" stroke="#1E3A78" strokeWidth="4" strokeLinecap="round" />
      <WheatEar x={-44} y={-48} scale={0.75} />

      {/* ủng */}
      <ellipse cx="-12" cy="45" rx="10" ry="6.5" fill="#1E3A78" />
      <ellipse cx="12" cy="45" rx="10" ry="6.5" fill="#1E3A78" />

      {/* thân */}
      <rect x="-30" y="-46" width="60" height="90" rx="30" fill={c.body} stroke={c.dark} strokeWidth="3" />
      <ellipse cx="-17" cy="20" rx="5" ry="9" fill="#fff" opacity="0.35" />

      {/* đai lưng + khóa */}
      <rect x="-30" y="24" width="60" height="7" fill="#F2B410" />
      <rect x="-5" y="22.5" width="10" height="10" rx="2" fill="#1E3A78" stroke="#F2B410" strokeWidth="1.5" />

      {/* mũ hiệp sĩ */}
      <path d="M-33 -12 V-16 A33 33 0 0 1 33 -16 V-12 Z" fill="#1E3A78" />
      <path d="M0 -49 V-14" stroke="#F2B410" strokeWidth="3" />
      <ellipse cx="-14" cy="-34" rx="6" ry="8" fill="#fff" opacity="0.18" />
      <rect x="-34" y="-17" width="68" height="7" rx="3.5" fill="#F2B410" />
      {/* chùm lông hình bông lúa */}
      <WheatEar x={2} y={-48} scale={0.7} rotate={18} />

      {/* mặt */}
      <path d="M-17 -5 l8 2" stroke="#1E3A78" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M17 -5 l-8 2" stroke="#1E3A78" strokeWidth="2.4" strokeLinecap="round" />
      <ellipse cx="-11" cy="5" rx="6.5" ry="8" fill="#fff" />
      <ellipse cx="11" cy="5" rx="6.5" ry="8" fill="#fff" />
      <circle cx="-10" cy="7" r="4.3" fill="#1E3A78" />
      <circle cx="12" cy="7" r="4.3" fill="#1E3A78" />
      <circle cx="-8.6" cy="5.2" r="1.5" fill="#fff" />
      <circle cx="13.4" cy="5.2" r="1.5" fill="#fff" />
      <ellipse cx="-20" cy="16" rx="4.5" ry="2.8" fill="#F49A9A" opacity="0.85" />
      <ellipse cx="20" cy="16" rx="4.5" ry="2.8" fill="#F49A9A" opacity="0.85" />
      <path d="M-6 15 q 6 6 12 0" stroke="#1E3A78" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* tay */}
      <path d="M-28 8 q -8 -2 -14 -4" stroke={c.dark} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <circle cx="-43" cy="4" r="4" fill={c.body} stroke={c.dark} strokeWidth="2" />
      <path d="M28 10 q 10 1 16 -3" stroke={c.dark} strokeWidth="4.5" fill="none" strokeLinecap="round" />

      {/* khiên PG */}
      <g transform="translate(54 2) rotate(6)">
        <path d="M0 -28 L24 -19 V2 C24 17 13 26 0 32 C-13 26 -24 17 -24 2 V-19 Z" fill="#1E3A78" stroke="#F2B410" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M0 -20 L16 -14 V2 C16 12 9 18 0 23 C-9 18 -16 12 -16 2 V-14 Z" fill="#FFFDF6" />
        <text x="0" y="8" transform={flip !== outerFlip ? "scale(-1 1)" : undefined} textAnchor="middle" fontSize="15" fontWeight="900" fontStyle="italic" fontFamily="Arial, sans-serif">
          <tspan fill="#D71920">P</tspan>
          <tspan fill="#1E3A78">G</tspan>
        </text>
      </g>
    </g>
  );
}

/** Vi khuẩn xấu: gai góc, lông mày cau có (bị khiên chặn) */
export function BadGerm() {
  const spikes = Array.from({ length: 10 }, (_, i) => (i * 360) / 10);
  return (
    <g>
      {spikes.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <line x1="0" y1="-22" x2="0" y2="-31" stroke="#6E5A9E" strokeWidth="3" strokeLinecap="round" />
          <circle cx="0" cy="-32" r="3.2" fill="#8E77C4" />
        </g>
      ))}
      <circle r="23" fill="#9C86CF" stroke="#6E5A9E" strokeWidth="3" />
      <circle cx="-9" cy="11" r="3" fill="#7E68B5" />
      <circle cx="10" cy="-12" r="2.4" fill="#7E68B5" />
      {/* lông mày cau + mắt */}
      <path d="M-13 -9 l9 4" stroke="#3B2E63" strokeWidth="3" strokeLinecap="round" />
      <path d="M13 -9 l-9 4" stroke="#3B2E63" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-7" cy="0" r="3" fill="#3B2E63" />
      <circle cx="7" cy="0" r="3" fill="#3B2E63" />
      {/* miệng mếu */}
      <path d="M-7 12 q 7 -6 14 0" stroke="#3B2E63" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* vạch "bật lại" */}
      <path d="M-36 -6 h-10 M-34 6 h-8" stroke="#6E5A9E" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    </g>
  );
}

/** Cảnh nhỏ: lợi khuẩn cầm khiên chặn vi khuẩn xấu */
export function GuardScene({ tone = "green", flip = false }: { tone?: Tone; flip?: boolean }) {
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      <ProbioticBuddy tone={tone} outerFlip={flip} />
      <g transform="translate(140 -2)">
        <g className="germ-bounce">
          <BadGerm />
        </g>
      </g>
    </g>
  );
}
