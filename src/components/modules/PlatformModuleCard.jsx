import React from "react";
import {
  RefreshCw,
  Cake,
  MessageCircle,
  Coins,
  Send,
  FileSpreadsheet,
  Database,
  Filter,
  Bot,
  Share2,
  Instagram,
  Clock,
  Sliders,
  Download,
  CheckSquare,
  Settings,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Activity,
  Layers,
} from "lucide-react";

// Icon mapping
const ICONS = {
  RefreshCw,
  Cake,
  MessageCircle,
  Coins,
  Send,
  FileSpreadsheet,
  Database,
  Filter,
  Bot,
  Share2,
  Instagram,
  Clock,
  Sliders,
  Download,
  CheckSquare,
};

export default function PlatformModuleCard({ module, onToggle, onConfigure }) {
  const IconComponent = ICONS[module.icon] || Settings;

  const getStatusBadge = (status, enabled) => {
    if (module.isProtected) {
      return (
        <span className="inline-flex items-center text-[8px] px-2 py-0.5 rounded-full font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          Protected
        </span>
      );
    }
    if (status === "planned") {
      return (
        <span className="inline-flex items-center text-[8px] px-2 py-0.5 rounded-full font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Planned
        </span>
      );
    }
    if (status === "installed" && !enabled) {
      return (
        <span className="inline-flex items-center text-[8px] px-2 py-0.5 rounded-full font-semibold bg-slate-700 text-slate-400 border border-slate-600">
          Installed (Off)
        </span>
      );
    }
    if (enabled) {
      return (
        <span className="inline-flex items-center text-[8px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Installed + Active
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-[8px] px-2 py-0.5 rounded-full font-semibold bg-slate-800 text-slate-500 border border-slate-700">
        Disabled
      </span>
    );
  };

  const getConfigBadge = (cfgStatus) => {
    if (cfgStatus === "configured") {
      return (
        <span className="inline-flex items-center gap-0.5 text-[8px] text-emerald-400 font-medium">
          <CheckCircle2 size={9} /> Configured
        </span>
      );
    }
    if (cfgStatus === "partially_configured") {
      return (
        <span className="inline-flex items-center gap-0.5 text-[8px] text-amber-400 font-medium">
          <AlertTriangle size={9} /> Needs Setup
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-0.5 text-[8px] text-slate-500 font-medium">
        <XCircle size={9} /> Not Configured
      </span>
    );
  };

  const getHealthDot = (health) => {
    if (health === "healthy") {
      return (
        <span className="inline-flex items-center gap-1 text-[8px] text-emerald-400" title="System Health: Healthy">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Healthy
        </span>
      );
    }
    if (health === "warning") {
      return (
        <span className="inline-flex items-center gap-1 text-[8px] text-amber-400" title="System Health: Warning">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          Warning
        </span>
      );
    }
    if (health === "error") {
      return (
        <span className="inline-flex items-center gap-1 text-[8px] text-red-400" title="System Health: Error">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
          Error
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[8px] text-slate-500" title="System Health: Inactive">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
        Inactive
      </span>
    );
  };

  return (
    <div className="bg-[#15141b] border border-slate-800/70 rounded-sm p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-200 shadow-sm space-y-4">
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded bg-slate-800/90 border border-slate-700/60 shrink-0">
              <IconComponent size={16} className="text-violet-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-slate-200 text-xs font-semibold">
                  {module.name}
                </h3>
                <span className="text-[9px] text-slate-500 font-mono">
                  {module.version}
                </span>
              </div>
              <p className="text-slate-500 text-[9px] mt-0.5 font-medium uppercase tracking-wider">
                {module.category}
              </p>
            </div>
          </div>

          <div className="shrink-0">{getStatusBadge(module.status, module.enabled)}</div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-[10px] mt-3 leading-relaxed">
          {module.description}
        </p>

        {/* Dependency & Health Metadata Strip */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/50 space-y-1.5">
          <div className="flex items-center justify-between text-[9px]">
            <div>{getConfigBadge(module.configStatus || "configured")}</div>
            <div>{getHealthDot(module.health || (module.enabled ? "healthy" : "inactive"))}</div>
          </div>

          {module.dependencies && module.dependencies.length > 0 && (
            <div className="text-[8px] text-slate-500 flex items-center gap-1 flex-wrap pt-0.5">
              <span className="text-slate-400 font-medium">Requires:</span>
              {module.dependencies.map((dep) => (
                <span
                  key={dep}
                  className="px-1.5 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700 font-mono"
                >
                  ✓ {dep}
                </span>
              ))}
            </div>
          )}

          {module.lastActivity && (
            <div className="text-[8px] text-slate-600 flex items-center gap-1">
              <Activity size={9} />
              <span>Activity: {module.lastActivity}</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer Controls */}
      <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between gap-2">
        {/* Toggle Switch */}
        <div className="flex items-center gap-2">
          {!module.isProtected ? (
            <button
              type="button"
              role="switch"
              aria-checked={module.enabled}
              onClick={() => onToggle(module.id)}
              className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                module.enabled ? "bg-violet-600" : "bg-slate-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  module.enabled ? "translate-x-3" : "translate-x-0"
                }`}
              />
            </button>
          ) : (
            <span className="text-[9px] text-amber-500/80 font-medium flex items-center gap-1">
              <ShieldAlert size={10} /> Protected
            </span>
          )}
          <span className="text-slate-400 text-[9px]">
            {module.isProtected ? "Off-limits" : module.enabled ? "Active" : "Disabled"}
          </span>
        </div>

        {/* Configure Button */}
        {module.configurable && !module.isProtected && (
          <button
            type="button"
            onClick={() => onConfigure(module)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md border border-slate-700 text-slate-300 hover:text-white hover:border-violet-500/60 hover:bg-violet-600/10 text-[9px] font-semibold transition-all duration-150"
          >
            <Settings size={10} className="text-violet-400" />
            Configure
          </button>
        )}

        {module.isProtected && (
          <span className="text-slate-600 text-[9px] italic">
            Reseller Team
          </span>
        )}
      </div>
    </div>
  );
}
