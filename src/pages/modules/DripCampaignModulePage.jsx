import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  RotateCcw,
  Save,
  Plus,
  Trash2,
  Edit2,
  Copy,
  Clock,
  Users,
  Layers,
  ArrowLeft,
  X,
  Play,
  Pause,
} from "lucide-react";

export default function DripCampaignModulePage({ onBack }) {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: "New Lead Onboarding Sequence",
      description: "3-step welcome and product demo sequence triggered on signup.",
      status: "active",
      contacts: 1420,
      created: "2026-08-01",
      modified: "2026-08-18",
      steps: [
        {
          id: 1,
          stepNumber: 1,
          message: "Welcome to Jetray, {name}! Here is a quick 2-minute overview video to get started.",
          delay: 0,
          delayUnit: "Minutes",
          mediaType: "Text",
          stopOnReply: true,
        },
        {
          id: 2,
          stepNumber: 2,
          message: "Hi {name}, did you have a chance to connect your WhatsApp number? Reply YES if you need a walkthrough.",
          delay: 1,
          delayUnit: "Days",
          mediaType: "Text",
          stopOnReply: true,
        },
        {
          id: 3,
          stepNumber: 3,
          message: "Special onboarding bonus: Get 500 extra message credits with coupon code JETRAY500.",
          delay: 3,
          delayUnit: "Days",
          mediaType: "Image",
          stopOnReply: true,
        },
      ],
    },
    {
      id: 2,
      name: "Abandoned Cart Follow-Up",
      description: "2-step nudge with discount voucher for abandoned checkouts.",
      status: "active",
      contacts: 890,
      created: "2026-08-10",
      modified: "2026-08-20",
      steps: [
        {
          id: 1,
          stepNumber: 1,
          message: "Hi {name}, you left items in your cart! Complete your purchase today for free priority shipping.",
          delay: 2,
          delayUnit: "Hours",
          mediaType: "Text",
          stopOnReply: true,
        },
        {
          id: 2,
          stepNumber: 2,
          message: "Final reminder: Your cart items are reserved for 12 more hours.",
          delay: 24,
          delayUnit: "Hours",
          mediaType: "Text",
          stopOnReply: true,
        },
      ],
    },
  ]);

  // Limits & Global Rules
  const [maxContacts, setMaxContacts] = useState(50000);
  const [maxDailyMessages, setMaxDailyMessages] = useState(5000);
  const [globalStopOnReply, setGlobalStopOnReply] = useState(true);
  const [retryFailed, setRetryFailed] = useState(true);

  // Modal for Create/Edit Campaign
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [campaignForm, setCampaignForm] = useState({
    name: "",
    description: "",
    status: "active",
    steps: [
      {
        id: 1,
        stepNumber: 1,
        message: "Hello {name}, thank you for reaching out to us!",
        delay: 0,
        delayUnit: "Minutes",
        mediaType: "Text",
        stopOnReply: true,
      },
    ],
  });

  const [saved, setSaved] = useState(false);

  // Stats
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const draftCampaigns = campaigns.filter((c) => c.status === "draft").length;
  const totalContacts = campaigns.reduce((acc, c) => acc + c.contacts, 0);

  const handleOpenCreate = () => {
    setEditingCampaign(null);
    setCampaignForm({
      name: "",
      description: "",
      status: "active",
      steps: [
        {
          id: 1,
          stepNumber: 1,
          message: "Hello {name}, thank you for joining us!",
          delay: 0,
          delayUnit: "Minutes",
          mediaType: "Text",
          stopOnReply: true,
        },
      ],
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (campaign) => {
    setEditingCampaign(campaign);
    setCampaignForm(JSON.parse(JSON.stringify(campaign)));
    setModalOpen(true);
  };

  const handleToggleStatus = (id) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: c.status === "active" ? "draft" : "active" } : c
      )
    );
  };

  const handleDeleteCampaign = (id) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id));
  };

  const handleDuplicateCampaign = (campaign) => {
    const copy = {
      ...campaign,
      id: Math.max(...campaigns.map((c) => c.id), 0) + 1,
      name: `${campaign.name} (Copy)`,
      contacts: 0,
      created: new Date().toISOString().substring(0, 10),
      modified: new Date().toISOString().substring(0, 10),
    };
    setCampaigns((prev) => [...prev, copy]);
  };

  // Step builder handlers inside modal
  const handleAddStep = () => {
    const nextStepNum = campaignForm.steps.length + 1;
    setCampaignForm((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          id: Date.now(),
          stepNumber: nextStepNum,
          message: "",
          delay: 1,
          delayUnit: "Days",
          mediaType: "Text",
          stopOnReply: true,
        },
      ],
    }));
  };

  const handleRemoveStep = (index) => {
    if (campaignForm.steps.length <= 1) return;
    const updated = campaignForm.steps.filter((_, i) => i !== index);
    const renumbered = updated.map((s, i) => ({ ...s, stepNumber: i + 1 }));
    setCampaignForm((prev) => ({ ...prev, steps: renumbered }));
  };

  const handleStepField = (index, field, value) => {
    const updated = [...campaignForm.steps];
    updated[index] = { ...updated[index], [field]: value };
    setCampaignForm((prev) => ({ ...prev, steps: updated }));
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!campaignForm.name.trim()) return;

    if (editingCampaign) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editingCampaign.id
            ? { ...campaignForm, modified: new Date().toISOString().substring(0, 10) }
            : c
        )
      );
    } else {
      const newCampaign = {
        ...campaignForm,
        id: Math.max(...campaigns.map((c) => c.id), 0) + 1,
        contacts: 0,
        created: new Date().toISOString().substring(0, 10),
        modified: new Date().toISOString().substring(0, 10),
      };
      setCampaigns((prev) => [...prev, newCampaign]);
    }
    setModalOpen(false);
  };

  const handleSaveGlobal = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleResetGlobal = () => {
    setMaxContacts(50000);
    setMaxDailyMessages(5000);
    setGlobalStopOnReply(true);
    setRetryFailed(true);
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
              <Send size={20} className="text-violet-400" />
              Drip Campaign Management
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Automated multi-step sequential WhatsApp messaging funnels with delayed steps and reply triggers.
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
            onClick={handleResetGlobal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white text-[10px] font-semibold transition-colors"
          >
            <RotateCcw size={11} />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
          >
            <Plus size={11} />
            Create Campaign
          </button>
        </div>
      </div>

      {/* ── Stats Strip ─────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4">
          <span className="text-slate-500 text-[9px] uppercase font-semibold tracking-wider">Total Campaigns</span>
          <p className="text-white text-xl font-bold font-mono mt-1">{totalCampaigns}</p>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4">
          <span className="text-emerald-400 text-[9px] uppercase font-semibold tracking-wider">Active Funnels</span>
          <p className="text-emerald-400 text-xl font-bold font-mono mt-1">{activeCampaigns}</p>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4">
          <span className="text-slate-400 text-[9px] uppercase font-semibold tracking-wider">Draft Funnels</span>
          <p className="text-slate-300 text-xl font-bold font-mono mt-1">{draftCampaigns}</p>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4">
          <span className="text-violet-400 text-[9px] uppercase font-semibold tracking-wider">Contacts Enrolled</span>
          <p className="text-violet-400 text-xl font-bold font-mono mt-1">{totalContacts.toLocaleString()}</p>
        </div>
      </div>

      {/* ── Campaigns Table ─────────────────────────────────── */}
      <div className="bg-[#15141b] border border-slate-800/80 rounded-sm overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-slate-200 text-xs font-semibold">Active &amp; Configured Drip Sequences</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#12121a] text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3">Campaign</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Steps</th>
                <th className="px-4 py-3">Enrolled Contacts</th>
                <th className="px-4 py-3">Created</th>
                <th className="px-4 py-3">Last Modified</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[10px]">
              {campaigns.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-slate-200 font-semibold">{c.name}</p>
                    <p className="text-slate-500 text-[9px]">{c.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-[8px] px-2 py-0.5 rounded-full font-semibold border ${
                        c.status === "active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {c.status === "active" ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono font-semibold text-slate-300">
                    {c.steps.length} {c.steps.length === 1 ? "Step" : "Steps"}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-400">
                    {c.contacts.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-[9px]">
                    {c.created}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-500 text-[9px]">
                    {c.modified}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(c.id)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title={c.status === "active" ? "Pause Campaign" : "Activate Campaign"}
                      >
                        {c.status === "active" ? <Pause size={11} /> : <Play size={11} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(c)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Edit Sequence"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDuplicateCampaign(c)}
                        className="p-1 text-slate-400 hover:text-violet-400 hover:bg-slate-800 rounded transition-colors"
                        title="Duplicate Campaign"
                      >
                        <Copy size={11} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCampaign(c.id)}
                        className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                        title="Delete Campaign"
                      >
                        <Trash2 size={11} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Global Limits & Policy Settings ──────────────────── */}
      <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-slate-200 text-xs font-semibold">Global Drip Funnel Policies &amp; Throttle Limits</h3>
          <button
            type="button"
            onClick={handleSaveGlobal}
            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white text-[9px] font-semibold transition-colors"
          >
            <Save size={10} />
            Save Policies
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[10px]">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Max Enrolled Contacts</label>
            <input
              type="number"
              value={maxContacts}
              onChange={(e) => setMaxContacts(Number(e.target.value))}
              className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Daily Message Throttle Limit</label>
            <input
              type="number"
              value={maxDailyMessages}
              onChange={(e) => setMaxDailyMessages(Number(e.target.value))}
              className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-slate-200 font-medium">Auto-Stop on Inbound Reply</p>
              <p className="text-slate-500 text-[9px]">Halt all subsequent steps.</p>
            </div>
            <input
              type="checkbox"
              checked={globalStopOnReply}
              onChange={(e) => setGlobalStopOnReply(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-slate-200 font-medium">Auto-Retry Failed Dispatches</p>
              <p className="text-slate-500 text-[9px]">Retry up to 3 times.</p>
            </div>
            <input
              type="checkbox"
              checked={retryFailed}
              onChange={(e) => setRetryFailed(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>
        </div>
      </div>

      {/* ── CREATE / EDIT CAMPAIGN MODAL ────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15141b] border border-slate-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 shrink-0">
              <div>
                <h3 className="text-slate-200 text-xs font-semibold">
                  {editingCampaign ? "Edit Drip Campaign Funnel" : "Create New Drip Funnel"}
                </h3>
                <p className="text-slate-500 text-[9px] mt-0.5">
                  Configure trigger, message templates, and step delays
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-300 p-1 rounded hover:bg-slate-800"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveModal} className="flex-1 p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-[10px]">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Campaign Name *</label>
                  <input
                    type="text"
                    required
                    value={campaignForm.name}
                    onChange={(e) => setCampaignForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. 7-Day Free Trial Engagement"
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Campaign Status</label>
                  <select
                    value={campaignForm.status}
                    onChange={(e) => setCampaignForm((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="active">Active (Immediate Dispatch)</option>
                    <option value="draft">Draft (Paused)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Description</label>
                <input
                  type="text"
                  value={campaignForm.description}
                  onChange={(e) => setCampaignForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Target audience or trigger event note..."
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>

              {/* Steps Builder */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-slate-200 text-xs font-semibold">Sequential Message Steps</h4>
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-violet-400 text-[9px] font-semibold transition-colors"
                  >
                    <Plus size={10} /> Add Next Step
                  </button>
                </div>

                <div className="space-y-3">
                  {campaignForm.steps.map((step, idx) => (
                    <div
                      key={step.id || idx}
                      className="bg-[#0c0f18] border border-slate-800 rounded p-3 space-y-2.5 text-[10px]"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span className="font-bold text-violet-400 text-[10px]">
                          Step #{step.stepNumber}
                        </span>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-slate-500 text-[9px]">Delay:</span>
                            <input
                              type="number"
                              min="0"
                              value={step.delay}
                              onChange={(e) => handleStepField(idx, "delay", Number(e.target.value))}
                              className="w-12 h-6 bg-[#15141b] border border-slate-700 rounded px-1.5 text-center text-[10px] text-white font-mono outline-none"
                            />
                            <select
                              value={step.delayUnit}
                              onChange={(e) => handleStepField(idx, "delayUnit", e.target.value)}
                              className="h-6 bg-[#15141b] border border-slate-700 rounded px-1 text-[9px] text-white outline-none"
                            >
                              <option value="Minutes">Minutes</option>
                              <option value="Hours">Hours</option>
                              <option value="Days">Days</option>
                            </select>
                          </div>

                          {campaignForm.steps.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveStep(idx)}
                              className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                              title="Remove Step"
                            >
                              <Trash2 size={11} />
                            </button>
                          )}
                        </div>
                      </div>

                      <textarea
                        rows={2}
                        required
                        value={step.message}
                        onChange={(e) => handleStepField(idx, "message", e.target.value)}
                        placeholder="Enter message content for this step (e.g. Hi {name}, check out our latest update...)"
                        className="w-full bg-[#15141b] border border-slate-700/80 rounded p-2 text-[10px] text-white outline-none focus:border-violet-500/60 resize-none leading-relaxed"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white text-[10px] font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
                >
                  <Save size={11} />
                  {editingCampaign ? "Update Campaign" : "Save Drip Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
