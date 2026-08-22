import React, { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Download,
  Filter,
  Search,
  LayoutGrid,
  List,
  Cable,
  TrendingUp,
  PieChart as PieIcon,
  CheckCircle,
  Clock,
  ArrowRight,
  MoreVertical,
  X,
  Phone,
  Mail,
  Building,
  DollarSign,
  Tag,
  Facebook,
  Instagram,
  ShoppingBag,
  PhoneCall,
  Building2,
  Globe,
  FileSpreadsheet,
  Code,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { VENDOR_LEADS_SEED, VENDOR_LEAD_CONNECTORS, VENDOR_TEAM_MEMBERS } from "../../data/vendorData";

const PIPELINE_STAGES = [
  "New",
  "Contacted",
  "Interested",
  "Follow-up",
  "Qualified",
  "Converted",
  "Lost",
];

const CONNECTOR_ICONS = {
  Facebook,
  Instagram,
  ShoppingBag,
  PhoneCall,
  Building2,
  Globe,
  FileSpreadsheet,
  Code,
};

const TREND_DATA = [
  { day: "08/09", leads: 4 },
  { day: "08/10", leads: 7 },
  { day: "08/11", leads: 5 },
  { day: "08/12", leads: 9 },
  { day: "08/13", leads: 12 },
  { day: "08/14", leads: 8 },
  { day: "08/15", leads: 14 },
  { day: "08/16", leads: 10 },
  { day: "08/17", leads: 16 },
  { day: "08/18", leads: 18 },
  { day: "08/19", leads: 15 },
  { day: "08/20", leads: 22 },
  { day: "08/21", leads: 19 },
  { day: "08/22", leads: 25 },
];

const SOURCE_DATA = [
  { name: "Website Forms", value: 35, color: "#8b5cf6" },
  { name: "Meta Lead Ads", value: 28, color: "#3b82f6" },
  { name: "IndiaMART", value: 20, color: "#10b981" },
  { name: "Justdial", value: 12, color: "#f59e0b" },
  { name: "Direct WhatsApp", value: 5, color: "#ec4899" },
];

export default function VendorLeadsCRMPage() {
  const [viewTab, setViewTab] = useState("pipeline"); // "pipeline" | "table" | "connectors"
  const [leads, setLeads] = useState(VENDOR_LEADS_SEED);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSource, setFilterSource] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterAgent, setFilterAgent] = useState("all");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    source: "Website Forms",
    status: "New",
    assignedTo: "Suresh Menon",
    budget: "₹1,00,000",
    notes: "",
  });

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 2500);
  };

  // 4 KPI Metrics
  const totalLeads = leads.length;
  const todaysLeads = leads.filter((l) => l.date === "2026-08-22").length;
  const interestedLeads = leads.filter((l) => l.status === "Interested").length;
  const convertedLeads = leads.filter((l) => l.status === "Converted").length;

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      if (filterSource !== "all" && l.source !== filterSource) return false;
      if (filterStatus !== "all" && l.status !== filterStatus) return false;
      if (filterAgent !== "all" && l.assignedTo !== filterAgent) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const full = `${l.name} ${l.company} ${l.phone} ${l.email}`.toLowerCase();
        if (!full.includes(q)) return false;
      }
      return true;
    });
  }, [leads, filterSource, filterStatus, filterAgent, searchQuery]);

  const handleStageChange = (leadId, nextStage) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: nextStage } : l))
    );
    showFeedback(`Lead moved to ${nextStage}`);
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    if (!newLeadForm.name.trim() || !newLeadForm.phone.trim()) return;

    const lead = {
      ...newLeadForm,
      id: `ld-${Date.now()}`,
      date: new Date().toISOString().substring(0, 10),
    };

    setLeads([lead, ...leads]);
    setAddModalOpen(false);
    showFeedback("New sales lead added to pipeline!");
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <Users size={22} className="text-violet-400" />
            Vendor Leads CRM &amp; Pipeline
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Capture, qualify, and convert multi-channel customer inquiries through visual Kanban stages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {feedback && (
            <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1 mr-2 animate-in fade-in">
              <CheckCircle size={14} /> {feedback}
            </span>
          )}

          <button
            type="button"
            onClick={() => setAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus size={13} />
            Add Lead
          </button>
        </div>
      </div>

      {/* ── 4 KPI Metric Cards ───────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-4 space-y-1">
          <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Total Leads</span>
          <p className="text-2xl font-bold font-mono text-white">{totalLeads}</p>
        </div>

        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-4 space-y-1">
          <span className="text-blue-400 text-[10px] uppercase font-bold tracking-wider">Today&apos;s Leads</span>
          <p className="text-2xl font-bold font-mono text-blue-400">+{todaysLeads}</p>
        </div>

        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-4 space-y-1">
          <span className="text-violet-400 text-[10px] uppercase font-bold tracking-wider">Interested</span>
          <p className="text-2xl font-bold font-mono text-violet-400">{interestedLeads}</p>
        </div>

        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-4 space-y-1">
          <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-wider">Converted</span>
          <p className="text-2xl font-bold font-mono text-emerald-400">{convertedLeads}</p>
        </div>
      </div>

      {/* ── Analytics Graphs: 14-Day Trend & Lead Sources ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 14-Day Lead Trend Area Chart (7 cols) */}
        <div className="lg:col-span-7 bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <TrendingUp size={15} className="text-violet-400" />
              14-Day Daily Inbound Lead Trend
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Last 14 Days</span>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="leadTrendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} width={25} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0c0f18",
                    borderColor: "#334155",
                    fontSize: "11px",
                    borderRadius: "6px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="leads"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#leadTrendGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Sources Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-semibold text-slate-200 flex items-center gap-2">
              <PieIcon size={15} className="text-violet-400" />
              Lead Generation Sources
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Active Ingestion</span>
          </div>

          <div className="space-y-2 text-xs">
            {SOURCE_DATA.map((src) => (
              <div key={src.name} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: src.color }} />
                    {src.name}
                  </span>
                  <span className="text-white font-mono font-bold">{src.value}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${src.value}%`, backgroundColor: src.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tabs: Pipeline (Kanban) / Table / Connectors ──────── */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewTab("pipeline")}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewTab === "pipeline" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutGrid size={13} />
            Visual Kanban Pipeline
          </button>
          <button
            type="button"
            onClick={() => setViewTab("table")}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewTab === "table" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <List size={13} />
            Leads Directory Table
          </button>
          <button
            type="button"
            onClick={() => setViewTab("connectors")}
            className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewTab === "connectors" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            <Cable size={13} />
            Connectors &amp; Integrations
          </button>
        </div>

        <button
          type="button"
          onClick={() => showFeedback("Leads exported as CSV.")}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
        >
          <Download size={12} />
          Export CSV
        </button>
      </div>

      {/* ── TAB 1: KANBAN PIPELINE (7 STAGES) ────────────────── */}
      {viewTab === "pipeline" && (
        <div className="overflow-x-auto pb-4">
          <div className="flex items-start gap-3 min-w-[1300px]">
            {PIPELINE_STAGES.map((stage) => {
              const stageLeads = leads.filter((l) => l.status === stage);
              return (
                <div
                  key={stage}
                  className="w-48 shrink-0 bg-[#0e1017] border border-slate-800/80 rounded-lg p-3 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-bold text-slate-200">{stage}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                      {stageLeads.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 min-h-[300px]">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-[#151722] border border-slate-800 hover:border-violet-500/50 rounded p-3 space-y-2 shadow-sm transition-all text-xs"
                      >
                        <div>
                          <p className="font-bold text-white text-xs">{lead.name}</p>
                          <p className="text-slate-500 text-[10px]">{lead.company}</p>
                        </div>

                        <div className="text-[10px] text-slate-400 space-y-0.5">
                          <p className="font-mono text-violet-300">{lead.phone}</p>
                          <p className="text-emerald-400 font-semibold">{lead.budget}</p>
                          <span className="inline-block px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 text-[9px]">
                            {lead.source}
                          </span>
                        </div>

                        {/* Move Stage Selector */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                          <span className="text-[9px] text-slate-500">{lead.assignedTo}</span>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStageChange(lead.id, e.target.value)}
                            className="bg-[#0c0f18] border border-slate-700 text-[9px] text-violet-300 rounded px-1 py-0.5 outline-none"
                          >
                            {PIPELINE_STAGES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 2: LEADS DIRECTORY TABLE ─────────────────────── */}
      {viewTab === "table" && (
        <div className="bg-[#12131b] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-emerald-600/80 text-white uppercase text-[10px] font-semibold border-b border-slate-800">
                <th className="p-3.5">Lead Name</th>
                <th className="p-3.5">Company</th>
                <th className="p-3.5">Mobile</th>
                <th className="p-3.5">Source</th>
                <th className="p-3.5">Stage / Status</th>
                <th className="p-3.5">Budget</th>
                <th className="p-3.5">Assigned Agent</th>
                <th className="p-3.5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-3.5 font-bold text-white">{lead.name}</td>
                  <td className="p-3.5">{lead.company}</td>
                  <td className="p-3.5 font-mono text-violet-300">{lead.phone}</td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[9px]">
                      {lead.source}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                      {lead.status}
                    </span>
                  </td>
                  <td className="p-3.5 font-mono text-emerald-400 font-semibold">{lead.budget}</td>
                  <td className="p-3.5 text-slate-300">{lead.assignedTo}</td>
                  <td className="p-3.5 font-mono text-slate-500 text-[10px]">{lead.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── TAB 3: CONNECTORS & INTEGRATIONS ─────────────────── */}
      {viewTab === "connectors" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {VENDOR_LEAD_CONNECTORS.map((conn) => {
            const Icon = CONNECTOR_ICONS[conn.icon] || Globe;
            return (
              <div
                key={conn.id}
                className="bg-[#12131b] border border-slate-800/80 rounded-lg p-5 space-y-3 shadow-sm hover:border-slate-700 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded bg-slate-800/90 border border-slate-700/60 flex items-center justify-center text-violet-400">
                    <Icon size={18} />
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                      conn.connected
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-slate-800 text-slate-500 border border-slate-700"
                    }`}
                  >
                    {conn.connected ? "Active Sync" : "Disconnected"}
                  </span>
                </div>

                <div>
                  <h4 className="text-white text-xs font-bold">{conn.name}</h4>
                  <p className="text-slate-500 text-[10px]">{conn.category}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Synced Leads:</span>
                  <span className="font-mono text-white font-bold">{conn.leadsSynced}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── ADD LEAD MODAL ───────────────────────────────────── */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold">Add New Sales Lead</h3>
              <button type="button" onClick={() => setAddModalOpen(false)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Company / Org</label>
                  <input
                    type="text"
                    value={newLeadForm.company}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, company: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Mobile (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white font-mono outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Estimated Budget</label>
                  <input
                    type="text"
                    value={newLeadForm.budget}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
