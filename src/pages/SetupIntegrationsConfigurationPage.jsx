import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  CheckCircle,
  ShieldCheck,
  MapPin,
  BarChart3,
  Sparkles,
  Clock,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Copy,
  Check,
  Terminal,
} from "lucide-react";

/* ─── Default values ─────────────────────────────────────── */
const DEFAULTS = {
  // reCAPTCHA
  recaptcha: {
    enabled: false,
    version: "v2",
    siteKey: "",
    secretKey: "",
  },
  // Google Maps
  googleMaps: {
    enabled: false,
    apiKey: "",
    defaultLat: "28.6139",
    defaultLng: "77.2090",
    zoom: "12",
  },
  // Analytics & Tracking
  analytics: {
    googleAnalyticsId: "",
    googleTagManagerId: "",
    facebookPixelId: "",
    customHeaderScript: "",
    customFooterScript: "",
  },
  // OpenAI / AI Services
  ai: {
    enabled: false,
    apiKey: "",
    model: "gpt-4o",
    maxTokens: "2048",
    temperature: "0.7",
  },
  // Cron & Webhooks
  cron: {
    command: "* * * * * curl -s https://your-domain.com/api/cron > /dev/null 2>&1",
    webhookUrl: "https://your-domain.com/api/webhooks/incoming",
  },
};

/* ─── Toggle pill ────────────────────────────────────────── */
function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-violet-600" : "bg-slate-700"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

/* ─── Masked / revealed text input ──────────────────────── */
function SecretInput({ id, value, onChange, placeholder }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={revealed ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md pl-3 pr-9 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
      />
      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
        tabIndex={-1}
        aria-label={revealed ? "Hide value" : "Show value"}
      >
        {revealed ? <EyeOff size={12} /> : <Eye size={12} />}
      </button>
    </div>
  );
}

/* ─── Copyable input field ──────────────────────────────── */
function CopyableInput({ id, value, onChange, placeholder, readOnly = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!value) return;
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        autoComplete="off"
        className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md pl-3 pr-9 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors font-mono"
      />
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
        tabIndex={-1}
        title="Copy to clipboard"
      >
        {copied ? (
          <Check size={12} className="text-emerald-400" />
        ) : (
          <Copy size={12} />
        )}
      </button>
    </div>
  );
}

/* ─── Plain text input ───────────────────────────────────── */
function PlainInput({ id, type = "text", value, onChange, placeholder, min, max, step }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      autoComplete="off"
      className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
    />
  );
}

/* ─── Select input ───────────────────────────────────────── */
function SelectInput({ id, value, onChange, options }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60 transition-colors"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

/* ─── Shared label ───────────────────────────────────────── */
function Label({ htmlFor, children }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-slate-300 text-[10px] font-medium mb-1.5"
    >
      {children}
    </label>
  );
}

/* ─── Section Card Component ─────────────────────────────── */
function SectionCard({ icon: Icon, title, subtitle, enabled, onToggle, children, defaultExpanded = true }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/70">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-slate-800/80 border border-slate-700/60">
            <Icon size={13} className="text-violet-400" />
          </div>
          <div>
            <h3 className="text-slate-200 text-xs font-semibold">
              {title}
            </h3>
            <p className="text-slate-500 text-[9px] mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {onToggle !== undefined && (
            <Toggle enabled={enabled} onChange={onToggle} />
          )}
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-slate-500 hover:text-slate-300 transition-colors"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            {expanded ? (
              <ChevronUp size={15} />
            ) : (
              <ChevronDown size={15} />
            )}
          </button>
        </div>
      </div>

      {/* Body */}
      {expanded && <div className="p-5 space-y-4">{children}</div>}
    </section>
  );
}

/* ─── Main Page Component ────────────────────────────────── */
export default function SetupIntegrationsConfigurationPage() {
  const [values, setValues] = useState(
    JSON.parse(JSON.stringify(DEFAULTS))
  );
  const [saved, setSaved] = useState(false);

  /* Generic field updaters */
  const handleNestedField = (section, key, value) => {
    setSaved(false);
    setValues((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleToggle = (section, enabled) => {
    setSaved(false);
    setValues((prev) => ({
      ...prev,
      [section]: { ...prev[section], enabled },
    }));
  };

  const handleReset = () => {
    setValues(JSON.parse(JSON.stringify(DEFAULTS)));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only — backend persistence will be added later.
    console.log("Setup & Integrations configuration:", values);
    setSaved(true);
  };

  const recaptchaVersions = [
    { value: "v2", label: "reCAPTCHA v2 (Checkbox)" },
    { value: "v3", label: "reCAPTCHA v3 (Invisible)" },
    { value: "enterprise", label: "reCAPTCHA Enterprise" },
  ];

  const aiModels = [
    { value: "gpt-4o", label: "GPT-4o (OpenAI)" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo (OpenAI)" },
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo (OpenAI)" },
    { value: "claude-3-5-sonnet", label: "Claude 3.5 Sonnet (Anthropic)" },
    { value: "gemini-1.5-pro", label: "Gemini 1.5 Pro (Google)" },
  ];

  return (
    <div className="p-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Setup &amp; Integrations
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Configure third-party services, APIs, security keys, and background
          automation triggers for the platform.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* ── 1. GOOGLE RECAPTCHA ────────────────────────────── */}
        <SectionCard
          icon={ShieldCheck}
          title="Google reCAPTCHA"
          subtitle={values.recaptcha.enabled ? "Enabled — Spam protection active" : "Disabled"}
          enabled={values.recaptcha.enabled}
          onToggle={(v) => handleToggle("recaptcha", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="recaptcha-version">reCAPTCHA Version</Label>
              <SelectInput
                id="recaptcha-version"
                value={values.recaptcha.version}
                onChange={(e) =>
                  handleNestedField("recaptcha", "version", e.target.value)
                }
                options={recaptchaVersions}
              />
            </div>

            <div>
              <Label htmlFor="recaptcha-site-key">Site Key</Label>
              <PlainInput
                id="recaptcha-site-key"
                value={values.recaptcha.siteKey}
                onChange={(e) =>
                  handleNestedField("recaptcha", "siteKey", e.target.value)
                }
                placeholder="6LeIx0aBAAAAAP..."
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="recaptcha-secret-key">Secret Key</Label>
              <SecretInput
                id="recaptcha-secret-key"
                value={values.recaptcha.secretKey}
                onChange={(e) =>
                  handleNestedField("recaptcha", "secretKey", e.target.value)
                }
                placeholder="6LeIx0aBAAAAAP-Secret..."
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Obtain API credentials from the Google reCAPTCHA Admin Console.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ── 2. GOOGLE MAPS API ─────────────────────────────── */}
        <SectionCard
          icon={MapPin}
          title="Google Maps API"
          subtitle={values.googleMaps.enabled ? "Enabled — Location services active" : "Disabled"}
          enabled={values.googleMaps.enabled}
          onToggle={(v) => handleToggle("googleMaps", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-3">
              <Label htmlFor="gmaps-api-key">Google Maps API Key</Label>
              <SecretInput
                id="gmaps-api-key"
                value={values.googleMaps.apiKey}
                onChange={(e) =>
                  handleNestedField("googleMaps", "apiKey", e.target.value)
                }
                placeholder="AIzaSy..."
              />
            </div>

            <div>
              <Label htmlFor="gmaps-lat">Default Latitude</Label>
              <PlainInput
                id="gmaps-lat"
                value={values.googleMaps.defaultLat}
                onChange={(e) =>
                  handleNestedField("googleMaps", "defaultLat", e.target.value)
                }
                placeholder="28.6139"
              />
            </div>

            <div>
              <Label htmlFor="gmaps-lng">Default Longitude</Label>
              <PlainInput
                id="gmaps-lng"
                value={values.googleMaps.defaultLng}
                onChange={(e) =>
                  handleNestedField("googleMaps", "defaultLng", e.target.value)
                }
                placeholder="77.2090"
              />
            </div>

            <div>
              <Label htmlFor="gmaps-zoom">Default Zoom (1-20)</Label>
              <PlainInput
                id="gmaps-zoom"
                type="number"
                min="1"
                max="20"
                value={values.googleMaps.zoom}
                onChange={(e) =>
                  handleNestedField("googleMaps", "zoom", e.target.value)
                }
                placeholder="12"
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 3. ANALYTICS & TRACKING ────────────────────────── */}
        <SectionCard
          icon={BarChart3}
          title="Analytics &amp; Tracking Pixels"
          subtitle="Google Analytics, Tag Manager, Facebook Pixel & Custom Scripts"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="ga-id">Google Analytics Measurement ID</Label>
              <PlainInput
                id="ga-id"
                value={values.analytics.googleAnalyticsId}
                onChange={(e) =>
                  handleNestedField("analytics", "googleAnalyticsId", e.target.value)
                }
                placeholder="G-XXXXXXXXXX"
              />
            </div>

            <div>
              <Label htmlFor="gtm-id">Google Tag Manager ID</Label>
              <PlainInput
                id="gtm-id"
                value={values.analytics.googleTagManagerId}
                onChange={(e) =>
                  handleNestedField("analytics", "googleTagManagerId", e.target.value)
                }
                placeholder="GTM-XXXXXXX"
              />
            </div>

            <div>
              <Label htmlFor="fb-pixel-id">Facebook Pixel ID</Label>
              <PlainInput
                id="fb-pixel-id"
                value={values.analytics.facebookPixelId}
                onChange={(e) =>
                  handleNestedField("analytics", "facebookPixelId", e.target.value)
                }
                placeholder="123456789012345"
              />
            </div>

            <div className="md:col-span-3">
              <Label htmlFor="header-script">
                Custom Header Scripts (placed inside &lt;head&gt;)
              </Label>
              <textarea
                id="header-script"
                rows={3}
                value={values.analytics.customHeaderScript}
                onChange={(e) =>
                  handleNestedField("analytics", "customHeaderScript", e.target.value)
                }
                placeholder="<!-- Paste your custom tracking tags or CSS links here -->"
                className="w-full bg-[#0c0f18] border border-slate-800 rounded-md p-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors font-mono resize-none"
              />
            </div>

            <div className="md:col-span-3">
              <Label htmlFor="footer-script">
                Custom Footer Scripts (placed before &lt;/body&gt;)
              </Label>
              <textarea
                id="footer-script"
                rows={3}
                value={values.analytics.customFooterScript}
                onChange={(e) =>
                  handleNestedField("analytics", "customFooterScript", e.target.value)
                }
                placeholder="<!-- Paste your custom chatbot widgets or analytics scripts here -->"
                className="w-full bg-[#0c0f18] border border-slate-800 rounded-md p-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors font-mono resize-none"
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 4. AI & OPENAI INTEGRATION ─────────────────────── */}
        <SectionCard
          icon={Sparkles}
          title="OpenAI / AI Assistant Setup"
          subtitle={values.ai.enabled ? `Enabled — ${values.ai.model}` : "Disabled"}
          enabled={values.ai.enabled}
          onToggle={(v) => handleToggle("ai", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="openai-api-key">OpenAI API Key</Label>
              <SecretInput
                id="openai-api-key"
                value={values.ai.apiKey}
                onChange={(e) =>
                  handleNestedField("ai", "apiKey", e.target.value)
                }
                placeholder="sk-proj-..."
              />
            </div>

            <div>
              <Label htmlFor="ai-model">Default AI Model</Label>
              <SelectInput
                id="ai-model"
                value={values.ai.model}
                onChange={(e) =>
                  handleNestedField("ai", "model", e.target.value)
                }
                options={aiModels}
              />
            </div>

            <div>
              <Label htmlFor="ai-max-tokens">Max Tokens</Label>
              <PlainInput
                id="ai-max-tokens"
                type="number"
                min="256"
                max="8192"
                step="256"
                value={values.ai.maxTokens}
                onChange={(e) =>
                  handleNestedField("ai", "maxTokens", e.target.value)
                }
                placeholder="2048"
              />
            </div>

            <div>
              <Label htmlFor="ai-temperature">Temperature (0.0 - 1.0)</Label>
              <PlainInput
                id="ai-temperature"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={values.ai.temperature}
                onChange={(e) =>
                  handleNestedField("ai", "temperature", e.target.value)
                }
                placeholder="0.7"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Lower values yield more deterministic output, higher values more creative.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ── 5. CRON JOBS & AUTOMATION ──────────────────────── */}
        <SectionCard
          icon={Clock}
          title="Cron Job &amp; Webhook Automation"
          subtitle="System triggers for scheduled broadcasts, reminders, and auto-replies"
        >
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label htmlFor="cron-cmd">System Cron Command</Label>
                <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Active &amp; Running
                </span>
              </div>
              <CopyableInput
                id="cron-cmd"
                value={values.cron.command}
                readOnly={true}
                placeholder="* * * * * curl..."
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Add this command to your server crontab (e.g. via cPanel / crontab -e) to run every minute.
              </p>
            </div>

            <div>
              <Label htmlFor="webhook-dispatch">Global Incoming Webhook URL</Label>
              <CopyableInput
                id="webhook-dispatch"
                value={values.cron.webhookUrl}
                readOnly={true}
                placeholder="https://your-domain.com/api/webhooks/incoming"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Use this URL to receive external events from integrated payment, lead, or WhatsApp gateways.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ── ACTIONS ──────────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-2 pt-1">
          {saved && (
            <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium mr-2">
              <CheckCircle size={12} />
              Configuration saved
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-[10px] font-semibold transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
          >
            <Save size={12} />
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}
