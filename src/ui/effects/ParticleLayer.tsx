import { CSSProperties } from "react";

export type Particle = {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
};

export function ParticleLayer({ items }: { items: Particle[] }) {
  return (
    <div className="particle-layer" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="particle"
          style={{
            left: item.x,
            top: item.y,
            "--dx": `${item.dx}px`,
            "--dy": `${item.dy}px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
