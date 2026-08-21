import React, { useState } from "react";
import {
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Download,
  ShieldCheck,
  RotateCcw,
  Save,
  Clock,
  HardDrive,
  Mail,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function AutoUpdaterModulePage({ onBack }) {
  const [channel, setChannel] = useState("stable");
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [backupBeforeUpdate, setBackupBeforeUpdate] = useState(true);
  const [notifySuccess, setNotifySuccess] = useState(true);
  const [notifyFailure, setNotifyFailure] = useState(true);
  const [adminEmail, setAdminEmail] = useState("admin@atozmarketing.shop");

  // Update check states
  const [checking, setChecking] = useState(false);
  const [checkStatus, setCheckStatus] = useState("up_to_date"); // "up_to_date" | "update_available"
  const [lastCheckTime, setLastCheckTime] = useState("Today, 18:30:15");
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCheckUpdates = () => {
    setChecking(true);
    setUpdated(false);
    setTimeout(() => {
      setChecking(false);
      setCheckStatus("update_available");
      setLastCheckTime(new Date().toLocaleTimeString());
    }, 1200);
  };

  const handleInstallUpdate = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      setCheckStatus("up_to_date");
      setUpdated(true);
    }, 2000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setChannel("stable");
    setAutoUpdates(true);
    setBackupBeforeUpdate(true);
    setNotifySuccess(true);
    setNotifyFailure(true);
    setAdminEmail("admin@atozmarketing.shop");
    setSaved(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* ── Top Header with Back Navigation ─────────────────── */}
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
              <RefreshCw size={20} className="text-violet-400" />
              Auto Updater Configuration
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Configure automated application releases, schema migrations, and update channels.
            </p>
          </div>
        </div>

        {/* Action buttons */}
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

      {/* ── Version & Environment Overview Card ──────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4">
          <span className="text-slate-500 text-[9px] uppercase tracking-wider font-semibold">Installed Version</span>
          <p className="text-white text-lg font-bold font-mono mt-1">v3.4.2</p>
          <span className="text-emerald-400 text-[9px] font-medium flex items-center gap-1 mt-1">
            <CheckCircle size={10} /> Active Release
          </span>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4">
          <span className="text-slate-500 text-[9px] uppercase tracking-wider font-semibold">Build Hash</span>
          <p className="text-slate-200 text-lg font-bold font-mono mt-1">20260821-B88</p>
          <span className="text-slate-500 text-[9px] font-medium mt-1">Built 2026-08-21</span>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4">
          <span className="text-slate-500 text-[9px] uppercase tracking-wider font-semibold">Initial Install</span>
          <p className="text-slate-200 text-lg font-bold font-mono mt-1">2026-01-15</p>
          <span className="text-slate-500 text-[9px] font-medium mt-1">Lifetime Enterprise</span>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4">
          <span className="text-slate-500 text-[9px] uppercase tracking-wider font-semibold">Last Checked</span>
          <p className="text-slate-200 text-sm font-bold font-mono mt-1">{lastCheckTime}</p>
          <button
            type="button"
            onClick={handleCheckUpdates}
            disabled={checking}
            className="mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-violet-400 hover:text-violet-300 text-[9px] font-semibold transition-colors disabled:opacity-50"
          >
            <RefreshCw size={10} className={checking ? "animate-spin" : ""} />
            {checking ? "Checking..." : "Check for Updates"}
          </button>
        </div>
      </div>

      {/* ── Update Available Alert / Card ────────────────────── */}
      {checkStatus === "update_available" && (
        <div className="bg-[#15141b] border border-violet-500/40 rounded-sm p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-violet-600/20 text-violet-400 border border-violet-500/30">
                <Sparkles size={16} />
              </div>
              <div>
                <h3 className="text-white text-xs font-bold">New Platform Version Available: v3.5.0</h3>
                <p className="text-slate-400 text-[10px]">Released August 25, 2026 &bull; Size: 28.4 MB</p>
              </div>
            </div>

            <button
              type="button"
              disabled={updating}
              onClick={handleInstallUpdate}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors disabled:opacity-50"
            >
              <Download size={11} className={updating ? "animate-bounce" : ""} />
              {updating ? "Installing Update (Simulated)..." : "Install Update Now"}
            </button>
          </div>

          <div className="bg-[#0c0f18] border border-slate-800 rounded p-3 text-[10px] text-slate-300 space-y-1">
            <p className="font-semibold text-violet-400">Changelog Highlights:</p>
            <ul className="list-disc list-inside space-y-0.5 text-slate-400">
              <li>Added enhanced WhatsApp Cloud API message template synchronizer.</li>
              <li>New multi-provider AI failover with token optimization.</li>
              <li>Database performance optimizations for large transaction logs.</li>
            </ul>
          </div>
        </div>
      )}

      {updated && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3 flex items-center gap-2 text-emerald-400 text-[10px] font-medium">
          <CheckCircle size={13} />
          Application updated successfully (Simulation). Current version is now up to date.
        </div>
      )}

      {/* ── Configuration Form ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Update Channel Settings */}
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
          <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800/80 pb-2.5">
            Release Channel Selection
          </h3>

          <div className="space-y-3">
            {[
              {
                id: "stable",
                name: "Stable Channel (Recommended)",
                desc: "Fully tested official production releases with guaranteed database backward-compatibility.",
              },
              {
                id: "beta",
                name: "Beta Channel",
                desc: "Early access preview builds featuring upcoming modules before public rollout.",
              },
              {
                id: "development",
                name: "Development / Nightly",
                desc: "Bleeding-edge daily builds for staging and development testing only.",
              },
            ].map((item) => (
              <label
                key={item.id}
                className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-colors ${
                  channel === item.id
                    ? "bg-violet-600/10 border-violet-500/40"
                    : "bg-[#0c0f18] border-slate-800 hover:border-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="channel"
                  checked={channel === item.id}
                  onChange={() => setChannel(item.id)}
                  className="accent-violet-600 mt-0.5"
                />
                <div>
                  <p className="text-slate-200 text-[10px] font-semibold">{item.name}</p>
                  <p className="text-slate-500 text-[9px] mt-0.5">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Automation & Safety Toggles */}
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
          <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800/80 pb-2.5">
            Automation &amp; Backup Policies
          </h3>

          <div className="space-y-4 text-[10px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-200 font-medium">Automatic Background Updates</p>
                <p className="text-slate-500 text-[9px]">Apply non-breaking security patches automatically.</p>
              </div>
              <input
                type="checkbox"
                checked={autoUpdates}
                onChange={(e) => setAutoUpdates(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-200 font-medium">Database Backup Before Update</p>
                <p className="text-slate-500 text-[9px]">Generate SQL dump snapshot before running schema migrations.</p>
              </div>
              <input
                type="checkbox"
                checked={backupBeforeUpdate}
                onChange={(e) => setBackupBeforeUpdate(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-200 font-medium">Notify Admin After Success</p>
                <p className="text-slate-500 text-[9px]">Send email summary of newly installed changes.</p>
              </div>
              <input
                type="checkbox"
                checked={notifySuccess}
                onChange={(e) => setNotifySuccess(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-200 font-medium">Notify Admin When Update Fails</p>
                <p className="text-slate-500 text-[9px]">Trigger high-priority alert on failed migration or network drop.</p>
              </div>
              <input
                type="checkbox"
                checked={notifyFailure}
                onChange={(e) => setNotifyFailure(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="pt-2">
              <label className="block text-slate-300 font-medium mb-1">
                Admin Notification Email
              </label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60 font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
