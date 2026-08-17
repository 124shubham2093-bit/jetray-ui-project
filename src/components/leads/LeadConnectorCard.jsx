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
}) {
  const Icon = ICONS[connector.icon] || Layers3;

  const isActive = connector.status === "active";

  return (
    <div className="bg-[#131a2e] border border-slate-800/70 rounded-2xl p-5 flex flex-col min-h-[285px] hover:border-slate-700 transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-violet-600/10 border border-violet-500/20 flex items-center justify-center shrink-0">
            <Icon
              size={21}
              className="text-violet-400"
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-white text-sm font-semibold truncate">
              {connector.name}
            </h3>

            <span className="inline-flex mt-1.5 text-[10px] font-medium text-slate-500 bg-slate-800/70 px-2 py-1 rounded-full">
              {connector.category}
            </span>
          </div>
        </div>

        {/* Status */}
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-semibold shrink-0 ${
            isActive ? "text-emerald-400" : "text-slate-500"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isActive ? "bg-emerald-400" : "bg-slate-600"
            }`}
          />

          {isActive ? "Active" : "Disabled"}
        </span>
      </div>

      {/* Description */}
      <p className="text-slate-400 text-xs leading-5 mt-4">
        {connector.description}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-3 mt-5">
        <div className="bg-[#0d1324] border border-slate-800/60 rounded-xl p-3">
          <p className="text-[10px] text-slate-500 font-medium">
            LAST SYNC
          </p>

          <p className="text-white text-xs font-semibold mt-1">
            {connector.lastSync}
          </p>
        </div>

        <div className="bg-[#0d1324] border border-slate-800/60 rounded-xl p-3">
          <p className="text-[10px] text-slate-500 font-medium">
            IMPORTED LEADS
          </p>

          <p className="text-white text-xs font-semibold mt-1">
            {connector.importedLeads.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-5">
        <button
          onClick={() => onConfigure(connector)}
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors"
        >
          <Settings2 size={14} />
          Configure Global Connector
        </button>
      </div>
    </div>
  );
}