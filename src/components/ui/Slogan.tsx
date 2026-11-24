/** Slogan "Plan Growth" theo màu logo "PG FOOD": P đỏ, G xanh dương, các chữ còn lại xanh lá */
export function Slogan({ neon = false, className = "" }: { neon?: boolean; className?: string }) {
  if (neon)
    return (
      <span className={`neon-slogan font-extrabold ${className}`}>
        <span className="p">P</span><span className="rest">lan</span>{" "}
        <span className="g">G</span><span className="rest">rowth</span>
      </span>
    );
  return (
    <span className={`font-bold text-pg-green ${className}`}>
      <span className="text-pg-red">P</span>lan <span className="text-pg-logo-blue">G</span>rowth
    </span>
  );
}
