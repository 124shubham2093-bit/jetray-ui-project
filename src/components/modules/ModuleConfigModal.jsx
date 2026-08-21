import React, { useState } from "react";
import {
  X,
  Save,
  CheckCircle,
  Settings,
  HelpCircle,
  Code,
  Copy,
  Check,
} from "lucide-react";

export default function ModuleConfigModal({ module, onClose, onSave }) {
  const [settings, setSettings] = useState({ ...(module.settings || {}) });
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleField = (key, value) => {
    setSaved(false);
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(module.id, settings);
    setSaved(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleCopyScript = (text) => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const renderModuleSpecificFields = () => {
    switch (module.id) {
      case "auto-updater":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-[10px] font-medium">Auto-Check for Updates</p>
                <p className="text-slate-500 text-[9px]">Check for daily core and security patches.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoCheck ?? true}
                onChange={(e) => handleField("autoCheck", e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-[10px] font-medium">Automatic Backup Before Update</p>
                <p className="text-slate-500 text-[9px]">Create an automated database snapshot.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.backupBeforeUpdate ?? true}
                onChange={(e) => handleField("backupBeforeUpdate", e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">Notification Email</label>
              <input
                type="email"
                value={settings.notifyEmail || ""}
                onChange={(e) => handleField("notifyEmail", e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
              />
            </div>
          </div>
        );

      case "birthday-greetings":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Daily Dispatch Time</label>
                <input
                  type="time"
                  value={settings.sendTime || "09:00"}
                  onChange={(e) => handleField("sendTime", e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Include Discount Coupon</label>
                <select
                  value={settings.includeDiscountCoupon ? "yes" : "no"}
                  onChange={(e) => handleField("includeDiscountCoupon", e.target.value === "yes")}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                >
                  <option value="yes">Yes (Auto-generate code)</option>
                  <option value="no">No coupon</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">Default Greeting Message Template</label>
              <textarea
                rows={3}
                value={settings.defaultTemplate || ""}
                onChange={(e) => handleField("defaultTemplate", e.target.value)}
                className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2 text-[10px] text-white outline-none focus:border-violet-500/60 resize-none"
              />
            </div>
          </div>
        );

      case "web-chat-widget":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Widget Accent Color</label>
                <input
                  type="color"
                  value={settings.widgetColor || "#10b981"}
                  onChange={(e) => handleField("widgetColor", e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-1 outline-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Screen Position</label>
                <select
                  value={settings.position || "bottom-right"}
                  onChange={(e) => handleField("position", e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                >
                  <option value="bottom-right">Bottom Right</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">Default WhatsApp Number</label>
              <input
                type="text"
                value={settings.defaultPhoneNumber || ""}
                onChange={(e) => handleField("defaultPhoneNumber", e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
              />
            </div>
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">Chat Bubble Greeting</label>
              <input
                type="text"
                value={settings.greetingText || ""}
                onChange={(e) => handleField("greetingText", e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
              />
            </div>
          </div>
        );

      case "google-sheets-script":
        const appsScriptCode = `function onEdit(e) {\n  var sheet = e.source.getActiveSheet();\n  var row = e.range.getRow();\n  var phone = sheet.getRange(row, 2).getValue();\n  var message = sheet.getRange(row, 3).getValue();\n  UrlFetchApp.fetch("${settings.scriptWebhookUrl || "https://your-domain.com/api/sheets/webhook"}", {\n    method: "POST",\n    contentType: "application/json",\n    payload: JSON.stringify({ phone: phone, message: message })\n  });\n}`;
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">Webhook Dispatch Endpoint</label>
              <input
                type="text"
                value={settings.scriptWebhookUrl || ""}
                onChange={(e) => handleField("scriptWebhookUrl", e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 text-[10px] font-medium">Google Apps Script Snippet</label>
                <button
                  type="button"
                  onClick={() => handleCopyScript(appsScriptCode)}
                  className="inline-flex items-center gap-1 text-[9px] text-violet-400 hover:text-violet-300"
                >
                  {copied ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
                  {copied ? "Copied" : "Copy Code"}
                </button>
              </div>
              <pre className="bg-[#0c0f18] border border-slate-800 rounded p-2.5 text-[9px] text-slate-300 font-mono overflow-x-auto max-h-32">
                {appsScriptCode}
              </pre>
            </div>
          </div>
        );

      case "multi-ai-providers":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Default AI Engine</label>
                <select
                  value={settings.defaultProvider || "OpenAI"}
                  onChange={(e) => handleField("defaultProvider", e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                >
                  <option value="OpenAI">OpenAI (GPT-4o)</option>
                  <option value="Anthropic">Anthropic (Claude 3.5)</option>
                  <option value="Google">Google (Gemini 1.5 Pro)</option>
                  <option value="Groq">Groq (Llama 3.1 70B)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Failover Fallback Engine</label>
                <select
                  value={settings.fallbackProvider || "Google Gemini"}
                  onChange={(e) => handleField("fallbackProvider", e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                >
                  <option value="Google Gemini">Google Gemini</option>
                  <option value="Anthropic Claude">Anthropic Claude</option>
                  <option value="OpenAI">OpenAI</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-slate-300 text-[10px] font-medium mb-1">Max Token Response Cap</label>
              <input
                type="number"
                value={settings.maxTokenLimit || 4096}
                onChange={(e) => handleField("maxTokenLimit", Number(e.target.value))}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
              />
            </div>
          </div>
        );

      case "drip-campaign":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Max Drip Steps</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={settings.maxDripSteps || 10}
                  onChange={(e) => handleField("maxDripSteps", Number(e.target.value))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Min Step Interval (Hours)</label>
                <input
                  type="number"
                  min="1"
                  value={settings.minIntervalHours || 24}
                  onChange={(e) => handleField("minIntervalHours", Number(e.target.value))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-300 text-[10px] font-medium">Auto-Stop Drip on Inbound Reply</p>
                <p className="text-slate-500 text-[9px]">Halt campaign sequence when recipient replies.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.stopOnReply ?? true}
                onChange={(e) => handleField("stopOnReply", e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>
          </div>
        );

      case "trial-system":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Default Trial Days</label>
                <input
                  type="number"
                  min="1"
                  max="90"
                  value={settings.defaultTrialDays || 14}
                  onChange={(e) => handleField("defaultTrialDays", Number(e.target.value))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>
              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Expiry Warning Alerts (Days)</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.expiryReminderDays || 3}
                  onChange={(e) => handleField("expiryReminderDays", Number(e.target.value))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-3">
            <p className="text-slate-400 text-[10px]">
              Configure platform parameters for <span className="text-white font-semibold">{module.name}</span>.
            </p>
            <div className="bg-[#0c0f18] border border-slate-800 rounded p-3 text-[10px] text-slate-400">
              <p className="text-slate-300 font-medium mb-1">Status: Active &amp; Integrated</p>
              <p className="text-slate-500 text-[9px]">Module settings are live and active in the system context.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#15141b] border border-slate-800 rounded-lg w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-7 h-7 rounded bg-slate-800/90 border border-slate-700/60">
              <Settings size={13} className="text-violet-400" />
            </div>
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                Configure {module.name}
              </h3>
              <p className="text-slate-500 text-[9px] mt-0.5">
                {module.category} &bull; {module.version}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-800"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-5">{renderModuleSpecificFields()}</div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-2 px-5 py-3.5 border-t border-slate-800/80 bg-[#12121a]">
            {saved && (
              <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium mr-2">
                <CheckCircle size={12} />
                Settings saved
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white text-[10px] font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
            >
              <Save size={12} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
