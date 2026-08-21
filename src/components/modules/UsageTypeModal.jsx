import React, { useState } from "react";
import { X, Save, Layers, AlertCircle } from "lucide-react";

export default function UsageTypeModal({ usageData, onClose, onSave }) {
  const isEditing = Boolean(usageData);
  const isBuiltin = usageData?.type === "builtin";

  const [name, setName] = useState(usageData?.name || "");
  const [description, setDescription] = useState(usageData?.description || "");
  const [credits, setCredits] = useState(
    usageData ? usageData.credits : 1
  );
  const [enabled, setEnabled] = useState(
    usageData ? usageData.enabled : true
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Usage type name is required.");
      return;
    }
    if (credits === "" || isNaN(credits) || Number(credits) < 0) {
      setError("Credit cost must be a valid positive number (≥ 0).");
      return;
    }

    const payload = {
      ...(usageData || {}),
      id: usageData?.id || `custom-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Date.now()}`,
      name: name.trim(),
      description: description.trim(),
      credits: Number(credits),
      enabled,
      type: usageData?.type || "custom",
      icon: usageData?.icon || "Layers",
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#15141b] border border-slate-800 rounded-lg w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded bg-slate-800/90 border border-slate-700/60">
              <Layers size={13} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                {isEditing ? `Edit Usage Rate: ${usageData.name}` : "Add Custom Usage Type"}
              </h3>
              <p className="text-slate-500 text-[9px] mt-0.5">
                {isBuiltin ? "Built-in Jetray message type" : "Custom messaging or media action rate"}
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
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded p-2.5 flex items-center gap-2 text-red-400 text-[10px]">
                <AlertCircle size={12} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">
                Usage Type Name *
              </label>
              <input
                type="text"
                required
                disabled={isBuiltin}
                value={name}
                onChange={(e) => {
                  setError("");
                  setName(e.target.value);
                }}
                placeholder="e.g. AI Generated Image, Audio Translation"
                className={`w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60 ${
                  isBuiltin ? "opacity-60 cursor-not-allowed bg-slate-900" : ""
                }`}
              />
              {isBuiltin && (
                <p className="text-slate-500 text-[9px] mt-1">Built-in message type names cannot be renamed.</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the action..."
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
              />
            </div>

            {/* Credits & Enabled */}
            <div className="grid grid-cols-2 gap-3 items-center">
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">
                  Credits Consumed *
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  required
                  value={credits}
                  onChange={(e) => {
                    setError("");
                    setCredits(e.target.value);
                  }}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <span className="text-slate-300 text-[10px] font-medium">Enabled</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={enabled}
                  onClick={() => setEnabled(!enabled)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                    enabled ? "bg-violet-600" : "bg-slate-700"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                      enabled ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
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
              {isEditing ? "Save Rate" : "Add Usage Type"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
