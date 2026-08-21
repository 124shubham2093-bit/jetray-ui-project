import React, { useState } from "react";
import {
  Sliders,
  Save,
  RotateCcw,
  CheckCircle,
  Package,
  Layers,
  HelpCircle,
  Check,
  X,
  Sparkles,
} from "lucide-react";
import { PLATFORM_MODULES, SEED_PLAN_ADDONS } from "../data/platformModules";
import { ResetConfirmModal } from "../components/modules";

export default function PlanAddonControlPage() {
  const [matrix, setMatrix] = useState(JSON.parse(JSON.stringify(SEED_PLAN_ADDONS)));
  const [saved, setSaved] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const plans = ["Starter", "Professional", "Enterprise"];
  const modules = PLATFORM_MODULES.filter((m) => !m.isProtected);

  const handleToggle = (planName, moduleId) => {
    setSaved(false);
    setMatrix((prev) => ({
      ...prev,
      [planName]: {
        ...prev[planName],
        [moduleId]: !prev[planName]?.[moduleId],
      },
    }));
  };

  const handleConfirmReset = () => {
    setMatrix(JSON.parse(JSON.stringify(SEED_PLAN_ADDONS)));
    setSaved(false);
    setResetModalOpen(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Plan Addon Control Matrix Saved:", matrix);
    setSaved(true);
  };

  const countActiveForPlan = (planName) => {
    const planObj = matrix[planName] || {};
    return Object.values(planObj).filter(Boolean).length;
  };

  return (
    <div className="p-6 space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <Sliders size={20} className="text-violet-400" />
            Plan Addon Control
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Control which installed platform modules and addons are permitted for each vendor subscription tier.
          </p>
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
            onClick={() => setResetModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white text-[10px] font-semibold transition-colors"
          >
            <RotateCcw size={11} />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
          >
            <Save size={11} />
            Save Configuration
          </button>
        </div>
      </div>

      {/* ── Plan Entitlement Overview Cards (Feature I) ──────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            name: "Starter",
            price: "₹499 / mo",
            badge: "Entry Tier",
            border: "border-slate-800",
            activeCount: countActiveForPlan("Starter"),
          },
          {
            name: "Professional",
            price: "₹1,499 / mo",
            badge: "Most Popular",
            border: "border-violet-500/40",
            activeCount: countActiveForPlan("Professional"),
          },
          {
            name: "Enterprise",
            price: "₹4,999 / mo",
            badge: "All-Inclusive",
            border: "border-emerald-500/40",
            activeCount: countActiveForPlan("Enterprise"),
          },
        ].map((p) => (
          <div key={p.name} className={`bg-[#15141b] border ${p.border} rounded-sm p-4 space-y-2`}>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white text-xs font-bold">{p.name} Plan</span>
                <span className="text-slate-500 text-[9px] block">{p.price}</span>
              </div>
              <span className="text-[8px] px-2 py-0.5 rounded-full font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                {p.badge}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
              <span className="text-slate-400">Permitted Modules:</span>
              <span className="text-white font-mono font-bold">
                {p.activeCount} / {modules.length} Enabled
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Matrix Table ─────────────────────────────────────── */}
      <div className="bg-[#15141b] border border-slate-800/80 rounded-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#12121a] text-[10px] font-semibold text-slate-400">
                <th className="px-5 py-3.5 w-1/3">Installed Module / Addon</th>
                <th className="px-5 py-3.5 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-slate-200 font-bold">Starter Plan</span>
                    <span className="text-[9px] text-slate-500 font-normal">₹499 / mo</span>
                  </div>
                </th>
                <th className="px-5 py-3.5 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-violet-400 font-bold">Professional Plan</span>
                    <span className="text-[9px] text-slate-500 font-normal">₹1,499 / mo</span>
                  </div>
                </th>
                <th className="px-5 py-3.5 text-center">
                  <div className="inline-flex flex-col items-center">
                    <span className="text-emerald-400 font-bold">Enterprise Plan</span>
                    <span className="text-[9px] text-slate-500 font-normal">₹4,999 / mo</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[10px]">
              {modules.map((mod) => (
                <tr key={mod.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div>
                        <p className="text-slate-200 font-semibold">{mod.name}</p>
                        <p className="text-slate-500 text-[9px]">{mod.category} &bull; {mod.version}</p>
                      </div>
                    </div>
                  </td>

                  {plans.map((plan) => {
                    const isEnabled = matrix[plan]?.[mod.id] ?? false;
                    return (
                      <td key={plan} className="px-5 py-3.5 text-center">
                        <button
                          type="button"
                          role="switch"
                          aria-checked={isEnabled}
                          onClick={() => handleToggle(plan, mod.id)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
                            isEnabled ? "bg-violet-600" : "bg-slate-700"
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
                              isEnabled ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Guidance Note ────────────────────────────────────── */}
      <div className="bg-[#15141b] border border-slate-800/70 rounded-sm p-4 flex items-start gap-3">
        <HelpCircle size={15} className="text-violet-400 shrink-0 mt-0.5" />
        <div className="text-[10px] text-slate-400 space-y-1">
          <p className="text-slate-200 font-semibold">Tiered Feature Enforcement</p>
          <p>
            When a module toggle is enabled for a tier, all active vendors assigned to that subscription plan immediately gain access to the corresponding menu actions and API capabilities. Disabling a module hides it from the vendor dashboard without affecting existing database records.
          </p>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={resetModalOpen}
        title="Reset Plan Addon Permissions Matrix?"
        message="This will revert all Starter, Professional, and Enterprise module permissions to the default platform matrix."
        onConfirm={handleConfirmReset}
        onCancel={() => setResetModalOpen(false)}
      />
    </div>
  );
}
