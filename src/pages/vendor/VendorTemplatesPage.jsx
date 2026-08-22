import React, { useState } from "react";
import {
  FileText,
  Plus,
  RefreshCw,
  ExternalLink,
  Send,
  Eye,
  Edit2,
  Trash2,
  CheckCircle,
  MessageSquare,
  Sparkles,
  X,
  Smartphone,
} from "lucide-react";
import { VENDOR_TEMPLATES_SEED, VENDOR_PRESET_MESSAGES } from "../../data/vendorData";

export default function VendorTemplatesPage({ onNavigate }) {
  const [tab, setTab] = useState("templates"); // "templates" | "presets"
  const [templates, setTemplates] = useState(VENDOR_TEMPLATES_SEED);
  const [presets, setPresets] = useState(VENDOR_PRESET_MESSAGES);
  const [syncing, setSyncing] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Modals
  const [createTemplateModal, setCreateTemplateModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [editTemplateModal, setEditTemplateModal] = useState(null);
  const [createPresetModal, setCreatePresetModal] = useState(false);

  // New Template form
  const [newTpl, setNewTpl] = useState({
    name: "",
    category: "Marketing",
    language: "English (US)",
    body: "Hi {{1}}, welcome to our exclusive event showcase! Reply 1 for catalog.",
  });

  // New Preset form
  const [newPreset, setNewPreset] = useState({
    shortcut: "/quick",
    title: "Quick Follow-up",
    text: "Hi there! Just following up on our previous conversation.",
  });

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleSyncTemplates = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      showFeedback("Synchronized 15 templates with Meta Cloud API.");
    }, 1200);
  };

  const handleCreateTemplate = (e) => {
    e.preventDefault();
    if (!newTpl.name.trim()) return;

    const tpl = {
      ...newTpl,
      id: `tpl-${Date.now()}`,
      status: "Approved",
      updatedOn: "Today",
      sampleVariables: ["Customer Name"],
    };

    setTemplates([tpl, ...templates]);
    setCreateTemplateModal(false);
    showFeedback("New template submitted for Meta approval!");
  };

  const handleSaveEditTemplate = (e) => {
    e.preventDefault();
    if (!editTemplateModal) return;
    setTemplates((prev) =>
      prev.map((t) => (t.id === editTemplateModal.id ? editTemplateModal : t))
    );
    setEditTemplateModal(null);
    showFeedback("Template updated successfully.");
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter((t) => t.id !== id));
    showFeedback("Template deleted.");
  };

  const handleCreatePreset = (e) => {
    e.preventDefault();
    if (!newPreset.shortcut.trim()) return;

    const pr = {
      ...newPreset,
      id: `pr-${Date.now()}`,
    };

    setPresets([...presets, pr]);
    setCreatePresetModal(false);
    showFeedback("Quick reply preset created.");
  };

  const handleDeletePreset = (id) => {
    setPresets(presets.filter((p) => p.id !== id));
    showFeedback("Preset deleted.");
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <FileText size={22} className="text-violet-400" />
            WhatsApp Message Templates &amp; Presets
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Meta-approved Highly Structured Messages (HSM) and quick reply canned shortcuts.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {feedback && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 mr-2 animate-in fade-in">
              <CheckCircle size={14} /> {feedback}
            </span>
          )}

          <button
            type="button"
            onClick={handleSyncTemplates}
            disabled={syncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
            {syncing ? "Syncing..." : "Sync Meta Templates"}
          </button>

          <a
            href="https://business.facebook.com/wa/manage/message-templates"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <ExternalLink size={13} />
            Manage on Meta
          </a>

          <button
            type="button"
            onClick={() => onNavigate && onNavigate("campaigns")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-violet-500/40 bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 text-xs font-semibold transition-colors"
          >
            <Send size={13} />
            Create Campaign
          </button>

          <button
            type="button"
            onClick={() => {
              if (tab === "templates") setCreateTemplateModal(true);
              else setCreatePresetModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus size={13} />
            {tab === "templates" ? "Create Template" : "Add Preset Reply"}
          </button>
        </div>
      </div>

      {/* ── Sub-Navigation Tabs ──────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setTab("templates")}
          className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
            tab === "templates" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          WhatsApp Templates ({templates.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("presets")}
          className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
            tab === "presets" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          Preset Quick Replies ({presets.length})
        </button>
      </div>

      {/* ── TAB 1: WHATSAPP TEMPLATES TABLE ──────────────────── */}
      {tab === "templates" && (
        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-emerald-600/80 text-white uppercase text-[10px] font-semibold border-b border-slate-800">
                  <th className="p-3.5">Template Name</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Language</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Last Updated</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
                {templates.map((tpl) => (
                  <tr key={tpl.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-3.5">
                      <p className="font-semibold text-white">{tpl.name}</p>
                      <p className="text-slate-500 text-[10px] truncate max-w-xs">{tpl.body}</p>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[9px] font-medium">
                        {tpl.category}
                      </span>
                    </td>
                    <td className="p-3.5">{tpl.language}</td>
                    <td className="p-3.5 text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {tpl.status}
                    </td>
                    <td className="p-3.5 font-mono text-slate-500 text-[10px]">{tpl.updatedOn}</td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onNavigate && onNavigate("campaigns")}
                          className="px-2 py-1 rounded bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 text-[10px] font-semibold"
                          title="Direct Campaign"
                        >
                          Direct Campaign
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewTemplate(tpl)}
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                          title="Preview Template"
                        >
                          <Eye size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditTemplateModal({ ...tpl })}
                          className="p-1 text-slate-400 hover:text-violet-400 hover:bg-slate-800 rounded transition-colors"
                          title="Edit Template"
                        >
                          <Edit2 size={13} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteTemplate(tpl.id)}
                          className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                          title="Delete Template"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TAB 2: PRESET QUICK REPLIES ──────────────────────── */}
      {tab === "presets" && (
        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-emerald-600/80 text-white uppercase text-[10px] font-semibold border-b border-slate-800">
                <th className="p-3.5">Shortcut Command</th>
                <th className="p-3.5">Preset Title</th>
                <th className="p-3.5">Canned Message Content</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
              {presets.map((pr) => (
                <tr key={pr.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-3.5 font-mono text-violet-400 font-bold">{pr.shortcut}</td>
                  <td className="p-3.5 font-semibold text-white">{pr.title}</td>
                  <td className="p-3.5 text-slate-400 max-w-md">{pr.text}</td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeletePreset(pr.id)}
                      className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── TEMPLATE PREVIEW MODAL ───────────────────────────── */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-sm shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-white text-xs font-semibold">{previewTemplate.name}</h3>
              <button type="button" onClick={() => setPreviewTemplate(null)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <div className="bg-[#0c0f18] p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {previewTemplate.category} Template
              </span>
              <div className="p-3 bg-[#1d2b24] text-slate-100 rounded-lg text-xs leading-relaxed mt-2">
                {previewTemplate.body}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="px-3 py-1 rounded bg-slate-800 text-slate-200 text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT TEMPLATE MODAL ──────────────────────────────── */}
      {editTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold">Edit WhatsApp Template</h3>
              <button type="button" onClick={() => setEditTemplateModal(null)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveEditTemplate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Template Name</label>
                <input
                  type="text"
                  required
                  value={editTemplateModal.name}
                  onChange={(e) => setEditTemplateModal({ ...editTemplateModal, name: e.target.value })}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={editTemplateModal.category}
                    onChange={(e) => setEditTemplateModal({ ...editTemplateModal, category: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-white outline-none"
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Utility">Utility</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Language</label>
                  <select
                    value={editTemplateModal.language}
                    onChange={(e) => setEditTemplateModal({ ...editTemplateModal, language: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-white outline-none"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Message Body</label>
                <textarea
                  rows={3}
                  required
                  value={editTemplateModal.body}
                  onChange={(e) => setEditTemplateModal({ ...editTemplateModal, body: e.target.value })}
                  className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2.5 text-white outline-none focus:border-violet-500/60 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditTemplateModal(null)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── CREATE TEMPLATE MODAL ────────────────────────────── */}
      {createTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold">Create New WhatsApp Template</h3>
              <button type="button" onClick={() => setCreateTemplateModal(false)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreateTemplate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Template Name (all lowercase, underscores) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. order_delivery_update"
                  value={newTpl.name}
                  onChange={(e) => setNewTpl({ ...newTpl, name: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "_") })}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Category</label>
                  <select
                    value={newTpl.category}
                    onChange={(e) => setNewTpl({ ...newTpl, category: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-white outline-none"
                  >
                    <option value="Marketing">Marketing</option>
                    <option value="Utility">Utility</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Language</label>
                  <select
                    value={newTpl.language}
                    onChange={(e) => setNewTpl({ ...newTpl, language: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-white outline-none"
                  >
                    <option value="English (US)">English (US)</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Spanish">Spanish</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Message Body (use {"{{1}}"}, {"{{2}}"} for dynamic variables) *</label>
                <textarea
                  rows={3}
                  required
                  value={newTpl.body}
                  onChange={(e) => setNewTpl({ ...newTpl, body: e.target.value })}
                  className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2.5 text-white outline-none focus:border-violet-500/60 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCreateTemplateModal(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold"
                >
                  Submit to Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
