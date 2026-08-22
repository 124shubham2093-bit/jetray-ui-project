import React, { useState, useMemo } from "react";
import {
  Users,
  Plus,
  Download,
  Upload,
  Search,
  Filter,
  Trash2,
  Edit2,
  Eye,
  MessageCircle,
  FileText,
  UserCheck,
  CheckCircle,
  X,
  Sparkles,
  Layers,
  ChevronDown,
} from "lucide-react";
import { VENDOR_CONTACTS_SEED, VENDOR_TEMPLATES_SEED, VENDOR_TEAM_MEMBERS } from "../../data/vendorData";

export default function VendorContactsPage({ onNavigate }) {
  const [contacts, setContacts] = useState(VENDOR_CONTACTS_SEED);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Advanced Filters
  const [filterUser, setFilterUser] = useState("all");
  const [filterGroup, setFilterGroup] = useState("all");
  const [filterLabel, setFilterLabel] = useState("all");
  const [filterOptIn, setFilterOptIn] = useState("all");
  const [filterBot, setFilterBot] = useState("all");
  const [filterWindow, setFilterWindow] = useState("all");

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailsModalContact, setDetailsModalContact] = useState(null);
  const [editModalContact, setEditModalContact] = useState(null);
  const [sendTemplateContact, setSendTemplateContact] = useState(null);
  const [assignContact, setAssignContact] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState("");
  const [feedback, setFeedback] = useState("");

  // Create form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    language: "English",
    country: "India",
    email: "",
    optedIn: true,
    groups: ["VIP"],
    labels: ["Sales"],
    assignedUser: "Suresh Menon",
    replyBot: true,
    serviceWindow: "Open",
  });

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 2500);
  };

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      if (filterUser !== "all" && c.assignedUser !== filterUser) return false;
      if (filterGroup !== "all" && !c.groups.includes(filterGroup)) return false;
      if (filterLabel !== "all" && !c.labels.includes(filterLabel)) return false;
      if (filterOptIn !== "all") {
        const isOptIn = filterOptIn === "opted_in";
        if (c.optedIn !== isOptIn) return false;
      }
      if (filterBot !== "all") {
        const isBot = filterBot === "on";
        if (c.replyBot !== isBot) return false;
      }
      if (filterWindow !== "all" && c.serviceWindow !== filterWindow) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const full = `${c.firstName} ${c.lastName} ${c.mobile} ${c.email}`.toLowerCase();
        if (!full.includes(q)) return false;
      }

      return true;
    });
  }, [contacts, filterUser, filterGroup, filterLabel, filterOptIn, filterBot, filterWindow, searchQuery]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredContacts.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteContact = (id) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
    showFeedback("Contact deleted successfully.");
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all contacts?")) {
      setContacts([]);
      setSelectedIds([]);
      showFeedback("All contacts deleted.");
    }
  };

  const handleApplyBulkAction = () => {
    if (selectedIds.length === 0 || !bulkAction) return;

    if (bulkAction === "delete") {
      setContacts((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
      setSelectedIds([]);
      showFeedback(`${selectedIds.length} contacts deleted.`);
    } else if (bulkAction === "opt_in") {
      setContacts((prev) =>
        prev.map((c) => (selectedIds.includes(c.id) ? { ...c, optedIn: true } : c))
      );
      showFeedback(`Updated opt-in status for ${selectedIds.length} contacts.`);
    }
    setBulkAction("");
  };

  const handleCreateContact = (e) => {
    e.preventDefault();
    if (!form.firstName.trim() || !form.mobile.trim()) return;

    const newContact = {
      ...form,
      id: `c-${Date.now()}`,
      createdDate: new Date().toISOString().substring(0, 10),
    };

    setContacts((prev) => [newContact, ...prev]);
    setCreateModalOpen(false);
    showFeedback("New contact created successfully!");
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setContacts((prev) =>
      prev.map((c) => (c.id === editModalContact.id ? editModalContact : c))
    );
    setEditModalContact(null);
    showFeedback("Contact updated.");
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <Users size={22} className="text-violet-400" />
            Contact Directory Management
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Manage your audience lists, WhatsApp opt-in consents, group tags, and agent routing.
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
            onClick={() => setUploadModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Upload size={13} />
            Upload Contacts (Excel)
          </button>

          <button
            type="button"
            onClick={() => showFeedback("Contacts exported as CSV (Simulated).")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Download size={13} />
            Download Contacts
          </button>

          <button
            type="button"
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus size={13} />
            Create New Contact
          </button>
        </div>
      </div>

      {/* ── Advanced Filters & Search Strip ───────────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg p-4 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by first name, last name, phone number, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-8 pr-3 text-xs text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60"
            />
          </div>

          {/* Bulk Controls */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-violet-950/40 border border-violet-500/40 px-3 py-1 rounded">
              <span className="text-xs text-violet-300 font-semibold">{selectedIds.length} Selected</span>
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="h-7 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[11px] text-white outline-none"
              >
                <option value="">Bulk Actions...</option>
                <option value="opt_in">Mark Opted-In</option>
                <option value="delete">Delete Selected</option>
              </select>
              <button
                type="button"
                onClick={handleApplyBulkAction}
                className="h-7 px-2.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
              >
                Apply
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={handleDeleteAll}
            className="text-xs text-red-400 hover:text-red-300 hover:underline shrink-0"
          >
            Delete All Contacts
          </button>
        </div>

        {/* 6 Advanced Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1 border-t border-slate-800 text-[10px]">
          <div>
            <label className="block text-slate-500 font-medium mb-0.5">Assigned Agent</label>
            <select
              value={filterUser}
              onChange={(e) => setFilterUser(e.target.value)}
              className="w-full h-7 bg-[#0c0f18] border border-slate-800 rounded px-1.5 text-[10px] text-white outline-none"
            >
              <option value="all">All Agents</option>
              {VENDOR_TEAM_MEMBERS.map((m) => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
              <option value="Unassigned">Unassigned</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-0.5">Audience Group</label>
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="w-full h-7 bg-[#0c0f18] border border-slate-800 rounded px-1.5 text-[10px] text-white outline-none"
            >
              <option value="all">All Groups</option>
              <option value="VIP">VIP</option>
              <option value="Corporate Clients">Corporate Clients</option>
              <option value="Wedding Leads">Wedding Leads</option>
              <option value="Exhibitions">Exhibitions</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-0.5">Labels</label>
            <select
              value={filterLabel}
              onChange={(e) => setFilterLabel(e.target.value)}
              className="w-full h-7 bg-[#0c0f18] border border-slate-800 rounded px-1.5 text-[10px] text-white outline-none"
            >
              <option value="all">All Labels</option>
              <option value="Sales">Sales</option>
              <option value="Hot Lead">Hot Lead</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Support">Support</option>
              <option value="Customer">Customer</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-0.5">Opt-in Consent</label>
            <select
              value={filterOptIn}
              onChange={(e) => setFilterOptIn(e.target.value)}
              className="w-full h-7 bg-[#0c0f18] border border-slate-800 rounded px-1.5 text-[10px] text-white outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="opted_in">Opted-In (Active)</option>
              <option value="opted_out">Opted-Out</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-0.5">Reply Bot</label>
            <select
              value={filterBot}
              onChange={(e) => setFilterBot(e.target.value)}
              className="w-full h-7 bg-[#0c0f18] border border-slate-800 rounded px-1.5 text-[10px] text-white outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="on">Bot ON</option>
              <option value="off">Bot OFF</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-0.5">Service Window</label>
            <select
              value={filterWindow}
              onChange={(e) => setFilterWindow(e.target.value)}
              className="w-full h-7 bg-[#0c0f18] border border-slate-800 rounded px-1.5 text-[10px] text-white outline-none"
            >
              <option value="all">All Windows</option>
              <option value="Open">Open (24h Window)</option>
              <option value="Closed">Closed (Template Only)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── 9-Column Contact Management Table ─────────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-emerald-600/80 text-white uppercase text-[10px] font-semibold border-b border-slate-800">
                <th className="p-3 w-8">
                  <input
                    type="checkbox"
                    checked={filteredContacts.length > 0 && selectedIds.length === filteredContacts.length}
                    onChange={handleSelectAll}
                    className="accent-violet-600 rounded"
                  />
                </th>
                <th className="p-3">First Name</th>
                <th className="p-3">Last Name</th>
                <th className="p-3">Mobile Number</th>
                <th className="p-3">Language</th>
                <th className="p-3">Created Date</th>
                <th className="p-3">Country</th>
                <th className="p-3">Email Address</th>
                <th className="p-3">Opt-in Status</th>
                <th className="p-3">Groups</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
              {filteredContacts.length === 0 ? (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-slate-500">
                    No contacts match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredContacts.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(c.id)}
                        onChange={() => handleToggleSelect(c.id)}
                        className="accent-violet-600 rounded"
                      />
                    </td>
                    <td className="p-3 font-semibold text-white">{c.firstName}</td>
                    <td className="p-3">{c.lastName}</td>
                    <td className="p-3 font-mono text-violet-300">{c.mobile}</td>
                    <td className="p-3">{c.language}</td>
                    <td className="p-3 font-mono text-slate-500 text-[10px]">{c.createdDate}</td>
                    <td className="p-3">{c.country}</td>
                    <td className="p-3 text-slate-400 font-mono text-[10px]">{c.email}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${
                          c.optedIn
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {c.optedIn ? "Opted-In" : "Opted-Out"}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1 flex-wrap">
                        {c.groups.map((g) => (
                          <span
                            key={g}
                            className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700 text-[9px]"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      {/* Exactly 6 Row Actions */}
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => setDetailsModalContact(c)}
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                          title="1. Details"
                        >
                          <Eye size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditModalContact({ ...c })}
                          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                          title="2. Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setSendTemplateContact(c)}
                          className="p-1 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded transition-colors"
                          title="3. Send Template Message"
                        >
                          <FileText size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate && onNavigate("inbox")}
                          className="p-1 text-slate-400 hover:text-violet-400 hover:bg-slate-800 rounded transition-colors"
                          title="4. Direct Chat"
                        >
                          <MessageCircle size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setAssignContact(c)}
                          className="p-1 text-slate-400 hover:text-cyan-400 hover:bg-slate-800 rounded transition-colors"
                          title="5. Assign Team Member"
                        >
                          <UserCheck size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteContact(c.id)}
                          className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                          title="6. Delete Contact"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── CREATE CONTACT MODAL ──────────────────────────────── */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold">Create New Contact</h3>
              <button type="button" onClick={() => setCreateModalOpen(false)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>
            <form onSubmit={handleCreateContact} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Mobile Number (with Country Code) *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white font-mono outline-none focus:border-violet-500/60"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DETAILS MODAL ────────────────────────────────────── */}
      {detailsModalContact && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-md shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold">Contact Profile Details</h3>
              <button type="button" onClick={() => setDetailsModalContact(null)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Name:</span>
                <span className="text-white font-bold">{detailsModalContact.firstName} {detailsModalContact.lastName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Mobile:</span>
                <span className="text-violet-300 font-mono">{detailsModalContact.mobile}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Email:</span>
                <span className="text-slate-200">{detailsModalContact.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Assigned Agent:</span>
                <span className="text-emerald-400 font-semibold">{detailsModalContact.assignedUser}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-500">Opt-in Consent:</span>
                <span className={detailsModalContact.optedIn ? "text-emerald-400" : "text-red-400"}>
                  {detailsModalContact.optedIn ? "Active WhatsApp Opt-in" : "Opted-Out"}
                </span>
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setDetailsModalContact(null)}
                className="px-3 py-1.5 rounded bg-slate-800 text-slate-200 text-xs hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── UPLOAD EXCEL / CSV MODAL ─────────────────────────── */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-md shadow-2xl p-5 space-y-4 text-center">
            <h3 className="text-white text-sm font-semibold">Upload Contact Spreadsheet (Excel / CSV)</h3>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 space-y-2 hover:border-violet-500/50 cursor-pointer">
              <Upload size={24} className="mx-auto text-violet-400" />
              <p className="text-xs text-slate-300">Drag &amp; drop .xlsx or .csv file here, or click to browse</p>
              <p className="text-[10px] text-slate-500">Supported columns: First Name, Last Name, Phone, Email, Tags</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setUploadModalOpen(false);
                  showFeedback("Imported 48 contacts from Excel spreadsheet.");
                }}
                className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold"
              >
                Import Contacts
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── EDIT CONTACT MODAL ───────────────────────────────── */}
      {editModalContact && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold">Edit Contact Profile</h3>
              <button type="button" onClick={() => setEditModalContact(null)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={editModalContact.firstName}
                    onChange={(e) => setEditModalContact({ ...editModalContact, firstName: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editModalContact.lastName}
                    onChange={(e) => setEditModalContact({ ...editModalContact, lastName: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    value={editModalContact.mobile}
                    onChange={(e) => setEditModalContact({ ...editModalContact, mobile: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white font-mono outline-none focus:border-violet-500/60"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={editModalContact.email}
                    onChange={(e) => setEditModalContact({ ...editModalContact, email: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Opt-in Consent</label>
                  <select
                    value={editModalContact.optedIn ? "true" : "false"}
                    onChange={(e) => setEditModalContact({ ...editModalContact, optedIn: e.target.value === "true" })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-white outline-none"
                  >
                    <option value="true">Opted-In (Active)</option>
                    <option value="false">Opted-Out</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Assigned Agent</label>
                  <select
                    value={editModalContact.assignedUser}
                    onChange={(e) => setEditModalContact({ ...editModalContact, assignedUser: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-white outline-none"
                  >
                    {VENDOR_TEAM_MEMBERS.map((m) => (
                      <option key={m.id} value={m.name}>{m.name}</option>
                    ))}
                    <option value="Unassigned">Unassigned</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditModalContact(null)}
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

      {/* ── SEND TEMPLATE MODAL ──────────────────────────────── */}
      {sendTemplateContact && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold flex items-center gap-2">
                <FileText size={16} className="text-violet-400" />
                Send Template Message to {sendTemplateContact.firstName} ({sendTemplateContact.mobile})
              </h3>
              <button type="button" onClick={() => setSendTemplateContact(null)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-y-auto">
              {VENDOR_TEMPLATES_SEED.map((tpl) => (
                <div
                  key={tpl.id}
                  onClick={() => {
                    setSendTemplateContact(null);
                    showFeedback(`Template '${tpl.name}' dispatched to ${sendTemplateContact.firstName}.`);
                  }}
                  className="p-3 bg-[#0c0f18] border border-slate-800 hover:border-violet-500/50 rounded cursor-pointer transition-colors space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{tpl.name}</span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{tpl.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ASSIGN TEAM MEMBER MODAL ─────────────────────────── */}
      {assignContact && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-sm shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-white text-xs font-semibold">Assign Contact to Team Agent</h3>
              <button type="button" onClick={() => setAssignContact(null)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-slate-400 text-xs">Select Operator / Agent:</label>
              <select
                defaultValue={assignContact.assignedUser}
                onChange={(e) => {
                  const agentName = e.target.value;
                  setContacts((prev) =>
                    prev.map((c) => (c.id === assignContact.id ? { ...c, assignedUser: agentName } : c))
                  );
                  setAssignContact(null);
                  showFeedback(`Assigned to ${agentName}.`);
                }}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-xs text-white outline-none"
              >
                {VENDOR_TEAM_MEMBERS.map((m) => (
                  <option key={m.id} value={m.name}>{m.name} ({m.role})</option>
                ))}
                <option value="Unassigned">Unassigned</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
