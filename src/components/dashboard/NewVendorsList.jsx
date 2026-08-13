import React from "react";
import { newVendors } from "../../data/dashboard";

export default function NewVendorsList() {
  return (
    <div className="bg-[#131a2e] border border-slate-800/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-white font-semibold text-sm">New Vendors</p>
        <button className="bg-violet-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-full">See all</button>
      </div>
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 text-[10px] text-slate-500 font-semibold tracking-wide pb-2 border-b border-slate-800/60">
        <span>VENDOR TITLE</span><span>REGISTERED ON</span><span>STATUS</span>
      </div>
      <div className="divide-y divide-slate-800/60">
        {newVendors.map((v) => (
          <div key={v.name} className="grid grid-cols-[1fr_auto_auto] gap-x-4 items-center py-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`w-6 h-6 rounded-full ${v.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                {v.i}
              </div>
              <span className="text-teal-400 text-xs font-semibold truncate">{v.name}</span>
            </div>
            <span className="text-slate-400 text-[11px] whitespace-nowrap">{v.date}</span>
            <span className="bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full text-center">ACTIVE</span>
          </div>
        ))}
      </div>
    </div>
  );
}
