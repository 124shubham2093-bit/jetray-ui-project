import React, { useState } from "react";
import { X, Save, Coins, Plus } from "lucide-react";

export default function CreateCreditPackageModal({ packageData, onClose, onSave }) {
  const [form, setForm] = useState(
    packageData || {
      name: "",
      credits: 5000,
      price: 999,
      currency: "INR",
      badge: "",
      description: "",
      active: true,
    }
  );

  const setField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#15141b] border border-slate-800 rounded-lg w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded bg-slate-800/90 border border-slate-700/60">
              <Coins size={13} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                {packageData ? "Edit Credit Package" : "Create Credit Package"}
              </h3>
              <p className="text-slate-500 text-[9px] mt-0.5">
                Set package pricing, credits granted, and badge
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-800"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-5 space-y-3.5">
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">
                Package Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="e.g. Starter Pack, Growth Tier"
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">
                  Credits Granted *
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  required
                  value={form.credits}
                  onChange={(e) => setField("credits", Number(e.target.value))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">
                  Price (INR ₹) *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={form.price}
                  onChange={(e) => setField("price", Number(e.target.value))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">
                  Promotional Badge (Optional)
                </label>
                <input
                  type="text"
                  value={form.badge || ""}
                  onChange={(e) => setField("badge", e.target.value)}
                  placeholder="e.g. Popular, Best Value"
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-slate-300 text-[10px] font-medium">Package Active</span>
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setField("active", e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">
                Description / Benefit Note
              </label>
              <textarea
                rows={2}
                value={form.description || ""}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Briefly describe what this package is best suited for..."
                className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2 text-[10px] text-white outline-none focus:border-violet-500/60 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-800/80 bg-[#12121a]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white text-[10px] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
            >
              <Save size={12} />
              {packageData ? "Update Package" : "Create Package"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
