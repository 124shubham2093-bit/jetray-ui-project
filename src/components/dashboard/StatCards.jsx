import React from "react";
import { STAT_CARDS } from "../../data/dashboard";

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {STAT_CARDS.map((c) => (
        <div
          key={c.label}
          className="bg-[#131a2e] border border-slate-800/60 rounded-2xl p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div
              className={`w-9 h-9 rounded-lg ${c.iconBg} flex items-center justify-center`}
            >
              <c.icon size={16} className={c.iconColor} />
            </div>

            <span className="text-slate-500 text-[10px] font-semibold tracking-wide">
              {c.label}
            </span>
          </div>

          <p className="text-white text-2xl font-bold">{c.value}</p>

          <p className="text-slate-500 text-xs mt-0.5">
            {c.sub}
          </p>
        </div>
      ))}
    </div>
  );
}