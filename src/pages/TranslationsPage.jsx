import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  Languages,
  Edit3,
  Trash2,
  CheckCircle2,
} from "lucide-react";

const LANGUAGES = [
  {
    id: 1,
    language: "English",
    code: "en",
    translations: 248,
    status: "Active",
    updatedAt: "18 Aug 2026",
  },
  {
    id: 2,
    language: "Hindi",
    code: "hi",
    translations: 241,
    status: "Active",
    updatedAt: "17 Aug 2026",
  },
  {
    id: 3,
    language: "Spanish",
    code: "es",
    translations: 215,
    status: "Active",
    updatedAt: "15 Aug 2026",
  },
  {
    id: 4,
    language: "French",
    code: "fr",
    translations: 198,
    status: "Disabled",
    updatedAt: "12 Aug 2026",
  },
];

export default function TranslationsPage() {
  const [search, setSearch] = useState("");

  const filteredLanguages = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return LANGUAGES;

    return LANGUAGES.filter(
      (item) =>
        item.language.toLowerCase().includes(value) ||
        item.code.toLowerCase().includes(value)
    );
  }, [search]);

  return (
    <div className="p-5 text-slate-200">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">
            Translations
          </h1>

          <p className="text-[10px] text-slate-400 mt-1">
            Manage application languages and translated content.
          </p>
        </div>

        <button
          type="button"
          className="h-8 px-3 rounded-sm bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-medium flex items-center gap-1.5 transition-colors"
        >
          <Plus size={12} />
          Add Language
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-5">
        <div className="bg-[#15141b] border border-slate-800/70 rounded-sm p-4">
          <div className="flex items-center gap-2">
            <Languages size={15} className="text-violet-400" />

            <span className="text-[10px] text-slate-400">
              Total Languages
            </span>
          </div>

          <p className="text-xl font-semibold text-slate-100 mt-2">
            4
          </p>
        </div>

        <div className="bg-[#15141b] border border-slate-800/70 rounded-sm p-4">
          <div className="flex items-center gap-2">
            <CheckCircle2
              size={15}
              className="text-emerald-400"
            />

            <span className="text-[10px] text-slate-400">
              Active Languages
            </span>
          </div>

          <p className="text-xl font-semibold text-slate-100 mt-2">
            3
          </p>
        </div>

        <div className="bg-[#15141b] border border-slate-800/70 rounded-sm p-4">
          <div className="flex items-center gap-2">
            <Languages size={15} className="text-cyan-400" />

            <span className="text-[10px] text-slate-400">
              Total Translations
            </span>
          </div>

          <p className="text-xl font-semibold text-slate-100 mt-2">
            902
          </p>
        </div>
      </div>

      {/* Table card */}
      <div className="bg-[#15141b] border border-slate-800/70 rounded-sm">
        <div className="p-4 border-b border-slate-800/70 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-semibold text-slate-200">
              Languages
            </h2>

            <p className="text-[9px] text-slate-500 mt-1">
              Configure supported application languages.
            </p>
          </div>

          <div className="relative w-56">
            <Search
              size={12}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search languages..."
              className="w-full h-7 pl-7 pr-2 bg-[#0f1118] border border-slate-700/70 rounded-sm outline-none text-[9px] text-slate-300 placeholder:text-slate-600 focus:border-violet-500/50"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-800/70">
                <th className="text-left px-4 py-3 text-[8px] uppercase tracking-wide text-slate-500 font-semibold">
                  Language
                </th>

                <th className="text-left px-4 py-3 text-[8px] uppercase tracking-wide text-slate-500 font-semibold">
                  Code
                </th>

                <th className="text-left px-4 py-3 text-[8px] uppercase tracking-wide text-slate-500 font-semibold">
                  Translations
                </th>

                <th className="text-left px-4 py-3 text-[8px] uppercase tracking-wide text-slate-500 font-semibold">
                  Status
                </th>

                <th className="text-left px-4 py-3 text-[8px] uppercase tracking-wide text-slate-500 font-semibold">
                  Updated
                </th>

                <th className="text-right px-4 py-3 text-[8px] uppercase tracking-wide text-slate-500 font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLanguages.map((item) => {
                const isActive = item.status === "Active";

                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <Languages
                          size={14}
                          className="text-violet-400"
                        />

                        <span className="text-[10px] text-slate-300">
                          {item.language}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-[9px] text-slate-400 uppercase">
                      {item.code}
                    </td>

                    <td className="px-4 py-3 text-[9px] text-slate-400">
                      {item.translations}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex text-[8px] font-semibold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-700/70 text-slate-400"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-[9px] text-slate-400">
                      {item.updatedAt}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          className="h-6 px-2 rounded-sm border border-slate-700 text-slate-400 hover:text-violet-400 hover:border-violet-500/40 flex items-center gap-1 text-[8px]"
                        >
                          <Edit3 size={10} />
                          Edit
                        </button>

                        <button
                          type="button"
                          className="h-6 w-6 rounded-sm border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/40 flex items-center justify-center"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredLanguages.length === 0 && (
            <div className="py-12 text-center">
              <Languages
                size={22}
                className="mx-auto text-slate-600"
              />

              <p className="text-[10px] text-slate-500 mt-2">
                No languages found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}