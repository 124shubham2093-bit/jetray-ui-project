import React from "react";
import { Search, Filter, X, RefreshCw } from "lucide-react";
import { LEAD_STATUSES, LEAD_SOURCES } from "../../data/leads";

export default function LeadFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sourceFilter,
  setSourceFilter,
  pageSize,
  setPageSize,
  onResetFilters,
  totalFiltered,
  totalAll,
}) {
  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    statusFilter !== "ALL" ||
    sourceFilter !== "ALL";

  return (
    <div className="bg-[#131a2e] border border-slate-800/60 rounded-2xl p-4">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <div className="flex items-center gap-2.5 bg-[#0b0f1e] border border-slate-800 rounded-lg px-3.5 py-2 focus-within:border-violet-500/80 transition-colors">
            <Search size={14} className="text-slate-500 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads by name, email, phone, or company..."
              className="bg-transparent text-xs text-slate-200 placeholder:text-slate-500 outline-none w-full"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-slate-500 hover:text-slate-300 transition-colors"
                title="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-[#0b0f1e] border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-slate-200 outline-none font-medium cursor-pointer"
            >
              <option value="ALL" className="bg-[#131a2e] text-slate-200">
                All Status
              </option>
              {LEAD_STATUSES.map((status) => (
                <option
                  key={status}
                  value={status}
                  className="bg-[#131a2e] text-slate-200"
                >
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Source Filter */}
          <div className="flex items-center gap-1.5 bg-[#0b0f1e] border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Source:</span>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-transparent text-slate-200 outline-none font-medium cursor-pointer"
            >
              <option value="ALL" className="bg-[#131a2e] text-slate-200">
                All Sources
              </option>
              {LEAD_SOURCES.map((source) => (
                <option
                  key={source}
                  value={source}
                  className="bg-[#131a2e] text-slate-200"
                >
                  {source}
                </option>
              ))}
            </select>
          </div>

          {/* Page Size */}
          <div className="flex items-center gap-1.5 bg-[#0b0f1e] border border-slate-800 rounded-lg px-3 py-1.5 text-xs">
            <span className="text-slate-500 text-[11px] font-medium">Show:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-transparent text-slate-200 outline-none font-medium cursor-pointer"
            >
              <option value={5} className="bg-[#131a2e] text-slate-200">
                5
              </option>
              <option value={10} className="bg-[#131a2e] text-slate-200">
                10
              </option>
              <option value={20} className="bg-[#131a2e] text-slate-200">
                20
              </option>
            </select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              title="Reset all filters"
            >
              <RefreshCw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-2.5 pt-2.5 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Found <strong className="text-emerald-400">{totalFiltered}</strong> matching lead{totalFiltered !== 1 ? "s" : ""} out of {totalAll}
          </span>
          <div className="flex items-center gap-1.5">
            {statusFilter !== "ALL" && (
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                Status: {statusFilter}
              </span>
            )}
            {sourceFilter !== "ALL" && (
              <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                Source: {sourceFilter}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
