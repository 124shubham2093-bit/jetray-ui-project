import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  CheckCircle,
  MessageSquare,
  Smartphone,
  Webhook,
  KeyRound,
  Send,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Copy,
  Check,
  Zap,
} from "lucide-react";

/* ─── Default values ─────────────────────────────────────── */
const DEFAULTS = {
  // Embedded Signup
  onboarding: {
    enabled: true,
    method: "embedded_signup", // "embedded_signup" | "manual_credentials"
    configId: "987654321098765",
    autoSyncTemplates: true,
  },
  // Meta App & Cloud API Credentials
  credentials: {
    appId: "",
    appSecret: "",
    wabaId: "",
    phoneNumberId: "",
    accessToken: "",
  },
  // Webhook
  webhook: {
    callbackUrl: "https://your-domain.com/api/whatsapp/webhook",
    verifyToken: "jetray_meta_verify_token_2026",
    apiVersion: "v20.0",
  },
  // Testing
  test: {
    testPhoneNumber: "",
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
function PlainInput({ id, type = "text", value, onChange, placeholder }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
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
export default function WhatsAppOnboardingPage() {
  const [values, setValues] = useState(
    JSON.parse(JSON.stringify(DEFAULTS))
  );
  const [saved, setSaved] = useState(false);
  const [testSending, setTestSending] = useState(false);
  const [testResult, setTestResult] = useState(null);

  /* Generic field updaters */
  const handleNestedField = (section, key, value) => {
    setSaved(false);
    setTestResult(null);
    setValues((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const handleToggle = (section, enabled) => {
    setSaved(false);
    setTestResult(null);
    setValues((prev) => ({
      ...prev,
      [section]: { ...prev[section], enabled },
    }));
  };

  const handleReset = () => {
    setValues(JSON.parse(JSON.stringify(DEFAULTS)));
    setSaved(false);
    setTestResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only — backend persistence will be added later.
    console.log("WhatsApp Onboarding configuration:", values);
    setSaved(true);
  };

  const handleTestConnection = () => {
    if (!values.test.testPhoneNumber.trim()) return;
    setTestSending(true);
    setTestResult(null);
    setTimeout(() => {
      setTestSending(false);
      setTestResult({
        success: true,
        message: `WhatsApp Cloud API handshake simulated successfully for ${values.test.testPhoneNumber}`,
      });
      console.log("WhatsApp test ping (simulated) to:", values.test.testPhoneNumber);
    }, 1200);
  };

  const onboardingMethods = [
    { value: "embedded_signup", label: "Meta Embedded Signup (Recommended)" },
    { value: "manual_credentials", label: "Manual Cloud API Credentials" },
  ];

  const apiVersions = [
    { value: "v20.0", label: "v20.0 (Latest)" },
    { value: "v19.0", label: "v19.0" },
    { value: "v18.0", label: "v18.0" },
  ];

  return (
    <div className="p-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          WhatsApp Onboarding &amp; Cloud API
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Configure Meta Cloud API credentials, embedded vendor signup flows, and webhook listeners.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* ── 1. EMBEDDED SIGNUP FLOW ────────────────────────── */}
        <SectionCard
          icon={Zap}
          title="WhatsApp Embedded Signup Setup"
          subtitle={values.onboarding.enabled ? "Enabled — Vendors can connect WhatsApp numbers in 1-click" : "Disabled"}
          enabled={values.onboarding.enabled}
          onToggle={(v) => handleToggle("onboarding", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="onboarding-method">Onboarding Workflow</Label>
              <SelectInput
                id="onboarding-method"
                value={values.onboarding.method}
                onChange={(e) =>
                  handleNestedField("onboarding", "method", e.target.value)
                }
                options={onboardingMethods}
              />
            </div>

            <div>
              <Label htmlFor="fb-config-id">Facebook Login Configuration (Config ID)</Label>
              <PlainInput
                id="fb-config-id"
                value={values.onboarding.configId}
                onChange={(e) =>
                  handleNestedField("onboarding", "configId", e.target.value)
                }
                placeholder="987654321098765"
              />
            </div>

            <div className="md:col-span-2 flex items-center justify-between pt-1">
              <div>
                <p className="text-slate-300 text-[10px] font-medium">
                  Auto-Sync Approved Message Templates
                </p>
                <p className="text-slate-500 text-[9px] mt-0.5">
                  Automatically synchronize verified Meta templates to vendor accounts upon onboarding.
                </p>
              </div>
              <Toggle
                enabled={values.onboarding.autoSyncTemplates}
                onChange={(v) =>
                  handleNestedField("onboarding", "autoSyncTemplates", v)
                }
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 2. META CLOUD API CREDENTIALS ──────────────────── */}
        <SectionCard
          icon={KeyRound}
          title="Meta Cloud API Credentials"
          subtitle="System application credentials from the Meta for Developers portal"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="meta-app-id">Meta App ID</Label>
              <PlainInput
                id="meta-app-id"
                value={values.credentials.appId}
                onChange={(e) =>
                  handleNestedField("credentials", "appId", e.target.value)
                }
                placeholder="Enter Meta App ID"
              />
            </div>

            <div>
              <Label htmlFor="meta-app-secret">Meta App Secret</Label>
              <SecretInput
                id="meta-app-secret"
                value={values.credentials.appSecret}
                onChange={(e) =>
                  handleNestedField("credentials", "appSecret", e.target.value)
                }
                placeholder="Enter Meta App Secret"
              />
            </div>

            <div>
              <Label htmlFor="meta-waba-id">WhatsApp Business Account ID (WABA ID)</Label>
              <PlainInput
                id="meta-waba-id"
                value={values.credentials.wabaId}
                onChange={(e) =>
                  handleNestedField("credentials", "wabaId", e.target.value)
                }
                placeholder="Enter WABA ID"
              />
            </div>

            <div>
              <Label htmlFor="meta-phone-id">Default Phone Number ID</Label>
              <PlainInput
                id="meta-phone-id"
                value={values.credentials.phoneNumberId}
                onChange={(e) =>
                  handleNestedField("credentials", "phoneNumberId", e.target.value)
                }
                placeholder="Enter Phone Number ID"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="meta-access-token">Permanent System User Access Token</Label>
              <SecretInput
                id="meta-access-token"
                value={values.credentials.accessToken}
                onChange={(e) =>
                  handleNestedField("credentials", "accessToken", e.target.value)
                }
                placeholder="EAAG..."
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Generated from Meta Business Manager under System Users with <code className="text-violet-400 font-mono">whatsapp_business_messaging</code> and <code className="text-violet-400 font-mono">whatsapp_business_management</code> permissions.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ── 3. WEBHOOK CONFIGURATION ───────────────────────── */}
        <SectionCard
          icon={Webhook}
          title="Webhook &amp; Real-Time Events"
          subtitle="Endpoint settings for incoming messages, delivery receipts, and template status updates"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="wh-callback">Webhook Callback URL</Label>
              <CopyableInput
                id="wh-callback"
                value={values.webhook.callbackUrl}
                readOnly={true}
                placeholder="https://your-domain.com/api/whatsapp/webhook"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Paste this into Meta Developer Portal &gt; WhatsApp &gt; Configuration &gt; Callback URL.
              </p>
            </div>

            <div>
              <Label htmlFor="wh-verify-token">Webhook Verify Token</Label>
              <CopyableInput
                id="wh-verify-token"
                value={values.webhook.verifyToken}
                onChange={(e) =>
                  handleNestedField("webhook", "verifyToken", e.target.value)
                }
                placeholder="jetray_meta_verify_token_2026"
              />
            </div>

            <div>
              <Label htmlFor="wh-api-version">Graph API Version</Label>
              <SelectInput
                id="wh-api-version"
                value={values.webhook.apiVersion}
                onChange={(e) =>
                  handleNestedField("webhook", "apiVersion", e.target.value)
                }
                options={apiVersions}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 4. CONNECTION TEST ─────────────────────────────── */}
        <SectionCard
          icon={Smartphone}
          title="Test WhatsApp Cloud API Connection"
          subtitle="Send a test ping message to verify credentials and connectivity"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="test-phone">Recipient Phone Number (with Country Code)</Label>
              <PlainInput
                id="test-phone"
                value={values.test.testPhoneNumber}
                onChange={(e) =>
                  handleNestedField("test", "testPhoneNumber", e.target.value)
                }
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testSending || !values.test.testPhoneNumber.trim()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-[10px] font-semibold transition-colors"
              >
                <Send size={12} />
                {testSending ? "Pinging Meta API…" : "Send Test Ping"}
              </button>
            </div>

            {testResult && (
              <div className="md:col-span-2">
                <p className="flex items-center gap-1 text-emerald-400 text-[9px] font-medium">
                  <CheckCircle size={11} />
                  {testResult.message}
                </p>
              </div>
            )}
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-md px-4 py-3">
            <p className="text-amber-400 text-[9px]">
              <span className="font-semibold">Note:</span> Connection test is currently simulated in frontend mode. Live message dispatch will use your configured Meta credentials once backend services are enabled.
            </p>
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
