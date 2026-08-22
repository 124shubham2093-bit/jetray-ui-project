import React, { useState } from "react";
import {
  Send,
  Plus,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertCircle,
  FileCode,
  Users,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
} from "lucide-react";
import { VENDOR_CAMPAIGNS_SEED, VENDOR_TEMPLATES_SEED } from "../../data/vendorData";

export default function VendorCampaignsPage() {
  const [campaigns, setCampaigns] = useState(VENDOR_CAMPAIGNS_SEED);
  const [isCreating, setIsCreating] = useState(false);
  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState("");

  // Campaign Form State
  const [campaignName, setCampaignName] = useState("Product Launch Broadcast");
  const [selectedTemplateId, setSelectedTemplateId] = useState("tpl-1");
  const [variable1, setVariable1] = useState("Valued Customer");
  const [variable2, setVariable2] = useState("Wedding Gala 2026");
  const [targetGroup, setTargetGroup] = useState("All Contacts (1,420)");
  const [sendImmediately, setSendImmediately] = useState(true);
  const [scheduledDateTime, setScheduledDateTime] = useState("2026-08-25T10:00");

  const selectedTemplate = VENDOR_TEMPLATES_SEED.find((t) => t.id === selectedTemplateId) || VENDOR_TEMPLATES_SEED[0];

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 2500);
  };

  // Live calculated payload preview
  const livePayloadPreview = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "+91XXXXXXXXXX",
    type: "template",
    template: {
      name: selectedTemplate.name,
      language: {
        code: selectedTemplate.language.startsWith("English") ? "en_US" : "hi_IN",
      },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", text: variable1 },
            { type: "text", text: variable2 },
          ],
        },
      ],
    },
    meta_broadcast_config: {
      campaign_name: campaignName,
      target_audience: targetGroup,
      dispatch_mode: sendImmediately ? "immediate" : "scheduled",
      scheduled_at: sendImmediately ? null : scheduledDateTime,
    },
  };

  const handleFinishCreate = () => {
    const newCmp = {
      id: `cmp-${Date.now()}`,
      name: campaignName,
      template: selectedTemplate.name,
      target: targetGroup,
      scheduledTime: sendImmediately ? "Today (Immediate)" : scheduledDateTime.replace("T", " "),
      status: sendImmediately ? "Sending" : "Scheduled",
      total: 350,
      sent: sendImmediately ? 120 : 0,
      delivered: sendImmediately ? 118 : 0,
      read: sendImmediately ? 45 : 0,
      replied: 0,
      failed: 0,
    };

    setCampaigns([newCmp, ...campaigns]);
    setIsCreating(false);
    setStep(1);
    showFeedback("Broadcast campaign launched successfully!");
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <Send size={22} className="text-violet-400" />
            WhatsApp Broadcast Campaigns
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Launch high-volume template broadcasts, schedule festive dispatches, and track real-time delivery rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {feedback && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 mr-2 animate-in fade-in">
              <CheckCircle size={14} /> {feedback}
            </span>
          )}

          <button
            type="button"
            onClick={() => showFeedback("Templates synchronized with Meta.")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <RefreshCw size={13} />
            Sync Templates
          </button>

          <button
            type="button"
            onClick={() => {
              setIsCreating(!isCreating);
              setStep(1);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus size={13} />
            {isCreating ? "Manage Campaigns" : "Create Campaign"}
          </button>
        </div>
      </div>

      {/* ── CREATE CAMPAIGN WIZARD (2 STEPS) ─────────────────── */}
      {isCreating && (
        <div className="bg-[#12131b] border border-slate-800 rounded-lg p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === 1 ? "bg-violet-600 text-white" : "bg-emerald-600 text-white"
                  }`}
                >
                  1
                </span>
                <span className="text-xs font-semibold text-slate-200">Template &amp; Variables</span>
              </div>
              <ArrowRight size={14} className="text-slate-600" />
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    step === 2 ? "bg-violet-600 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  2
                </span>
                <span className="text-xs font-semibold text-slate-200">Audience &amp; Schedule</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-slate-500 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Configuration Form (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {step === 1 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Campaign Reference Name *</label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="e.g. Festive Wedding Showcase 2026"
                      className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-white outline-none focus:border-violet-500/60"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Select Meta-Approved Template *</label>
                    <select
                      value={selectedTemplateId}
                      onChange={(e) => setSelectedTemplateId(e.target.value)}
                      className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                    >
                      {VENDOR_TEMPLATES_SEED.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.category}) — {t.language}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Template Body Card */}
                  <div className="bg-[#0c0f18] p-3.5 rounded border border-slate-800 space-y-2">
                    <p className="text-[11px] font-semibold text-slate-400 uppercase">Template Message Preview:</p>
                    <p className="text-slate-200 leading-relaxed bg-[#1a2620] p-3 rounded text-xs">
                      {selectedTemplate.body}
                    </p>
                  </div>

                  {/* Variables Fill */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <label className="block text-slate-300 font-semibold">Fill Dynamic Variables</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[10px] text-slate-500 block mb-0.5">Variable {"{{1}}"} (Customer Name)</span>
                        <input
                          type="text"
                          value={variable1}
                          onChange={(e) => setVariable1(e.target.value)}
                          className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block mb-0.5">Variable {"{{2}}"} (Event / Code)</span>
                        <input
                          type="text"
                          value={variable2}
                          onChange={(e) => setVariable2(e.target.value)}
                          className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center gap-1.5"
                    >
                      Continue to Step 2
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-semibold mb-1">Target Audience Group *</label>
                    <select
                      value={targetGroup}
                      onChange={(e) => setTargetGroup(e.target.value)}
                      className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                    >
                      <option value="All Contacts (1,420)">All Contacts (1,420)</option>
                      <option value="VIP (80 Contacts)">VIP (80 Contacts)</option>
                      <option value="Corporate Clients (220 Contacts)">Corporate Clients (220 Contacts)</option>
                      <option value="Wedding Leads (450 Contacts)">Wedding Leads (450 Contacts)</option>
                    </select>
                  </div>

                  {/* Send Timing */}
                  <div className="bg-[#0c0f18] p-4 rounded border border-slate-800 space-y-3">
                    <label className="block text-slate-300 font-semibold">Dispatch Timing</label>
                    <div className="flex items-center gap-6">
                      <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                        <input
                          type="radio"
                          name="timing"
                          checked={sendImmediately}
                          onChange={() => setSendImmediately(true)}
                          className="accent-violet-600"
                        />
                        Send Immediately
                      </label>
                      <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                        <input
                          type="radio"
                          name="timing"
                          checked={!sendImmediately}
                          onChange={() => setSendImmediately(false)}
                          className="accent-violet-600"
                        />
                        Schedule for Later
                      </label>
                    </div>

                    {!sendImmediately && (
                      <div className="pt-2">
                        <label className="block text-slate-400 text-[10px] mb-1">Select Date &amp; Time</label>
                        <input
                          type="datetime-local"
                          value={scheduledDateTime}
                          onChange={(e) => setScheduledDateTime(e.target.value)}
                          className="w-full h-8 bg-[#12131b] border border-slate-700 rounded px-2.5 text-white font-mono"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-2 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white flex items-center gap-1"
                    >
                      <ArrowLeft size={13} />
                      Back to Step 1
                    </button>
                    <button
                      type="button"
                      onClick={handleFinishCreate}
                      className="px-4 py-2 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold flex items-center gap-1.5 shadow-sm"
                    >
                      <Send size={13} />
                      Launch Campaign
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Live API Payload JSON Preview (5 cols) */}
            <div className="lg:col-span-5 bg-[#0c0f18] border border-slate-800 rounded-lg p-4 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[11px] font-mono text-violet-400 flex items-center gap-1.5 font-semibold">
                  <FileCode size={13} /> Live WhatsApp Cloud API Payload
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                  POST /v19.0/messages
                </span>
              </div>

              <pre className="p-3 bg-[#08090f] text-emerald-400 font-mono text-[10px] rounded overflow-x-auto max-h-72 leading-relaxed border border-slate-900 select-all">
                {JSON.stringify(livePayloadPreview, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ── CAMPAIGN MANAGEMENT HISTORY TABLE ────────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#0e1017]">
          <h3 className="text-white text-xs font-semibold">Campaign Dispatches &amp; Performance History</h3>
          <span className="text-slate-400 text-xs font-mono">{campaigns.length} Campaigns</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-emerald-600/80 text-white uppercase text-[10px] font-semibold border-b border-slate-800">
                <th className="p-3.5">Campaign Name</th>
                <th className="p-3.5">Template</th>
                <th className="p-3.5">Target Audience</th>
                <th className="p-3.5">Time</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Total</th>
                <th className="p-3.5">Delivered</th>
                <th className="p-3.5">Read</th>
                <th className="p-3.5">Replied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-3.5 font-bold text-white">{c.name}</td>
                  <td className="p-3.5 font-mono text-violet-300">{c.template}</td>
                  <td className="p-3.5 text-slate-300">{c.target}</td>
                  <td className="p-3.5 font-mono text-slate-500 text-[10px]">{c.scheduledTime}</td>
                  <td className="p-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                        c.status === "Completed"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : c.status === "Sending"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse"
                          : "bg-slate-800 text-slate-400 border border-slate-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-semibold text-white">{c.total}</td>
                  <td className="p-3.5 font-mono text-emerald-400">{c.delivered}</td>
                  <td className="p-3.5 font-mono text-violet-300">{c.read}</td>
                  <td className="p-3.5 font-mono text-cyan-400">{c.replied}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
