import React from "react";
import { X, Mail, Phone, Building2, User, Tag, Calendar, Layers, FileText, Edit } from "lucide-react";

export default function LeadDetailsModal({
  isOpen,
  onClose,
  lead,
  onEdit,
}) {
  if (!isOpen || !lead) return null;

  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return "bg-sky-500/15 text-sky-400 border border-sky-500/30";
      case "Contacted":
        return "bg-blue-500/15 text-blue-400 border border-blue-500/30";
      case "Interested":
        return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
      case "Qualified":
        return "bg-purple-500/15 text-purple-400 border border-purple-500/30";
      case "Converted":
        return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
      case "Lost":
        return "bg-rose-500/15 text-rose-400 border border-rose-500/30";
      default:
        return "bg-slate-500/15 text-slate-400 border border-slate-500/30";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#131a2e] border border-slate-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-[#0e1424]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 text-sm font-bold">
              {lead.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-white font-bold text-base">{lead.name}</h3>
              <p className="text-slate-400 text-xs">{lead.company || "Individual Lead"}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Status & Source Row */}
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusBadge(
                lead.status
              )}`}
            >
              Status: {lead.status}
            </span>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Source: {lead.source}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-[#0b0f1e] border border-slate-800/80 rounded-xl p-4 text-xs">
            <div>
              <span className="text-slate-500 font-medium flex items-center gap-1 mb-1">
                <Mail size={12} className="text-slate-400" /> Email Address
              </span>
              <p className="text-slate-200 font-medium break-all">{lead.email}</p>
            </div>

            <div>
              <span className="text-slate-500 font-medium flex items-center gap-1 mb-1">
                <Phone size={12} className="text-slate-400" /> Phone Number
              </span>
              <p className="text-slate-200 font-medium">{lead.phone}</p>
            </div>

            <div>
              <span className="text-slate-500 font-medium flex items-center gap-1 mb-1">
                <User size={12} className="text-slate-400" /> Assigned Specialist
              </span>
              <p className="text-slate-200 font-medium">{lead.assignedTo || "Unassigned"}</p>
            </div>

            <div>
              <span className="text-slate-500 font-medium flex items-center gap-1 mb-1">
                <Calendar size={12} className="text-slate-400" /> Created Date
              </span>
              <p className="text-slate-200 font-medium">{lead.createdAt}</p>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <span className="text-slate-400 text-xs font-semibold flex items-center gap-1 mb-1.5">
              <FileText size={13} className="text-slate-400" /> Activity Notes & Requirements
            </span>
            <div className="bg-[#0b0f1e] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 leading-relaxed min-h-[64px]">
              {lead.notes || "No notes recorded for this lead yet."}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800/80 bg-[#0e1424]">
          <button
            onClick={() => {
              onClose();
              onEdit(lead);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-sky-600/20 border border-sky-500/30 text-sky-300 hover:bg-sky-600/30 text-xs font-semibold transition-colors"
          >
            <Edit size={13} /> Edit Details
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
