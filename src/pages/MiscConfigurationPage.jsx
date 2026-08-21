import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  CheckCircle,
  Cookie,
  AlertOctagon,
  HardDrive,
  FileText,
  Sliders,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";

/* ─── Default values ─────────────────────────────────────── */
const DEFAULTS = {
  // Cookie Consent (GDPR)
  cookieConsent: {
    enabled: true,
    title: "Cookie Preferences",
    message:
      "We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.",
    buttonText: "Accept All",
    privacyUrl: "https://jetray.in/privacy-policy",
  },
  // Maintenance Mode
  maintenance: {
    enabled: false,
    message:
      "Our system is currently undergoing scheduled maintenance. We will be back online shortly.",
    secretBypassKey: "jetray-bypass-2026",
    ipWhitelist: "127.0.0.1",
  },
  // File Storage & Media Limits
  storage: {
    driver: "local",
    maxFileSize: "25",
    allowedExtensions: "jpg, jpeg, png, gif, pdf, doc, docx, mp4, mp3, ogg, zip",
    autoDeleteTemp: "after_7_days",
  },
  // Branding & Platform Customization
  branding: {
    copyrightText: "© 2026 Jetray International Pvt Ltd. All rights reserved.",
    docsUrl: "https://docs.jetray.in",
    termsUrl: "https://jetray.in/terms-of-service",
    privacyUrl: "https://jetray.in/privacy-policy",
    supportEmail: "support@jetray.in",
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
export default function MiscConfigurationPage() {
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
    console.log("Misc configuration:", values);
    setSaved(true);
  };

  const storageDrivers = [
    { value: "local", label: "Local Server Storage" },
    { value: "s3", label: "Amazon S3" },
    { value: "digitalocean", label: "DigitalOcean Spaces" },
    { value: "wasabi", label: "Wasabi Cloud Storage" },
  ];

  const tempDeleteOptions = [
    { value: "never", label: "Never" },
    { value: "after_24_hours", label: "After 24 Hours" },
    { value: "after_7_days", label: "After 7 Days" },
    { value: "after_30_days", label: "After 30 Days" },
  ];

  return (
    <div className="p-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Miscellaneous Configuration
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Manage platform cookies, maintenance mode, media storage limits, and legal links.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {/* ── 1. COOKIE CONSENT / GDPR ──────────────────────── */}
        <SectionCard
          icon={Cookie}
          title="Cookie Consent &amp; GDPR"
          subtitle={values.cookieConsent.enabled ? "Enabled — Banner active on public pages" : "Disabled"}
          enabled={values.cookieConsent.enabled}
          onToggle={(v) => handleToggle("cookieConsent", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cookie-title">Banner Title</Label>
              <PlainInput
                id="cookie-title"
                value={values.cookieConsent.title}
                onChange={(e) =>
                  handleNestedField("cookieConsent", "title", e.target.value)
                }
                placeholder="Cookie Preferences"
              />
            </div>

            <div>
              <Label htmlFor="cookie-btn">Button Text</Label>
              <PlainInput
                id="cookie-btn"
                value={values.cookieConsent.buttonText}
                onChange={(e) =>
                  handleNestedField("cookieConsent", "buttonText", e.target.value)
                }
                placeholder="Accept All"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="cookie-msg">Consent Message</Label>
              <textarea
                id="cookie-msg"
                rows={2}
                value={values.cookieConsent.message}
                onChange={(e) =>
                  handleNestedField("cookieConsent", "message", e.target.value)
                }
                placeholder="Enter cookie consent notification message..."
                className="w-full bg-[#0c0f18] border border-slate-800 rounded-md p-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors resize-none"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="cookie-privacy-url">Privacy Policy Link</Label>
              <PlainInput
                id="cookie-privacy-url"
                value={values.cookieConsent.privacyUrl}
                onChange={(e) =>
                  handleNestedField("cookieConsent", "privacyUrl", e.target.value)
                }
                placeholder="https://jetray.in/privacy-policy"
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 2. MAINTENANCE MODE ───────────────────────────── */}
        <SectionCard
          icon={AlertOctagon}
          title="Maintenance Mode"
          subtitle={values.maintenance.enabled ? "Active — Public access restricted" : "Disabled — Platform accessible"}
          enabled={values.maintenance.enabled}
          onToggle={(v) => handleToggle("maintenance", v)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="maint-msg">Maintenance Notice Message</Label>
              <textarea
                id="maint-msg"
                rows={2}
                value={values.maintenance.message}
                onChange={(e) =>
                  handleNestedField("maintenance", "message", e.target.value)
                }
                placeholder="Our system is undergoing scheduled maintenance..."
                className="w-full bg-[#0c0f18] border border-slate-800 rounded-md p-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors resize-none"
              />
            </div>

            <div>
              <Label htmlFor="maint-bypass">Secret Bypass Key</Label>
              <SecretInput
                id="maint-bypass"
                value={values.maintenance.secretBypassKey}
                onChange={(e) =>
                  handleNestedField("maintenance", "secretBypassKey", e.target.value)
                }
                placeholder="Enter secret bypass token"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Access your site during maintenance by appending <code className="text-violet-400 font-mono">?bypass=your-key</code> to the URL.
              </p>
            </div>

            <div>
              <Label htmlFor="maint-ip">IP Address Whitelist</Label>
              <PlainInput
                id="maint-ip"
                value={values.maintenance.ipWhitelist}
                onChange={(e) =>
                  handleNestedField("maintenance", "ipWhitelist", e.target.value)
                }
                placeholder="127.0.0.1, 192.168.1.100"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Comma-separated list of IP addresses allowed to access the platform.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* ── 3. FILE UPLOAD & STORAGE ───────────────────────── */}
        <SectionCard
          icon={HardDrive}
          title="File Storage &amp; Media Limits"
          subtitle="Configure default media upload storage driver and maximum allowed file sizes"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storage-driver">Storage Driver</Label>
              <SelectInput
                id="storage-driver"
                value={values.storage.driver}
                onChange={(e) =>
                  handleNestedField("storage", "driver", e.target.value)
                }
                options={storageDrivers}
              />
            </div>

            <div>
              <Label htmlFor="max-file-size">Maximum File Upload Size (MB)</Label>
              <PlainInput
                id="max-file-size"
                type="number"
                min="1"
                max="500"
                value={values.storage.maxFileSize}
                onChange={(e) =>
                  handleNestedField("storage", "maxFileSize", e.target.value)
                }
                placeholder="25"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="allowed-ext">Allowed File Extensions</Label>
              <PlainInput
                id="allowed-ext"
                value={values.storage.allowedExtensions}
                onChange={(e) =>
                  handleNestedField("storage", "allowedExtensions", e.target.value)
                }
                placeholder="jpg, jpeg, png, gif, pdf, doc, docx, mp4, mp3"
              />
              <p className="text-slate-500 text-[9px] mt-1">
                Comma-separated file extensions allowed for vendor campaigns and media gallery.
              </p>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="auto-delete-temp">Auto-Delete Temporary Uploads</Label>
              <SelectInput
                id="auto-delete-temp"
                value={values.storage.autoDeleteTemp}
                onChange={(e) =>
                  handleNestedField("storage", "autoDeleteTemp", e.target.value)
                }
                options={tempDeleteOptions}
              />
            </div>
          </div>
        </SectionCard>

        {/* ── 4. BRANDING & LEGAL ────────────────────────────── */}
        <SectionCard
          icon={FileText}
          title="Branding &amp; Platform Legal Information"
          subtitle="Footer copyright statement, documentation, and policy URLs"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="branding-copyright">Footer Copyright Text</Label>
              <PlainInput
                id="branding-copyright"
                value={values.branding.copyrightText}
                onChange={(e) =>
                  handleNestedField("branding", "copyrightText", e.target.value)
                }
                placeholder="© 2026 Jetray International Pvt Ltd. All rights reserved."
              />
            </div>

            <div>
              <Label htmlFor="branding-docs">Documentation / Help Center URL</Label>
              <PlainInput
                id="branding-docs"
                value={values.branding.docsUrl}
                onChange={(e) =>
                  handleNestedField("branding", "docsUrl", e.target.value)
                }
                placeholder="https://docs.jetray.in"
              />
            </div>

            <div>
              <Label htmlFor="branding-support-email">Public Support Email</Label>
              <PlainInput
                id="branding-support-email"
                type="email"
                value={values.branding.supportEmail}
                onChange={(e) =>
                  handleNestedField("branding", "supportEmail", e.target.value)
                }
                placeholder="support@jetray.in"
              />
            </div>

            <div>
              <Label htmlFor="branding-terms">Terms of Service URL</Label>
              <PlainInput
                id="branding-terms"
                value={values.branding.termsUrl}
                onChange={(e) =>
                  handleNestedField("branding", "termsUrl", e.target.value)
                }
                placeholder="https://jetray.in/terms-of-service"
              />
            </div>

            <div>
              <Label htmlFor="branding-privacy">Privacy Policy URL</Label>
              <PlainInput
                id="branding-privacy"
                value={values.branding.privacyUrl}
                onChange={(e) =>
                  handleNestedField("branding", "privacyUrl", e.target.value)
                }
                placeholder="https://jetray.in/privacy-policy"
              />
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
