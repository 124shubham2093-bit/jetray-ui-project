import React, { useState } from "react";
import {
  Coins,
  Users,
  Layers,
  Send,
  FileText,
  Bot,
  UserCheck,
  Clock,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { VENDOR_PROFILE, VENDOR_DASHBOARD_METRICS } from "../../data/vendorData";

const ICON_MAP = {
  Coins,
  Users,
  Layers,
  Send,
  FileText,
  Bot,
  UserCheck,
  Clock,
  BarChart3,
};

export default function VendorDashboardPage({ onNavigate }) {
  const [tokenExpired, setTokenExpired] = useState(VENDOR_PROFILE.tokenStatus === "expired");
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Login to Facebook account", done: true },
    { id: 2, text: "Complete WhatsApp Cloud API setup", done: false },
    { id: 3, text: "Sync Meta WhatsApp templates", done: true },
    { id: 4, text: "Create audience contact groups", done: true },
    { id: 5, text: "Upload contacts directory", done: true },
    { id: 6, text: "Schedule your first broadcast campaign", done: false },
  ]);

  const toggleChecklist = (id) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const completedSteps = checklist.filter((i) => i.done).length;
  const progressPercent = Math.round((completedSteps / checklist.length) * 100);

  return (
    <div className="space-y-6">
      {/* ── Top Greeting Header ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            Hi, {VENDOR_PROFILE.name}
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Here is what is happening with your <span className="text-violet-400 font-semibold">{VENDOR_PROFILE.companyName}</span> WhatsApp account today.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate("campaigns")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Send size={13} />
            Create Campaign
          </button>
        </div>
      </div>

      {/* ── Expired WhatsApp Token Warning Banner ─────────────── */}
      {tokenExpired && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded bg-red-500/20 text-red-400 shrink-0">
              <ShieldAlert size={20} />
            </div>
            <div>
              <h4 className="text-red-400 text-xs font-bold">
                WhatsApp Cloud API Access Token Expired
              </h4>
              <p className="text-slate-300 text-[11px] mt-0.5 leading-relaxed">
                Your Meta Graph API token expired on <span className="font-mono text-red-300">{VENDOR_PROFILE.tokenExpiry}</span>. Inbound/outbound broadcasts are paused until refreshed.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate("cloud-api")}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-semibold whitespace-nowrap shadow-sm transition-colors"
          >
            Cloud API Setup
            <ArrowRight size={13} />
          </button>
        </div>
      )}

      {/* ── Exactly 9 Metric Statistic Cards ──────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {VENDOR_DASHBOARD_METRICS.map((metric) => {
          const IconComponent = ICON_MAP[metric.icon] || BarChart3;
          return (
            <div
              key={metric.id}
              className="bg-[#12131b] border border-slate-800/80 rounded-lg p-4 hover:border-slate-700 transition-all shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-[11px] font-medium tracking-wide">
                  {metric.label}
                </span>
                <div className="w-8 h-8 rounded bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-violet-400">
                  <IconComponent size={16} />
                </div>
              </div>

              <div className="pt-1">
                <p className={`text-2xl font-extrabold font-mono tracking-tight ${metric.color}`}>
                  {metric.value}
                </p>
                <p className="text-slate-500 text-[10px] mt-0.5">{metric.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Quick Start Guide Checklist (6 Steps) ─────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-slate-200 text-sm font-semibold flex items-center gap-2">
              <Sparkles size={16} className="text-violet-400" />
              Quick Start Onboarding Guide
            </h3>
            <p className="text-slate-500 text-xs mt-0.5">
              Complete these steps to fully activate your WhatsApp automated broadcasting pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">
              {completedSteps} of {checklist.length} Completed ({progressPercent}%)
            </span>
            <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-violet-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {checklist.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleChecklist(item.id)}
              className={`p-3 rounded-md border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                item.done
                  ? "bg-emerald-500/5 border-emerald-500/30 text-slate-200"
                  : "bg-[#0c0f18] border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={() => {}} // Handled by parent div
                  className="accent-violet-600 rounded"
                />
                <span className={`text-xs ${item.done ? "line-through text-slate-400" : "font-medium text-slate-200"}`}>
                  {item.id}. {item.text}
                </span>
              </div>

              {item.id === 2 && !item.done && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate && onNavigate("cloud-api");
                  }}
                  className="text-[10px] text-violet-400 hover:underline flex items-center gap-0.5 shrink-0"
                >
                  Setup <ChevronRight size={12} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
