import React, { useState, useMemo } from "react";
import {
  Package,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Coins,
  Sliders,
  ShieldCheck,
  Layers,
  Sparkles,
  Activity,
  History,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { PLATFORM_MODULES, SEED_MODULE_AUDIT_LOGS } from "../data/platformModules";
import { PlatformModuleCard } from "../components/modules";
import CreditSystemPage from "./CreditSystemPage";
import PlanAddonControlPage from "./PlanAddonControlPage";
import LicenseInformationPage from "./LicenseInformationPage";
import {
  AutoUpdaterModulePage,
  BirthdayGreetingsModulePage,
  WebChatWidgetModulePage,
  DripCampaignModulePage,
  GoogleSheetImportModulePage,
  GoogleSheetsScriptModulePage,
  MultiAIProvidersModulePage,
  InstagramFacebookChatModulePage,
  TrialSystemModulePage,
  CustomPlansManagerModulePage,
  WhatsAppDataExportModulePage,
  TaskManagerTodoModulePage,
} from "./modules";

export default function PlatformModulesPage({ initialTab = "modules", initialModule = null }) {
  const [activeTab, setActiveTab] = useState(initialTab); // "modules" | "credit-system" | "plan-addons" | "license-info" | "audit-logs"
  const [activeModulePage, setActiveModulePage] = useState(initialModule);
  const [modules, setModules] = useState(PLATFORM_MODULES);
  const [auditLogs, setAuditLogs] = useState(SEED_MODULE_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "active" | "disabled" | "configured" | "not_configured" | "healthy" | "warning"
  const [categoryFilter, setCategoryFilter] = useState("all");

  // All unique categories
  const categories = useMemo(() => {
    const set = new Set(modules.map((m) => m.category));
    return ["all", ...Array.from(set)];
  }, [modules]);

  // Derived statistics (Feature O & D)
  const stats = useMemo(() => {
    const total = modules.length;
    const active = modules.filter((m) => m.enabled).length;
    const disabled = modules.filter((m) => !m.enabled && m.status !== "planned").length;
    const notConfigured = modules.filter(
      (m) => m.configStatus === "not_configured" || m.configStatus === "partially_configured"
    ).length;
    const healthy = modules.filter((m) => m.health === "healthy").length;
    const warnings = modules.filter((m) => m.health === "warning" || m.health === "error").length;
    return { total, active, disabled, notConfigured, healthy, warnings };
  }, [modules]);

  // Combined search, status, and category filtering (Feature E)
  const filteredModules = useMemo(() => {
    return modules.filter((module) => {
      // Category filter
      if (categoryFilter !== "all" && module.category !== categoryFilter) {
        return false;
      }

      // Status filter
      if (statusFilter === "active" && !module.enabled) return false;
      if (statusFilter === "disabled" && (module.enabled || module.status === "planned")) return false;
      if (statusFilter === "configured" && module.configStatus !== "configured") return false;
      if (
        statusFilter === "not_configured" &&
        module.configStatus !== "not_configured" &&
        module.configStatus !== "partially_configured"
      ) {
        return false;
      }
      if (statusFilter === "healthy" && module.health !== "healthy") return false;
      if (statusFilter === "warning" && module.health !== "warning" && module.health !== "error") {
        return false;
      }

      // Search filter
      const query = searchQuery.toLowerCase().trim();
      if (query) {
        const matchesName = module.name.toLowerCase().includes(query);
        const matchesDesc = module.description.toLowerCase().includes(query);
        const matchesCat = module.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }

      return true;
    });
  }, [modules, statusFilter, categoryFilter, searchQuery]);

  // Toggle module active/inactive
  const handleToggleModule = (id) => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id === id) {
          if (mod.isProtected) return mod;
          const nextEnabled = !mod.enabled;
          return {
            ...mod,
            enabled: nextEnabled,
            status: nextEnabled ? "active" : mod.status === "planned" ? "planned" : "installed",
            health: nextEnabled ? "healthy" : "inactive",
          };
        }
        return mod;
      })
    );
  };

  // Configure action handler
  const handleConfigureModule = (module) => {
    if (module.id === "credit-system") {
      setActiveTab("credit-system");
      setActiveModulePage(null);
      return;
    }
    if (module.id === "custom-plans-manager") {
      setActiveModulePage("custom-plans-manager");
      return;
    }
    setActiveModulePage(module.id);
  };

  const handleBackToModules = () => {
    setActiveModulePage(null);
  };

  const renderModulePage = () => {
    switch (activeModulePage) {
      case "auto-updater":
        return <AutoUpdaterModulePage onBack={handleBackToModules} />;
      case "birthday-greetings":
        return <BirthdayGreetingsModulePage onBack={handleBackToModules} />;
      case "web-chat-widget":
        return <WebChatWidgetModulePage onBack={handleBackToModules} />;
      case "drip-campaign":
        return <DripCampaignModulePage onBack={handleBackToModules} />;
      case "google-sheet-import":
        return <GoogleSheetImportModulePage onBack={handleBackToModules} />;
      case "google-sheets-script":
        return <GoogleSheetsScriptModulePage onBack={handleBackToModules} />;
      case "multi-ai-providers":
        return <MultiAIProvidersModulePage onBack={handleBackToModules} />;
      case "instagram-fb-chat":
        return <InstagramFacebookChatModulePage onBack={handleBackToModules} />;
      case "trial-system":
        return <TrialSystemModulePage onBack={handleBackToModules} />;
      case "custom-plans-manager":
        return <CustomPlansManagerModulePage onBack={handleBackToModules} />;
      case "whatsapp-data-export":
        return <WhatsAppDataExportModulePage onBack={handleBackToModules} />;
      case "task-manager-todo":
        return <TaskManagerTodoModulePage onBack={handleBackToModules} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-full">
      {/* ── Sub-Navigation Tabs ──────────────────────────────── */}
      <div className="bg-[#0e1222] border-b border-slate-800/80 px-6 py-2.5 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1">
          {[
            { id: "modules", label: "All Modules", icon: Package },
            { id: "credit-system", label: "Credit System", icon: Coins },
            { id: "plan-addons", label: "Plan Addon Control", icon: Sliders },
            { id: "license-info", label: "License Information", icon: ShieldCheck },
            { id: "audit-logs", label: "Activity & Audit Logs", icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id && !activeModulePage;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setActiveModulePage(null);
                }}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all whitespace-nowrap ${
                  active
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CONDITIONAL SUB-VIEWS ───────────────────────────── */}
      {activeModulePage && renderModulePage()}

      {!activeModulePage && activeTab === "credit-system" && <CreditSystemPage />}
      {!activeModulePage && activeTab === "plan-addons" && <PlanAddonControlPage />}
      {!activeModulePage && activeTab === "license-info" && <LicenseInformationPage />}

      {/* ── TAB: AUDIT LOGS (Feature N) ─────────────────────── */}
      {!activeModulePage && activeTab === "audit-logs" && (
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
                <History size={20} className="text-violet-400" />
                Platform Module Activity &amp; Audit Trail
              </h2>
              <p className="text-slate-400 text-xs mt-1">
                Immutable audit history of module activation toggles, configuration updates, and automated engine events.
              </p>
            </div>
            <span className="text-slate-500 text-[10px] font-mono">
              {auditLogs.length} Events Logged
            </span>
          </div>

          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-[#12121a] text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="px-5 py-3">Timestamp</th>
                    <th className="px-5 py-3">Module</th>
                    <th className="px-5 py-3">Action</th>
                    <th className="px-5 py-3">Event Details</th>
                    <th className="px-5 py-3">Triggered By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-[10px]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/20 transition-colors">
                      <td className="px-5 py-3.5 font-mono text-slate-500 text-[9px] whitespace-nowrap">
                        {log.timestamp}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-white">
                        {log.moduleName}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded-full text-[8px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-400">
                        {log.details}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500 font-mono text-[9px]">
                        {log.user}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ALL MODULES (MAIN DASHBOARD) ────────────────── */}
      {!activeModulePage && activeTab === "modules" && (
        <div className="p-6 space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
              <Package size={20} className="text-violet-400" />
              Platform Modules
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Enable, configure, and manage core plugins, messaging extensions, and integration modules for the Jetray platform.
            </p>
          </div>

          {/* Derived Statistics Strip (Feature O & D) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
              <span className="text-slate-500 text-[9px] uppercase font-semibold tracking-wider">
                Total Modules
              </span>
              <p className="text-white text-xl font-extrabold mt-1 font-mono">
                {stats.total}
              </p>
            </div>

            <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
              <span className="text-emerald-400 text-[9px] uppercase font-semibold tracking-wider flex items-center gap-1">
                <CheckCircle size={10} /> Active
              </span>
              <p className="text-emerald-400 text-xl font-extrabold mt-1 font-mono">
                {stats.active}
              </p>
            </div>

            <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
              <span className="text-slate-400 text-[9px] uppercase font-semibold tracking-wider flex items-center gap-1">
                <XCircle size={10} /> Disabled
              </span>
              <p className="text-slate-400 text-xl font-extrabold mt-1 font-mono">
                {stats.disabled}
              </p>
            </div>

            <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
              <span className="text-amber-400 text-[9px] uppercase font-semibold tracking-wider flex items-center gap-1">
                <AlertTriangle size={10} /> Needs Setup
              </span>
              <p className="text-amber-400 text-xl font-extrabold mt-1 font-mono">
                {stats.notConfigured}
              </p>
            </div>

            <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
              <span className="text-emerald-400 text-[9px] uppercase font-semibold tracking-wider flex items-center gap-1">
                <CheckCircle2 size={10} /> Healthy
              </span>
              <p className="text-emerald-400 text-xl font-extrabold mt-1 font-mono">
                {stats.healthy}
              </p>
            </div>

            <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
              <span className="text-violet-400 text-[9px] uppercase font-semibold tracking-wider flex items-center gap-1">
                <Activity size={10} /> Warnings
              </span>
              <p className="text-violet-400 text-xl font-extrabold mt-1 font-mono">
                {stats.warnings}
              </p>
            </div>
          </div>

          {/* Search & Filter Controls (Feature E) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-[#15141b] border border-slate-800/80 rounded-sm p-3">
            {/* Filter Buttons */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
              {[
                { id: "all", label: "All" },
                { id: "active", label: "Active" },
                { id: "disabled", label: "Disabled" },
                { id: "configured", label: "Configured" },
                { id: "not_configured", label: "Needs Setup" },
                { id: "healthy", label: "Healthy" },
                { id: "warning", label: "Warning" },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setStatusFilter(f.id)}
                  className={`px-2.5 py-1 rounded text-[10px] font-semibold transition-all whitespace-nowrap ${
                    statusFilter === f.id
                      ? "bg-violet-600 text-white shadow-sm"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Category Dropdown & Search */}
            <div className="flex items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
              >
                <option value="all">All Categories</option>
                {categories
                  .filter((c) => c !== "all")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>

              {/* Live Search */}
              <div className="relative w-full sm:w-56 shrink-0">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search modules..."
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-7 pr-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Module Cards Grid */}
          {filteredModules.length === 0 ? (
            <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-12 text-center">
              <Package size={24} className="mx-auto text-slate-600 mb-2" />
              <p className="text-slate-400 text-xs font-medium">No platform modules match your search or filter.</p>
              <button
                type="button"
                onClick={() => {
                  setStatusFilter("all");
                  setCategoryFilter("all");
                  setSearchQuery("");
                }}
                className="mt-3 text-[10px] text-violet-400 hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredModules.map((module) => (
                <PlatformModuleCard
                  key={module.id}
                  module={module}
                  onToggle={handleToggleModule}
                  onConfigure={handleConfigureModule}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
