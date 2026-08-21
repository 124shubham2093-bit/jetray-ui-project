import React, { useState } from "react";
import {
  CheckSquare,
  CheckCircle,
  RotateCcw,
  Save,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  Clock,
  AlertCircle,
  Users,
  ArrowLeft,
  X,
  Bell,
} from "lucide-react";

export default function TaskManagerTodoModulePage({ onBack }) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Follow up with Apex Retailers regarding bulk campaign approval",
      description: "Check WhatsApp message template approval status with Meta.",
      assignee: "Suresh Menon",
      priority: "High",
      dueDate: "2026-08-22",
      status: "In Progress", // "Todo" | "In Progress" | "Completed"
    },
    {
      id: 2,
      title: "Verify webhook endpoint SSL certificate for Sanwariya Enterprises",
      description: "Ensure TLS 1.3 compatibility for real-time delivery notifications.",
      assignee: "Priya Rao",
      priority: "Urgent",
      dueDate: "2026-08-21",
      status: "Todo",
    },
    {
      id: 3,
      title: "Review monthly credit usage report for August billing cycle",
      description: "Audit high-volume broadcasts and wallet deductions.",
      assignee: "Admin",
      priority: "Medium",
      dueDate: "2026-08-25",
      status: "Completed",
    },
    {
      id: 4,
      title: "Resolve failed contact import from Google Sheets tab",
      description: "Sanitize country code format in column B.",
      assignee: "Kiran Dev",
      priority: "Low",
      dueDate: "2026-08-20",
      status: "Overdue",
    },
  ]);

  // Notifications & Policies
  const [enableTeamAssign, setEnableTeamAssign] = useState(true);
  const [notifyOnAssign, setNotifyOnAssign] = useState(true);
  const [dueDateReminders, setDueDateReminders] = useState(true);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [overdueAlerts, setOverdueAlerts] = useState(true);

  // Filters & Search
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Modal for Create/Edit Task
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assignee: "Admin",
    priority: "Medium",
    dueDate: new Date().toISOString().substring(0, 10),
    status: "Todo",
  });

  const [saved, setSaved] = useState(false);

  // Stats
  const totalTasks = tasks.length;
  const pendingTasks = tasks.filter((t) => t.status === "Todo").length;
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress").length;
  const completedTasks = tasks.filter((t) => t.status === "Completed").length;
  const overdueTasks = tasks.filter((t) => t.status === "Overdue").length;

  const handleOpenCreate = () => {
    setEditingTask(null);
    setTaskForm({
      title: "",
      description: "",
      assignee: "Admin",
      priority: "Medium",
      dueDate: new Date().toISOString().substring(0, 10),
      status: "Todo",
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setTaskForm(JSON.parse(JSON.stringify(task)));
    setModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!taskForm.title.trim()) return;

    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...taskForm, id: t.id } : t))
      );
    } else {
      const newId = Math.max(...tasks.map((t) => t.id), 0) + 1;
      setTasks((prev) => [...prev, { ...taskForm, id: newId }]);
    }
    setModalOpen(false);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  };

  const handleSaveGlobal = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleResetGlobal = () => {
    setEnableTeamAssign(true);
    setNotifyOnAssign(true);
    setDueDateReminders(true);
    setDailyDigest(true);
    setOverdueAlerts(true);
    setSaved(false);
  };

  // Filtered tasks
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.assignee.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || t.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getPriorityBadge = (p) => {
    if (p === "Urgent") return "bg-red-500/10 text-red-400 border-red-500/20";
    if (p === "High") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    if (p === "Medium") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    return "bg-slate-800 text-slate-400 border-slate-700";
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
              <CheckSquare size={20} className="text-violet-400" />
              Task Manager &amp; Todo Configuration
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Collaborative internal task boards, automated lead follow-up reminders, and team assignment policies.
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
            Create Task
          </button>
        </div>
      </div>

      {/* ── Dashboard Statistics ────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
          <span className="text-slate-500 text-[9px] uppercase font-semibold tracking-wider">Total Tasks</span>
          <p className="text-white text-xl font-bold font-mono mt-1">{totalTasks}</p>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
          <span className="text-blue-400 text-[9px] uppercase font-semibold tracking-wider">Pending</span>
          <p className="text-blue-400 text-xl font-bold font-mono mt-1">{pendingTasks}</p>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
          <span className="text-amber-400 text-[9px] uppercase font-semibold tracking-wider">In Progress</span>
          <p className="text-amber-400 text-xl font-bold font-mono mt-1">{inProgressTasks}</p>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
          <span className="text-emerald-400 text-[9px] uppercase font-semibold tracking-wider">Completed</span>
          <p className="text-emerald-400 text-xl font-bold font-mono mt-1">{completedTasks}</p>
        </div>

        <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-3.5">
          <span className="text-red-400 text-[9px] uppercase font-semibold tracking-wider">Overdue</span>
          <p className="text-red-400 text-xl font-bold font-mono mt-1">{overdueTasks}</p>
        </div>
      </div>

      {/* ── Tasks Table & Search ─────────────────────────────── */}
      <div className="bg-[#15141b] border border-slate-800/80 rounded-sm overflow-hidden shadow-sm">
        <div className="p-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#12121a]">
          <div className="relative w-full sm:w-64">
            <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search tasks, descriptions, assignees..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-7 pr-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-[10px] text-white outline-none focus:border-violet-500/60"
            >
              <option value="all">All Statuses</option>
              <option value="Todo">Todo</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-[10px] text-white outline-none focus:border-violet-500/60"
            >
              <option value="all">All Priorities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-[#12121a] text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3">Task Details</th>
                <th className="px-4 py-3">Assignee</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-[10px]">
              {filteredTasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-slate-200 font-semibold">{t.title}</p>
                    <p className="text-slate-500 text-[9px] mt-0.5">{t.description}</p>
                  </td>

                  <td className="px-4 py-3">
                    <span className="text-slate-300 font-medium">{t.assignee}</span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`text-[8px] px-2 py-0.5 rounded-full font-semibold border ${getPriorityBadge(
                        t.priority
                      )}`}
                    >
                      {t.priority}
                    </span>
                  </td>

                  <td className="px-4 py-3 font-mono text-slate-400 text-[9px]">
                    {t.dueDate}
                  </td>

                  <td className="px-4 py-3">
                    <select
                      value={t.status}
                      onChange={(e) => handleStatusChange(t.id, e.target.value)}
                      className="bg-[#0c0f18] border border-slate-700 rounded px-2 py-0.5 text-[9px] text-white font-medium outline-none"
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(t)}
                        className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                        title="Edit Task"
                      >
                        <Edit2 size={11} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteTask(t.id)}
                        className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                        title="Delete Task"
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

      {/* ── Team Assignment & Notification Settings ──────────── */}
      <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-slate-200 text-xs font-semibold">Team Assignment &amp; Notification Rules</h3>
          <button
            type="button"
            onClick={handleSaveGlobal}
            className="inline-flex items-center gap-1 px-3 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white text-[9px] font-semibold transition-colors"
          >
            <Save size={10} />
            Save Rules
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[10px]">
          <div className="flex items-center justify-between p-3 bg-[#0c0f18] border border-slate-800 rounded">
            <div>
              <p className="text-slate-200 font-medium">Assignment Notifications</p>
              <p className="text-slate-500 text-[9px]">Email agent upon assignment.</p>
            </div>
            <input
              type="checkbox"
              checked={notifyOnAssign}
              onChange={(e) => setNotifyOnAssign(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0c0f18] border border-slate-800 rounded">
            <div>
              <p className="text-slate-200 font-medium">Due Date Reminders</p>
              <p className="text-slate-500 text-[9px]">Alert 24h before deadline.</p>
            </div>
            <input
              type="checkbox"
              checked={dueDateReminders}
              onChange={(e) => setDueDateReminders(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0c0f18] border border-slate-800 rounded">
            <div>
              <p className="text-slate-200 font-medium">Daily Digest Email</p>
              <p className="text-slate-500 text-[9px]">Morning task summary.</p>
            </div>
            <input
              type="checkbox"
              checked={dailyDigest}
              onChange={(e) => setDailyDigest(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#0c0f18] border border-slate-800 rounded">
            <div>
              <p className="text-slate-200 font-medium">High-Priority Overdue Alerts</p>
              <p className="text-slate-500 text-[9px]">Instant escalation to Admin.</p>
            </div>
            <input
              type="checkbox"
              checked={overdueAlerts}
              onChange={(e) => setOverdueAlerts(e.target.checked)}
              className="accent-violet-600 rounded"
            />
          </div>
        </div>
      </div>

      {/* ── CREATE / EDIT TASK MODAL ────────────────────────── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15141b] border border-slate-800 rounded-lg w-full max-w-lg shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-slate-200 text-xs font-semibold">
                {editingTask ? "Edit Task" : "Create New Task"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-3.5 text-[10px]">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  value={taskForm.title}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g. Schedule onboarding demo with client"
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description / Notes</label>
                <textarea
                  rows={2}
                  value={taskForm.description}
                  onChange={(e) => setTaskForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Task details and customer context..."
                  className="w-full bg-[#0c0f18] border border-slate-800 rounded p-2 text-[10px] text-white outline-none focus:border-violet-500/60 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Assignee</label>
                  <select
                    value={taskForm.assignee}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, assignee: e.target.value }))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="Admin">Admin (Main)</option>
                    <option value="Suresh Menon">Suresh Menon</option>
                    <option value="Priya Rao">Priya Rao</option>
                    <option value="Kiran Dev">Kiran Dev</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, priority: e.target.value }))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Status</label>
                  <select
                    value={taskForm.status}
                    onChange={(e) => setTaskForm((prev) => ({ ...prev, status: e.target.value }))}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
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
                  <Save size={11} /> {editingTask ? "Update Task" : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
