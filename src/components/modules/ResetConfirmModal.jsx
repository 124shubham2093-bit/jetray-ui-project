import React from "react";
import { AlertTriangle, RotateCcw, X } from "lucide-react";

export default function ResetConfirmModal({ isOpen, title, message, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#15141b] border border-amber-500/40 rounded-lg w-full max-w-sm overflow-hidden shadow-2xl p-5 space-y-3 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-2.5 text-amber-400">
          <AlertTriangle size={18} />
          <h4 className="text-slate-200 text-xs font-semibold">
            {title || "Reset Configuration to Defaults?"}
          </h4>
        </div>
        <p className="text-slate-400 text-[10px] leading-relaxed">
          {message ||
            "This will restore the factory default settings for this module. Any custom modifications will be reverted."}
        </p>
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white text-[10px] font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-600 hover:bg-amber-500 text-white text-[10px] font-semibold transition-colors"
          >
            <RotateCcw size={11} />
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );
}
