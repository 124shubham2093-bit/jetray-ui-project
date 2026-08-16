import React from "react";
import {
  LeadStats,
  LeadActivityChart,
  LeadSourceChart,
} from "../components/leads";

export default function LeadDashboardPage() {
  return (
    <div className="p-6 space-y-5">
      <div>
        <h2 className="text-white text-xl font-bold">
          Lead CRM Dashboard
        </h2>

        <p className="text-slate-500 text-sm mt-1">
          Monitor lead activity, sources, and conversion performance.
        </p>
      </div>

      <LeadStats />

      <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-5">
        <LeadActivityChart />
        <LeadSourceChart />
      </div>
    </div>
  );
}