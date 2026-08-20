import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  CheckCircle,
  PackageCheck,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";

/* ─── Mock seed data ─────────────────────────────────────── */
const SEED_PLANS = [
  {
    id: 1,
    name: "Starter",
    description: "Perfect for small businesses getting started.",
    price: "499",
    billingPeriod: "monthly",
    currency: "INR",
    trialDays: 14,
    contactLimit: 500,
    messagesPerDay: 100,
    active: true,
    features: "WhatsApp messaging, Basic analytics, 1 team member",
  },
  {
    id: 2,
    name: "Professional",
    description: "For growing teams that need more power.",
    price: "1499",
    billingPeriod: "monthly",
    currency: "INR",
    trialDays: 14,
    contactLimit: 5000,
    messagesPerDay: 1000,
    active: true,
    features:
      "WhatsApp messaging, Advanced analytics, 5 team members, Priority support",
  },
  {
    id: 3,
    name: "Enterprise",
    description: "Unlimited scale for large organisations.",
    price: "4999",
    billingPeriod: "monthly",
    currency: "INR",
    trialDays: 0,
    contactLimit: 0,
    messagesPerDay: 0,
    active: false,
    features:
      "Unlimited messaging, Full analytics, Unlimited team members, Dedicated support, Custom integrations",
  },
];

const BILLING_PERIODS = [
  { value: "monthly",  label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly",  label: "Yearly" },
  { value: "lifetime", label: "Lifetime" },
];

const CURRENCIES = ["INR", "USD", "EUR", "GBP", "AUD", "CAD", "JPY"];

let nextId = SEED_PLANS.length + 1;

/* ─── Empty form state ───────────────────────────────────── */
const EMPTY_FORM = {
  name: "",
  description: "",
  price: "",
  billingPeriod: "monthly",
  currency: "INR",
  trialDays: 14,
  contactLimit: 1000,
  messagesPerDay: 500,
  active: true,
  features: "",
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

/* ─── Input ──────────────────────────────────────────────── */
function Input({ id, type = "text", value, onChange, placeholder, min }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      min={min}
      className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
    />
  );
}

/* ─── Select ─────────────────────────────────────────────── */
function Select({ id, value, onChange, children }) {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60 transition-colors"
    >
      {children}
    </select>
  );
}

/* ─── Plan form (add / edit) ─────────────────────────────── */
function PlanForm({ initial, onSave, onCancel, title }) {
  const [form, setForm] = useState({ ...initial });

  const set = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave(form);
  };

  return (
    <div className="bg-[#15141b] border border-violet-500/30 rounded-sm p-5 space-y-4">
      {/* Form header */}
      <div className="flex items-center justify-between">
        <h4 className="text-slate-200 text-xs font-semibold">{title}</h4>
        <button
          type="button"
          onClick={onCancel}
          className="text-slate-500 hover:text-slate-300 transition-colors"
          aria-label="Close"
        >
          <X size={14} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Name + Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pf-name">Plan Name *</Label>
            <Input
              id="pf-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="e.g. Professional"
            />
          </div>
          <div>
            <Label htmlFor="pf-price">Price</Label>
            <Input
              id="pf-price"
              type="number"
              min="0"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
              placeholder="0"
            />
          </div>
        </div>

        {/* Row 2: Billing Period + Currency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="pf-billing">Billing Period</Label>
            <Select
              id="pf-billing"
              value={form.billingPeriod}
              onChange={(e) => set("billingPeriod", e.target.value)}
            >
              {BILLING_PERIODS.map((b) => (
                <option key={b.value} value={b.value}>
                  {b.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="pf-currency">Currency</Label>
            <Select
              id="pf-currency"
              value={form.currency}
              onChange={(e) => set("currency", e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Row 3: Trial Days + Contact Limit + Msg/Day */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="pf-trial">Trial Days</Label>
            <Input
              id="pf-trial"
              type="number"
              min="0"
              value={form.trialDays}
              onChange={(e) =>
                set("trialDays", Number(e.target.value))
              }
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="pf-contacts">
              Contact Limit{" "}
              <span className="text-slate-600 font-normal">
                (0 = unlimited)
              </span>
            </Label>
            <Input
              id="pf-contacts"
              type="number"
              min="0"
              value={form.contactLimit}
              onChange={(e) =>
                set("contactLimit", Number(e.target.value))
              }
              placeholder="0"
            />
          </div>
          <div>
            <Label htmlFor="pf-msgs">
              Msgs / Day{" "}
              <span className="text-slate-600 font-normal">
                (0 = unlimited)
              </span>
            </Label>
            <Input
              id="pf-msgs"
              type="number"
              min="0"
              value={form.messagesPerDay}
              onChange={(e) =>
                set("messagesPerDay", Number(e.target.value))
              }
              placeholder="0"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="pf-desc">Description</Label>
          <textarea
            id="pf-desc"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Short description of this plan…"
            rows={2}
            className="w-full bg-[#0c0f18] border border-slate-800 rounded-md px-3 py-2 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors resize-none"
          />
        </div>

        {/* Features */}
        <div>
          <Label htmlFor="pf-features">Features</Label>
          <textarea
            id="pf-features"
            value={form.features}
            onChange={(e) => set("features", e.target.value)}
            placeholder="Comma-separated list of features…"
            rows={2}
            className="w-full bg-[#0c0f18] border border-slate-800 rounded-md px-3 py-2 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors resize-none"
          />
        </div>

        {/* Status toggle */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-300 text-[10px] font-medium">
              Active
            </p>
            <p className="text-slate-500 text-[9px] mt-0.5">
              Inactive plans are hidden from vendor selection.
            </p>
          </div>
          <Toggle
            enabled={form.active}
            onChange={(v) => set("active", v)}
          />
        </div>

        {/* Form actions */}
        <div className="flex items-center justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-[10px] font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
          >
            <Save size={12} />
            {title === "Add Plan" ? "Create Plan" : "Update Plan"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ─── Delete confirmation ────────────────────────────────── */
function DeleteConfirm({ plan, onConfirm, onCancel }) {
  return (
    <div className="bg-[#15141b] border border-red-500/30 rounded-sm p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle
          size={15}
          className="text-red-400 shrink-0 mt-0.5"
        />
        <div className="flex-1 min-w-0">
          <p className="text-slate-200 text-[10px] font-semibold">
            Delete &ldquo;{plan.name}&rdquo;?
          </p>
          <p className="text-slate-500 text-[9px] mt-1">
            This plan will be removed. Vendors currently on this plan
            will not be affected immediately.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-[10px] font-semibold transition-colors"
            >
              <Trash2 size={11} />
              Delete
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-[10px] font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Status badge ───────────────────────────────────────── */
function StatusBadge({ active }) {
  return (
    <span
      className={`inline-flex items-center text-[8px] px-2 py-0.5 rounded-full font-semibold ${
        active
          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          : "bg-slate-700/60 text-slate-500 border border-slate-700"
      }`}
    >
      {active ? "Active" : "Inactive"}
    </span>
  );
}

/* ─── Plan row card ──────────────────────────────────────── */
function PlanRow({ plan, onEdit, onDelete, onToggleActive }) {
  const billingLabel =
    BILLING_PERIODS.find((b) => b.value === plan.billingPeriod)
      ?.label ?? plan.billingPeriod;

  const contactDisplay =
    plan.contactLimit === 0 ? "Unlimited" : plan.contactLimit.toLocaleString();
  const msgDisplay =
    plan.messagesPerDay === 0
      ? "Unlimited"
      : plan.messagesPerDay.toLocaleString();

  return (
    <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
      {/* Left: name + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-slate-200 text-[11px] font-semibold">
            {plan.name}
          </p>
          <StatusBadge active={plan.active} />
          {plan.trialDays > 0 && (
            <span className="text-[8px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
              {plan.trialDays}-day trial
            </span>
          )}
        </div>
        {plan.description && (
          <p className="text-slate-500 text-[9px] mt-0.5 truncate">
            {plan.description}
          </p>
        )}
        <div className="flex flex-wrap gap-3 mt-1.5">
          <span className="text-slate-400 text-[9px]">
            <span className="text-slate-600">Price:</span>{" "}
            <span className="font-medium">
              {plan.currency} {plan.price || "0"}
            </span>
            <span className="text-slate-600 ml-0.5">
              / {billingLabel.toLowerCase()}
            </span>
          </span>
          <span className="text-slate-400 text-[9px]">
            <span className="text-slate-600">Contacts:</span>{" "}
            {contactDisplay}
          </span>
          <span className="text-slate-400 text-[9px]">
            <span className="text-slate-600">Msgs/day:</span>{" "}
            {msgDisplay}
          </span>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2 shrink-0">
        <Toggle
          enabled={plan.active}
          onChange={(v) => onToggleActive(plan.id, v)}
        />
        <button
          type="button"
          onClick={() => onEdit(plan)}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-[9px] font-semibold transition-colors"
        >
          <Pencil size={11} />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(plan)}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded border border-red-900/60 text-red-400 hover:bg-red-500/10 hover:border-red-600 text-[9px] font-semibold transition-colors"
        >
          <Trash2 size={11} />
          Delete
        </button>
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────── */
export default function SubscriptionPlansConfigurationPage() {
  const [plans, setPlans] = useState(
    SEED_PLANS.map((p) => ({ ...p }))
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);   // plan object
  const [deletingPlan, setDeletingPlan] = useState(null); // plan object
  const [saved, setSaved] = useState(false);

  /* ── Add ── */
  const handleAdd = (form) => {
    setPlans((prev) => [
      ...prev,
      { ...form, id: nextId++ },
    ]);
    setShowAddForm(false);
    setSaved(false);
  };

  /* ── Edit ── */
  const handleUpdate = (form) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === editingPlan.id ? { ...form, id: p.id } : p
      )
    );
    setEditingPlan(null);
    setSaved(false);
  };

  /* ── Toggle active inline ── */
  const handleToggleActive = (id, value) => {
    setSaved(false);
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: value } : p))
    );
  };

  /* ── Delete ── */
  const handleDeleteConfirm = () => {
    setPlans((prev) =>
      prev.filter((p) => p.id !== deletingPlan.id)
    );
    setDeletingPlan(null);
    setSaved(false);
  };

  /* ── Reset ── */
  const handleReset = () => {
    setPlans(SEED_PLANS.map((p) => ({ ...p })));
    setShowAddForm(false);
    setEditingPlan(null);
    setDeletingPlan(null);
    setSaved(false);
  };

  /* ── Save ── */
  const handleSave = (e) => {
    e.preventDefault();
    // Frontend-only — backend persistence will be added later.
    console.log("Subscription plans configuration:", plans);
    setSaved(true);
  };

  const activePlans = plans.filter((p) => p.active).length;

  return (
    <div className="p-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Subscription Plans
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Define and manage the subscription plans available to vendors on
          your platform.
        </p>
      </div>

      {/* ── Summary strip ────────────────────────────────────── */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {[
          { label: "Total Plans",   value: plans.length },
          { label: "Active Plans",  value: activePlans },
          { label: "Inactive Plans", value: plans.length - activePlans },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#15141b] border border-slate-800/70 rounded-sm px-4 py-3"
          >
            <p className="text-slate-500 text-[9px] font-medium uppercase tracking-wide">
              {stat.label}
            </p>
            <p className="text-white text-lg font-bold mt-0.5">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSave} className="mt-5 space-y-4">

        {/* ── Plans section ─────────────────────────────────── */}
        <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
          {/* Section header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/70">
            <div className="flex items-center gap-2">
              <PackageCheck size={15} className="text-violet-400" />
              <div>
                <h3 className="text-slate-200 text-xs font-semibold">
                  Plans
                </h3>
                <p className="text-slate-500 text-[10px] mt-0.5">
                  {plans.length} plan{plans.length !== 1 ? "s" : ""}{" "}
                  configured
                </p>
              </div>
            </div>
            {!showAddForm && !editingPlan && (
              <button
                type="button"
                onClick={() => {
                  setEditingPlan(null);
                  setDeletingPlan(null);
                  setShowAddForm(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
              >
                <Plus size={12} />
                Add Plan
              </button>
            )}
          </div>

          {/* Add form */}
          {showAddForm && (
            <div className="p-5">
              <PlanForm
                title="Add Plan"
                initial={{ ...EMPTY_FORM }}
                onSave={handleAdd}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}

          {/* Plan rows */}
          {plans.length === 0 ? (
            <div className="py-12 text-center">
              <PackageCheck
                size={24}
                className="mx-auto text-slate-700"
              />
              <p className="text-slate-500 text-xs mt-2">
                No plans yet. Click &ldquo;Add Plan&rdquo; to create one.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/70">
              {plans.map((plan) => (
                <React.Fragment key={plan.id}>
                  {/* Edit form inline */}
                  {editingPlan?.id === plan.id ? (
                    <div className="p-5">
                      <PlanForm
                        title="Edit Plan"
                        initial={{ ...plan }}
                        onSave={handleUpdate}
                        onCancel={() => setEditingPlan(null)}
                      />
                    </div>
                  ) : deletingPlan?.id === plan.id ? (
                    /* Delete confirmation inline */
                    <div className="p-5">
                      <DeleteConfirm
                        plan={plan}
                        onConfirm={handleDeleteConfirm}
                        onCancel={() => setDeletingPlan(null)}
                      />
                    </div>
                  ) : (
                    <PlanRow
                      plan={plan}
                      onEdit={(p) => {
                        setShowAddForm(false);
                        setDeletingPlan(null);
                        setEditingPlan(p);
                      }}
                      onDelete={(p) => {
                        setShowAddForm(false);
                        setEditingPlan(null);
                        setDeletingPlan(p);
                      }}
                      onToggleActive={handleToggleActive}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </section>

        {/* ── Actions ──────────────────────────────────────── */}
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
