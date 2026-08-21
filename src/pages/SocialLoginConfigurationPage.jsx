import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  CheckCircle,
  Share2,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Copy,
  Check,
} from "lucide-react";

/* ─── Default values ─────────────────────────────────────── */
const DEFAULTS = {
  google: {
    enabled: false,
    clientId: "",
    clientSecret: "",
    callbackUrl: "https://your-domain.com/auth/google/callback",
  },
  facebook: {
    enabled: false,
    appId: "",
    appSecret: "",
    callbackUrl: "https://your-domain.com/auth/facebook/callback",
  },
  github: {
    enabled: false,
    clientId: "",
    clientSecret: "",
    callbackUrl: "https://your-domain.com/auth/github/callback",
  },
  twitter: {
    enabled: false,
    clientId: "",
    clientSecret: "",
    callbackUrl: "https://your-domain.com/auth/twitter/callback",
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
function CopyableInput({ id, value, onChange, placeholder }) {
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
        autoComplete="off"
        className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md pl-3 pr-9 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
      />
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
        tabIndex={-1}
        title="Copy Callback URL"
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
function PlainInput({ id, value, onChange, placeholder }) {
  return (
    <input
      id={id}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete="off"
      className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
    />
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

/* ─── Provider Card ──────────────────────────────────────── */
function ProviderCard({ title, badge, enabled, onToggle, children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
      {/* Card header — always visible */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/70">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-slate-800/80 border border-slate-700/60">
            <Share2 size={13} className="text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-slate-200 text-xs font-semibold">
                {title}
              </h3>
              {badge && (
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-mono tracking-wide">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-slate-500 text-[9px] mt-0.5">
              {enabled ? "Enabled" : "Disabled"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Toggle enabled={enabled} onChange={onToggle} />
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

      {/* Collapsible body */}
      {expanded && <div className="p-5 space-y-4">{children}</div>}
    </section>
  );
}

/* ─── Main Page Component ────────────────────────────────── */
export default function SocialLoginConfigurationPage() {
  const [values, setValues] = useState(
    JSON.parse(JSON.stringify(DEFAULTS))
  );
  const [saved, setSaved] = useState(false);

  /* Generic nested updater */
  const handleField = (provider, key, value) => {
    setSaved(false);
    setValues((prev) => ({
      ...prev,
      [provider]: { ...prev[provider], [key]: value },
    }));
  };

  const handleToggle = (provider, enabled) => {
    setSaved(false);
    setValues((prev) => ({
      ...prev,
      [provider]: { ...prev[provider], enabled },
    }));
  };

  const handleReset = () => {
    setValues(JSON.parse(JSON.stringify(DEFAULTS)));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only — backend persistence will be added later.
    console.log("Social Login configuration:", values);
    setSaved(true);
  };

  return (
    <div className="p-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Social Login
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Configure OAuth providers to allow users and vendors to log in with
          their social accounts.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* ── GOOGLE LOGIN ───────────────────────────────────── */}
        <ProviderCard
          title="Google Login"
          badge="google"
          enabled={values.google.enabled}
          onToggle={(v) => handleToggle("google", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client ID */}
            <div>
              <Label htmlFor="google-client-id">Client ID</Label>
              <PlainInput
                id="google-client-id"
                value={values.google.clientId}
                onChange={(e) =>
                  handleField("google", "clientId", e.target.value)
                }
                placeholder="Enter Google Client ID"
              />
            </div>

            {/* Client Secret */}
            <div>
              <Label htmlFor="google-client-secret">Client Secret</Label>
              <SecretInput
                id="google-client-secret"
                value={values.google.clientSecret}
                onChange={(e) =>
                  handleField(
                    "google",
                    "clientSecret",
                    e.target.value
                  )
                }
                placeholder="Enter Google Client Secret"
              />
            </div>

            {/* Callback URL */}
            <div className="md:col-span-2">
              <Label htmlFor="google-callback">
                Callback / Redirect URL
              </Label>
              <CopyableInput
                id="google-callback"
                value={values.google.callbackUrl}
                onChange={(e) =>
                  handleField(
                    "google",
                    "callbackUrl",
                    e.target.value
                  )
                }
                placeholder="https://your-domain.com/auth/google/callback"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Add this redirect URI to your Google Cloud Console OAuth 2.0
                Credentials.
              </p>
            </div>
          </div>
        </ProviderCard>

        {/* ── FACEBOOK LOGIN ─────────────────────────────────── */}
        <ProviderCard
          title="Facebook Login"
          badge="facebook"
          enabled={values.facebook.enabled}
          onToggle={(v) => handleToggle("facebook", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* App ID */}
            <div>
              <Label htmlFor="facebook-app-id">App ID</Label>
              <PlainInput
                id="facebook-app-id"
                value={values.facebook.appId}
                onChange={(e) =>
                  handleField("facebook", "appId", e.target.value)
                }
                placeholder="Enter Facebook App ID"
              />
            </div>

            {/* App Secret */}
            <div>
              <Label htmlFor="facebook-app-secret">App Secret</Label>
              <SecretInput
                id="facebook-app-secret"
                value={values.facebook.appSecret}
                onChange={(e) =>
                  handleField(
                    "facebook",
                    "appSecret",
                    e.target.value
                  )
                }
                placeholder="Enter Facebook App Secret"
              />
            </div>

            {/* Callback URL */}
            <div className="md:col-span-2">
              <Label htmlFor="facebook-callback">
                Callback / Redirect URL
              </Label>
              <CopyableInput
                id="facebook-callback"
                value={values.facebook.callbackUrl}
                onChange={(e) =>
                  handleField(
                    "facebook",
                    "callbackUrl",
                    e.target.value
                  )
                }
                placeholder="https://your-domain.com/auth/facebook/callback"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Add this OAuth redirect URI in your Facebook Developer App
                Settings.
              </p>
            </div>
          </div>
        </ProviderCard>

        {/* ── GITHUB LOGIN ───────────────────────────────────── */}
        <ProviderCard
          title="GitHub Login"
          badge="github"
          enabled={values.github.enabled}
          onToggle={(v) => handleToggle("github", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client ID */}
            <div>
              <Label htmlFor="github-client-id">Client ID</Label>
              <PlainInput
                id="github-client-id"
                value={values.github.clientId}
                onChange={(e) =>
                  handleField("github", "clientId", e.target.value)
                }
                placeholder="Enter GitHub Client ID"
              />
            </div>

            {/* Client Secret */}
            <div>
              <Label htmlFor="github-client-secret">Client Secret</Label>
              <SecretInput
                id="github-client-secret"
                value={values.github.clientSecret}
                onChange={(e) =>
                  handleField(
                    "github",
                    "clientSecret",
                    e.target.value
                  )
                }
                placeholder="Enter GitHub Client Secret"
              />
            </div>

            {/* Callback URL */}
            <div className="md:col-span-2">
              <Label htmlFor="github-callback">
                Callback / Redirect URL
              </Label>
              <CopyableInput
                id="github-callback"
                value={values.github.callbackUrl}
                onChange={(e) =>
                  handleField(
                    "github",
                    "callbackUrl",
                    e.target.value
                  )
                }
                placeholder="https://your-domain.com/auth/github/callback"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Add this authorization callback URL to your GitHub OAuth App
                settings.
              </p>
            </div>
          </div>
        </ProviderCard>

        {/* ── TWITTER / X LOGIN ──────────────────────────────── */}
        <ProviderCard
          title="Twitter / X Login"
          badge="twitter"
          enabled={values.twitter.enabled}
          onToggle={(v) => handleToggle("twitter", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client ID */}
            <div>
              <Label htmlFor="twitter-client-id">Client ID / API Key</Label>
              <PlainInput
                id="twitter-client-id"
                value={values.twitter.clientId}
                onChange={(e) =>
                  handleField("twitter", "clientId", e.target.value)
                }
                placeholder="Enter Twitter Client ID"
              />
            </div>

            {/* Client Secret */}
            <div>
              <Label htmlFor="twitter-client-secret">
                Client Secret / API Secret
              </Label>
              <SecretInput
                id="twitter-client-secret"
                value={values.twitter.clientSecret}
                onChange={(e) =>
                  handleField(
                    "twitter",
                    "clientSecret",
                    e.target.value
                  )
                }
                placeholder="Enter Twitter Client Secret"
              />
            </div>

            {/* Callback URL */}
            <div className="md:col-span-2">
              <Label htmlFor="twitter-callback">
                Callback / Redirect URL
              </Label>
              <CopyableInput
                id="twitter-callback"
                value={values.twitter.callbackUrl}
                onChange={(e) =>
                  handleField(
                    "twitter",
                    "callbackUrl",
                    e.target.value
                  )
                }
                placeholder="https://your-domain.com/auth/twitter/callback"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Add this callback URI in your Twitter / X Developer Portal App
                settings.
              </p>
            </div>
          </div>
        </ProviderCard>

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
