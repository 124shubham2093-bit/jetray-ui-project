import React from "react";

export default function AuthField({ icon: Icon, ...props }) {
  return (
    <div className="flex items-center gap-2.5 bg-slate-900/70 border border-slate-700/60 rounded-lg px-3.5 py-3">
      <Icon size={15} className="text-emerald-400 shrink-0" />
      <input
        {...props}
        className="bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-500 w-full"
      />
    </div>
  );
}
