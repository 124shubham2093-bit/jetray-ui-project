import React, { useState } from "react";
import {
  Settings,
  Save,
  CheckCircle,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Clock,
  RotateCcw,
} from "lucide-react";
import { VENDOR_PROFILE } from "../../data/vendorData";

export default function VendorSettingsGeneralPage() {
  const [profile, setProfile] = useState({ ...VENDOR_PROFILE });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    setProfile({ ...VENDOR_PROFILE });
    setSaved(false);
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <Settings size={22} className="text-violet-400" />
            General Business Settings
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Configure your vendor company profile, business location, dispatch timezone, and default locale.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 mr-2 animate-in fade-in">
              <CheckCircle size={14} /> Changes saved successfully!
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Save size={13} />
            Save Changes
          </button>
        </div>
      </div>

      {/* ── Business Profile Form ────────────────────────────── */}
      <form onSubmit={handleSave} className="bg-[#12131b] border border-slate-800/80 rounded-lg p-6 space-y-6">
        <div className="space-y-4 text-xs">
          <h3 className="text-sm font-semibold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
            <Building size={16} className="text-violet-400" />
            Company Identity &amp; Contact Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Vendor Title / Business Name *</label>
              <input
                type="text"
                required
                value={profile.companyName}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white outline-none focus:border-violet-500/60"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Contact Email Address *</label>
              <input
                type="email"
                required
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white outline-none focus:border-violet-500/60 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Business Phone Number *</label>
              <input
                type="text"
                required
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white outline-none focus:border-violet-500/60 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Postal Address</label>
              <input
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white outline-none focus:border-violet-500/60"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-slate-300 font-medium mb-1">City</label>
              <input
                type="text"
                value={profile.city}
                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">State / Province</label>
              <input
                type="text"
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Country</label>
              <input
                type="text"
                value={profile.country}
                onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white outline-none"
              />
            </div>
          </div>
        </div>

        {/* Locale & Timezone */}
        <div className="space-y-4 text-xs pt-4 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-white border-b border-slate-800 pb-2 flex items-center gap-2">
            <Globe size={16} className="text-violet-400" />
            Localization &amp; Campaign Timezone
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Default Timezone</label>
              <select
                value={profile.timezone}
                onChange={(e) => setProfile({ ...profile, timezone: e.target.value })}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
              >
                <option value="Asia/Kolkata (IST +05:30)">Asia/Kolkata (IST +05:30)</option>
                <option value="UTC (GMT +00:00)">UTC (GMT +00:00)</option>
                <option value="America/New_York (EST -05:00)">America/New_York (EST -05:00)</option>
                <option value="Europe/London (GMT +00:00)">Europe/London (GMT +00:00)</option>
                <option value="Asia/Dubai (GST +04:00)">Asia/Dubai (GST +04:00)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Default Panel Language</label>
              <select
                value={profile.language}
                onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
              >
                <option value="English (US)">English (US)</option>
                <option value="Hindi">Hindi (हिंदी)</option>
                <option value="Spanish">Spanish (Español)</option>
                <option value="Arabic">Arabic (العربية)</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
