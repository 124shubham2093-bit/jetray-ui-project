import React from "react";
import {
  Facebook,
  Instagram,
  Building2,
  Phone,
  BriefcaseBusiness,
  Globe,
  FileText,
  Webhook,
  Code2,
  Layers3,
  Settings2,
  Power,
} from "lucide-react";

const ICONS = {
  meta: Layers3,
  facebook: Facebook,
  instagram: Instagram,
  building: Building2,
  phone: Phone,
  briefcase: BriefcaseBusiness,
  globe: Globe,
  google: FileText,
  webhook: Webhook,
  code: Code2,
};

export default function LeadConnectorCard({
  connector,
  onConfigure,
  onToggle,
}) {
  const Icon = ICONS[connector.icon] || Layers3;

  const isConfigured = connector.configured === true;
  const isActive =
    isConfigured && connector.status === "active";

  return (
    <div className="bg-[#15141b] border border-slate-800/70 rounded-sm p-4 min-h-[190px] flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Icon
            size={17}
            className="text-violet-400 shrink-0"
            strokeWidth={1.8}
          />

          <h3 className="text-slate-200 text-xs font-semibold truncate">
            {connector.name}
          </h3>
        </div>

        <span
          className={`text-[8px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
            isActive
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-slate-700/80 text-slate-200"
          }`}
        >
          {isActive ? "ACTIVE" : "DISABLED"}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-[10px] leading-4 mt-4">
        {connector.description}
      </p>

      {/* Divider */}
      <div className="border-t border-slate-700/70 mt-3" />

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mt-3">
        <div>
          <p className="text-slate-300 text-[9px] font-medium">
            Last Sync:
          </p>

          <p className="text-slate-400 text-[9px] mt-0.5">
            {connector.lastSync}
          </p>
        </div>

        <div>
          <p className="text-slate-300 text-[9px] font-medium">
            Imported Leads:
          </p>

          <p className="text-slate-400 text-[9px] mt-0.5">
            {connector.importedLeads.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1.5 mt-2">
        <span className="text-slate-300 text-[9px]">
          Status:
        </span>

        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isActive
              ? "bg-emerald-400"
              : "bg-slate-500"
          }`}
        />

        <span className="text-slate-400 text-[9px]">
          {isActive ? "Active" : "Disabled"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto pt-3">
        {/* Configure */}
        <button
          type="button"
          onClick={() => onConfigure(connector)}
          className={`h-7 border border-emerald-500/50 hover:border-emerald-400 hover:bg-emerald-500/5 rounded-sm flex items-center justify-center gap-1.5 text-emerald-400 text-[9px] font-medium transition-colors ${
            isConfigured ? "flex-1" : "w-full"
          }`}
        >
          <Settings2 size={11} />
          Configure
        </button>

        {/* Enable / Disable */}
        {isConfigured && (
          <button
            type="button"
            onClick={() => onToggle(connector)}
            className={`h-7 px-3 rounded-sm border flex items-center justify-center gap-1.5 text-[9px] font-medium transition-colors ${
              isActive
                ? "border-amber-500/40 text-amber-400 hover:bg-amber-500/10"
                : "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
            }`}
          >
            <Power size={11} />

            {isActive ? "Disable" : "Enable"}
          </button>
        )}
      </div>
    </div>
  );
}