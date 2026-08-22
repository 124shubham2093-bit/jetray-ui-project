import React, { useState } from "react";
import {
  Code,
  Key,
  Copy,
  CheckCircle,
  Save,
  RefreshCw,
  ExternalLink,
  BookOpen,
  FileCode,
  Sparkles,
  Layers,
  Terminal,
} from "lucide-react";
import { VENDOR_PROFILE } from "../../data/vendorData";

export default function VendorDeveloperAPIPage() {
  const [webhookUrl, setWebhookUrl] = useState(VENDOR_PROFILE.webhookUrl);
  const [apiToken, setApiToken] = useState("jtr_live_9847102948192038471029384710");
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedUid, setCopiedUid] = useState(false);
  const [saved, setSaved] = useState(false);
  const [regenerating, setRegenerating] = useState(false);

  const handleCopyToken = () => {
    navigator.clipboard?.writeText(apiToken);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleCopyUid = () => {
    navigator.clipboard?.writeText(VENDOR_PROFILE.vendorUid);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const handleRegenerateToken = () => {
    setRegenerating(true);
    setTimeout(() => {
      setApiToken(`jtr_live_${Math.random().toString(36).substring(2)}${Date.now()}`);
      setRegenerating(false);
    }, 800);
  };

  const handleSaveWebhook = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sampleWebhookPayload = {
    event: "messages.received",
    timestamp: 1724338800,
    vendor_uid: VENDOR_PROFILE.vendorUid,
    data: {
      message_id: "wamid.HBgLOTE5ODc2NTQzMjEwFQIAEhgUM0VCMDAwMDAwMDAwMDAwMDAwAA==",
      sender: {
        phone: "+919876543210",
        name: "Aarav Sharma",
      },
      message: {
        type: "text",
        text: "Please send wedding quotation brochure.",
      },
      service_window_active: true,
    },
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <Code size={22} className="text-violet-400" />
            Developer API &amp; Inbound Webhooks
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Integrate your backend CRM, ERP, or serverless webhooks with Jetray&apos;s REST endpoints.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://documenter.getpostman.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <BookOpen size={13} />
            Postman Collection / API Docs
          </a>
        </div>
      </div>

      {/* ── Endpoint Information Grid ────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-500">API Base URL</span>
          <div className="flex items-center justify-between">
            <code className="text-xs text-violet-300 font-mono select-all">{VENDOR_PROFILE.apiBaseUrl}</code>
            <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              HTTPS v1 REST
            </span>
          </div>
        </div>

        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Vendor UID Identifier</span>
            {copiedUid && <span className="text-[10px] text-emerald-400 font-semibold">Copied!</span>}
          </div>
          <div className="flex items-center justify-between">
            <code className="text-xs text-white font-mono select-all">{VENDOR_PROFILE.vendorUid}</code>
            <button
              type="button"
              onClick={handleCopyUid}
              className="text-slate-400 hover:text-white p-1"
            >
              <Copy size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ── API Access Token Card ────────────────────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Key size={16} className="text-violet-400" />
            Vendor API Bearer Secret Token
          </h3>
          <button
            type="button"
            onClick={handleRegenerateToken}
            disabled={regenerating}
            className="text-[10px] text-violet-400 hover:underline flex items-center gap-1 font-semibold"
          >
            <RefreshCw size={11} className={regenerating ? "animate-spin" : ""} />
            Generate New Token
          </button>
        </div>

        <p className="text-slate-400 text-[11px]">
          Include this token in the <code className="text-violet-300 font-mono">Authorization: Bearer &lt;TOKEN&gt;</code> HTTP header for outbound broadcast dispatches.
        </p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={apiToken}
            className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white font-mono text-xs select-all outline-none"
          />
          <button
            type="button"
            onClick={handleCopyToken}
            className="h-9 px-3.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow-sm"
          >
            <Copy size={13} />
            {copiedToken ? "Copied!" : "Copy Token"}
          </button>
        </div>
      </div>

      {/* ── Webhook Endpoint Configuration & Live JSON ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Webhook Form (6 cols) */}
        <div className="lg:col-span-6 bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-sm font-semibold text-white">Inbound Webhook Delivery Endpoint</h3>
            {saved && (
              <span className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1">
                <CheckCircle size={12} /> Endpoint saved!
              </span>
            )}
          </div>

          <p className="text-slate-400 text-[11px] leading-relaxed">
            Whenever a customer replies or initiates a WhatsApp conversation, Jetray will POST the event payload in real-time to your webhook URL.
          </p>

          <form onSubmit={handleSaveWebhook} className="space-y-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Target HTTPS Webhook URL *</label>
              <input
                type="url"
                required
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                placeholder="https://your-domain.com/api/whatsapp/webhook"
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white font-mono outline-none focus:border-violet-500/60"
              />
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center gap-1.5"
              >
                <Save size={13} />
                Save Endpoint
              </button>
            </div>
          </form>
        </div>

        {/* Right Live JSON Payload Preview (6 cols) */}
        <div className="lg:col-span-6 bg-[#0c0f18] border border-slate-800 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-[11px] font-mono text-violet-400 flex items-center gap-1.5 font-semibold">
              <FileCode size={13} /> Sample Inbound Message Webhook Payload
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
              JSON (application/json)
            </span>
          </div>

          <pre className="p-3 bg-[#08090f] text-emerald-400 font-mono text-[10px] rounded overflow-x-auto max-h-56 leading-relaxed border border-slate-900 select-all">
            {JSON.stringify(sampleWebhookPayload, null, 2)}
          </pre>
        </div>
      </div>

      {/* ── Dynamic Parameters Documentation Table ────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 bg-[#0e1017]">
          <h3 className="text-white text-xs font-semibold">Dynamic Broadcast API Parameters</h3>
        </div>

        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-emerald-600/80 text-white uppercase text-[10px] font-semibold border-b border-slate-800">
              <th className="p-3">Variable Key</th>
              <th className="p-3">Parameter Type</th>
              <th className="p-3">Description &amp; Example Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
            <tr className="hover:bg-slate-800/20">
              <td className="p-3 font-mono text-violet-400 font-bold">{"{{first_name}}"}</td>
              <td className="p-3">String</td>
              <td className="p-3 text-slate-400">Recipient&apos;s given name (e.g. &quot;Aarav&quot;)</td>
            </tr>
            <tr className="hover:bg-slate-800/20">
              <td className="p-3 font-mono text-violet-400 font-bold">{"{{phone}}"}</td>
              <td className="p-3">String (E.164)</td>
              <td className="p-3 text-slate-400">Recipient international mobile number (e.g. &quot;+919876543210&quot;)</td>
            </tr>
            <tr className="hover:bg-slate-800/20">
              <td className="p-3 font-mono text-violet-400 font-bold">{"{{media_url}}"}</td>
              <td className="p-3">HTTPS URL</td>
              <td className="p-3 text-slate-400">Public direct CDN link to PDF invoice, JPEG banner, or MP4 video</td>
            </tr>
            <tr className="hover:bg-slate-800/20">
              <td className="p-3 font-mono text-violet-400 font-bold">{"{{custom_fields}}"}</td>
              <td className="p-3">JSON Key-Value</td>
              <td className="p-3 text-slate-400">Custom metadata key values (e.g. <code className="text-slate-300">{`{"booking_id": "BK-9912"}`}</code>)</td>
            </tr>
            <tr className="hover:bg-slate-800/20">
              <td className="p-3 font-mono text-violet-400 font-bold">{"{{button_payload}}"}</td>
              <td className="p-3">String</td>
              <td className="p-3 text-slate-400">Callback payload sent when user taps an interactive quick reply button</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
