import React, { useState } from "react";
import {
  Instagram,
  CheckCircle,
  RotateCcw,
  Save,
  MessageCircle,
  Clock,
  ArrowLeft,
  Key,
  Eye,
  EyeOff,
  RefreshCw,
  Share2,
} from "lucide-react";

export default function InstagramFacebookChatModulePage({ onBack }) {
  // Instagram State
  const [enableInstagram, setEnableInstagram] = useState(true);
  const [igAccountId, setIgAccountId] = useState("ig_biz_99847102948192");
  const [igAccessToken, setIgAccessToken] = useState("EAAGNO4829104810294810294819");
  const [showIgToken, setShowIgToken] = useState(false);
  const [igSyncDMs, setIgSyncDMs] = useState(true);
  const [igAutoReply, setIgAutoReply] = useState(true);
  const [igTesting, setIgTesting] = useState(false);
  const [igConnected, setIgConnected] = useState(true);

  // Facebook Messenger State
  const [enableFacebook, setEnableFacebook] = useState(true);
  const [fbPageId, setFbPageId] = useState("109847291840192");
  const [fbAccessToken, setFbAccessToken] = useState("EAABz849201948102948102948");
  const [showFbToken, setShowFbToken] = useState(false);
  const [fbSyncMessages, setFbSyncMessages] = useState(true);
  const [fbAutoReply, setFbAutoReply] = useState(true);
  const [fbTesting, setFbTesting] = useState(false);
  const [fbConnected, setFbConnected] = useState(true);

  // Synchronization Rules
  const [syncIncoming, setSyncIncoming] = useState(true);
  const [syncOutgoing, setSyncOutgoing] = useState(true);
  const [syncMedia, setSyncMedia] = useState(true);
  const [historyDays, setHistoryDays] = useState(30);

  // Auto-Reply & Business Hours
  const [enableGeneralAutoReply, setEnableGeneralAutoReply] = useState(true);
  const [welcomeGreeting, setWelcomeGreeting] = useState(
    "Hi there! Thanks for reaching out via Instagram/Facebook. An agent will reply shortly."
  );
  const [outsideHoursMessage, setOutsideHoursMessage] = useState(
    "We are currently offline. Our business hours are Mon-Fri 09:00 - 18:00 IST. We will get back to you as soon as we open!"
  );
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  const [saved, setSaved] = useState(false);

  const handleTestInstagram = () => {
    setIgTesting(true);
    setTimeout(() => {
      setIgTesting(false);
      setIgConnected(true);
    }, 1000);
  };

  const handleTestFacebook = () => {
    setFbTesting(true);
    setTimeout(() => {
      setFbTesting(false);
      setFbConnected(true);
    }, 1000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setEnableInstagram(true);
    setEnableFacebook(true);
    setSyncIncoming(true);
    setSyncOutgoing(true);
    setSyncMedia(true);
    setHistoryDays(30);
    setEnableGeneralAutoReply(true);
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
              <Instagram size={20} className="text-violet-400" />
              Instagram &amp; Facebook Chat Integration
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Unified omnichannel inbox integration for Instagram Direct Messages and Facebook Messenger.
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

      {/* ── Instagram & Facebook Channel Cards ──────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Instagram Card */}
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Instagram size={16} className="text-pink-400" />
              <h3 className="text-slate-200 text-xs font-semibold">Instagram Direct Messaging</h3>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enableInstagram}
                onChange={(e) => setEnableInstagram(e.target.checked)}
                className="accent-violet-600 rounded"
              />
              <span className="text-slate-400 text-[9px] font-medium">
                {enableInstagram ? "Active" : "Disabled"}
              </span>
            </div>
          </div>

          <div className="space-y-3.5 text-[10px]">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Instagram Business Account ID
              </label>
              <input
                type="text"
                value={igAccountId}
                onChange={(e) => setIgAccountId(e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Instagram Graph API Page Access Token
              </label>
              <div className="relative">
                <input
                  type={showIgToken ? "text" : "password"}
                  value={igAccessToken}
                  onChange={(e) => setIgAccessToken(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-3 pr-8 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
                <button
                  type="button"
                  onClick={() => setShowIgToken(!showIgToken)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showIgToken ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Sync Direct Messages</span>
                <input
                  type="checkbox"
                  checked={igSyncDMs}
                  onChange={(e) => setIgSyncDMs(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Instant Auto-Replies</span>
                <input
                  type="checkbox"
                  checked={igAutoReply}
                  onChange={(e) => setIgAutoReply(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[9px] text-emerald-400 font-medium">
                {igConnected ? "✓ Handshake Verified" : "Not connected"}
              </span>
              <button
                type="button"
                onClick={handleTestInstagram}
                disabled={igTesting}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-violet-400 text-[9px] font-semibold transition-colors disabled:opacity-50"
              >
                {igTesting ? "Testing..." : "Test IG Connection"}
              </button>
            </div>
          </div>
        </div>

        {/* Facebook Messenger Card */}
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <MessageCircle size={16} className="text-blue-400" />
              <h3 className="text-slate-200 text-xs font-semibold">Facebook Messenger Integration</h3>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={enableFacebook}
                onChange={(e) => setEnableFacebook(e.target.checked)}
                className="accent-violet-600 rounded"
              />
              <span className="text-slate-400 text-[9px] font-medium">
                {enableFacebook ? "Active" : "Disabled"}
              </span>
            </div>
          </div>

          <div className="space-y-3.5 text-[10px]">
            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Facebook Page ID
              </label>
              <input
                type="text"
                value={fbPageId}
                onChange={(e) => setFbPageId(e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Facebook Page Access Token
              </label>
              <div className="relative">
                <input
                  type={showFbToken ? "text" : "password"}
                  value={fbAccessToken}
                  onChange={(e) => setFbAccessToken(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-3 pr-8 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
                <button
                  type="button"
                  onClick={() => setShowFbToken(!showFbToken)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showFbToken ? <EyeOff size={12} /> : <Eye size={12} />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Sync Page Messages</span>
                <input
                  type="checkbox"
                  checked={fbSyncMessages}
                  onChange={(e) => setFbSyncMessages(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-300">Instant Auto-Replies</span>
                <input
                  type="checkbox"
                  checked={fbAutoReply}
                  onChange={(e) => setFbAutoReply(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[9px] text-emerald-400 font-medium">
                {fbConnected ? "✓ Handshake Verified" : "Not connected"}
              </span>
              <button
                type="button"
                onClick={handleTestFacebook}
                disabled={fbTesting}
                className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-violet-400 text-[9px] font-semibold transition-colors disabled:opacity-50"
              >
                {fbTesting ? "Testing..." : "Test FB Connection"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Synchronization & Business Hours ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sync Settings */}
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
          <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800 pb-3">
            Message Ingestion &amp; Media Sync
          </h3>

          <div className="space-y-3 text-[10px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Sync Incoming Customer Inquiries</span>
              <input
                type="checkbox"
                checked={syncIncoming}
                onChange={(e) => setSyncIncoming(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Sync Outgoing Agent Replies</span>
              <input
                type="checkbox"
                checked={syncOutgoing}
                onChange={(e) => setSyncOutgoing(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Sync Photo &amp; Video Media Attachments</span>
              <input
                type="checkbox"
                checked={syncMedia}
                onChange={(e) => setSyncMedia(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="pt-2">
              <label className="block text-slate-300 font-medium mb-1">
                Conversation History Retention (Days)
              </label>
              <input
                type="number"
                value={historyDays}
                onChange={(e) => setHistoryDays(Number(e.target.value))}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
              />
            </div>
          </div>
        </div>

        {/* Auto Reply & Business Hours */}
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-slate-200 text-xs font-semibold">Auto-Reply &amp; Business Hours</h3>
            <input
              type="checkbox"
              checked={enableGeneralAutoReply}
              onChange={(e) => setEnableGeneralAutoReply(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>

          <div className="space-y-3 text-[10px]">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Welcome Greeting</label>
              <textarea
                rows={2}
                value={welcomeGreeting}
                onChange={(e) => setWelcomeGreeting(e.target.value)}
                className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2 text-[10px] text-white outline-none focus:border-violet-500/60 resize-none leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Business Hours Start</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Business Hours End</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Outside-Hours Away Message</label>
              <textarea
                rows={2}
                value={outsideHoursMessage}
                onChange={(e) => setOutsideHoursMessage(e.target.value)}
                className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2 text-[10px] text-white outline-none focus:border-violet-500/60 resize-none leading-relaxed"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
