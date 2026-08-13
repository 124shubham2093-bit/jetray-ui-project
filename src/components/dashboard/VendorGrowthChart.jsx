import React, { useState } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { growthData } from "../../data/dashboard";

export default function VendorGrowthChart() {
  const [range, setRange] = useState("MONTHLY");
  return (
    <div className="bg-[#131a2e] border border-slate-800/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-1">
        <div>
          <p className="text-white font-semibold text-sm">Vendor Growth</p>
          <p className="text-slate-500 text-[10px] tracking-wide font-medium">ANALYTICS OVERVIEW (LAST 12 MONTHS)</p>
        </div>
        <div className="flex items-center gap-1 bg-[#0b0f1e] rounded-full p-1">
          {["MONTHLY", "QUARTERLY"].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`text-[10px] font-semibold px-3 py-1.5 rounded-full transition-colors ${
                range === r ? "bg-emerald-500 text-slate-900" : "text-slate-400"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>
      <div className="h-56 mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={growthData}>
            <XAxis dataKey="m" stroke="#475569" fontSize={9} tickLine={false} axisLine={false} interval={1} />
            <Tooltip
              contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8, fontSize: 12 }}
              labelStyle={{ color: "#94a3b8" }}
              cursor={{ fill: "rgba(139,92,246,0.08)" }}
            />
            <Bar dataKey="v" fill="#8b5cf6" radius={[3, 3, 0, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
