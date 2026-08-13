import React from "react";

export default function StarBg() {
  const dots = Array.from({ length: 40 }, (_, i) => ({
    top: Math.random() * 100, left: Math.random() * 100, size: Math.random() * 2 + 1,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d, i) => (
        <div key={i} className="absolute rounded-full bg-slate-600"
          style={{ top: `${d.top}%`, left: `${d.left}%`, width: d.size, height: d.size, opacity: 0.6 }} />
      ))}
    </div>
  );
}
