import React from "react";
import { ChevronDown, Moon, User as UserIcon } from "lucide-react";

export default function Topbar({ title }) {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-800/60">
      <h1 className="text-white font-semibold text-base">{title}</h1>
      <div className="flex items-center gap-4">
        <Moon size={16} className="text-slate-400" />
        <div className="flex items-center gap-1.5 text-slate-300 text-sm font-medium">
          <UserIcon size={15} /> Super Administrator <ChevronDown size={13} />
        </div>
      </div>
    </header>
  );
}
