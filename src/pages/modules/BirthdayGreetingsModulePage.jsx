import React, { useState } from "react";
import {
  Cake,
  CheckCircle,
  RotateCcw,
  Save,
  Clock,
  Tag,
  MessageCircle,
  ArrowLeft,
  Bell,
  Sparkles,
} from "lucide-react";

export default function BirthdayGreetingsModulePage({ onBack }) {
  // Birthday greetings state
  const [enableGreetings, setEnableGreetings] = useState(true);
  const [dispatchTime, setDispatchTime] = useState("09:00");
  const [greetingTemplate, setGreetingTemplate] = useState(
    "Happy Birthday, {name}! 🎉 Wishing you a joyful day from the team at {company}. Use coupon code {coupon_code} for a special birthday discount!"
  );
  const [sendOncePerYear, setSendOncePerYear] = useState(true);

  // Coupon state
  const [enableCoupon, setEnableCoupon] = useState(true);
  const [couponPrefix, setCouponPrefix] = useState("BDAY20-");
  const [discountPercent, setDiscountPercent] = useState(20);
  const [validityDays, setValidityDays] = useState(7);

  // Chat reminders state
  const [enableReminders, setEnableReminders] = useState(true);
  const [reminderDelay, setReminderDelay] = useState("24 hours");
  const [maxReminders, setMaxReminders] = useState(3);
  const [reminderTemplate, setReminderTemplate] = useState(
    "Hi {name}, we noticed you haven't completed your order. Do you need any assistance from our team?"
  );
  const [stopOnReply, setStopOnReply] = useState(true);

  const [saved, setSaved] = useState(false);

  const insertVariable = (variable) => {
    setGreetingTemplate((prev) => prev + " " + variable);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setEnableGreetings(true);
    setDispatchTime("09:00");
    setGreetingTemplate(
      "Happy Birthday, {name}! 🎉 Wishing you a joyful day from the team at {company}. Use coupon code {coupon_code} for a special birthday discount!"
    );
    setSendOncePerYear(true);
    setEnableCoupon(true);
    setCouponPrefix("BDAY20-");
    setDiscountPercent(20);
    setValidityDays(7);
    setEnableReminders(true);
    setReminderDelay("24 hours");
    setMaxReminders(3);
    setReminderTemplate(
      "Hi {name}, we noticed you haven't completed your order. Do you need any assistance from our team?"
    );
    setStopOnReply(true);
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
              <Cake size={20} className="text-violet-400" />
              Birthday Greetings &amp; Chat Reminders
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Automate celebratory WhatsApp messages, dynamic birthday discounts, and follow-up conversation reminders.
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Birthday Greetings Section ────────────────────── */}
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Cake size={15} className="text-violet-400" />
              <h3 className="text-slate-200 text-xs font-semibold">Birthday Greetings Automation</h3>
            </div>
            <input
              type="checkbox"
              checked={enableGreetings}
              onChange={(e) => setEnableGreetings(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>

          <div className="space-y-3.5 text-[10px]">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Daily Dispatch Time (Vendor Timezone)
                </label>
                <input
                  type="time"
                  value={dispatchTime}
                  onChange={(e) => setDispatchTime(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60 font-mono"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  <p className="text-slate-200 font-medium">Send Once Per Year</p>
                  <p className="text-slate-500 text-[9px]">Prevents duplicate messages.</p>
                </div>
                <input
                  type="checkbox"
                  checked={sendOncePerYear}
                  onChange={(e) => setSendOncePerYear(e.target.checked)}
                  className="accent-violet-600 rounded"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-slate-300 font-medium">Greeting Message Template</label>
                <div className="flex items-center gap-1">
                  {["{name}", "{company}", "{coupon_code}"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => insertVariable(v)}
                      className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-violet-400 text-[8px] font-mono"
                    >
                      +{v}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                rows={3}
                value={greetingTemplate}
                onChange={(e) => setGreetingTemplate(e.target.value)}
                className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2.5 text-[10px] text-white outline-none focus:border-violet-500/60 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Birthday Coupon Sub-Card */}
          <div className="bg-[#0c0f18] border border-slate-800 rounded p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <div className="flex items-center gap-1.5">
                <Tag size={13} className="text-emerald-400" />
                <span className="text-slate-200 text-[10px] font-semibold">Birthday Discount Coupon</span>
              </div>
              <input
                type="checkbox"
                checked={enableCoupon}
                onChange={(e) => setEnableCoupon(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>

            <div className="grid grid-cols-3 gap-2.5 text-[10px]">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Prefix</label>
                <input
                  type="text"
                  value={couponPrefix}
                  onChange={(e) => setCouponPrefix(e.target.value)}
                  className="w-full h-7 bg-[#15141b] border border-slate-700 rounded px-2 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Discount %</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={discountPercent}
                  onChange={(e) => setDiscountPercent(Number(e.target.value))}
                  className="w-full h-7 bg-[#15141b] border border-slate-700 rounded px-2 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Validity (Days)</label>
                <input
                  type="number"
                  min="1"
                  value={validityDays}
                  onChange={(e) => setValidityDays(Number(e.target.value))}
                  className="w-full h-7 bg-[#15141b] border border-slate-700 rounded px-2 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Chat Reminders Section ────────────────────────── */}
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Bell size={15} className="text-violet-400" />
              <h3 className="text-slate-200 text-xs font-semibold">Unresolved Chat Reminders</h3>
            </div>
            <input
              type="checkbox"
              checked={enableReminders}
              onChange={(e) => setEnableReminders(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>

          <div className="space-y-3.5 text-[10px]">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Reminder Delay Schedule
                </label>
                <select
                  value={reminderDelay}
                  onChange={(e) => setReminderDelay(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                >
                  <option value="1 hour">1 hour after inactivity</option>
                  <option value="6 hours">6 hours after inactivity</option>
                  <option value="24 hours">24 hours after inactivity</option>
                  <option value="48 hours">48 hours after inactivity</option>
                  <option value="Custom">Custom interval</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Maximum Follow-up Nudges
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={maxReminders}
                  onChange={(e) => setMaxReminders(Number(e.target.value))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">
                Reminder Message Template
              </label>
              <textarea
                rows={3}
                value={reminderTemplate}
                onChange={(e) => setReminderTemplate(e.target.value)}
                className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2.5 text-[10px] text-white outline-none focus:border-violet-500/60 resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#0c0f18] border border-slate-800 rounded">
              <div>
                <p className="text-slate-200 font-medium">Auto-Stop Reminder Sequence on Inbound Reply</p>
                <p className="text-slate-500 text-[9px]">Immediately cancels subsequent scheduled reminders if the customer sends a message.</p>
              </div>
              <input
                type="checkbox"
                checked={stopOnReply}
                onChange={(e) => setStopOnReply(e.target.checked)}
                className="accent-violet-600 rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
