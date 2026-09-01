"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setPct(total > 0 ? Math.min(100, (doc.scrollTop / total) * 100) : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="reading-progress" aria-hidden="true">
      <div className="reading-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  );
}
