import React from "react";
import { ChevronRight } from "lucide-react";
import { NAV } from "../../data/navigation";
import JetrayLogo from "../common/JetrayLogo";

export default function SidebarNav({ active, setActive }) {
  return (
    <aside className="w-52 bg-[#0a0e1a] border-r border-slate-800/60 flex flex-col shrink-0">
      <div className="h-20 flex items-center justify-center border-b border-slate-800/60">
        <JetrayLogo small />
      </div>
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <div key={item.key}>
              <button
                onClick={() => setActive(item.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  isActive ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Icon size={15} strokeWidth={2} className="shrink-0" />
                <span className="truncate flex-1 text-left">{item.label}</span>
                {item.expandable && <ChevronRight size={13} className="opacity-60" />}
              </button>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
