import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Save,
  CheckCircle,
  Eye,
  EyeOff,
  Cpu,
  Clock,
  AlertCircle,
  Layers,
  Sliders,
  SlidersHorizontal,
} from "lucide-react";

export default function VendorAIBotPage() {
  const [timing, setTiming] = useState("24_7"); // "business_hours" | "24_7"
  const [saved, setSaved] = useState(false);

  // OpenAI State
  const [openAiEnabled, setOpenAiEnabled] = useState(true);
  const [openAiModel, setOpenAiModel] = useState("gpt-4o-mini");
  const [openAiKey, setOpenAiKey] = useState("sk-proj-984710294810294810294810294819");
  const [showOpenAiKey, setShowOpenAiKey] = useState(false);
  const [openAiTemp, setOpenAiTemp] = useState(0.7);
  const [openAiPrompt, setOpenAiPrompt] = useState(
    "You are a friendly, helpful event concierge for MVAD Events. Answer questions regarding event decor, catering packages, and wedding schedules politely. If asked for pricing, quote standard brochure ranges."
  );

  // FlowiseAI State
  const [flowiseEnabled, setFlowiseEnabled] = useState(false);
  const [flowiseEndpoint, setFlowiseEndpoint] = useState("https://flowise.mvad-events.com/api/v1/prediction/flow_8849");
  const [flowiseKey, setFlowiseKey] = useState("flw_key_9847102948");
  const [showFlowiseKey, setShowFlowiseKey] = useState(false);

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
            <Sparkles size={22} className="text-violet-400" />
            AI Bot &amp; LLM Automation Settings
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Empower your WhatsApp inbox with OpenAI and Flowise conversational intelligence.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 mr-2 animate-in fade-in">
              <CheckCircle size={14} /> AI Bot settings saved!
            </span>
          )}

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

      {/* ── Fallback Behavior Notice ─────────────────────────── */}
      <div className="bg-violet-950/30 border border-violet-500/30 rounded-lg p-4 flex items-start gap-3 text-xs text-slate-300">
        <AlertCircle size={18} className="text-violet-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-white">AI Fallback Execution Protocol</p>
          <p className="text-slate-400 leading-relaxed">
            The AI Bot acts as an intelligent fallback. It triggers <strong>only when:</strong>
          </p>
          <ol className="list-decimal list-inside text-slate-300 space-y-0.5 text-[11px]">
            <li>No exact or fuzzy match was found in manual Keyword Bot Replies.</li>
            <li>The individual contact has &ldquo;Reply Bot&rdquo; toggled ON in their CRM profile.</li>
          </ol>
        </div>
      </div>

      {/* ── Active Timing Selector ───────────────────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Clock size={16} className="text-violet-400" />
          AI Bot Response Timing Window
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div
            onClick={() => setTiming("24_7")}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              timing === "24_7"
                ? "bg-violet-600/10 border-violet-500 text-white"
                : "bg-[#0c0f18] border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs">24/7 Always Active</span>
              <input type="radio" checked={timing === "24_7"} onChange={() => {}} className="accent-violet-600" />
            </div>
            <p className="text-[11px] text-slate-400">
              AI Bot immediately replies around the clock whenever human operators are away.
            </p>
          </div>

          <div
            onClick={() => setTiming("business_hours")}
            className={`p-4 rounded-lg border cursor-pointer transition-all ${
              timing === "business_hours"
                ? "bg-violet-600/10 border-violet-500 text-white"
                : "bg-[#0c0f18] border-slate-800 text-slate-400 hover:border-slate-700"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-xs">Business Hours Only</span>
              <input type="radio" checked={timing === "business_hours"} onChange={() => {}} className="accent-violet-600" />
            </div>
            <p className="text-[11px] text-slate-400">
              AI Bot responds only during official operating hours (09:00 AM – 07:00 PM).
            </p>
          </div>
        </div>
      </div>

      {/* ── AI Provider 1: OpenAI Chat Bot ───────────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu size={16} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">OpenAI Chat Bot (GPT-4o)</h3>
              <p className="text-slate-500 text-[10px]">Direct native OpenAI LLM integration</p>
            </div>
          </div>

          <label className="flex items-center gap-2 text-slate-300 font-semibold cursor-pointer">
            <span>{openAiEnabled ? "Enabled" : "Disabled"}</span>
            <input
              type="checkbox"
              checked={openAiEnabled}
              onChange={(e) => setOpenAiEnabled(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </label>
        </div>

        {openAiEnabled && (
          <div className="space-y-4 pt-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-medium mb-1">OpenAI API Key</label>
                <div className="relative">
                  <input
                    type={showOpenAiKey ? "text" : "password"}
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-3 pr-8 text-white font-mono outline-none focus:border-violet-500/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOpenAiKey(!showOpenAiKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showOpenAiKey ? <EyeOff size={13} /> : <Eye size={13} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">LLM Model</label>
                <select
                  value={openAiModel}
                  onChange={(e) => setOpenAiModel(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none"
                >
                  <option value="gpt-4o">GPT-4o (High Intelligence)</option>
                  <option value="gpt-4o-mini">GPT-4o Mini (Fast &amp; Cost-Effective)</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-medium">Temperature: {openAiTemp}</label>
                <span className="text-[10px] text-slate-500">0.0 (Precise) to 1.0 (Creative)</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={openAiTemp}
                onChange={(e) => setOpenAiTemp(parseFloat(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">System Prompt / Agent Persona</label>
              <textarea
                rows={3}
                value={openAiPrompt}
                onChange={(e) => setOpenAiPrompt(e.target.value)}
                className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2.5 text-white outline-none focus:border-violet-500/60 resize-none leading-relaxed"
              />
            </div>
          </div>
        )}
      </div>

      {/* ── AI Provider 2: FlowiseAI ─────────────────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-4 text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Bot size={16} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">FlowiseAI Custom RAG Flow</h3>
              <p className="text-slate-500 text-[10px]">Connect your custom vector database and knowledge graph</p>
            </div>
          </div>

          <label className="flex items-center gap-2 text-slate-300 font-semibold cursor-pointer">
            <span>{flowiseEnabled ? "Enabled" : "Disabled"}</span>
            <input
              type="checkbox"
              checked={flowiseEnabled}
              onChange={(e) => setFlowiseEnabled(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </label>
        </div>

        {flowiseEnabled && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Flowise Prediction Endpoint URL</label>
              <input
                type="text"
                value={flowiseEndpoint}
                onChange={(e) => setFlowiseEndpoint(e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white font-mono outline-none focus:border-violet-500/60"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Flowise API Key</label>
              <div className="relative">
                <input
                  type={showFlowiseKey ? "text" : "password"}
                  value={flowiseKey}
                  onChange={(e) => setFlowiseKey(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-3 pr-8 text-white font-mono outline-none focus:border-violet-500/60"
                />
                <button
                  type="button"
                  onClick={() => setShowFlowiseKey(!showFlowiseKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showFlowiseKey ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
