import React from "react";
import { Settings } from "lucide-react";
import { NAV } from "../../data/navigation";

export default function StubPage({ label }) {
  let displayTitle = label;
  let Icon = Settings;

  const parent = NAV.find((n) => n.key === label);
  if (parent) {
    displayTitle = parent.label;
    Icon = parent.icon || Settings;
  } else {
    for (const item of NAV) {
      if (item.children) {
        for (const child of item.children) {
          const childKey =
            typeof child === "object"
              ? child.key
              : typeof child === "string"
              ? child.toLowerCase().replace(/[^a-z0-9]/g, "-")
              : child;
          const childLabel =
            typeof child === "object" ? child.label : String(child);

          if (childKey === label || child === label) {
            displayTitle = `${item.label} → ${childLabel}`;
            Icon = item.icon || Settings;
            break;
          }
        }
      }
    }
  }

  return (
    <div className="p-6">
      <div className="bg-[#131a2e] border border-dashed border-slate-800 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
        <div className="w-11 h-11 rounded-lg bg-violet-600/15 border border-violet-600/30 flex items-center justify-center mb-3">
          <Icon size={20} className="text-violet-400" />
        </div>
        <p className="text-slate-200 font-medium text-sm">
          {displayTitle} — built in the next phase
        </p>
        <p className="text-slate-500 text-xs mt-1 max-w-xs">
          This section ships in Phase 2–5.
        </p>
      </div>
    </div>
  );
}
