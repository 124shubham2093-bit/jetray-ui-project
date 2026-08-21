import React, { useState } from "react";
import { X, Save, Wallet, PlusCircle, MinusCircle, AlertCircle } from "lucide-react";

export default function AdjustWalletModal({ vendor, onClose, onSave }) {
  const [adjustmentType, setAdjustmentType] = useState("credit"); // "credit" | "debit"
  const [amount, setAmount] = useState(500);
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    onSave({
      vendorId: vendor.id,
      adjustmentType,
      amount: Number(amount),
      reason: reason.trim() || `Manual ${adjustmentType} adjustment by Administrator`,
    });
    onClose();
  };

  const calculatedBalance =
    adjustmentType === "credit"
      ? vendor.balance + Number(amount || 0)
      : Math.max(0, vendor.balance - Number(amount || 0));

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#15141b] border border-slate-800 rounded-lg w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded bg-slate-800/90 border border-slate-700/60">
              <Wallet size={13} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                Adjust Vendor Wallet
              </h3>
              <p className="text-slate-500 text-[9px] mt-0.5">
                {vendor.vendorName} ({vendor.id})
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
          <div className="p-5 space-y-4">
            {/* Current Balance Summary Box */}
            <div className="bg-[#0c0f18] border border-slate-800/80 rounded-md p-3 flex items-center justify-between">
              <div>
                <p className="text-slate-500 text-[9px] font-medium">Current Credit Balance</p>
                <p className="text-white text-base font-bold mt-0.5">
                  {vendor.balance.toLocaleString()} Credits
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 text-[9px] font-medium">Estimated New Balance</p>
                <p className={`text-base font-bold mt-0.5 ${adjustmentType === "credit" ? "text-emerald-400" : "text-amber-400"}`}>
                  {calculatedBalance.toLocaleString()} Credits
                </p>
              </div>
            </div>

            {/* Type selector */}
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1.5">
                Adjustment Action
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAdjustmentType("credit")}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-[10px] font-semibold border transition-all ${
                    adjustmentType === "credit"
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400"
                      : "bg-[#0c0f18] border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <PlusCircle size={12} />
                  Add Credits (Credit)
                </button>

                <button
                  type="button"
                  onClick={() => setAdjustmentType("debit")}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-[10px] font-semibold border transition-all ${
                    adjustmentType === "debit"
                      ? "bg-red-500/10 border-red-500/40 text-red-400"
                      : "bg-[#0c0f18] border-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <MinusCircle size={12} />
                  Deduct Credits (Debit)
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">
                Amount of Credits *
              </label>
              <input
                type="number"
                min="1"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60 font-mono"
              />
            </div>

            {/* Reason */}
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">
                Reason / Note for Audit Log *
              </label>
              <textarea
                rows={2}
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g. Promotional loyalty credit, Refund for failed broadcast campaign..."
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
              Confirm Wallet Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
