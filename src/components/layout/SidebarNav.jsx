import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { NAV } from "../../data/navigation";
import JetrayLogo from "../common/JetrayLogo";

export default function SidebarNav({ active, setActive }) {
  // Track expanded state for expandable navigation sections
  const [expanded, setExpanded] = useState({
    "leads-crm": true,
    leads: true,
  });

  const toggleExpand = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getChildKey = (child) => {
    if (typeof child === "object" && child.key) return child.key;
    if (typeof child === "string") {
      return child.toLowerCase().replace(/[^a-z0-9]/g, "-");
    }
    return String(child);
  };

  const getChildLabel = (child) => {
    if (typeof child === "object" && child.label) return child.label;
    return String(child);
  };

  return (
    <aside className="w-56 bg-[#0a0e1a] border-r border-slate-800/60 flex flex-col shrink-0">
      {/* Brand Header */}
      <div className="h-20 flex items-center justify-center border-b border-slate-800/60">
        <JetrayLogo small />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          const hasChildren = Boolean(item.children && item.children.length > 0);
          const isExpanded = Boolean(expanded[item.key]);

          const isChildActive =
            hasChildren &&
            item.children.some((c) => getChildKey(c) === active);

          const isDirectActive = active === item.key;
          const isActive = isDirectActive || (!hasChildren && isDirectActive);

          return (
            <div key={item.key} className="space-y-0.5">
              <button
                onClick={() => {
                  if (hasChildren) {
                    toggleExpand(item.key);
                    // If no child is currently active, navigate to the first child or default
                    if (!isChildActive) {
                      const firstChild = item.children[0];
                      if (item.key === "leads-crm" || item.key === "leads") {
                        setActive("leads");
                      } else {
                        setActive(getChildKey(firstChild));
                      }
                    }
                  } else {
                    setActive(item.key);
                  }
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  isActive
                    ? "bg-violet-600 text-white"
                    : isChildActive
                    ? "text-white bg-slate-800/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/20"
                }`}
              >
                <Icon size={15} strokeWidth={2} className="shrink-0" />
                <span className="truncate flex-1 text-left">{item.label}</span>
                {item.expandable && (
                  <span className="opacity-60 shrink-0">
                    {hasChildren && isExpanded ? (
                      <ChevronDown size={13} />
                    ) : (
                      <ChevronRight size={13} />
                    )}
                  </span>
                )}
              </button>

              {/* Sub-menu items */}
              {hasChildren && isExpanded && (
                <div className="pl-7 pr-1 py-1 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  {item.children.map((child) => {
                    const childKey = getChildKey(child);
                    const childLabel = getChildLabel(child);
                    const isSubActive = active === childKey;

                    return (
                      <button
                        key={childKey}
                        onClick={() => setActive(childKey)}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors text-left ${
                          isSubActive
                            ? "bg-violet-600/20 text-violet-300 font-semibold"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/30"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isSubActive ? "bg-violet-400" : "bg-slate-600"
                          }`}
                        />
                        <span className="truncate flex-1">{childLabel}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
