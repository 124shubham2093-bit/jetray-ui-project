import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  RotateCcw,
  Save,
  ShieldAlert,
  ArrowLeft,
  Sliders,
  Sparkles,
} from "lucide-react";

export default function TrialSystemModulePage({ onBack }) {
  // Trial Configuration
  const [enableTrial, setEnableTrial] = useState(true);
  const [trialDays, setTrialDays] = useState(14);
  const [trialPlan, setTrialPlan] = useState("Professional");
  const [maxTrialsPerUser, setMaxTrialsPerUser] = useState(1);
  const [requireEmailVerify, setRequireEmailVerify] = useState(true);
  const [requirePhoneVerify, setRequirePhoneVerify] = useState(true);

  // Expiry Settings
  const [sendReminder, setSendReminder] = useState(true);
  const [reminderDays, setReminderDays] = useState(3);
  const [expiryAction, setExpiryAction] = useState("downgrade_free"); // "disable_account" | "downgrade_free" | "require_sub"

  // Abuse Prevention
  const [onePerEmail, setOnePerEmail] = useState(true);
  const [onePerPhone, setOnePerPhone] = useState(true);
  const [onePerDomain, setOnePerDomain] = useState(true);
  const [blockDuplicateCards, setBlockDuplicateCards] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setEnableTrial(true);
    setTrialDays(14);
    setTrialPlan("Professional");
    setMaxTrialsPerUser(1);
    setRequireEmailVerify(true);
    setRequirePhoneVerify(true);
    setSendReminder(true);
    setReminderDays(3);
    setExpiryAction("downgrade_free");
    setOnePerEmail(true);
    setOnePerPhone(true);
    setOnePerDomain(true);
    setBlockDuplicateCards(true);
    setSaved(false);
  };

  const getExpiryActionLabel = (act) => {
    if (act === "disable_account") return "Disable Account Access";
    if (act === "downgrade_free") return "Downgrade to Free Tier";
    return "Enforce Paid Subscription";
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
              <Clock size={20} className="text-violet-400" />
              Trial System Configuration
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Configure free trial periods, expiry conversion actions, and automated multi-layer abuse prevention.
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
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
          >
            <Save size={11} />
            Save Configuration
          </button>
        </div>
      </div>

      {/* ── Live Summary Card ───────────────────────────────── */}
      <div className="bg-[#15141b] border border-violet-500/30 rounded-sm p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[9px] uppercase tracking-wider text-violet-400 font-bold flex items-center gap-1">
            <Sparkles size={11} /> Active Policy Summary
          </span>
          <div className="flex items-center gap-4 mt-2 flex-wrap text-xs">
            <div>
              <span className="text-slate-500 text-[10px]">Trial Duration: </span>
              <span className="text-white font-bold font-mono">{trialDays} Days</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px]">Assigned Plan: </span>
              <span className="text-violet-300 font-semibold">{trialPlan}</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px]">Expiry Reminder: </span>
              <span className="text-white font-mono">{reminderDays} Days Before</span>
            </div>
            <div>
              <span className="text-slate-500 text-[10px]">Expiry Action: </span>
              <span className="text-emerald-400 font-medium">{getExpiryActionLabel(expiryAction)}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1 text-[9px] px-2.5 py-1 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle size={10} />
            {enableTrial ? "Trial Engine Active" : "Trial Engine Disabled"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left: Trial Engine Configuration ────────────────── */}
        <div className="space-y-5">
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-slate-200 text-xs font-semibold">Trial Duration &amp; Plan Allocation</h3>
              <input
                type="checkbox"
                checked={enableTrial}
                onChange={(e) => setEnableTrial(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="space-y-3.5 text-[10px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Trial Period (Days)</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={trialDays}
                    onChange={(e) => setTrialDays(Number(e.target.value))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Assigned Trial Plan</label>
                  <select
                    value={trialPlan}
                    onChange={(e) => setTrialPlan(e.target.value)}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="Starter">Starter Plan</option>
                    <option value="Professional">Professional Plan</option>
                    <option value="Enterprise">Enterprise Plan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Maximum Trials Per User</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={maxTrialsPerUser}
                  onChange={(e) => setMaxTrialsPerUser(Number(e.target.value))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Require Email Verification</span>
                  <input
                    type="checkbox"
                    checked={requireEmailVerify}
                    onChange={(e) => setRequireEmailVerify(e.target.checked)}
                    className="accent-violet-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Require WhatsApp OTP</span>
                  <input
                    type="checkbox"
                    checked={requirePhoneVerify}
                    onChange={(e) => setRequirePhoneVerify(e.target.checked)}
                    className="accent-violet-600 rounded"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Expiry Policies */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800 pb-3">
              Expiry Alerts &amp; Post-Trial Action
            </h3>

            <div className="space-y-3.5 text-[10px]">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-200 font-medium">Send Expiry Warning</p>
                    <p className="text-slate-500 text-[9px]">Notify before trial ends.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={sendReminder}
                    onChange={(e) => setSendReminder(e.target.checked)}
                    className="accent-violet-600 rounded"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Notice Days Before</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={reminderDays}
                    onChange={(e) => setReminderDays(Number(e.target.value))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Action Upon Expiration</label>
                <select
                  value={expiryAction}
                  onChange={(e) => setExpiryAction(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                >
                  <option value="downgrade_free">Downgrade to Free Basic Tier</option>
                  <option value="disable_account">Temporarily Lock / Disable Account</option>
                  <option value="require_sub">Require Immediate Subscription Payment</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Multi-Layer Abuse Prevention ────────────── */}
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <ShieldAlert size={16} className="text-violet-400" />
            <h3 className="text-slate-200 text-xs font-semibold">Multi-Layer Abuse Prevention Rules</h3>
          </div>

          <div className="space-y-4 text-[10px]">
            <div className="flex items-center justify-between p-3 bg-[#0c0f18] border border-slate-800 rounded">
              <div>
                <p className="text-slate-200 font-medium">One Trial per Email Address</p>
                <p className="text-slate-500 text-[9px]">Block disposable or alias email domains from claiming additional trials.</p>
              </div>
              <input
                type="checkbox"
                checked={onePerEmail}
                onChange={(e) => setOnePerEmail(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0c0f18] border border-slate-800 rounded">
              <div>
                <p className="text-slate-200 font-medium">One Trial per Verified WhatsApp Number</p>
                <p className="text-slate-500 text-[9px]">Enforce hardware phone number uniqueness via WhatsApp verification OTP.</p>
              </div>
              <input
                type="checkbox"
                checked={onePerPhone}
                onChange={(e) => setOnePerPhone(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0c0f18] border border-slate-800 rounded">
              <div>
                <p className="text-slate-200 font-medium">One Trial per Corporate Domain</p>
                <p className="text-slate-500 text-[9px]">Limit multiple employees from the same organization claiming separate trials.</p>
              </div>
              <input
                type="checkbox"
                checked={onePerDomain}
                onChange={(e) => setOnePerDomain(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0c0f18] border border-slate-800 rounded">
              <div>
                <p className="text-slate-200 font-medium">Block Duplicate Payment Method Fingerprints</p>
                <p className="text-slate-500 text-[9px]">Detect and prevent re-use of credit cards across multiple accounts.</p>
              </div>
              <input
                type="checkbox"
                checked={blockDuplicateCards}
                onChange={(e) => setBlockDuplicateCards(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
