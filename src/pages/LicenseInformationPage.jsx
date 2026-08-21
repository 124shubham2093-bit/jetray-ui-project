import React, { useState } from "react";
import {
  ShieldCheck,
  Key,
  Globe,
  Calendar,
  CheckCircle2,
  RefreshCw,
  Server,
  Cpu,
  Database,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { LICENSE_INFO } from "../data/platformModules";

export default function LicenseInformationPage() {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setVerified(false);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 1200);
  };

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="p-6 space-y-5">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <ShieldCheck size={20} className="text-violet-400" />
            License Information
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            System license certificate, commercial entitlement, domain registration, and server health status.
          </p>
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={verifying}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-[10px] font-semibold transition-colors shrink-0"
        >
          <RefreshCw size={11} className={verifying ? "animate-spin" : ""} />
          {verifying ? "Verifying with Jetray Central..." : "Re-Verify License"}
        </button>
      </div>

      {verified && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-3 flex items-center gap-2 text-emerald-400 text-[10px] font-medium">
          <CheckCircle2 size={13} />
          License verified successfully with Jetray License Server (Simulated). Status: Active &amp; Valid.
        </div>
      )}

      {/* ── Main License Certificate Card ────────────────────── */}
      <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div>
            <span className="text-slate-500 text-[9px] uppercase tracking-wider font-semibold">License Certificate</span>
            <h3 className="text-white text-sm font-bold mt-0.5">{LICENSE_INFO.licenseType}</h3>
          </div>

          <span className="inline-flex items-center gap-1 text-[9px] px-2.5 py-1 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={11} />
            {LICENSE_INFO.status}
          </span>
        </div>

        {/* License Key Box */}
        <div>
          <label className="block text-slate-400 text-[9px] uppercase tracking-wider font-semibold mb-1">
            Registered License Key
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#0c0f18] border border-slate-800 rounded px-3 py-2 text-violet-400 font-mono text-[11px] font-bold tracking-wide">
              {LICENSE_INFO.licenseKey}
            </div>
            <button
              type="button"
              onClick={() => handleCopy(LICENSE_INFO.licenseKey)}
              className="p-2 bg-[#0c0f18] border border-slate-800 hover:border-slate-700 rounded text-slate-400 hover:text-white transition-colors"
              title="Copy License Key"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        {/* Grid of Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="bg-[#0c0f18] border border-slate-800/80 rounded p-3">
            <p className="text-slate-500 text-[9px] font-medium uppercase tracking-wide">Licensed Entity</p>
            <p className="text-slate-200 text-xs font-semibold mt-1">{LICENSE_INFO.registeredTo}</p>
          </div>

          <div className="bg-[#0c0f18] border border-slate-800/80 rounded p-3">
            <p className="text-slate-500 text-[9px] font-medium uppercase tracking-wide">Authorized Domain</p>
            <p className="text-slate-200 text-xs font-semibold mt-1 font-mono">{LICENSE_INFO.registeredDomain}</p>
          </div>

          <div className="bg-[#0c0f18] border border-slate-800/80 rounded p-3">
            <p className="text-slate-500 text-[9px] font-medium uppercase tracking-wide">Installed Version</p>
            <p className="text-slate-200 text-xs font-semibold mt-1 font-mono">{LICENSE_INFO.version}</p>
          </div>

          <div className="bg-[#0c0f18] border border-slate-800/80 rounded p-3">
            <p className="text-slate-500 text-[9px] font-medium uppercase tracking-wide">Vendor Limit</p>
            <p className="text-slate-200 text-xs font-semibold mt-1">{LICENSE_INFO.maxVendors}</p>
          </div>

          <div className="bg-[#0c0f18] border border-slate-800/80 rounded p-3">
            <p className="text-slate-500 text-[9px] font-medium uppercase tracking-wide">Module Entitlement</p>
            <p className="text-slate-200 text-xs font-semibold mt-1">{LICENSE_INFO.allowedAddons}</p>
          </div>

          <div className="bg-[#0c0f18] border border-slate-800/80 rounded p-3">
            <p className="text-slate-500 text-[9px] font-medium uppercase tracking-wide">License Expiry</p>
            <p className="text-emerald-400 text-xs font-semibold mt-1">{LICENSE_INFO.expiryDate}</p>
          </div>
        </div>
      </div>

      {/* ── System Environment & Requirements ────────────────── */}
      <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Server size={14} className="text-violet-400" />
            <h4 className="text-slate-200 text-xs font-semibold">System Environment Health</h4>
          </div>
          <span className="text-[9px] text-emerald-400 font-semibold">&bull; All Systems Normal</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px]">
          <div className="bg-[#0c0f18] border border-slate-800 rounded p-2.5">
            <span className="text-slate-500 text-[9px]">Runtime</span>
            <p className="text-slate-200 font-semibold font-mono mt-0.5">Node.js v20.x</p>
          </div>

          <div className="bg-[#0c0f18] border border-slate-800 rounded p-2.5">
            <span className="text-slate-500 text-[9px]">Frontend</span>
            <p className="text-slate-200 font-semibold font-mono mt-0.5">React 18 / Vite 5</p>
          </div>

          <div className="bg-[#0c0f18] border border-slate-800 rounded p-2.5">
            <span className="text-slate-500 text-[9px]">Database Engine</span>
            <p className="text-slate-200 font-semibold font-mono mt-0.5">PostgreSQL / Prisma</p>
          </div>

          <div className="bg-[#0c0f18] border border-slate-800 rounded p-2.5">
            <span className="text-slate-500 text-[9px]">Memory Allocation</span>
            <p className="text-slate-200 font-semibold font-mono mt-0.5">1024 MB (Adequate)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
