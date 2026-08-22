import React, { useState } from "react";
import {
  MessagesSquare,
  Search,
  Filter,
  Send,
  Paperclip,
  Smile,
  FileText,
  User,
  Bot,
  Tag,
  AlertCircle,
  Check,
  CheckCheck,
  Plus,
  X,
  Phone,
  Mail,
  Globe,
  Clock,
  Sparkles,
} from "lucide-react";
import { VENDOR_CONVERSATIONS, VENDOR_TEMPLATES_SEED, VENDOR_TEAM_MEMBERS } from "../../data/vendorData";

export default function VendorInboxPage() {
  const [conversations, setConversations] = useState(VENDOR_CONVERSATIONS);
  const [activeId, setActiveId] = useState(conversations[0]?.id || "conv-1");
  const [tabFilter, setTabFilter] = useState("all"); // "all" | "mine" | "unassigned"
  const [selectedLabel, setSelectedLabel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [composerText, setComposerText] = useState("");
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [newTagText, setNewTagText] = useState("");

  const activeConv = conversations.find((c) => c.id === activeId) || conversations[0];

  // Filtered conversations
  const filteredConversations = conversations.filter((c) => {
    if (tabFilter === "mine" && c.assignedTo !== "Suresh Menon") return false;
    if (tabFilter === "unassigned" && c.assignedTo !== "Unassigned") return false;
    if (selectedLabel !== "all" && !c.labels.includes(selectedLabel)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = c.contactName.toLowerCase().includes(q);
      const matchPhone = c.phone.toLowerCase().includes(q);
      const matchMsg = c.lastMessage.toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchMsg) return false;
    }
    return true;
  });

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!composerText.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: "vendor",
      text: composerText,
      time: "Just now",
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            lastMessage: composerText,
            lastTime: "Just now",
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
    setComposerText("");
  };

  const handleSendTemplate = (tpl) => {
    const newMsg = {
      id: `msg-tpl-${Date.now()}`,
      sender: "vendor",
      text: `[Template: ${tpl.name}] ${tpl.body}`,
      time: "Just now",
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            lastMessage: `[Template] ${tpl.name}`,
            lastTime: "Just now",
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
    setTemplateModalOpen(false);
  };

  const handleAssignMember = (memberName) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === activeConv.id ? { ...c, assignedTo: memberName } : c))
    );
  };

  const handleToggleReplyBot = () => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id ? { ...c, replyBotEnabled: !c.replyBotEnabled } : c
      )
    );
  };

  const handleAddLabel = () => {
    if (!newTagText.trim()) return;
    const tag = newTagText.trim();
    if (!activeConv.labels.includes(tag)) {
      setConversations((prev) =>
        prev.map((c) => (c.id === activeConv.id ? { ...c, labels: [...c.labels, tag] } : c))
      );
    }
    setNewTagText("");
  };

  const handleRemoveLabel = (tag) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id ? { ...c, labels: c.labels.filter((l) => l !== tag) } : c
      )
    );
  };

  return (
    <div className="space-y-4">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <MessagesSquare size={22} className="text-violet-400" />
            WhatsApp Live Inbox
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Real-time unified omnichannel chat workspace with team assignment and 24-hr reply window tracking.
          </p>
        </div>
      </div>

      {/* ── 3-Panel Workspace Container ───────────────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 h-[calc(100vh-210px)] min-h-[600px] shadow-lg">
        {/* ── Panel 1: Left Conversation Directory (3.5 cols) ─── */}
        <div className="lg:col-span-4 border-r border-slate-800 flex flex-col h-full bg-[#0e1017]">
          {/* Tabs: All / Mine / Unassigned */}
          <div className="p-3 border-b border-slate-800 flex items-center gap-1">
            {[
              { id: "all", label: "All Chats" },
              { id: "mine", label: "Mine" },
              { id: "unassigned", label: "Unassigned" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTabFilter(tab.id)}
                className={`flex-1 py-1.5 rounded text-[11px] font-semibold transition-colors ${
                  tabFilter === tab.id
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search & Label Filters */}
          <div className="p-3 space-y-2 border-b border-slate-800">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-7 pr-3 text-[11px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[9px]">
              {["all", "Sales", "Support", "Hot Lead", "Follow-up", "Customer"].map((lbl) => (
                <button
                  key={lbl}
                  type="button"
                  onClick={() => setSelectedLabel(lbl)}
                  className={`px-2 py-0.5 rounded-full whitespace-nowrap transition-colors ${
                    selectedLabel === lbl
                      ? "bg-violet-600/30 text-violet-300 border border-violet-500/50 font-semibold"
                      : "bg-[#0c0f18] text-slate-400 border border-slate-800 hover:text-white"
                  }`}
                >
                  {lbl === "all" ? "All Labels" : `#${lbl}`}
                </button>
              ))}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-xs">No conversations found.</div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = conv.id === activeConv.id;
                return (
                  <div
                    key={conv.id}
                    onClick={() => setActiveId(conv.id)}
                    className={`p-3.5 cursor-pointer transition-colors ${
                      isActive ? "bg-violet-950/30 border-l-2 border-violet-500" : "hover:bg-slate-800/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-xs font-semibold ${isActive ? "text-violet-300" : "text-slate-200"}`}>
                        {conv.contactName}
                      </p>
                      <span className="text-[10px] text-slate-500">{conv.lastTime}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 truncate">{conv.lastMessage}</p>

                    <div className="flex items-center justify-between mt-2 text-[9px]">
                      <div className="flex items-center gap-1 flex-wrap">
                        {conv.labels.map((l) => (
                          <span
                            key={l}
                            className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700"
                          >
                            {l}
                          </span>
                        ))}
                      </div>

                      {conv.unread > 0 ? (
                        <span className="w-4 h-4 rounded-full bg-violet-600 text-white font-bold flex items-center justify-center text-[9px]">
                          {conv.unread}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[9px]">{conv.assignedTo}</span>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ── Panel 2: Center WhatsApp Chat (5.5 cols) ─────────── */}
        <div className="lg:col-span-5 flex flex-col h-full bg-[#0c0f18] border-r border-slate-800">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-slate-800 flex items-center justify-between bg-[#12131b]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-violet-300 font-bold text-xs">
                {activeConv.contactName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-white text-xs font-semibold">{activeConv.contactName}</p>
                <p className="text-emerald-400 text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {activeConv.phone} &bull; Online
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTemplateModalOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 text-[10px] font-semibold border border-violet-500/30 transition-colors"
            >
              <FileText size={11} />
              Send Template
            </button>
          </div>

          {/* 24-hr "No Reply Window" Warning Banner if Closed */}
          {activeConv.serviceWindowClosed && (
            <div className="bg-amber-500/10 border-b border-amber-500/30 p-2.5 flex items-center justify-between gap-2 text-amber-300 text-[11px]">
              <div className="flex items-center gap-1.5">
                <AlertCircle size={14} className="shrink-0 text-amber-400" />
                <span>
                  <strong>24-Hour Service Window Closed:</strong> Only Meta-approved templates can be sent to this contact.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setTemplateModalOpen(true)}
                className="px-2 py-0.5 rounded bg-amber-500/20 hover:bg-amber-500/30 font-semibold text-[10px] text-amber-200"
              >
                Choose Template
              </button>
            </div>
          )}

          {/* Chat Messages Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(ellipse_at_center,#131627_0%,#090b14_70%)]">
            {activeConv.messages.map((m) => {
              const isVendor = m.sender === "vendor";
              return (
                <div key={m.id} className={`flex ${isVendor ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-md p-3 rounded-xl text-xs space-y-1 shadow-md ${
                      isVendor
                        ? "bg-violet-700/80 text-white rounded-br-none border border-violet-500/30"
                        : "bg-[#181a28] text-slate-200 rounded-bl-none border border-slate-800"
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                    <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400 pt-0.5">
                      <span>{m.time}</span>
                      {isVendor && <CheckCheck size={12} className="text-violet-300" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Composer */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-800 bg-[#12131b] flex items-center gap-2">
            <button
              type="button"
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
              title="Attach File"
            >
              <Paperclip size={15} />
            </button>

            <input
              type="text"
              placeholder={activeConv.serviceWindowClosed ? "Window closed — send an approved template..." : "Type your WhatsApp message..."}
              value={composerText}
              disabled={activeConv.serviceWindowClosed}
              onChange={(e) => setComposerText(e.target.value)}
              className="flex-1 h-9 bg-[#0c0f18] border border-slate-800 rounded px-3 text-xs text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={!composerText.trim() || activeConv.serviceWindowClosed}
              className="h-9 px-3.5 rounded bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
            >
              <Send size={13} />
            </button>
          </form>
        </div>

        {/* ── Panel 3: Right Contact Info & Assignment (3 cols) ── */}
        <div className="lg:col-span-3 bg-[#0e1017] p-4 flex flex-col justify-between h-full space-y-4 overflow-y-auto">
          <div className="space-y-4">
            {/* Contact Profile */}
            <div className="text-center pb-3 border-b border-slate-800">
              <div className="w-14 h-14 mx-auto rounded-full bg-violet-600/20 border border-violet-500/40 flex items-center justify-center text-violet-400 text-lg font-bold">
                {activeConv.contactName.substring(0, 2).toUpperCase()}
              </div>
              <h3 className="text-white text-sm font-bold mt-2">{activeConv.contactName}</h3>
              <p className="text-slate-500 text-xs font-mono">{activeConv.phone}</p>
            </div>

            {/* Details List */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5"><Mail size={12} /> Email:</span>
                <span className="text-slate-200 font-mono text-[11px]">{activeConv.email}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5"><Globe size={12} /> Language:</span>
                <span className="text-slate-200">{activeConv.language}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span className="flex items-center gap-1.5"><Clock size={12} /> Service Window:</span>
                <span className={`font-semibold ${activeConv.serviceWindowClosed ? "text-amber-400" : "text-emerald-400"}`}>
                  {activeConv.serviceWindowClosed ? "Closed (Template Only)" : "Open (24h Active)"}
                </span>
              </div>
            </div>

            {/* Assignment Dropdown */}
            <div className="pt-2 border-t border-slate-800 space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-300">Assign Conversation</label>
              <select
                value={activeConv.assignedTo}
                onChange={(e) => handleAssignMember(e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-xs text-white outline-none focus:border-violet-500/60"
              >
                <option value="Unassigned">Unassigned</option>
                {VENDOR_TEAM_MEMBERS.map((m) => (
                  <option key={m.id} value={m.name}>
                    {m.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Reply Bot Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                  <Bot size={13} className="text-violet-400" />
                  Reply Bot
                </p>
                <p className="text-[10px] text-slate-500">Auto keyword responses</p>
              </div>

              <input
                type="checkbox"
                checked={activeConv.replyBotEnabled}
                onChange={handleToggleReplyBot}
                className="accent-violet-600 rounded"
              />
            </div>

            {/* Labels / Tags Manager */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <label className="block text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                <Tag size={12} className="text-violet-400" />
                Labels &amp; Categorization
              </label>

              <div className="flex flex-wrap gap-1.5">
                {activeConv.labels.map((lbl) => (
                  <span
                    key={lbl}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-violet-600/20 text-violet-300 border border-violet-500/30 text-[10px]"
                  >
                    #{lbl}
                    <button
                      type="button"
                      onClick={() => handleRemoveLabel(lbl)}
                      className="text-violet-400 hover:text-white"
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="New label..."
                  value={newTagText}
                  onChange={(e) => setNewTagText(e.target.value)}
                  className="flex-1 h-7 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddLabel}
                  className="h-7 px-2 rounded bg-slate-800 hover:bg-slate-700 text-violet-300 text-[10px] font-semibold"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Template Selection Modal ──────────────────────────── */}
      {templateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                <FileText size={16} className="text-violet-400" />
                Select Approved WhatsApp Template
              </h3>
              <button
                type="button"
                onClick={() => setTemplateModalOpen(false)}
                className="text-slate-500 hover:text-white p-1"
              >
                <X size={15} />
              </button>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {VENDOR_TEMPLATES_SEED.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => handleSendTemplate(tpl)}
                  className="p-3 bg-[#0c0f18] border border-slate-800 hover:border-violet-500/50 rounded cursor-pointer transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{tpl.name}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2">{tpl.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
