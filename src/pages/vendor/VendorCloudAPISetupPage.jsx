import React, { useState } from "react";
import {
  Cable,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Save,
  Key,
  Eye,
  EyeOff,
  Smartphone,
  ShieldCheck,
  Activity,
  Sparkles,
  RefreshCw,
  Sliders,
  Check,
  X,
} from "lucide-react";
import { VENDOR_PROFILE } from "../../data/vendorData";

export default function VendorCloudAPISetupPage() {
  const [wabaId, setWabaId] = useState(VENDOR_PROFILE.wabaId);
  const [phoneNumberId, setPhoneNumberId] = useState(VENDOR_PROFILE.phoneNumberId);
  const [accessToken, setAccessToken] = useState(VENDOR_PROFILE.accessToken);
  const [showToken, setShowToken] = useState(false);
  const [defaultPhone, setDefaultPhone] = useState("+91 98765 43210");
  const [templateAnalytics, setTemplateAnalytics] = useState(true);

  // Diagnostic states
  const [debuggingToken, setDebuggingToken] = useState(false);
  const [tokenDebugModal, setTokenDebugModal] = useState(false);
  const [checkingHealth, setCheckingHealth] = useState(false);
  const [healthResult, setHealthResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const handleDebugToken = () => {
    setDebuggingToken(true);
    setTimeout(() => {
      setDebuggingToken(false);
      setTokenDebugModal(true);
    }, 1000);
  };

  const handleCheckHealth = () => {
    setCheckingHealth(true);
    setHealthResult(null);
    setTimeout(() => {
      setCheckingHealth(false);
      setHealthResult({
        status: "Healthy",
        graphLatency: "142ms",
        webhookDelivery: "100% (200 OK)",
        tierLimit: "100K Unique Customers / Day (Tier 3)",
        sslCert: "Valid (TLS 1.3 Active)",
      });
    }, 1200);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <Cable size={22} className="text-violet-400" />
            Meta WhatsApp Cloud API Configuration
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Manage your official Meta Graph API connection, permanent system user token, and WABA credentials.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 mr-2 animate-in fade-in">
              <CheckCircle size={14} /> Cloud API settings saved!
            </span>
          )}

          <button
            type="button"
            onClick={handleCheckHealth}
            disabled={checkingHealth}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <Activity size={13} className={checkingHealth ? "animate-spin" : ""} />
            {checkingHealth ? "Running Diagnostics..." : "Check Account Health"}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Save size={13} />
            Save Configuration
          </button>
        </div>
      </div>

      {/* ── 3 Setup Areas Status Badges ──────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-4 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">1. Facebook App</span>
            <p className="text-xs font-bold text-white mt-0.5">Meta Business Manager</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ✓ Configured
          </span>
        </div>

        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-4 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">2. Inbound Webhooks</span>
            <p className="text-xs font-bold text-white mt-0.5">Callback &amp; Verify Token</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ✓ Configured
          </span>
        </div>

        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-4 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold">3. WhatsApp Integration</span>
            <p className="text-xs font-bold text-white mt-0.5">Cloud API v19.0</p>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ✓ Configured
          </span>
        </div>
      </div>

      {/* ── Health Check Results Panel ───────────────────────── */}
      {healthResult && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle size={15} />
              Meta Cloud API Diagnostic Health Check Passed
            </h4>
            <span className="text-[10px] font-mono text-emerald-300">HTTP 200 OK</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
            <div>
              <span className="text-slate-400 text-[10px] block">Graph API Latency:</span>
              <span className="text-white font-mono font-bold">{healthResult.graphLatency}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Webhook Delivery Rate:</span>
              <span className="text-emerald-400 font-mono font-bold">{healthResult.webhookDelivery}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">Daily Messaging Tier:</span>
              <span className="text-violet-300 font-medium">{healthResult.tierLimit}</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">SSL Webhook Certificate:</span>
              <span className="text-white font-mono font-bold">{healthResult.sslCert}</span>
            </div>
          </div>
        </div>
      )}

      {/* ── Cloud API Setup Grid ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Credentials Form (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-4 text-xs">
            <h3 className="text-sm font-semibold text-white border-b border-slate-800 pb-2">
              Meta Cloud API Credentials
            </h3>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                WhatsApp Business Account ID (WABA ID) *
              </label>
              <input
                type="text"
                required
                value={wabaId}
                onChange={(e) => setWabaId(e.target.value)}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white font-mono outline-none focus:border-violet-500/60"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Sender Phone Number ID *
              </label>
              <input
                type="text"
                required
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white font-mono outline-none focus:border-violet-500/60"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-medium">Permanent System User Access Token *</label>
                <button
                  type="button"
                  onClick={handleDebugToken}
                  disabled={debuggingToken}
                  className="text-[10px] text-violet-400 hover:underline font-semibold"
                >
                  {debuggingToken ? "Inspecting..." : "Debug Token"}
                </button>
              </div>

              <div className="relative">
                <input
                  type={showToken ? "text" : "password"}
                  required
                  value={accessToken}
                  onChange={(e) => setAccessToken(e.target.value)}
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded pl-3 pr-8 text-white font-mono outline-none focus:border-violet-500/60"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showToken ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="block text-slate-300 font-medium mb-1">Default Connected Phone Number</label>
              <select
                value={defaultPhone}
                onChange={(e) => setDefaultPhone(e.target.value)}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white font-mono outline-none focus:border-violet-500/60"
              >
                <option value="+91 98765 43210">+91 98765 43210 (Primary Mumbai Line)</option>
                <option value="+91 98111 22334">+91 98111 22334 (Secondary Sales Line)</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <div>
                <p className="font-semibold text-slate-200">Template Analytics Sync</p>
                <p className="text-slate-500 text-[10px]">Automatically synchronize open and click analytics with Meta.</p>
              </div>
              <input
                type="checkbox"
                checked={templateAnalytics}
                onChange={(e) => setTemplateAnalytics(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Right Operational Status Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-violet-400" />
              Meta WABA Operational Status
            </h3>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Verified Name:</span>
                <span className="text-white font-bold text-right truncate max-w-[200px]">{VENDOR_PROFILE.verifiedBusinessName}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Quality Rating:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {VENDOR_PROFILE.qualityRating}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Connection Status:</span>
                <span className="text-emerald-400 font-semibold">● Connected (Online)</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Phone ID:</span>
                <span className="text-slate-200 font-mono text-[10px]">{VENDOR_PROFILE.phoneNumberId}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">WABA ID:</span>
                <span className="text-slate-200 font-mono text-[10px]">{VENDOR_PROFILE.wabaId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── TOKEN DEBUG MODAL ────────────────────────────────── */}
      {tokenDebugModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-md shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-white text-xs font-semibold">Meta Token Debug Inspector</h3>
              <button type="button" onClick={() => setTokenDebugModal(false)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Token Type:</span>
                <span className="text-white font-mono">SYSTEM_USER (Permanent)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Granted Scopes:</span>
                <span className="text-violet-300 font-mono text-[10px]">whatsapp_business_messaging, whatsapp_business_management</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Validity:</span>
                <span className="text-emerald-400 font-semibold">Valid &bull; Never Expires</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setTokenDebugModal(false)}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-200 text-xs hover:bg-slate-700"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
