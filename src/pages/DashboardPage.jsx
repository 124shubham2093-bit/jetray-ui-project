import React from "react";
import { StatCards, VendorGrowthChart, NewVendorsList } from "../components/dashboard";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-5">
      <StatCards />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5">
        <VendorGrowthChart />
        <NewVendorsList />
      </div>
    </div>
  );
}
