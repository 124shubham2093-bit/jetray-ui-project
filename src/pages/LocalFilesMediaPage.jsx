import React, { useState } from "react";
import {
  FolderOpen,
  Search,
  Upload,
  Image,
  Video,
  FileText,
  Music,
} from "lucide-react";

const VENDORS = [
  "All Vendors",
  "Vendor 1",
  "Vendor 2",
  "Vendor 3",
];

const MEDIA_TYPES = [
  "All Media",
  "Images",
  "Videos",
  "Documents",
  "Audio",
];

const MEDIA = [
  {
    id: 1,
    name: "Campaign Banner",
    type: "Images",
    vendor: "Vendor 1",
    size: "2.4 MB",
    uploaded: "18 Aug 2026",
  },
  {
    id: 2,
    name: "Product Demo",
    type: "Videos",
    vendor: "Vendor 2",
    size: "18.7 MB",
    uploaded: "17 Aug 2026",
  },
  {
    id: 3,
    name: "Vendor Agreement",
    type: "Documents",
    vendor: "Vendor 1",
    size: "1.2 MB",
    uploaded: "16 Aug 2026",
  },
];

const TYPE_ICONS = {
  Images: Image,
  Videos: Video,
  Documents: FileText,
  Audio: Music,
};

export default function LocalFilesMediaPage() {
  const [vendor, setVendor] = useState("All Vendors");
  const [mediaType, setMediaType] = useState("All Media");
  const [search, setSearch] = useState("");

  const filteredMedia = MEDIA.filter((media) => {
    const matchesVendor =
      vendor === "All Vendors" || media.vendor === vendor;

    const matchesType =
      mediaType === "All Media" || media.type === mediaType;

    const matchesSearch =
      media.name.toLowerCase().includes(search.toLowerCase());

    return matchesVendor && matchesType && matchesSearch;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <FolderOpen
            size={18}
            className="text-violet-400"
          />

          <h2 className="text-white text-xl font-bold tracking-tight">
            Local Files & Media
          </h2>
        </div>

        <p className="text-slate-400 text-xs mt-1">
          Manage files and media uploaded by vendors.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-[#12121a] border border-slate-800/70 rounded-sm p-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Vendor */}
          <div>
            <label className="block text-slate-300 text-[10px] font-medium mb-1.5">
              Select Vendor
            </label>

            <select
              value={vendor}
              onChange={(event) =>
                setVendor(event.target.value)
              }
              className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
            >
              {VENDORS.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Media Type */}
          <div>
            <label className="block text-slate-300 text-[10px] font-medium mb-1.5">
              Select Media Type
            </label>

            <select
              value={mediaType}
              onChange={(event) =>
                setMediaType(event.target.value)
              }
              className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
            >
              {MEDIA_TYPES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div>
            <label className="block text-slate-300 text-[10px] font-medium mb-1.5">
              Search
            </label>

            <div className="relative">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search files..."
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md pl-8 pr-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Media Header */}
      <div className="flex items-center justify-between mt-6 mb-3">
        <div>
          <h3 className="text-slate-200 text-sm font-semibold">
            Media Library
          </h3>

          <p className="text-slate-500 text-[10px] mt-1">
            {filteredMedia.length} item
            {filteredMedia.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
        >
          <Upload size={12} />
          Upload Media
        </button>
      </div>

      {/* Media List */}
      <div className="bg-[#15141b] border border-slate-800/70 rounded-sm overflow-hidden">
        {filteredMedia.length === 0 ? (
          <div className="py-12 text-center">
            <FolderOpen
              size={24}
              className="mx-auto text-slate-600"
            />

            <p className="text-slate-400 text-xs mt-2">
              No media found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-800/70">
            {filteredMedia.map((media) => {
              const Icon =
                TYPE_ICONS[media.type] || FileText;

              return (
                <div
                  key={media.id}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      size={16}
                      className="text-violet-400 shrink-0"
                    />

                    <div className="min-w-0">
                      <p className="text-slate-200 text-[10px] font-medium truncate">
                        {media.name}
                      </p>

                      <p className="text-slate-500 text-[9px] mt-0.5">
                        {media.vendor} • {media.size} •{" "}
                        {media.uploaded}
                      </p>
                    </div>
                  </div>

                  <span className="text-[8px] px-2 py-1 rounded-full bg-slate-800 text-slate-400 shrink-0">
                    {media.type}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}