"use client";

import Reveal from "./Reveal";

/**
 * A responsive card grid whose children stagger in on scroll.
 * Usage: <CardGrid>{cards}</CardGrid>
 */
export default function CardGrid({ children, cols = 3, style }) {
  const colsClass = cols === 2 ? "grid-2" : "grid-3";
  return (
    <div className={`grid ${colsClass}`} style={style}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <Reveal key={child?.key ?? i} delay={Math.min(i, 8) * 70}>
              {child}
            </Reveal>
          ))
        : children}
    </div>
  );
}
