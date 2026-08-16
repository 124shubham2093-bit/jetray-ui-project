import React, { useState } from "react";
import { NAV } from "../../data/navigation";
import SidebarNav from "./SidebarNav";
import Topbar from "./Topbar";
import StubPage from "./StubPage";
import {
  DashboardPage,
  VendorsPage,
  LeadsPage,
  LeadDashboardPage,
} from "../../pages";

export default function AppShell() {
  const [active, setActive] = useState("dashboard");

  const getActiveLabel = () => {
    const parent = NAV.find((item) => item.key === active);
    if (parent) return parent.label;

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

          if (childKey === active || child === active) {
            return `${item.label} / ${childLabel}`;
          }
        }
      }
    }

    return "Dashboard";
  };

  const currentLabel = getActiveLabel();

  return (
    <div className="h-screen w-full bg-[#0b0f1e] flex overflow-hidden">
      <SidebarNav active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={active === "dashboard" ? "Dashboard" : currentLabel} />
        <main className="flex-1 overflow-y-auto">
          {active === "dashboard" && <DashboardPage />}
          {active === "vendors" && <VendorsPage />}
          {active === "leads" && <LeadsPage />}
          {active === "lead-dashboard" && <LeadDashboardPage />}
          {active !== "dashboard" &&
            active !== "vendors" &&
            active !== "leads" && <StubPage label={active} />}
        </main>
      </div>
    </div>
  );
}
