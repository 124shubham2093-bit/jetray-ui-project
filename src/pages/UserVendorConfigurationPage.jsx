import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  Users,
  Building2,
  CheckCircle,
} from "lucide-react";

/* ─── Default values ────────────────────────────────────── */
const DEFAULTS = {
  // User Settings
  allowRegistration: true,
  emailVerification: true,
  defaultRole: "user",
  maxLoginAttempts: 5,
  // Vendor Settings
  autoApproval: false,
  trialDays: 14,
  defaultContactLimit: 1000,
  messagesPerDay: 500,
};

/* ─── Toggle component (pill switch) ─────────────────────── */
function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
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
  );
}

/* ─── Divider ─────────────────────────────────────────────── */
function Divider() {
  return <div className="border-t border-slate-800/50" />;
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function UserVendorConfigurationPage() {
  const [values, setValues] = useState({ ...DEFAULTS });
  const [saved, setSaved] = useState(false);

  const handleChange = (key, value) => {
    setSaved(false);
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setValues({ ...DEFAULTS });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only — backend persistence will be added later.
    console.log("User & Vendor configuration:", values);
    setSaved(true);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          User &amp; Vendor Configuration
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Manage registration rules, default limits, and vendor access
          settings.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* ── USER SETTINGS ─────────────────────────────────── */}
        <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/70">
            <Users size={15} className="text-violet-400" />
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                User Settings
              </h3>
              <p className="text-slate-500 text-[10px] mt-0.5">
                Configure user registration and access rules.
              </p>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Allow User Registration */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-slate-300 text-[10px] font-medium">
                  Allow User Registration
                </p>
                <p className="text-slate-500 text-[9px] mt-0.5">
                  When enabled, new users can register on the platform.
                </p>
              </div>
              <Toggle
                enabled={values.allowRegistration}
                onChange={(v) => handleChange("allowRegistration", v)}
              />
            </div>

            <Divider />

            {/* Email Verification */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-slate-300 text-[10px] font-medium">
                  Email Verification Required
                </p>
                <p className="text-slate-500 text-[9px] mt-0.5">
                  Users must verify their email address before accessing the
                  platform.
                </p>
              </div>
              <Toggle
                enabled={values.emailVerification}
                onChange={(v) => handleChange("emailVerification", v)}
              />
            </div>

            <Divider />

            {/* Default Role + Max Login Attempts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="defaultRole"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Default User Role
                </label>
                <select
                  id="defaultRole"
                  value={values.defaultRole}
                  onChange={(e) =>
                    handleChange("defaultRole", e.target.value)
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60 transition-colors"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="maxLoginAttempts"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Maximum Login Attempts
                </label>
                <input
                  id="maxLoginAttempts"
                  type="number"
                  min={1}
                  max={20}
                  value={values.maxLoginAttempts}
                  onChange={(e) =>
                    handleChange(
                      "maxLoginAttempts",
                      Number(e.target.value)
                    )
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── VENDOR SETTINGS ──────────────────────────────── */}
        <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/70">
            <Building2 size={15} className="text-violet-400" />
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                Vendor Settings
              </h3>
              <p className="text-slate-500 text-[10px] mt-0.5">
                Configure default vendor access limits and approval
                workflow.
              </p>
            </div>
          </div>

          <div className="p-5 space-y-5">
            {/* Vendor Auto-Approval */}
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-slate-300 text-[10px] font-medium">
                  Vendor Auto-Approval
                </p>
                <p className="text-slate-500 text-[9px] mt-0.5">
                  When enabled, new vendor registrations are approved
                  automatically without admin review.
                </p>
              </div>
              <Toggle
                enabled={values.autoApproval}
                onChange={(v) => handleChange("autoApproval", v)}
              />
            </div>

            <Divider />

            {/* Trial Days / Contact Limit / Messages per Day */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="trialDays"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Trial Period (Days)
                </label>
                <input
                  id="trialDays"
                  type="number"
                  min={0}
                  value={values.trialDays}
                  onChange={(e) =>
                    handleChange("trialDays", Number(e.target.value))
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="defaultContactLimit"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Default Contact Limit
                </label>
                <input
                  id="defaultContactLimit"
                  type="number"
                  min={0}
                  value={values.defaultContactLimit}
                  onChange={(e) =>
                    handleChange(
                      "defaultContactLimit",
                      Number(e.target.value)
                    )
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="messagesPerDay"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Messages / Day Limit
                </label>
                <input
                  id="messagesPerDay"
                  type="number"
                  min={0}
                  value={values.messagesPerDay}
                  onChange={(e) =>
                    handleChange(
                      "messagesPerDay",
                      Number(e.target.value)
                    )
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── ACTIONS ──────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-2">
          {saved && (
            <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium mr-2">
              <CheckCircle size={12} />
              Configuration saved
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-[10px] font-semibold transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
          >
            <Save size={12} />
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
