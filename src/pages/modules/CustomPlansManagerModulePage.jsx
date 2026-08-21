import React, { useState } from "react";
import {
  Sliders,
  CheckCircle,
  RotateCcw,
  Save,
  Plus,
  Edit2,
  Trash2,
  Package,
  Layers,
  ArrowLeft,
  X,
} from "lucide-react";
import { PLATFORM_MODULES, SEED_PLAN_ADDONS } from "../../data/platformModules";

export default function CustomPlansManagerModulePage({ onBack }) {
  const [plans, setPlans] = useState([
    {
      id: 1,
      name: "Starter Plan",
      key: "Starter",
      description: "Essential WhatsApp broadcasting tools for startups and independent vendors.",
      price: 499,
      billingCycle: "Monthly",
      trialAvailable: true,
      status: "active",
      addons: { ...SEED_PLAN_ADDONS.Starter },
    },
    {
      id: 2,
      name: "Professional Plan",
      key: "Professional",
      description: "Comprehensive automation, Multi AI, and CRM integration for growing companies.",
      price: 1499,
      billingCycle: "Monthly",
      trialAvailable: true,
      status: "active",
      addons: { ...SEED_PLAN_ADDONS.Professional },
    },
    {
      id: 3,
      name: "Enterprise Plan",
      key: "Enterprise",
      description: "Unlimited high-volume broadcasts, dedicated webhooks, and full platform access.",
      price: 4999,
      billingCycle: "Monthly",
      trialAvailable: false,
      status: "active",
      addons: { ...SEED_PLAN_ADDONS.Enterprise },
    },
  ]);

  const [editingPlan, setEditingPlan] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const availableModules = PLATFORM_MODULES.filter((m) => !m.isProtected);

  const handleOpenEdit = (plan) => {
    setEditingPlan(JSON.parse(JSON.stringify(plan)));
    setModalOpen(true);
  };

  const handleOpenCreate = () => {
    const defaultAddons = {};
    availableModules.forEach((m) => {
      defaultAddons[m.id] = false;
    });

    setEditingPlan({
      id: Date.now(),
      name: "",
      key: `Custom_${Date.now()}`,
      description: "",
      price: 999,
      billingCycle: "Monthly",
      trialAvailable: true,
      status: "active",
      addons: defaultAddons,
    });
    setModalOpen(true);
  };

  const handleToggleAddonInModal = (modId) => {
    setEditingPlan((prev) => ({
      ...prev,
      addons: {
        ...prev.addons,
        [modId]: !prev.addons[modId],
      },
    }));
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!editingPlan.name.trim()) return;

    setPlans((prev) => {
      const exists = prev.some((p) => p.id === editingPlan.id);
      if (exists) {
        return prev.map((p) => (p.id === editingPlan.id ? editingPlan : p));
      }
      return [...prev, editingPlan];
    });

    setModalOpen(false);
    setSaved(true);
  };

  const handleToggleStatus = (id) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p
      )
    );
  };

  const handleDeletePlan = (id) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
  };

  const countActiveAddons = (addonsObj) => {
    if (!addonsObj) return 0;
    return Object.values(addonsObj).filter(Boolean).length;
  };

  const handleReset = () => {
    setPlans([
      {
        id: 1,
        name: "Starter Plan",
        key: "Starter",
        description: "Essential WhatsApp broadcasting tools for startups and independent vendors.",
        price: 499,
        billingCycle: "Monthly",
        trialAvailable: true,
        status: "active",
        addons: { ...SEED_PLAN_ADDONS.Starter },
      },
      {
        id: 2,
        name: "Professional Plan",
        key: "Professional",
        description: "Comprehensive automation, Multi AI, and CRM integration for growing companies.",
        price: 1499,
        billingCycle: "Monthly",
        trialAvailable: true,
        status: "active",
        addons: { ...SEED_PLAN_ADDONS.Professional },
      },
      {
        id: 3,
        name: "Enterprise Plan",
        key: "Enterprise",
        description: "Unlimited high-volume broadcasts, dedicated webhooks, and full platform access.",
        price: 4999,
        billingCycle: "Monthly",
        trialAvailable: false,
        status: "active",
        addons: { ...SEED_PLAN_ADDONS.Enterprise },
      },
    ]);
    setSaved(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* ── Header ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Back to All Modules"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <div>
            <h2 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
              <Sliders size={20} className="text-violet-400" />
              Custom Plans &amp; Tier Manager
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Create and manage subscription tiers, billing cycles, pricing, and permitted module feature bundles.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {saved && (
            <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium mr-2">
              <CheckCircle size={12} />
              Configuration saved
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white text-[10px] font-semibold transition-colors"
          >
            <RotateCcw size={11} />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
          >
            <Plus size={11} />
            Create Custom Plan
          </button>
        </div>
      </div>

      {/* ── Plans Table ─────────────────────────────────────── */}
      <div className="bg-[#15141b] border border-slate-800/80 rounded-sm overflow-hidden shadow-sm">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-slate-200 text-xs font-semibold">Configured Subscription Tiers</h3>
          <span className="text-slate-400 text-[10px]">
            {plans.length} {plans.length === 1 ? "Plan" : "Plans"} Defined
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#12121a] text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-5 py-3">Plan Details</th>
                <th className="px-5 py-3">Price &amp; Billing</th>
                <th className="px-5 py-3">Active Modules Included</th>
                <th className="px-5 py-3">Trial Eligibility</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[10px]">
              {plans.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <p className="text-slate-200 font-bold text-xs">{p.name}</p>
                    <p className="text-slate-500 text-[9px] mt-0.5">{p.description}</p>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="text-emerald-400 font-bold font-mono text-sm">
                      ₹{p.price.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-[9px] ml-1">/ {p.billingCycle}</span>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 font-mono">
                      <Package size={10} />
                      {countActiveAddons(p.addons)} of {availableModules.length} Modules
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    {p.trialAvailable ? (
                      <span className="text-emerald-400 text-[9px] font-semibold">14 Days Trial</span>
                    ) : (
                      <span className="text-slate-500 text-[9px]">Direct Paid Only</span>
                    )}
                  </td>

                  <td className="px-5 py-3.5">
                    <span
                      className={`text-[8px] px-2 py-0.5 rounded-full font-semibold border ${
                        p.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {p.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(p)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-violet-400 text-[9px] font-semibold transition-colors"
                      >
                        <Edit2 size={10} /> Edit &amp; Modules
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeletePlan(p.id)}
                        className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                        title="Delete Plan"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── EDIT / CREATE PLAN MODAL ────────────────────────── */}
      {modalOpen && editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15141b] border border-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-5 space-y-4 flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 shrink-0">
              <h3 className="text-slate-200 text-xs font-semibold">
                Configure Plan: {editingPlan.name || "New Custom Tier"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Plan Name *</label>
                  <input
                    type="text"
                    required
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Price (INR ₹) *</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editingPlan.price}
                    onChange={(e) => setEditingPlan((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>

              {/* Module Addons Permission Picker */}
              <div className="pt-2">
                <h4 className="text-slate-200 text-xs font-semibold mb-2 flex items-center gap-1.5">
                  <Layers size={13} className="text-violet-400" />
                  Permitted Platform Module Addons
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto p-1 bg-[#0c0f18] border border-slate-800 rounded">
                  {availableModules.map((mod) => {
                    const enabled = editingPlan.addons?.[mod.id] ?? false;
                    return (
                      <label
                        key={mod.id}
                        className={`flex items-center justify-between p-2 rounded border cursor-pointer transition-colors ${
                          enabled
                            ? "bg-violet-600/10 border-violet-500/40"
                            : "bg-[#15141b] border-slate-800 hover:border-slate-700"
                        }`}
                      >
                        <span className="text-[10px] text-slate-300 truncate mr-2">{mod.name}</span>
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={() => handleToggleAddonInModal(mod.id)}
                          className="accent-violet-600 rounded shrink-0"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white text-[10px] font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
                >
                  <Save size={11} /> Save Plan Configuration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
