import React, { useMemo, useState } from "react";

const MOCK_STRIPE_SUBSCRIPTIONS = [
  // UI reference data only.
  // Real Stripe data will be connected later.
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function RecurringStripeSubscriptionsPage() {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSubscriptions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return MOCK_STRIPE_SUBSCRIPTIONS;
    }

    return MOCK_STRIPE_SUBSCRIPTIONS.filter((subscription) =>
      [
        subscription.vendor,
        subscription.plan,
        subscription.stripeId,
        subscription.stripeStatus,
        subscription.stripePricePlan,
        subscription.createdAt,
        subscription.endsAt,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  const totalEntries = filteredSubscriptions.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalEntries / pageSize)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    totalEntries === 0
      ? 0
      : (safeCurrentPage - 1) * pageSize;

  const endIndex = Math.min(
    startIndex + pageSize,
    totalEntries
  );

  const visibleSubscriptions =
    filteredSubscriptions.slice(
      startIndex,
      endIndex
    );

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Stripe Subscriptions
        </h2>

        <p className="text-slate-400 text-xs mt-1">
          Manage recurring subscriptions connected through Stripe.
        </p>
      </div>

      {/* Table Container */}
      <div className="bg-[#12121a] border border-slate-800/70 rounded-sm mt-6 overflow-hidden">
        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-b border-slate-800/70">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[10px]">
              SHOW
            </span>

            <select
              value={pageSize}
              onChange={handlePageSizeChange}
              className="h-7 bg-[#0c0f18] border border-slate-700 rounded-sm px-2 text-[10px] text-slate-300 outline-none focus:border-violet-500/60"
            >
              {PAGE_SIZE_OPTIONS.map((option) => (
                <option
                  key={option}
                  value={option}
                >
                  {option}
                </option>
              ))}
            </select>

            <span className="text-slate-400 text-[10px]">
              ENTRIES
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[10px]">
              SEARCH:
            </span>

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder=""
              className="w-40 h-7 bg-[#0c0f18] border border-slate-700 rounded-sm px-2.5 text-[10px] text-white outline-none focus:border-violet-500/60"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="bg-[#1c9989]">
                {[
                  "VENDOR",
                  "PLAN",
                  "STRIPE ID",
                  "STRIPE STATUS",
                  "STRIPE PRICE PLAN",
                  "CREATED AT",
                  "ENDS AT",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="text-left px-4 py-2.5 text-[9px] font-semibold text-white tracking-wide whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {visibleSubscriptions.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-10 text-center text-slate-500 text-[10px]"
                  >
                    No data available in table
                  </td>
                </tr>
              ) : (
                visibleSubscriptions.map(
                  (subscription) => (
                    <tr
                      key={subscription.id}
                      className="border-t border-slate-800/70 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="px-4 py-3 text-[10px] text-slate-300">
                        {subscription.vendor}
                      </td>

                      <td className="px-4 py-3 text-[10px] text-slate-300">
                        {subscription.plan}
                      </td>

                      <td className="px-4 py-3 text-[10px] text-slate-400">
                        {subscription.stripeId}
                      </td>

                      <td className="px-4 py-3">
                        <span className="text-[8px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                          {subscription.stripeStatus}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-[10px] text-slate-400">
                        {subscription.stripePricePlan}
                      </td>

                      <td className="px-4 py-3 text-[10px] text-slate-400 whitespace-nowrap">
                        {subscription.createdAt}
                      </td>

                      <td className="px-4 py-3 text-[10px] text-slate-400 whitespace-nowrap">
                        {subscription.endsAt}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3 border-t border-slate-800/70">
          <p className="text-slate-500 text-[10px]">
            Showing{" "}
            {totalEntries === 0 ? 0 : startIndex + 1}{" "}
            to {endIndex} of {totalEntries} entries
          </p>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={safeCurrentPage === 1}
              onClick={() =>
                setCurrentPage((page) =>
                  Math.max(1, page - 1)
                )
              }
              className="px-2.5 py-1.5 rounded-sm border border-slate-700 text-slate-500 text-[9px] disabled:opacity-40 hover:text-white hover:border-slate-600 transition-colors"
            >
              Previous
            </button>

            <button
              type="button"
              className="w-7 h-7 rounded-sm bg-violet-600 text-white text-[9px] font-semibold"
            >
              {safeCurrentPage}
            </button>

            <button
              type="button"
              disabled={
                safeCurrentPage >= totalPages
              }
              onClick={() =>
                setCurrentPage((page) =>
                  Math.min(totalPages, page + 1)
                )
              }
              className="px-2.5 py-1.5 rounded-sm border border-slate-700 text-slate-500 text-[9px] disabled:opacity-40 hover:text-white hover:border-slate-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}