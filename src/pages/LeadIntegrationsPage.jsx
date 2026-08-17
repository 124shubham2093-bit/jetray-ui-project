import React, { useMemo, useState } from "react";
import { RefreshCw, Search, SlidersHorizontal } from "lucide-react";
import { LEAD_INTEGRATIONS } from "../data/leadIntegrations";
import { LeadConnectorCard } from "../components/leads";

export default function LeadIntegrationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const categories = useMemo(() => {
    return [
      "ALL",
      ...new Set(LEAD_INTEGRATIONS.map((connector) => connector.category)),
    ];
  }, []);

  const filteredConnectors = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return LEAD_INTEGRATIONS.filter((connector) => {
      const matchesSearch =
        !search ||
        connector.name.toLowerCase().includes(search) ||
        connector.description.toLowerCase().includes(search) ||
        connector.category.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "ALL" ||
        connector.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, categoryFilter]);

  const handleConfigure = (connector) => {
    /*
     * Configuration modal will be implemented
     * in the next integration step.
     */
    console.log("Configure connector:", connector.id);
  };

  return (
    <div className="p-6 space-y-5">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-bold tracking-tight">
            Global CRM Source Connectors
          </h2>

          <p className="text-slate-400 text-xs mt-1 max-w-2xl">
            Connect external lead generation platforms and automatically
            bring incoming leads into your CRM.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center gap-2 bg-slate-800/70 hover:bg-slate-700/70 border border-slate-700/60 text-slate-200 text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors"
          onClick={() => window.location.reload()}
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Info Banner */}
      <div className="bg-violet-600/10 border border-violet-500/20 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-600/15 flex items-center justify-center shrink-0">
            <SlidersHorizontal
              size={17}
              className="text-violet-400"
            />
          </div>

          <div>
            <p className="text-white text-xs font-semibold">
              Connect your lead sources
            </p>

            <p className="text-slate-400 text-xs leading-5 mt-1">
              Configure a connector to start receiving leads from
              advertising platforms, B2B directories, forms, webhooks,
              and custom developer endpoints.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#131a2e] border border-slate-800/70 rounded-2xl p-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search connectors..."
              className="w-full bg-[#0d1324] border border-slate-800 rounded-lg pl-9 pr-3 py-2.5 text-xs text-white placeholder:text-slate-600 outline-none focus:border-violet-500/50"
            />
          </div>

          {/* Category */}
          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(event.target.value)
            }
            className="bg-[#0d1324] border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-slate-300 outline-none focus:border-violet-500/50"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === "ALL" ? "All Categories" : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Connector Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-400 text-xs">
          Showing{" "}
          <span className="text-white font-semibold">
            {filteredConnectors.length}
          </span>{" "}
          connector{filteredConnectors.length !== 1 ? "s" : ""}
        </p>

        <p className="text-slate-500 text-[11px]">
          Global CRM integrations
        </p>
      </div>

      {/* Connector Cards */}
      {filteredConnectors.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
          {filteredConnectors.map((connector) => (
            <LeadConnectorCard
              key={connector.id}
              connector={connector}
              onConfigure={handleConfigure}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#131a2e] border border-slate-800/70 rounded-2xl py-16 text-center">
          <p className="text-white text-sm font-semibold">
            No connectors found
          </p>

          <p className="text-slate-500 text-xs mt-1">
            Try changing your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}