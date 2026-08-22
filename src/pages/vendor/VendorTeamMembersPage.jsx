import React, { useState } from "react";
import {
  UserCheck,
  Plus,
  Shield,
  Trash2,
  Edit2,
  CheckCircle,
  X,
  Mail,
  User,
  Check,
  Lock,
} from "lucide-react";
import { VENDOR_TEAM_MEMBERS } from "../../data/vendorData";

export default function VendorTeamMembersPage() {
  const [members, setMembers] = useState(VENDOR_TEAM_MEMBERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Sales Executive",
    permissions: {
      chats: true,
      contacts: true,
      export: false,
      campaigns: false,
      botFlows: false,
      leads: true,
      team: false,
    },
  });

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(""), 2500);
  };

  const handleTogglePerm = (permKey) => {
    setForm((prev) => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permKey]: !prev.permissions[permKey],
      },
    }));
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    const newMember = {
      id: `tm-${Date.now()}`,
      name: form.name,
      email: form.email,
      role: form.role,
      status: "Active",
      workload: 0,
      permissions: { ...form.permissions },
    };

    setMembers([...members, newMember]);
    setModalOpen(false);
    setForm({
      name: "",
      email: "",
      role: "Sales Executive",
      permissions: {
        chats: true,
        contacts: true,
        export: false,
        campaigns: false,
        botFlows: false,
        leads: true,
        team: false,
      },
    });
    showFeedback("New team agent invited with custom permissions!");
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter((m) => m.id !== id));
    showFeedback("Agent removed from team.");
  };

  return (
    <div className="space-y-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <UserCheck size={22} className="text-violet-400" />
            Team Members &amp; Granular Permissions
          </h1>
          <p className="text-slate-400 text-xs mt-0.5">
            Add team operators, assign live chat queues, and control access permissions across CRM modules.
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
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus size={13} />
            Add New User
          </button>
        </div>
      </div>

      {/* ── Team Directory Table ─────────────────────────────── */}
      <div className="bg-[#12131b] border border-slate-800/80 rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-emerald-600/80 text-white uppercase text-[10px] font-semibold border-b border-slate-800">
              <th className="p-3.5">Agent Details</th>
              <th className="p-3.5">Role</th>
              <th className="p-3.5">Assigned Workload</th>
              <th className="p-3.5">Granular Permissions</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300 text-[11px]">
            {members.map((m) => (
              <tr key={m.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-300 font-bold text-xs">
                      {m.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-white text-xs">{m.name}</p>
                      <p className="text-slate-500 font-mono text-[10px]">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3.5 font-semibold text-slate-200">{m.role}</td>
                <td className="p-3.5">
                  <span className="font-mono text-emerald-400 font-bold">{m.workload}</span>
                  <span className="text-slate-500 text-[10px] ml-1">open chats</span>
                </td>
                <td className="p-3.5">
                  <div className="flex items-center gap-1 flex-wrap text-[9px]">
                    {Object.entries(m.permissions)
                      .filter(([_, allowed]) => allowed)
                      .map(([key]) => (
                        <span
                          key={key}
                          className="px-1.5 py-0.2 rounded bg-violet-600/10 text-violet-300 border border-violet-500/20 capitalize"
                        >
                          ✓ {key}
                        </span>
                      ))}
                  </div>
                </td>
                <td className="p-3.5">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {m.status}
                  </span>
                </td>
                <td className="p-3.5 text-right">
                  <button
                    type="button"
                    onClick={() => handleDeleteMember(m.id)}
                    className="p-1 text-slate-400 hover:text-red-400"
                    title="Remove User"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── ADD USER MODAL WITH GRANULAR PERMISSIONS ─────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12131b] border border-slate-800 rounded-lg w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-white text-sm font-semibold">Add New Team Member &amp; Assign Permissions</h3>
              <button type="button" onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-white">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-white outline-none focus:border-violet-500/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Assigned Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-white outline-none"
                >
                  <option value="Sales Executive">Sales Executive</option>
                  <option value="Customer Support Executive">Customer Support Executive</option>
                  <option value="Marketing Specialist">Marketing Specialist</option>
                  <option value="Operations Lead">Operations Lead</option>
                </select>
              </div>

              {/* Granular Permissions Section */}
              <div className="pt-2 border-t border-slate-800 space-y-2">
                <label className="block text-slate-300 font-semibold flex items-center gap-1.5">
                  <Shield size={13} className="text-violet-400" />
                  Granular Access Permissions
                </label>

                <div className="grid grid-cols-2 gap-2 bg-[#0c0f18] p-3 rounded border border-slate-800">
                  {[
                    { key: "chats", label: "Live WhatsApp Chat Access" },
                    { key: "contacts", label: "View Contacts Directory" },
                    { key: "export", label: "Export Contacts & Data CSV" },
                    { key: "campaigns", label: "Create & Launch Campaigns" },
                    { key: "botFlows", label: "Build & Edit Bot Flows" },
                    { key: "leads", label: "Leads CRM & Pipeline Access" },
                    { key: "team", label: "Manage Team Members" },
                  ].map((perm) => (
                    <label
                      key={perm.key}
                      className="flex items-center gap-2 text-slate-300 text-[11px] cursor-pointer hover:text-white"
                    >
                      <input
                        type="checkbox"
                        checked={form.permissions[perm.key]}
                        onChange={() => handleTogglePerm(perm.key)}
                        className="accent-violet-600 rounded"
                      />
                      <span>{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-3 py-1.5 rounded border border-slate-700 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold"
                >
                  Invite Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
