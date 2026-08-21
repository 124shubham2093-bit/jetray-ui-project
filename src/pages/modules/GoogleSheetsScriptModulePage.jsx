import React, { useState } from "react";
import {
  Database,
  CheckCircle,
  RotateCcw,
  Save,
  Copy,
  Check,
  Code,
  ArrowLeft,
  Key,
  Eye,
  EyeOff,
  ExternalLink,
  HelpCircle,
} from "lucide-react";

export default function GoogleSheetsScriptModulePage({ onBack }) {
  const [whatsappNumber, setWhatsappNumber] = useState("+919876543210");
  const [webhookUrl, setWebhookUrl] = useState(
    "https://api.jetray.in/v1/webhooks/sheets/dispatch"
  );
  const [authToken, setAuthToken] = useState("jtr_live_sec_9938201948271038");
  const [showToken, setShowToken] = useState(false);
  const [phoneColumn, setPhoneColumn] = useState("B");
  const [messageColumn, setMessageColumn] = useState("C");
  const [statusColumn, setStatusColumn] = useState("D");

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const generatedScript = `/**
 * Google Apps Script for Jetray WhatsApp Automated Dispatches
 * Auto-generated on: 2026-08-21
 */
function onEdit(e) {
  var sheet = e.source.getActiveSheet();
  var row = e.range.getRow();

  // Skip header row
  if (row <= 1) return;

  var phone = sheet.getRange("${phoneColumn}" + row).getValue();
  var message = sheet.getRange("${messageColumn}" + row).getValue();
  var statusCell = sheet.getRange("${statusColumn}" + row);

  if (!phone || !message) return;

  var payload = {
    senderNumber: "${whatsappNumber}",
    recipientPhone: String(phone),
    messageBody: String(message),
    timestamp: new Date().toISOString()
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      "Authorization": "Bearer ${authToken}",
      "X-Jetray-Source": "GoogleAppsScript"
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  try {
    var response = UrlFetchApp.fetch("${webhookUrl}", options);
    var statusCode = response.getResponseCode();
    if (statusCode === 200) {
      statusCell.setValue("SENT ✓ " + new Date().toLocaleTimeString());
    } else {
      statusCell.setValue("FAILED (" + statusCode + ")");
    }
  } catch (err) {
    statusCell.setValue("ERROR: " + err.toString());
  }
}`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setWhatsappNumber("+919876543210");
    setWebhookUrl("https://api.jetray.in/v1/webhooks/sheets/dispatch");
    setAuthToken("jtr_live_sec_9938201948271038");
    setPhoneColumn("B");
    setMessageColumn("C");
    setStatusColumn("D");
    setSaved(false);
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
              <Database size={20} className="text-violet-400" />
              Google Sheets Script for WhatsApp
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Generate custom Google Apps Script snippets to trigger instant WhatsApp message dispatches on spreadsheet edits.
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ── Left: Configuration Fields (5 cols) ─────────────── */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800 pb-3">
              Webhook &amp; Column Mapping Parameters
            </h3>

            <div className="space-y-3.5 text-[10px]">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Default Sender WhatsApp Number
                </label>
                <input
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Jetray API Webhook Dispatch Endpoint
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Authentication Token (Bearer)
                </label>
                <div className="relative">
                  <input
                    type={showToken ? "text" : "password"}
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-3 pr-8 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showToken ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Phone Col</label>
                  <input
                    type="text"
                    value={phoneColumn}
                    onChange={(e) => setPhoneColumn(e.target.value.toUpperCase())}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded text-center text-[10px] text-white font-mono font-bold outline-none focus:border-violet-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Message Col</label>
                  <input
                    type="text"
                    value={messageColumn}
                    onChange={(e) => setMessageColumn(e.target.value.toUpperCase())}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded text-center text-[10px] text-white font-mono font-bold outline-none focus:border-violet-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Status Col</label>
                  <input
                    type="text"
                    value={statusColumn}
                    onChange={(e) => setStatusColumn(e.target.value.toUpperCase())}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded text-center text-[10px] text-white font-mono font-bold outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-3">
            <h3 className="text-slate-200 text-xs font-semibold flex items-center gap-1.5">
              <HelpCircle size={14} className="text-violet-400" />
              Setup Guide for Google Sheets
            </h3>

            <ol className="list-decimal list-inside text-[10px] text-slate-400 space-y-2 leading-relaxed">
              <li>Open your target Google Spreadsheet.</li>
              <li>Navigate to the top menu: <span className="text-slate-200 font-medium">Extensions &rarr; Apps Script</span>.</li>
              <li>Delete any boilerplate code and paste the generated script on the right.</li>
              <li>Click the disk <span className="text-slate-200 font-medium">Save project</span> icon.</li>
              <li>Return to your sheet and type a phone number in Col {phoneColumn} and text in Col {messageColumn}.</li>
              <li>The script will automatically fire on edit and mark Col {statusColumn} as SENT ✓.</li>
            </ol>
          </div>
        </div>

        {/* ── Right: Generated Apps Script Editor (7 cols) ────── */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <Code size={14} className="text-violet-400" />
                <span className="text-slate-200 text-xs font-semibold">Generated Google Apps Script</span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
              >
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? "Copied Script" : "Copy Script to Clipboard"}
              </button>
            </div>

            <pre className="bg-[#0c0f18] border border-slate-800 rounded p-4 text-[10px] text-slate-300 font-mono overflow-x-auto h-[440px] leading-relaxed select-all">
              {generatedScript}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
