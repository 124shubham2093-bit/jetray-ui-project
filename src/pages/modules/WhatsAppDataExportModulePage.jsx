import React, { useState } from "react";
import {
  Download,
  CheckCircle,
  RotateCcw,
  Save,
  FileSpreadsheet,
  FileCode,
  Calendar,
  Layers,
  ArrowLeft,
  Sparkles,
  FileText,
} from "lucide-react";

export default function WhatsAppDataExportModulePage({ onBack }) {
  // Data selection
  const [exportTypes, setExportTypes] = useState({
    contacts: true,
    conversations: true,
    messages: true,
    templates: false,
    media: false,
    campaigns: true,
  });

  // Format & Media
  const [format, setFormat] = useState("xlsx"); // "csv" | "xlsx" | "json"
  const [includeMediaLinks, setIncludeMediaLinks] = useState(true);
  const [includeAttachmentMeta, setIncludeAttachmentMeta] = useState(true);

  // Date Range
  const [dateRange, setDateRange] = useState("last_30_days"); // "all_time" | "last_7_days" | "last_30_days" | "last_90_days" | "custom"

  // Generation state
  const [generating, setGenerating] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleExportType = (typeKey) => {
    setExportTypes((prev) => ({ ...prev, [typeKey]: !prev[typeKey] }));
  };

  const handleGenerateExport = () => {
    setGenerating(true);
    setDownloadReady(false);
    setTimeout(() => {
      setGenerating(false);
      setDownloadReady(true);
    }, 1500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setExportTypes({
      contacts: true,
      conversations: true,
      messages: true,
      templates: false,
      media: false,
      campaigns: true,
    });
    setFormat("xlsx");
    setIncludeMediaLinks(true);
    setIncludeAttachmentMeta(true);
    setDateRange("last_30_days");
    setDownloadReady(false);
    setSaved(false);
  };

  // Estimated stats
  const activeCount = Object.values(exportTypes).filter(Boolean).length;
  const estimatedRecords = activeCount * 3240;
  const estimatedSize = (activeCount * 2.8).toFixed(1);

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
              <Download size={20} className="text-violet-400" />
              WhatsApp Data Export Configuration
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Extract, archive, and download structured contact directories, chat logs, and campaign performance data.
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
            Save Preferences
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Left: Export Parameters (7 cols) ────────────────── */}
        <div className="lg:col-span-7 space-y-5">
          {/* Data Selection */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800 pb-3">
              Select Data Entities for Extraction
            </h3>

            <div className="grid grid-cols-2 gap-3 text-[10px]">
              {[
                { id: "contacts", label: "Contacts & Audience Directory", desc: "Names, phone numbers, custom fields" },
                { id: "conversations", label: "Conversations & Chat Threads", desc: "Vendor-to-contact thread histories" },
                { id: "messages", label: "Inbound & Outbound Messages", desc: "Full message payload body and timestamps" },
                { id: "templates", label: "Approved WhatsApp Templates", desc: "Meta-approved HSM message templates" },
                { id: "media", label: "Media References & File URLs", desc: "Image, video, document file links" },
                { id: "campaigns", label: "Campaign Analytics & Drips", desc: "Delivery rates, read receipts, CTR metrics" },
              ].map((item) => {
                const checked = exportTypes[item.id];
                return (
                  <label
                    key={item.id}
                    className={`flex items-start gap-2.5 p-3 rounded border cursor-pointer transition-colors ${
                      checked
                        ? "bg-violet-600/10 border-violet-500/40"
                        : "bg-[#0c0f18] border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleExportType(item.id)}
                      className="accent-violet-600 rounded mt-0.5"
                    />
                    <div>
                      <p className="text-slate-200 font-semibold text-[10px]">{item.label}</p>
                      <p className="text-slate-500 text-[9px] mt-0.5">{item.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Format & Date Range */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4 text-[10px]">
            <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800 pb-3">
              Output Format &amp; Date Filter
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1.5">File Format</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "xlsx", label: "Excel (.xlsx)", icon: FileSpreadsheet },
                    { id: "csv", label: "CSV (.csv)", icon: FileText },
                    { id: "json", label: "JSON (.json)", icon: FileCode },
                  ].map((f) => {
                    const Icon = f.icon;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFormat(f.id)}
                        className={`flex flex-col items-center justify-center p-2 rounded border text-[9px] font-semibold gap-1 transition-colors ${
                          format === f.id
                            ? "bg-violet-600 text-white border-violet-500"
                            : "bg-[#0c0f18] border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        <Icon size={14} />
                        {f.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">Time Range Filter</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-[10px] text-white outline-none focus:border-violet-500/60"
                >
                  <option value="all_time">All Time Historical Records</option>
                  <option value="last_7_days">Last 7 Days</option>
                  <option value="last_30_days">Last 30 Days (Recommended)</option>
                  <option value="last_90_days">Last 90 Days</option>
                  <option value="custom">Custom Date Range</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Include Media Download URLs</span>
                <input
                  type="checkbox"
                  checked={includeMediaLinks}
                  onChange={(e) => setIncludeMediaLinks(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Include Attachment Metadata</span>
                <input
                  type="checkbox"
                  checked={includeAttachmentMeta}
                  onChange={(e) => setIncludeAttachmentMeta(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Export Preview & Generator (5 cols) ──────── */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800 pb-3 flex items-center gap-1.5">
              <Sparkles size={14} className="text-violet-400" />
              Export Batch Overview
            </h3>

            <div className="space-y-3 text-[10px]">
              <div className="bg-[#0c0f18] border border-slate-800 rounded p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Record Count:</span>
                  <span className="text-white font-bold font-mono text-xs">
                    ~{estimatedRecords.toLocaleString()} Rows
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Selected Entities:</span>
                  <span className="text-violet-300 font-semibold">{activeCount} Data Types</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Export Format:</span>
                  <span className="text-white font-mono uppercase">{format}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Estimated Archive Size:</span>
                  <span className="text-emerald-400 font-mono font-semibold">~{estimatedSize} MB</span>
                </div>
              </div>

              {downloadReady && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3 flex items-center justify-between text-emerald-400 text-[10px] animate-in fade-in">
                  <span className="font-semibold flex items-center gap-1.5">
                    <CheckCircle size={12} />
                    Export Archive Ready (Simulated)
                  </span>
                  <a
                    href="#download-simulation"
                    onClick={(e) => e.preventDefault()}
                    className="px-2 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[9px] font-bold"
                  >
                    Download .{format}
                  </a>
                </div>
              )}

              <button
                type="button"
                disabled={generating || activeCount === 0}
                onClick={handleGenerateExport}
                className="w-full h-9 inline-flex items-center justify-center gap-2 rounded bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Download size={13} className={generating ? "animate-bounce" : ""} />
                {generating ? "Preparing & Compiling Export..." : "Generate Export (Simulated)"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
