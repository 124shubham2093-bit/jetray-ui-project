import React, { useState } from "react";
import {
  Bot,
  CheckCircle,
  RotateCcw,
  Save,
  Key,
  Eye,
  EyeOff,
  Sliders,
  ArrowLeft,
  Sparkles,
  Zap,
} from "lucide-react";

export default function MultiAIProvidersModulePage({ onBack }) {
  // Provider states
  const [providers, setProviders] = useState({
    openai: {
      enabled: true,
      name: "OpenAI",
      model: "gpt-4o",
      apiKey: "sk-proj-894729184029104810294819",
      temperature: 0.7,
      maxTokens: 4096,
      models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo", "gpt-3.5-turbo"],
    },
    anthropic: {
      enabled: true,
      name: "Anthropic Claude",
      model: "claude-3-5-sonnet",
      apiKey: "sk-ant-api03-9948291048102948102948",
      temperature: 0.5,
      maxTokens: 4096,
      models: ["claude-3-5-sonnet", "claude-3-opus", "claude-3-haiku"],
    },
    gemini: {
      enabled: true,
      name: "Google Gemini",
      model: "gemini-1.5-pro",
      apiKey: "AIzaSyD-88492019482019482019482",
      temperature: 0.7,
      maxTokens: 8192,
      models: ["gemini-1.5-pro", "gemini-1.5-flash"],
    },
    groq: {
      enabled: false,
      name: "Groq (Ultra-Fast Llama)",
      model: "llama-3.1-70b-versatile",
      apiKey: "gsk_88492019481029481029481",
      temperature: 0.6,
      maxTokens: 4096,
      models: ["llama-3.1-70b-versatile", "llama-3.1-8b-instant", "mixtral-8x7b-32768"],
    },
  });

  const [primaryProvider, setPrimaryProvider] = useState("OpenAI");
  const [fallbackProvider, setFallbackProvider] = useState("Google Gemini");
  const [autoFailover, setAutoFailover] = useState(true);
  const [retryCount, setRetryCount] = useState(3);
  const [failoverTimeout, setFailoverTimeout] = useState(5000);

  // Masking toggles
  const [showKeys, setShowKeys] = useState({});
  const [saved, setSaved] = useState(false);

  const toggleShowKey = (providerKey) => {
    setShowKeys((prev) => ({ ...prev, [providerKey]: !prev[providerKey] }));
  };

  const handleProviderField = (providerKey, field, val) => {
    setProviders((prev) => ({
      ...prev,
      [providerKey]: { ...prev[providerKey], [field]: val },
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setPrimaryProvider("OpenAI");
    setFallbackProvider("Google Gemini");
    setAutoFailover(true);
    setRetryCount(3);
    setFailoverTimeout(5000);
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
              <Bot size={20} className="text-violet-400" />
              Multi AI Providers Configuration
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Configure multiple Large Language Model providers with automated failover and intelligent routing.
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

      {/* ── Primary Orchestration & Failover Policies ───────── */}
      <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
        <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800 pb-3 flex items-center gap-2">
          <Zap size={14} className="text-violet-400" />
          Primary Engine &amp; Failover Policy
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[10px]">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Primary AI Provider</label>
            <select
              value={primaryProvider}
              onChange={(e) => setPrimaryProvider(e.target.value)}
              className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-[10px] text-white outline-none focus:border-violet-500/60"
            >
              <option value="OpenAI">OpenAI (Default)</option>
              <option value="Anthropic Claude">Anthropic Claude</option>
              <option value="Google Gemini">Google Gemini</option>
              <option value="Groq">Groq (Ultra-Fast)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Failover Fallback Provider</label>
            <select
              value={fallbackProvider}
              onChange={(e) => setFallbackProvider(e.target.value)}
              className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-[10px] text-white outline-none focus:border-violet-500/60"
            >
              <option value="Google Gemini">Google Gemini (Fallback)</option>
              <option value="Anthropic Claude">Anthropic Claude</option>
              <option value="OpenAI">OpenAI</option>
              <option value="Groq">Groq</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Max Retry Attempts</label>
            <input
              type="number"
              min="1"
              max="5"
              value={retryCount}
              onChange={(e) => setRetryCount(Number(e.target.value))}
              className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-slate-200 font-medium">Automatic Failover</p>
              <p className="text-slate-500 text-[9px]">Switch provider if API times out.</p>
            </div>
            <input
              type="checkbox"
              checked={autoFailover}
              onChange={(e) => setAutoFailover(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>
        </div>
      </div>

      {/* ── 4 Provider Cards Grid ───────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(providers).map(([key, prov]) => (
          <div
            key={key}
            className={`bg-[#15141b] border rounded-sm p-5 space-y-4 transition-all ${
              prov.enabled ? "border-slate-800/80" : "border-slate-800/40 opacity-70"
            }`}
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Bot size={15} className="text-violet-400" />
                <h3 className="text-slate-200 text-xs font-semibold">{prov.name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={prov.enabled}
                  onChange={(e) => handleProviderField(key, "enabled", e.target.checked)}
                  className="accent-violet-600 rounded"
                />
                <span className="text-slate-400 text-[9px] font-medium">
                  {prov.enabled ? "Active" : "Disabled"}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-[10px]">
              {/* API Key */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">API Key</label>
                <div className="relative">
                  <input
                    type={showKeys[key] ? "text" : "password"}
                    value={prov.apiKey}
                    onChange={(e) => handleProviderField(key, "apiKey", e.target.value)}
                    placeholder="Enter API Secret Key"
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-3 pr-8 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                  />
                  <button
                    type="button"
                    onClick={() => toggleShowKey(key)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showKeys[key] ? <EyeOff size={12} /> : <Eye size={12} />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Default Model</label>
                  <select
                    value={prov.model}
                    onChange={(e) => handleProviderField(key, "model", e.target.value)}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60 font-mono"
                  >
                    {prov.models.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Max Tokens</label>
                  <input
                    type="number"
                    value={prov.maxTokens}
                    onChange={(e) => handleProviderField(key, "maxTokens", Number(e.target.value))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-300 font-medium">Temperature (Creativity)</label>
                  <span className="font-mono text-violet-400 text-[9px]">{prov.temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={prov.temperature}
                  onChange={(e) => handleProviderField(key, "temperature", Number(e.target.value))}
                  className="w-full accent-violet-600 bg-slate-800 rounded h-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
