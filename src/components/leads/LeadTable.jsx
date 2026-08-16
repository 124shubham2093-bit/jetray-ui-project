import React from "react";
import { Eye, Edit, Trash2, Mail, Phone, Building2, User, ChevronLeft, ChevronRight, Inbox } from "lucide-react";

export default function LeadTable({
  leads = [],
  currentPage,
  setCurrentPage,
  pageSize,
  totalLeads,
  onViewLead,
  onEditLead,
  onDeleteLead,
}) {
  const totalPages = Math.max(1, Math.ceil(totalLeads / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalLeads);

  const getStatusBadge = (status) => {
    switch (status) {
      case "New":
        return "bg-sky-500/15 text-sky-400 border border-sky-500/30";
      case "Contacted":
        return "bg-blue-500/15 text-blue-400 border border-blue-500/30";
      case "Interested":
        return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
      case "Qualified":
        return "bg-purple-500/15 text-purple-400 border border-purple-500/30";
      case "Converted":
        return "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30";
      case "Lost":
        return "bg-rose-500/15 text-rose-400 border border-rose-500/30";
      default:
        return "bg-slate-500/15 text-slate-400 border border-slate-500/30";
    }
  };

  const getSourceBadge = (source) => {
    switch (source) {
      case "Facebook":
        return "bg-indigo-500/15 text-indigo-300";
      case "Google Forms":
        return "bg-amber-500/15 text-amber-300";
      case "Meta":
        return "bg-blue-500/15 text-blue-300";
      case "Website":
        return "bg-teal-500/15 text-teal-300";
      case "Referral":
        return "bg-emerald-500/15 text-emerald-300";
      default:
        return "bg-slate-700/40 text-slate-300";
    }
  };

  const getInitialColor = (name = "") => {
    const colors = [
      "bg-rose-500",
      "bg-amber-500",
      "bg-sky-500",
      "bg-emerald-500",
      "bg-indigo-500",
      "bg-teal-500",
      "bg-purple-500",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="bg-[#131a2e] border border-slate-800/60 rounded-2xl overflow-hidden shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[920px]">
          <thead>
            <tr className="bg-emerald-500 text-[#0b0f1e] text-[10px] font-bold tracking-wide uppercase">
              <th className="px-4 py-3">Lead</th>
              <th className="px-4 py-3">Contact</th>
              <th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assigned To</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400">
                    <div className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center mb-3">
                      <Inbox size={22} className="text-slate-500" />
                    </div>
                    <p className="text-sm font-semibold text-slate-200">No leads found</p>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs">
                      Try adjusting your search query or filters to find what you are looking for.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t border-slate-800/60 text-xs hover:bg-slate-800/30 transition-colors"
                >
                  {/* Lead Name & Company */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${getInitialColor(
                          lead.name
                        )} flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm`}
                      >
                        {lead.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <button
                          onClick={() => onViewLead(lead)}
                          className="text-teal-400 font-semibold text-xs hover:underline text-left block truncate"
                        >
                          {lead.name}
                        </button>
                        {lead.company && (
                          <span className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5 truncate">
                            <Building2 size={11} className="text-slate-500 shrink-0" />
                            {lead.company}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-4 py-3.5">
                    <div className="space-y-1 text-slate-300">
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <Mail size={11} className="text-slate-500 shrink-0" />
                        <span className="truncate max-w-[180px]">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <Phone size={11} className="text-slate-500 shrink-0" />
                        <span>{lead.phone}</span>
                      </div>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full ${getSourceBadge(
                        lead.source
                      )}`}
                    >
                      {lead.source}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      {lead.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Assigned To */}
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs">
                      <User size={13} className="text-slate-400 shrink-0" />
                      <span>{lead.assignedTo || "Unassigned"}</span>
                    </div>
                  </td>

                  {/* Created Date */}
                  <td className="px-4 py-3.5 text-slate-400 text-[11px] whitespace-nowrap">
                    {lead.createdAt}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onViewLead(lead)}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-violet-600 text-slate-300 hover:text-white transition-colors"
                        title="View Details"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => onEditLead(lead)}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-sky-600 text-slate-300 hover:text-white transition-colors"
                        title="Edit Lead"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => onDeleteLead(lead)}
                        className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 text-xs text-slate-400 border-t border-slate-800/60 bg-[#0e1424]">
        <span>
          Showing {totalLeads === 0 ? 0 : startIndex + 1} to {endIndex} of {totalLeads} entries
        </span>

        {totalPages > 1 && (
          <div className="flex items-center gap-1 self-end sm:self-auto">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1.5 rounded-lg border border-slate-800 flex items-center justify-center transition-colors ${
                currentPage === 1
                  ? "bg-[#0b0f1e] text-slate-600 cursor-not-allowed"
                  : "bg-[#0b0f1e] text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              title="Previous Page"
            >
              <ChevronLeft size={14} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`min-w-[28px] h-7 px-2 rounded-lg text-xs font-semibold transition-colors ${
                  currentPage === page
                    ? "bg-violet-600 text-white"
                    : "bg-[#0b0f1e] border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`p-1.5 rounded-lg border border-slate-800 flex items-center justify-center transition-colors ${
                currentPage === totalPages
                  ? "bg-[#0b0f1e] text-slate-600 cursor-not-allowed"
                  : "bg-[#0b0f1e] text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
              title="Next Page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
