import React from "react";

export default function JetrayLogo({ small }) {
  return (
    <div className={`${small ? "w-14 h-14" : "w-16 h-16"} rounded-full bg-white border border-slate-200 flex flex-col items-center justify-center shrink-0`}>
      <span className="text-slate-800 font-serif italic font-bold text-[10px] leading-none">JR</span>
      <span className="text-[6px] tracking-widest text-slate-500 mt-0.5">JETRAY</span>
    </div>
  );
}
