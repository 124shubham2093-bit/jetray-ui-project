import React, { useState } from "react";
import { NAV } from "../../data/navigation";
import SidebarNav from "./SidebarNav";
import Topbar from "./Topbar";
import StubPage from "./StubPage";
import { DashboardPage, VendorsPage } from "../../pages";

export default function AppShell() {
  const [active, setActive] = useState("dashboard");
  const currentLabel = NAV.find((n) => n.key === active)?.label || "Dashboard";
  return (
    <div className="h-screen w-full bg-[#0b0f1e] flex overflow-hidden">
      <SidebarNav active={active} setActive={setActive} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar title={active === "dashboard" ? "Dashboard" : currentLabel} />
        <main className="flex-1 overflow-y-auto">
          {active === "dashboard" && <DashboardPage />}
          {active === "vendors" && <VendorsPage />}
          {active !== "dashboard" && active !== "vendors" && <StubPage label={active} />}
        </main>
      </div>
    </div>
  );
}
