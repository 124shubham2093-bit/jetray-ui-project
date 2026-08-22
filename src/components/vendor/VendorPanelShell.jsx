import React, { useState } from "react";
import {
  LayoutDashboard,
  QrCode,
  MessagesSquare,
  Users,
  FileText,
  Send,
  ContactRound,
  Bot,
  UserCheck,
  Settings,
  Cable,
  Sparkles,
  Code,
  ChevronDown,
  Coins,
  ShieldAlert,
  ArrowRight,
  LogOut,
  Sliders,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import {
  VendorDashboardPage,
  VendorQRCodePage,
  VendorInboxPage,
  VendorContactsPage,
  VendorTemplatesPage,
  VendorCampaignsPage,
  VendorLeadsCRMPage,
  VendorAutomationsPage,
  VendorTeamMembersPage,
  VendorSettingsGeneralPage,
  VendorCloudAPISetupPage,
  VendorAIBotPage,
  VendorDeveloperAPIPage,
} from "../../pages/vendor";
import { VENDOR_PROFILE } from "../../data/vendorData";

const VENDOR_NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "qr-code", label: "QR Code & Links", icon: QrCode },
  { key: "inbox", label: "WhatsApp Inbox", icon: MessagesSquare },
  { key: "contacts", label: "Contacts", icon: Users },
  { key: "templates", label: "Templates", icon: FileText },
  { key: "campaigns", label: "Campaigns", icon: Send },
  { key: "leads", label: "Leads CRM", icon: ContactRound },
  { key: "automations", label: "Automations", icon: Bot },
  { key: "team", label: "Team Members", icon: UserCheck },
  { key: "settings", label: "Business Settings", icon: Settings },
  { key: "cloud-api", label: "Cloud API Setup", icon: Cable },
  { key: "ai-bot", label: "AI Bot & LLM", icon: Sparkles },
  { key: "developer-api", label: "Developer API", icon: Code },
];

export default function VendorPanelShell({ onAdmin }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case "dashboard":
        return <VendorDashboardPage onNavigate={(tab) => setActiveTab(tab)} />;
      case "qr-code":
        return <VendorQRCodePage />;
      case "inbox":
        return <VendorInboxPage />;
      case "contacts":
        return <VendorContactsPage onNavigate={(tab) => setActiveTab(tab)} />;
      case "templates":
        return <VendorTemplatesPage onNavigate={(tab) => setActiveTab(tab)} />;
      case "campaigns":
        return <VendorCampaignsPage />;
      case "leads":
        return <VendorLeadsCRMPage />;
      case "automations":
        return <VendorAutomationsPage />;
      case "team":
        return <VendorTeamMembersPage />;
      case "settings":
        return <VendorSettingsGeneralPage />;
      case "cloud-api":
        return <VendorCloudAPISetupPage />;
      case "ai-bot":
        return <VendorAIBotPage />;
      case "developer-api":
        return <VendorDeveloperAPIPage />;
      default:
        return <VendorDashboardPage onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#070a14] text-slate-100 font-sans">
      {/* ── Mobile Sidebar Overlay ───────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Left Sidebar Navigation ──────────────────────────── */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-60 shrink-0 border-r border-slate-800/80 bg-[#090c17] flex flex-col justify-between transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-3.5 space-y-4 overflow-y-auto">
          {/* Logo & Vendor Company */}
          <div className="flex items-center justify-between px-2 pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-black text-xs shadow-md">
                JR
              </div>
              <div>
                <span className="text-sm font-bold tracking-tight text-white">Jetray</span>
                <span className="text-[9px] block text-violet-400 font-semibold uppercase tracking-wider">
                  Vendor Portal
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-slate-500 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-0.5 pt-2">
            {VENDOR_NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.key);
                    setSidebarOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-xs transition-colors ${
                    isActive
                      ? "bg-violet-600 font-semibold text-white shadow-sm"
                      : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-white" : "text-slate-500"} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Action: Switch to Admin Panel */}
        <div className="p-3 border-t border-slate-800/80 bg-[#070913] space-y-2">
          {onAdmin && (
            <button
              type="button"
              onClick={onAdmin}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded border border-slate-700 bg-slate-800/60 hover:bg-slate-800 text-slate-300 text-xs font-semibold transition-colors"
            >
              <Sliders size={13} className="text-violet-400" />
              Open Admin Panel
            </button>
          )}

          <div className="px-2 py-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>v1.0.4 &bull; Vendor</span>
            <span>{VENDOR_PROFILE.companyName}</span>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ─────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col h-screen overflow-hidden">
        {/* Topbar Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/80 bg-[#090c17] px-6 text-xs shadow-sm">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white"
            >
              <Menu size={18} />
            </button>
            <span className="text-slate-400 text-xs hidden sm:inline">
              Welcome to your Jetray Vendor Workspace &bull; <strong className="text-white">{VENDOR_PROFILE.companyName}</strong>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Credits Pill */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-[11px]">
              <Coins size={12} />
              <span>{VENDOR_PROFILE.credits} credits</span>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 text-slate-200 hover:text-white font-semibold text-xs transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 font-bold text-xs">
                  {VENDOR_PROFILE.name.substring(0, 2).toUpperCase()}
                </div>
                <span>{VENDOR_PROFILE.name}</span>
                <ChevronDown size={13} className="text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#12131b] border border-slate-800 rounded-lg shadow-2xl p-2 space-y-1 z-50 text-xs animate-in fade-in">
                  <div className="px-2.5 py-1.5 border-b border-slate-800">
                    <p className="font-bold text-white text-xs">{VENDOR_PROFILE.companyName}</p>
                    <p className="text-slate-500 text-[10px] truncate">{VENDOR_PROFILE.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("settings");
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    Business Settings
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("cloud-api");
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded text-slate-300 hover:text-white hover:bg-slate-800"
                  >
                    Cloud API Credentials
                  </button>
                  {onAdmin && (
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onAdmin();
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded text-violet-300 hover:text-white hover:bg-violet-600/30 font-semibold"
                    >
                      Go to Admin Panel
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 overflow-y-auto bg-[radial-gradient(ellipse_at_top,#141035_0%,#080a14_50%)] p-6">
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}
