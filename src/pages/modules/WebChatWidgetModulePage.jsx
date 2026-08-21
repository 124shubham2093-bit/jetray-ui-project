import React, { useState } from "react";
import {
  MessageCircle,
  CheckCircle,
  RotateCcw,
  Save,
  Copy,
  Check,
  Smartphone,
  Monitor,
  ArrowLeft,
  Send,
  X,
} from "lucide-react";

export default function WebChatWidgetModulePage({ onBack }) {
  // Appearance
  const [enableWidget, setEnableWidget] = useState(true);
  const [widgetTitle, setWidgetTitle] = useState("Chat with Support");
  const [greetingMessage, setGreetingMessage] = useState(
    "Hi there! 👋 How can we help you today? Click the button below to start chatting on WhatsApp."
  );
  const [buttonLabel, setButtonLabel] = useState("Start WhatsApp Chat");
  const [accentColor, setAccentColor] = useState("#10b981");
  const [position, setPosition] = useState("bottom-right"); // "bottom-right" | "bottom-left"

  // Contact
  const [phoneNumber, setPhoneNumber] = useState("+919876543210");
  const [prefilledMessage, setPrefilledMessage] = useState(
    "Hello! I am inquiring from your website."
  );

  // Behavior
  const [showDelay, setShowDelay] = useState(3);
  const [showGreetingBubble, setShowGreetingBubble] = useState(true);
  const [openAutomatically, setOpenAutomatically] = useState(false);
  const [showOnMobile, setShowOnMobile] = useState(true);
  const [showOnDesktop, setShowOnDesktop] = useState(true);

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const embedScript = `<!-- Jetray Floating WhatsApp Chat Widget -->\n<script\n  src="https://cdn.jetray.in/widget/v2.js"\n  data-widget-id="jtr_widget_984"\n  data-color="${accentColor}"\n  data-position="${position}"\n  async\n></script>`;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(embedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setEnableWidget(true);
    setWidgetTitle("Chat with Support");
    setGreetingMessage(
      "Hi there! 👋 How can we help you today? Click the button below to start chatting on WhatsApp."
    );
    setButtonLabel("Start WhatsApp Chat");
    setAccentColor("#10b981");
    setPosition("bottom-right");
    setPhoneNumber("+919876543210");
    setPrefilledMessage("Hello! I am inquiring from your website.");
    setShowDelay(3);
    setShowGreetingBubble(true);
    setOpenAutomatically(false);
    setShowOnMobile(true);
    setShowOnDesktop(true);
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
              <MessageCircle size={20} className="text-violet-400" />
              Web Chat Widget Configuration
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Customize the floating WhatsApp website chat widget, lead capture bubble, and embed code.
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

      {/* ── Main Layout: Controls & Live Preview ─────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configuration Form (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Appearance Card */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <h3 className="text-slate-200 text-xs font-semibold">Widget Styling &amp; Appearance</h3>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={enableWidget}
                  onChange={(e) => setEnableWidget(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
                <span className="text-slate-400 text-[9px] font-medium">
                  {enableWidget ? "Enabled" : "Disabled"}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-[10px]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Widget Title</label>
                  <input
                    type="text"
                    value={widgetTitle}
                    onChange={(e) => setWidgetTitle(e.target.value)}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Button CTA Label</label>
                  <input
                    type="text"
                    value={buttonLabel}
                    onChange={(e) => setButtonLabel(e.target.value)}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Accent Theme Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-8 h-8 rounded border border-slate-700 bg-[#0c0f18] cursor-pointer p-0.5"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="flex-1 h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Screen Position</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="bottom-right">Bottom Right</option>
                    <option value="bottom-left">Bottom Left</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Greeting Text</label>
                <textarea
                  rows={2}
                  value={greetingMessage}
                  onChange={(e) => setGreetingMessage(e.target.value)}
                  className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2.5 text-[10px] text-white outline-none focus:border-violet-500/60 resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Contact & Dispatch Info */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800/80 pb-3">
              WhatsApp Destination &amp; Pre-filled Message
            </h3>

            <div className="grid grid-cols-2 gap-3 text-[10px]">
              <div>
                <label className="block text-slate-300 font-medium mb-1">WhatsApp Number (with code)</label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+919876543210"
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Initial Pre-filled Text</label>
                <input
                  type="text"
                  value={prefilledMessage}
                  onChange={(e) => setPrefilledMessage(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>
            </div>
          </div>

          {/* Behavior & Display Toggles */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-3 text-[10px]">
            <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800/80 pb-3">
              Trigger Behavior &amp; Device Visibility
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-200 font-medium">Show Greeting Bubble</p>
                  <p className="text-slate-500 text-[9px]">Pop-up teaser message.</p>
                </div>
                <input
                  type="checkbox"
                  checked={showGreetingBubble}
                  onChange={(e) => setShowGreetingBubble(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-200 font-medium">Auto-Open on Page Load</p>
                  <p className="text-slate-500 text-[9px]">Expand full chat window.</p>
                </div>
                <input
                  type="checkbox"
                  checked={openAutomatically}
                  onChange={(e) => setOpenAutomatically(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-200 font-medium">Show on Mobile Devices</p>
                  <p className="text-slate-500 text-[9px]">Responsive mobile banner.</p>
                </div>
                <input
                  type="checkbox"
                  checked={showOnMobile}
                  onChange={(e) => setShowOnMobile(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-200 font-medium">Show on Desktop</p>
                  <p className="text-slate-500 text-[9px]">Floating desktop widget.</p>
                </div>
                <input
                  type="checkbox"
                  checked={showOnDesktop}
                  onChange={(e) => setShowOnDesktop(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>
            </div>
          </div>

          {/* Embed Script Box */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-200 text-xs font-semibold">Website Embed Code</h3>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1 text-[9px] text-violet-400 hover:text-violet-300 font-semibold"
              >
                {copied ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                {copied ? "Copied to clipboard" : "Copy Embed Code"}
              </button>
            </div>
            <pre className="bg-[#0c0f18] border border-slate-800 rounded p-3 text-[9px] text-slate-300 font-mono overflow-x-auto leading-relaxed">
              {embedScript}
            </pre>
          </div>
        </div>

        {/* Right: Real-time Live Interactive Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4 sticky top-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
              <span className="text-slate-200 text-xs font-semibold flex items-center gap-1.5">
                <Monitor size={14} className="text-violet-400" />
                Live Website Preview
              </span>
              <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                Interactive Preview
              </span>
            </div>

            {/* Simulated Website Window */}
            <div className="bg-[#0c0f18] border border-slate-800 rounded-md h-[460px] relative overflow-hidden flex flex-col justify-between p-4 shadow-inner">
              {/* Browser Bar */}
              <div className="bg-[#15141b] border border-slate-800 rounded px-3 py-1.5 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/60" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
                </div>
                <div className="flex-1 bg-[#0c0f18] rounded px-2 py-0.5 text-[8px] text-slate-500 font-mono truncate text-center">
                  https://your-website.com
                </div>
              </div>

              {/* Fake Website Mock Body */}
              <div className="space-y-3 my-auto opacity-20 pointer-events-none text-center">
                <div className="h-6 bg-slate-700 rounded w-2/3 mx-auto" />
                <div className="h-3 bg-slate-800 rounded w-4/5 mx-auto" />
                <div className="h-3 bg-slate-800 rounded w-3/5 mx-auto" />
              </div>

              {/* Floating Chat Widget Render */}
              {enableWidget && (
                <div
                  className={`absolute bottom-4 flex flex-col ${
                    position === "bottom-right"
                      ? "right-4 items-end"
                      : "left-4 items-start"
                  }`}
                >
                  {/* Chat Bubble / Pop-up Card */}
                  {showGreetingBubble && (
                    <div className="w-64 bg-[#15141b] border border-slate-700 rounded-lg shadow-2xl overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-2">
                      <div
                        className="p-3 text-white flex items-center justify-between"
                        style={{ backgroundColor: accentColor }}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                            <MessageCircle size={12} className="text-white" />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold leading-tight">{widgetTitle}</p>
                            <span className="text-[8px] opacity-90">&bull; Typically replies instantly</span>
                          </div>
                        </div>
                        <button type="button" className="text-white/80 hover:text-white">
                          <X size={12} />
                        </button>
                      </div>

                      <div className="p-3 bg-[#0c0f18] space-y-3">
                        <div className="bg-[#15141b] border border-slate-800 rounded p-2.5 text-[9px] text-slate-300 leading-relaxed">
                          {greetingMessage}
                        </div>

                        <a
                          href="#preview-only"
                          onClick={(e) => e.preventDefault()}
                          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded text-[9px] font-bold text-white shadow-sm transition-opacity hover:opacity-95"
                          style={{ backgroundColor: accentColor }}
                        >
                          <Send size={10} />
                          {buttonLabel}
                        </a>
                      </div>
                    </div>
                  )}

                  {/* Circular Floating Button */}
                  <button
                    type="button"
                    className="w-11 h-11 rounded-full shadow-xl flex items-center justify-center text-white transition-transform hover:scale-105"
                    style={{ backgroundColor: accentColor }}
                  >
                    <MessageCircle size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
