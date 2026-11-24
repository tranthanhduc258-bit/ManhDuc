/**
 * Nhân vật hoạt hình cho hình nền: lợi khuẩn đáng yêu cầm khiên + vi khuẩn xấu.
 * Vẽ bằng SVG tự tạo, toạ độ gốc ở tâm thân nhân vật (~ 120 x 120).
 */

type Tone = "green" | "gold";

const TONES: Record<Tone, { body: string; dark: string; light: string }> = {
  green: { body: "#6CC070", dark: "#3A9A3F", light: "#B9E4B4" },
  gold: { body: "#F7CD4A", dark: "#D89A00", light: "#FCE7A6" },
};

/** Lợi khuẩn hình que bo tròn, mắt to, cầm khiên */
export function ProbioticBuddy({ tone = "green", flip = false }: { tone?: Tone; flip?: boolean }) {
  const c = TONES[tone];
  return (
    <g transform={flip ? "scale(-1 1)" : undefined}>
      {/* lông roi trên đầu */}
      <path d="M-8 -44 q -6 -14 4 -20" stroke={c.dark} strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M8 -44 q 8 -12 -1 -21" stroke={c.dark} strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* chân */}
      <ellipse cx="-12" cy="44" rx="9" ry="6" fill={c.dark} />
      <ellipse cx="12" cy="44" rx="9" ry="6" fill={c.dark} />
      {/* thân */}
      <rect x="-30" y="-46" width="60" height="90" rx="30" fill={c.body} stroke={c.dark} strokeWidth="3" />
      <ellipse cx="-14" cy="-28" rx="8" ry="12" fill="#fff" opacity="0.55" />
      {/* chấm hoa văn */}
      <circle cx="16" cy="24" r="3" fill={c.light} />
      <circle cx="-14" cy="30" r="2.5" fill={c.light} />
      {/* mắt */}
      <ellipse cx="-11" cy="-8" rx="7" ry="9" fill="#fff" />
      <ellipse cx="11" cy="-8" rx="7" ry="9" fill="#fff" />
      <circle cx="-10" cy="-6" r="4.6" fill="#1E3A78" />
      <circle cx="12" cy="-6" r="4.6" fill="#1E3A78" />
      <circle cx="-8.5" cy="-8" r="1.6" fill="#fff" />
      <circle cx="13.5" cy="-8" r="1.6" fill="#fff" />
      {/* má hồng + miệng cười */}
      <ellipse cx="-19" cy="6" rx="5" ry="3" fill="#F49A9A" opacity="0.8" />
      <ellipse cx="19" cy="6" rx="5" ry="3" fill="#F49A9A" opacity="0.8" />
      <path d="M-7 6 q 7 8 14 0" stroke="#1E3A78" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      {/* tay trái vẫy */}
      <path d="M-29 4 q -14 -4 -16 -18" stroke={c.dark} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* tay phải cầm khiên */}
      <path d="M28 8 q 10 2 16 -2" stroke={c.dark} strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* khiên */}
      <g transform="translate(54 0) rotate(8)">
        <path d="M0 -26 L22 -18 V2 C22 16 12 25 0 30 C-12 25 -22 16 -22 2 V-18 Z" fill="#F2B410" stroke="#1E3A78" strokeWidth="3" strokeLinejoin="round" />
        <path d="M0 -18 L14 -13 V2 C14 11 8 17 0 21 C-8 17 -14 11 -14 2 V-13 Z" fill="#FFF6D6" />
        <path d="M-7 1 l5 5 l10 -11" stroke="#3A9A3F" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
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
      <ProbioticBuddy tone={tone} />
      <g transform="translate(132 -6)">
        <g className="germ-bounce">
          <BadGerm />
        </g>
      </g>
    </g>
  );
}
