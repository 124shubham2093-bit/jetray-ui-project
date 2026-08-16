import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function LeadDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  lead,
}) {
  if (!isOpen || !lead) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#131a2e] border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-6">
          <div className="flex items-center gap-3.5 mb-4">
            <div className="w-11 h-11 rounded-full bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h3 className="text-white font-bold text-base">Delete Lead?</h3>
              <p className="text-slate-400 text-xs mt-0.5">This action cannot be undone.</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 bg-[#0b0f1e] border border-slate-800/80 rounded-xl p-3.5 leading-relaxed">
            Are you sure you want to delete lead <strong className="text-white">{lead.name}</strong> ({lead.email})? All associated notes and records will be permanently removed.
          </p>

          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(lead.id)}
              className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Delete Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
