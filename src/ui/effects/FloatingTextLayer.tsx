import { FloatingText } from "../../game/GameTypes";

export function FloatingTextLayer({ items }: { items: FloatingText[] }) {
  return (
    <div className="floating-layer" aria-hidden="true">
      {items.map((item) => (
        <span key={item.id} className="floating-text" style={{ left: item.x, top: item.y }}>
          {item.text}
        </span>
      ))}
    </div>
  );
}
