import type { Block } from "@/data/articles";

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-pg text-[17px]">
      {blocks.map((b, i) =>
        b.type === "h2" ? <h2 key={i}>{b.text}</h2> : b.type === "ul" ? (
          <ul key={i}>{b.items.map((it) => <li key={it}>{it}</li>)}</ul>
        ) : <p key={i}>{b.text}</p>,
      )}
    </div>
  );
}
