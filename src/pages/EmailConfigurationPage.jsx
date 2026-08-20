import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  CheckCircle,
  Mail,
  Server,
  UserCircle,
  Send,
  Eye,
  EyeOff,
} from "lucide-react";

/* ─── Options ────────────────────────────────────────────── */
const DRIVERS = [
  { value: "smtp",      label: "SMTP" },
  { value: "mailgun",   label: "Mailgun" },
  { value: "sendgrid",  label: "SendGrid" },
  { value: "ses",       label: "Amazon SES" },
];

const ENCRYPTIONS = [
  { value: "tls",  label: "TLS" },
  { value: "ssl",  label: "SSL" },
  { value: "none", label: "None" },
];

const PORTS = [
  { value: "25",  label: "25" },
  { value: "465", label: "465 (SSL)" },
  { value: "587", label: "587 (TLS)" },
  { value: "2525", label: "2525" },
];

/* ─── Defaults ───────────────────────────────────────────── */
const DEFAULTS = {
  // Driver
  driver: "smtp",
  enabled: true,
  // SMTP
  host: "",
  port: "587",
  username: "",
  password: "",
  encryption: "tls",
  // Sender identity
  fromName: "",
  fromEmail: "",
  replyTo: "",
  // Test email
  testRecipient: "",
};

/* ─── Reusable atoms ─────────────────────────────────────── */
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

function Divider() {
  return <div className="border-t border-slate-800/50" />;
}

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

function TextInput({ id, value, onChange, placeholder, type = "text" }) {
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

function PasswordInput({ id, value, onChange, placeholder }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={revealed ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="new-password"
        className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md pl-3 pr-9 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
      />
      <button
        type="button"
        onClick={() => setRevealed((v) => !v)}
        tabIndex={-1}
        aria-label={revealed ? "Hide password" : "Show password"}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
      >
        {revealed ? <EyeOff size={12} /> : <Eye size={12} />}
      </button>
    </div>
  );
}

/* ─── Section card shell ─────────────────────────────────── */
function SectionCard({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/70">
        <Icon size={15} className="text-violet-400" />
        <div>
          <h3 className="text-slate-200 text-xs font-semibold">{title}</h3>
          <p className="text-slate-500 text-[10px] mt-0.5">{subtitle}</p>
        </div>
      </div>
      <div className="p-5 space-y-4">{children}</div>
    </section>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function EmailConfigurationPage() {
  const [values, setValues] = useState({ ...DEFAULTS });
  const [saved, setSaved] = useState(false);
  const [testSent, setTestSent] = useState(false);
  const [testSending, setTestSending] = useState(false);

  const set = (key, value) => {
    setSaved(false);
    setTestSent(false);
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setValues({ ...DEFAULTS });
    setSaved(false);
    setTestSent(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only — backend persistence will be added later.
    console.log("Email configuration:", values);
    setSaved(true);
  };

  /* Test email — frontend-only simulation */
  const handleTestEmail = () => {
    if (!values.testRecipient.trim()) return;
    setTestSending(true);
    setTestSent(false);
    setTimeout(() => {
      setTestSending(false);
      setTestSent(true);
      console.log("Test email (simulated) to:", values.testRecipient);
    }, 1200);
  };

  const driverLabel =
    DRIVERS.find((d) => d.value === values.driver)?.label ?? values.driver;

  return (
    <div className="p-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Email Configuration
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Configure the mail driver and SMTP credentials used to send
          system emails.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">

        {/* ── A. MAIL DRIVER ──────────────────────────────────── */}
        <SectionCard
          icon={Mail}
          title="Mail Driver"
          subtitle="Select the email service provider for outgoing mail."
        >
          {/* Enable mail */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-slate-300 text-[10px] font-medium">
                Enable Outgoing Mail
              </p>
              <p className="text-slate-500 text-[9px] mt-0.5">
                When disabled, no system emails will be sent.
              </p>
            </div>
            <Toggle
              enabled={values.enabled}
              onChange={(v) => set("enabled", v)}
            />
          </div>

          <Divider />

          {/* Driver select */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mail-driver">Mail Driver</Label>
              <SelectInput
                id="mail-driver"
                value={values.driver}
                onChange={(e) => set("driver", e.target.value)}
                options={DRIVERS}
              />
            </div>

            <div className="flex items-end pb-0.5">
              <div className="bg-[#0c0f18] border border-slate-800 rounded-md px-3 py-2 w-full">
                <p className="text-slate-500 text-[9px]">Active driver</p>
                <p className="text-violet-400 text-[10px] font-semibold mt-0.5">
                  {driverLabel}
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── B. SMTP SETTINGS ────────────────────────────────── */}
        <SectionCard
          icon={Server}
          title="SMTP Settings"
          subtitle="Connection details for your mail server."
        >
          {/* Host + Port */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <TextInput
                id="smtp-host"
                value={values.host}
                onChange={(e) => set("host", e.target.value)}
                placeholder="smtp.example.com"
              />
            </div>
            <div>
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <SelectInput
                id="smtp-port"
                value={values.port}
                onChange={(e) => set("port", e.target.value)}
                options={PORTS}
              />
            </div>
          </div>

          {/* Username + Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp-user">SMTP Username</Label>
              <TextInput
                id="smtp-user"
                value={values.username}
                onChange={(e) => set("username", e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label htmlFor="smtp-pass">SMTP Password</Label>
              <PasswordInput
                id="smtp-pass"
                value={values.password}
                onChange={(e) => set("password", e.target.value)}
                placeholder="Enter SMTP password"
              />
            </div>
          </div>

          {/* Encryption */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp-enc">Encryption</Label>
              <SelectInput
                id="smtp-enc"
                value={values.encryption}
                onChange={(e) => set("encryption", e.target.value)}
                options={ENCRYPTIONS}
              />
            </div>
            {/* Encryption hint */}
            <div className="flex items-end pb-0.5">
              <div className="bg-[#0c0f18] border border-slate-800 rounded-md px-3 py-2 w-full">
                <p className="text-slate-500 text-[9px]">
                  {values.encryption === "tls"
                    ? "TLS — recommended for port 587"
                    : values.encryption === "ssl"
                    ? "SSL — recommended for port 465"
                    : "No encryption — not recommended for production"}
                </p>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ── C. SENDER IDENTITY ──────────────────────────────── */}
        <SectionCard
          icon={UserCircle}
          title="Sender Identity"
          subtitle="The name and address that appear in outgoing emails."
        >
          {/* From Name + From Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from-name">From Name</Label>
              <TextInput
                id="from-name"
                value={values.fromName}
                onChange={(e) => set("fromName", e.target.value)}
                placeholder="Jetray Platform"
              />
            </div>
            <div>
              <Label htmlFor="from-email">From Email</Label>
              <TextInput
                id="from-email"
                type="email"
                value={values.fromEmail}
                onChange={(e) => set("fromEmail", e.target.value)}
                placeholder="no-reply@example.com"
              />
            </div>
          </div>

          <Divider />

          {/* Reply-To */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reply-to">
                Reply-To Email{" "}
                <span className="text-slate-600 font-normal">
                  (optional)
                </span>
              </Label>
              <TextInput
                id="reply-to"
                type="email"
                value={values.replyTo}
                onChange={(e) => set("replyTo", e.target.value)}
                placeholder="support@example.com"
              />
            </div>
          </div>
        </SectionCard>

        {/* ── D. TEST EMAIL ────────────────────────────────────── */}
        <SectionCard
          icon={Send}
          title="Test Email"
          subtitle="Send a test email to verify your SMTP configuration."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="test-recipient">Recipient Email</Label>
              <TextInput
                id="test-recipient"
                type="email"
                value={values.testRecipient}
                onChange={(e) => set("testRecipient", e.target.value)}
                placeholder="test@example.com"
              />
            </div>

            <div className="flex items-end">
              <div className="w-full space-y-2">
                <button
                  type="button"
                  onClick={handleTestEmail}
                  disabled={testSending || !values.testRecipient.trim()}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-[10px] font-semibold transition-colors"
                >
                  <Send size={12} />
                  {testSending ? "Sending…" : "Send Test Email"}
                </button>

                {testSent && (
                  <p className="flex items-center gap-1 text-emerald-400 text-[9px] font-medium">
                    <CheckCircle size={11} />
                    Test email simulated — check console for details.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-amber-500/5 border border-amber-500/20 rounded-md px-4 py-3">
            <p className="text-amber-400 text-[9px]">
              <span className="font-semibold">Note:</span> Test email
              sending is currently simulated (frontend only). Real SMTP
              delivery will be connected once the backend is integrated.
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
