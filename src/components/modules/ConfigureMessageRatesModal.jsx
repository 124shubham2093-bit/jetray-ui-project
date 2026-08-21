import React, { useState } from "react";
import { X, Save, DollarSign } from "lucide-react";

export default function ConfigureMessageRatesModal({ rates, onClose, onSave }) {
  const [formRates, setFormRates] = useState(
    rates.map((r) => ({ ...r }))
  );

  const handleRateChange = (index, newRate) => {
    setFormRates((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], rate: Number(newRate) };
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formRates);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#15141b] border border-slate-800 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded bg-slate-800/90 border border-slate-700/60">
              <DollarSign size={13} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                Configure WhatsApp Message Rates
              </h3>
              <p className="text-slate-500 text-[9px] mt-0.5">
                Set billing rates per conversation category in INR (₹)
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
            {formRates.map((item, idx) => (
              <div
                key={item.category}
                className="bg-[#0c0f18] border border-slate-800/80 rounded-md p-3 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-slate-200 text-[11px] font-semibold">
                      {item.category}
                    </p>
                    <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                      {item.metaTemplateType}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[9px] mt-0.5 truncate">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="text-slate-400 text-[10px] font-mono">₹</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={item.rate}
                    onChange={(e) => handleRateChange(idx, e.target.value)}
                    className="w-20 h-7 bg-[#15141b] border border-slate-700 rounded px-2 text-[10px] text-white font-mono text-right outline-none focus:border-violet-500/60"
                  />
                  <span className="text-slate-500 text-[9px]">/ msg</span>
                </div>
              </div>
            ))}
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
              Save Message Rates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
