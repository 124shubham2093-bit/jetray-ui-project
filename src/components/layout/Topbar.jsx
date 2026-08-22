import React from "react";
import { ChevronDown, Moon, User as UserIcon } from "lucide-react";

export default function Topbar({ title, onVendor }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60">
      <h1 className="text-white font-semibold text-base">{title}</h1>
      <div className="flex items-center gap-4">
        {onVendor && (
          <button
            type="button"
            onClick={onVendor}
            className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 text-xs font-semibold border border-violet-500/30 transition-colors"
          >
            Vendor Portal
          </button>
        )}
        <Moon size={16} className="text-slate-400" />
        <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium">
          <UserIcon size={15} /> Super Administrator <ChevronDown size={13} />
        </div>
      </div>
    </header>
  );
}
