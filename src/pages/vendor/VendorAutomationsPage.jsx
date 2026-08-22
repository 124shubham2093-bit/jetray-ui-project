import React, { useState } from "react";
import {
  Bot,
  Plus,
  GitBranch,
  Send,
  Trash2,
  Edit2,
  CheckCircle,
  Play,
  Layers,
  Sparkles,
  ArrowDown,
  ArrowRight,
  Sliders,
  X,
} from "lucide-react";
import { VENDOR_BOT_REPLIES } from "../../data/vendorData";

export default function VendorAutomationsPage() {
  const [activeTab, setActiveTab] = useState("replies"); // "replies" | "flows" | "drips"
  const [botReplies, setBotReplies] = useState(VENDOR_BOT_REPLIES);
  const [feedback, setFeedback] = useState("");

  // Modals & States
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [newKeyword, setNewKeyword] = useState("");
  const [newReply, setNewReply] = useState("");

  // Flow Builder Interactive Nodes State
  const [flowNodes, setFlowNodes] = useState([
    { id: "node-1", type: "trigger", title: "Keyword Trigger", detail: "When contact sends: 'BOOK, EVENT, DEMO'", color: "border-violet-500 bg-violet-950/20" },
    { id: "node-2", type: "message", title: "Send WhatsApp Template", detail: "welcome_onboarding_v2 (Greeting + Catalog)", color: "border-blue-500 bg-blue-950/20" },
    { id: "node-3", type: "condition", title: "Branch Condition", detail: "Did contact reply within 1 hour?", color: "border-amber-500 bg-amber-950/20" },
    { id: "node-4", type: "action", title: "Execute Action", detail: "Assign Lead to 'Suresh Menon' & Apply Tag '#HotLead'", color: "border-emerald-500 bg-emerald-950/20" },
  ]);

  // Drip Sequence State
  const [dripSteps, setDripSteps] = useState([
    { id: "drip-1", day: "Day 1 (Immediate)", title: "Welcome & Catalog Brochure", message: "Hi {{1}}, thank you for contacting MVAD Events! Here is our brochure.", active: true },
    { id: "drip-2", day: "Day 3 (+48 Hours)", title: "Portfolio Video Showcase", message: "Hey {{1}}, check out our recent luxury wedding stage highlights in Mumbai!", active: true },
    { id: "drip-3", day: "Day 7 (+1 Week)", title: "Limited Festive Offer", message: "Hi {{1}}, this week you get a flat 20% discount on stage decor! Use code FESTIVE20.", active: true },
  ]);

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleToggleReply = (id) => {
    setBotReplies((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: !r.status } : r))
    );
  };

  const handleDeleteReply = (id) => {
    setBotReplies((prev) => prev.filter((r) => r.id !== id));
    showFeedback("Keyword rule deleted.");
  };

  const handleCreateReply = (e) => {
    e.preventDefault();
    if (!newKeyword.trim() || !newReply.trim()) return;

    const rule = {
      id: `br-${Date.now()}`,
      keyword: newKeyword.toUpperCase(),
      reply: newReply,
      status: true,
    };

    setBotReplies([...botReplies, rule]);
    setReplyModalOpen(false);
    setNewKeyword("");
    setNewReply("");
    showFeedback("New automated keyword reply rule created!");
  };

  const handleAddFlowNode = () => {
    const newNode = {
      id: `node-${Date.now()}`,
      type: "action",
      title: "New Automated Action",
      detail: "Send Follow-up Reminder / Update CRM Tag",
      color: "border-cyan-500 bg-cyan-950/20",
    };
    setFlowNodes([...flowNodes, newNode]);
    showFeedback("Action node added to flow builder canvas.");
  };

  const handleDeleteFlowNode = (id) => {
    setFlowNodes(flowNodes.filter((n) => n.id !== id));
  };

  const handleAddDripStep = () => {
    const nextDay = dripSteps.length * 3 + 1;
    const newStep = {
      id: `drip-${Date.now()}`,
      day: `Day ${nextDay} (+${nextDay * 24} Hours)`,
      title: "Follow-up Engagement Nudge",
      message: "Hi {{1}}, can we assist you with customizing your event date or decor theme?",
      active: true,
    };
    setDripSteps([...dripSteps, newStep]);
    showFeedback("New drip sequence step added.");
  };

  const handleDeleteDripStep = (id) => {
    setDripSteps(dripSteps.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <Bot size={22} className="text-violet-400" />
            Automations, Bot Flows &amp; Drips
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Configure instant keyword auto-replies, multi-step visual bot flow builders, and automated drip campaigns.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {feedback && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 mr-2 animate-in fade-in">
              <CheckCircle size={14} /> {feedback}
            </span>
          )}

          {activeTab === "replies" && (
            <button
              type="button"
              onClick={() => setReplyModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Plus size={13} />
              Add Keyword Rule
            </button>
          )}

          {activeTab === "flows" && (
            <button
              type="button"
              onClick={handleAddFlowNode}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Plus size={13} />
              Add Flow Node
            </button>
          )}

          {activeTab === "drips" && (
            <button
              type="button"
              onClick={handleAddDripStep}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Plus size={13} />
              Add Drip Step
            </button>
          )}
        </div>
      </div>

      {/* ── Sub-Navigation Tabs ──────────────────────────────── */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("replies")}
          className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === "replies" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          <Bot size={13} />
          Bot Keyword Replies ({botReplies.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("flows")}
          className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === "flows" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          <GitBranch size={13} />
          Visual Flow Builder Canvas
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("drips")}
          className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            activeTab === "drips" ? "bg-emerald-600 text-white" : "text-slate-400 hover:text-white"
          }`}
        >
          <Send size={13} />
          Multi-Step Drip Campaigns ({dripSteps.length})
        </button>
      </div>

      {/* ── TAB 1: BOT KEYWORD REPLIES ───────────────────────── */}
      {activeTab === "replies" && (
        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-emerald-600/80 text-white uppercase text-[10px] font-semibold border-b border-slate-800">
                <th className="p-3.5">Trigger Keywords</th>
                <th className="p-3.5">Automated WhatsApp Response</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
              {botReplies.map((r) => (
                <tr key={r.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-3.5">
                    <span className="font-mono text-violet-400 font-bold bg-violet-600/10 px-2 py-0.5 rounded border border-violet-500/20">
                      {r.keyword}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-200 max-w-lg leading-relaxed">{r.reply}</td>
                  <td className="p-3.5">
                    <button
                      type="button"
                      onClick={() => handleToggleReply(r.id)}
                      className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                        r.status
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-slate-800 text-slate-500 border border-slate-700"
                      }`}
                    >
                      {r.status ? "Active (ON)" : "Disabled"}
                    </button>
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteReply(r.id)}
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

      {/* ── TAB 2: VISUAL FLOW BUILDER CANVAS ────────────────── */}
      {activeTab === "flows" && (
        <div className="bg-[#0c0f18] border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <GitBranch size={16} className="text-violet-400" />
                Active Bot Flow: &ldquo;Inbound Lead Qualification &amp; Routing&rdquo;
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Visual node-based logic engine executing sequential decisions for incoming chats.
              </p>
            </div>

            <button
              type="button"
              onClick={() => showFeedback("Flow configuration saved and active.")}
              className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
            >
              Save Flow
            </button>
          </div>

          {/* Vertical Node Connector Visualizer */}
          <div className="flex flex-col items-center space-y-4 max-w-xl mx-auto py-4">
            {flowNodes.map((node, idx) => (
              <React.Fragment key={node.id}>
                <div
                  className={`w-full p-4 rounded-lg border ${node.color} shadow-lg space-y-1 relative group transition-all`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-violet-400 tracking-wider">
                      Step {idx + 1}: {node.title}
                    </span>
                    {flowNodes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleDeleteFlowNode(node.id)}
                        className="text-slate-500 hover:text-red-400 p-0.5"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-200">{node.detail}</p>
                </div>

                {idx < flowNodes.length - 1 && (
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-violet-500/60" />
                    <ArrowDown size={14} className="text-violet-400 -mt-1" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: MULTI-STEP DRIP CAMPAIGNS ─────────────────── */}
      {activeTab === "drips" && (
        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-white">Event Nurturing Drip Sequence</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-day automated follow-up funnels triggered after contact creation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => showFeedback("Drip sequence saved.")}
              className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
            >
              Save Sequence
            </button>
          </div>

          <div className="space-y-3">
            {dripSteps.map((step, idx) => (
              <div
                key={step.id}
                className="p-4 bg-[#0c0f18] border border-slate-800 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-violet-600/20 text-violet-300 border border-violet-500/30 text-[10px] font-bold">
                      {step.day}
                    </span>
                    <h4 className="text-xs font-bold text-white">{step.title}</h4>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">{step.message}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setDripSteps(
                        dripSteps.map((s) => (s.id === step.id ? { ...s, active: !s.active } : s))
                      )
                    }
                    className={`px-2.5 py-1 rounded text-[10px] font-semibold ${
                      step.active
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-800 text-slate-500 border border-slate-700"
                    }`}
                  >
                    {step.active ? "Step Active" : "Paused"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteDripStep(step.id)}
                    className="p-1 text-slate-400 hover:text-red-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── CREATE KEYWORD REPLY MODAL ───────────────────────── */}
      {replyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-md shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold">Add Automated Keyword Reply</h3>
              <button type="button" onClick={() => setReplyModalOpen(false)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleCreateReply} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Trigger Keywords (comma separated) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. TIMINGS, OPEN, HOURS"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white font-mono uppercase outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Automated WhatsApp Reply Text *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Our offices are open Mon-Fri from 09:00 AM to 07:00 PM."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2 text-white outline-none focus:border-violet-500/60 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setReplyModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold"
                >
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
