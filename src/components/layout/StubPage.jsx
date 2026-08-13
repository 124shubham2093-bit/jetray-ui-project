import React from "react";
import { Settings } from "lucide-react";
import { NAV } from "../../data/navigation";

export default function StubPage({ label }) {
  const item = NAV.find((n) => n.key === label);
  const Icon = item?.icon || Settings;
  return (
    <div className="p-6">
      <div className="bg-[#131a2e] border border-dashed border-slate-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
        <div className="w-11 h-11 rounded-lg bg-violet-600/15 border border-violet-600/30 flex items-center justify-center mb-3">
          <Icon size={20} className="text-violet-400" />
        </div>
        <p className="text-slate-200 font-medium text-sm">{item?.label} — built in the next phase</p>
        <p className="text-slate-500 text-xs mt-1 max-w-xs">This section ships in Phase 2–5.</p>
      </div>
    </div>
  );
}
