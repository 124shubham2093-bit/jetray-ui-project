import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  CheckCircle,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
} from "lucide-react";

/* ─── Default values ─────────────────────────────────────── */
const DEFAULTS = {
  stripe: {
    enabled: false,
    publishableKey: "",
    secretKey: "",
    webhookSecret: "",
    mode: "test",
  },
  razorpay: {
    enabled: false,
    keyId: "",
    keySecret: "",
    webhookSecret: "",
    mode: "test",
  },
  paypal: {
    enabled: false,
    clientId: "",
    clientSecret: "",
    webhookId: "",
    mode: "sandbox",
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

/* ─── Gateway card ───────────────────────────────────────── */
function GatewayCard({ title, logo, enabled, onToggle, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
      {/* Card header — always visible */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/70">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-7 h-7 rounded bg-slate-800/80 border border-slate-700/60">
            <CreditCard size={13} className="text-violet-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-slate-200 text-xs font-semibold">
                {title}
              </h3>
              {logo && (
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-mono tracking-wide">
                  {logo}
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
      {expanded && (
        <div className="p-5 space-y-4">{children}</div>
      )}
    </section>
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

/* ─── Mode selector ──────────────────────────────────────── */
function ModeSelect({ id, value, onChange, options }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60 transition-colors"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

/* ─── Mode badge ─────────────────────────────────────────── */
function ModeBadge({ mode, options }) {
  const found = options.find((o) => o.value === mode);
  const isLive =
    mode === "live" || mode === "production";
  return (
    <span
      className={`inline-flex items-center text-[8px] px-2 py-0.5 rounded-full font-semibold ${
        isLive
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
      }`}
    >
      {found ? found.label : mode}
    </span>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function PaymentGatewaysConfigurationPage() {
  const [values, setValues] = useState(
    JSON.parse(JSON.stringify(DEFAULTS))
  );
  const [saved, setSaved] = useState(false);

  /* Generic nested updater */
  const handleField = (gateway, key, value) => {
    setSaved(false);
    setValues((prev) => ({
      ...prev,
      [gateway]: { ...prev[gateway], [key]: value },
    }));
  };

  const handleToggle = (gateway, enabled) => {
    setSaved(false);
    setValues((prev) => ({
      ...prev,
      [gateway]: { ...prev[gateway], enabled },
    }));
  };

  const handleReset = () => {
    setValues(JSON.parse(JSON.stringify(DEFAULTS)));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only — backend persistence will be added later.
    console.log("Payment gateway configuration:", values);
    setSaved(true);
  };

  const stripeTestLive = [
    { value: "test", label: "Test mode" },
    { value: "live", label: "Live mode" },
  ];

  const paypalModes = [
    { value: "sandbox", label: "Sandbox" },
    { value: "production", label: "Production" },
  ];

  return (
    <div className="p-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Payment Gateways
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Configure and enable payment providers for your platform.
          Expand each gateway to enter its credentials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">

        {/* ── STRIPE ──────────────────────────────────────────── */}
        <GatewayCard
          title="Stripe"
          logo="stripe"
          enabled={values.stripe.enabled}
          onToggle={(v) => handleToggle("stripe", v)}
        >
          {/* Mode + badge */}
          <div className="flex items-center justify-between mb-1">
            <p className="text-slate-400 text-[9px]">
              Stripe credentials
            </p>
            <ModeBadge
              mode={values.stripe.mode}
              options={stripeTestLive}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Publishable Key */}
            <div>
              <Label htmlFor="stripe-pk">Publishable Key</Label>
              <PlainInput
                id="stripe-pk"
                value={values.stripe.publishableKey}
                onChange={(e) =>
                  handleField(
                    "stripe",
                    "publishableKey",
                    e.target.value
                  )
                }
                placeholder="pk_test_..."
              />
            </div>

            {/* Secret Key */}
            <div>
              <Label htmlFor="stripe-sk">Secret Key</Label>
              <SecretInput
                id="stripe-sk"
                value={values.stripe.secretKey}
                onChange={(e) =>
                  handleField(
                    "stripe",
                    "secretKey",
                    e.target.value
                  )
                }
                placeholder="sk_test_..."
              />
            </div>

            {/* Webhook Secret */}
            <div>
              <Label htmlFor="stripe-wh">Webhook Secret</Label>
              <SecretInput
                id="stripe-wh"
                value={values.stripe.webhookSecret}
                onChange={(e) =>
                  handleField(
                    "stripe",
                    "webhookSecret",
                    e.target.value
                  )
                }
                placeholder="whsec_..."
              />
            </div>

            {/* Mode */}
            <div>
              <Label htmlFor="stripe-mode">Mode</Label>
              <ModeSelect
                id="stripe-mode"
                value={values.stripe.mode}
                onChange={(e) =>
                  handleField("stripe", "mode", e.target.value)
                }
                options={stripeTestLive}
              />
            </div>
          </div>
        </GatewayCard>

        {/* ── RAZORPAY ────────────────────────────────────────── */}
        <GatewayCard
          title="Razorpay"
          logo="razorpay"
          enabled={values.razorpay.enabled}
          onToggle={(v) => handleToggle("razorpay", v)}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-slate-400 text-[9px]">
              Razorpay credentials
            </p>
            <ModeBadge
              mode={values.razorpay.mode}
              options={stripeTestLive}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Key ID */}
            <div>
              <Label htmlFor="rp-key-id">Key ID</Label>
              <PlainInput
                id="rp-key-id"
                value={values.razorpay.keyId}
                onChange={(e) =>
                  handleField("razorpay", "keyId", e.target.value)
                }
                placeholder="rzp_test_..."
              />
            </div>

            {/* Key Secret */}
            <div>
              <Label htmlFor="rp-key-secret">Key Secret</Label>
              <SecretInput
                id="rp-key-secret"
                value={values.razorpay.keySecret}
                onChange={(e) =>
                  handleField(
                    "razorpay",
                    "keySecret",
                    e.target.value
                  )
                }
                placeholder="Enter key secret"
              />
            </div>

            {/* Webhook Secret */}
            <div>
              <Label htmlFor="rp-webhook-secret">Webhook Secret</Label>
              <SecretInput
                id="rp-webhook-secret"
                value={values.razorpay.webhookSecret || ""}
                onChange={(e) =>
                  handleField(
                    "razorpay",
                    "webhookSecret",
                    e.target.value
                  )
                }
                placeholder="Enter webhook secret"
              />
            </div>

            {/* Mode */}
            <div>
              <Label htmlFor="rp-mode">Mode</Label>
              <ModeSelect
                id="rp-mode"
                value={values.razorpay.mode}
                onChange={(e) =>
                  handleField("razorpay", "mode", e.target.value)
                }
                options={stripeTestLive}
              />
            </div>
          </div>
        </GatewayCard>

        {/* ── PAYPAL ──────────────────────────────────────────── */}
        <GatewayCard
          title="PayPal"
          logo="paypal"
          enabled={values.paypal.enabled}
          onToggle={(v) => handleToggle("paypal", v)}
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-slate-400 text-[9px]">
              PayPal credentials
            </p>
            <ModeBadge
              mode={values.paypal.mode}
              options={paypalModes}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Client ID */}
            <div>
              <Label htmlFor="pp-client-id">Client ID</Label>
              <PlainInput
                id="pp-client-id"
                value={values.paypal.clientId}
                onChange={(e) =>
                  handleField("paypal", "clientId", e.target.value)
                }
                placeholder="Enter PayPal client ID"
              />
            </div>

            {/* Client Secret */}
            <div>
              <Label htmlFor="pp-client-secret">Client Secret</Label>
              <SecretInput
                id="pp-client-secret"
                value={values.paypal.clientSecret}
                onChange={(e) =>
                  handleField(
                    "paypal",
                    "clientSecret",
                    e.target.value
                  )
                }
                placeholder="Enter PayPal client secret"
              />
            </div>

            {/* Webhook ID */}
            <div>
              <Label htmlFor="pp-webhook-id">Webhook ID</Label>
              <SecretInput
                id="pp-webhook-id"
                value={values.paypal.webhookId || ""}
                onChange={(e) =>
                  handleField(
                    "paypal",
                    "webhookId",
                    e.target.value
                  )
                }
                placeholder="Enter webhook ID"
              />
            </div>

            {/* Mode */}
            <div>
              <Label htmlFor="pp-mode">Mode</Label>
              <ModeSelect
                id="pp-mode"
                value={values.paypal.mode}
                onChange={(e) =>
                  handleField("paypal", "mode", e.target.value)
                }
                options={paypalModes}
              />
            </div>
          </div>
        </GatewayCard>

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
