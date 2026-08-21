import React, { useState, useMemo } from "react";
import {
  Coins,
  DollarSign,
  Wallet,
  History,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
  HelpCircle,
  Layers,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Mic,
  FileText,
  Smile,
  MapPin,
  UserCheck,
  LayoutTemplate,
  MousePointerClick,
  Info,
  Calculator,
  Save,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import {
  SEED_CREDIT_PACKAGES,
  SEED_CREDIT_USAGE_RATES,
  SEED_MESSAGE_RATES,
  SEED_VENDOR_WALLETS,
  SEED_TRANSACTIONS,
} from "../data/platformModules";
import {
  CreateCreditPackageModal,
  AdjustWalletModal,
  ConfigureMessageRatesModal,
  UsageTypeModal,
  ResetConfirmModal,
} from "../components/modules";

// Icon mapping for usage types
const USAGE_ICONS = {
  MessageSquare,
  Image: ImageIcon,
  Video,
  Mic,
  FileText,
  Smile,
  MapPin,
  UserCheck,
  LayoutTemplate,
  MousePointerClick,
  Layers,
};

export default function CreditSystemPage() {
  const [activeTab, setActiveTab] = useState("packages"); // "packages" | "usage" | "rates" | "wallets" | "transactions"
  const [packages, setPackages] = useState(SEED_CREDIT_PACKAGES);
  const [usageRates, setUsageRates] = useState(SEED_CREDIT_USAGE_RATES);
  const [rates, setRates] = useState(SEED_MESSAGE_RATES);
  const [wallets, setWallets] = useState(SEED_VENDOR_WALLETS);
  const [transactions, setTransactions] = useState(SEED_TRANSACTIONS);

  // Modals
  const [packageModalOpen, setPackageModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [adjustingVendor, setAdjustingVendor] = useState(null);
  const [ratesModalOpen, setRatesModalOpen] = useState(false);
  const [usageModalOpen, setUsageModalOpen] = useState(false);
  const [editingUsage, setEditingUsage] = useState(null);
  const [deletingUsage, setDeletingUsage] = useState(null);

  // Notifications
  const [usageSaved, setUsageSaved] = useState(false);

  // Searches & Filters
  const [walletSearch, setWalletSearch] = useState("");
  const [txnSearch, setTxnSearch] = useState("");
  const [txnTypeFilter, setTxnTypeFilter] = useState("all");

  // Package Actions
  const handleSavePackage = (pkgData) => {
    if (editingPackage) {
      setPackages((prev) =>
        prev.map((p) => (p.id === editingPackage.id ? { ...pkgData, id: p.id } : p))
      );
    } else {
      const newId = Math.max(...packages.map((p) => p.id), 0) + 1;
      setPackages((prev) => [...prev, { ...pkgData, id: newId }]);
    }
    setEditingPackage(null);
  };

  const handleDeletePackage = (id) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleTogglePackageActive = (id) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  // Calculator state
  const [calcUsageId, setCalcUsageId] = useState("text-message");
  const [calcQuantity, setCalcQuantity] = useState(500);
  const [resetUsageModalOpen, setResetUsageModalOpen] = useState(false);

  // Usage Rate Actions
  const handleToggleUsageEnabled = (id) => {
    setUsageSaved(false);
    setUsageRates((prev) =>
      prev.map((u) => (u.id === id ? { ...u, enabled: !u.enabled } : u))
    );
  };

  const handleInlineCreditChange = (id, newCredits) => {
    setUsageSaved(false);
    const val = Number(newCredits);
    if (isNaN(val) || val < 0) return;
    setUsageRates((prev) =>
      prev.map((u) => (u.id === id ? { ...u, credits: val } : u))
    );
  };

  const handleSaveUsageModal = (usagePayload) => {
    setUsageSaved(false);
    if (editingUsage) {
      setUsageRates((prev) =>
        prev.map((u) => (u.id === editingUsage.id ? { ...u, ...usagePayload } : u))
      );
    } else {
      setUsageRates((prev) => [...prev, usagePayload]);
    }
    setEditingUsage(null);
  };

  const handleDeleteUsage = (id) => {
    setUsageSaved(false);
    setUsageRates((prev) => prev.filter((u) => u.id !== id));
    setDeletingUsage(null);
  };

  const handleResetUsageDefaults = () => {
    setUsageRates((prev) => {
      // Restore the 11 built-in rates to their default values while preserving custom rates
      const customOnes = prev.filter((u) => u.type === "custom");
      return [...SEED_CREDIT_USAGE_RATES.map((u) => ({ ...u })), ...customOnes];
    });
    setUsageSaved(false);
    setResetUsageModalOpen(false);
  };

  const handleSaveUsageConfiguration = (e) => {
    e.preventDefault();
    console.log("Credit Usage & Consumption Rates Saved:", usageRates);
    setUsageSaved(true);
  };

  // Wallet Adjustment Action
  const handleSaveWalletAdjustment = ({ vendorId, adjustmentType, amount, reason }) => {
    setWallets((prev) =>
      prev.map((v) => {
        if (v.id === vendorId) {
          const newBalance =
            adjustmentType === "credit"
              ? v.balance + amount
              : Math.max(0, v.balance - amount);
          return {
            ...v,
            balance: newBalance,
            totalPurchased:
              adjustmentType === "credit" ? v.totalPurchased + amount : v.totalPurchased,
          };
        }
        return v;
      })
    );

    // Append to transactions log
    const vendor = wallets.find((v) => v.id === vendorId);
    const newTxn = {
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      vendorName: vendor?.vendorName || vendorId,
      type: "admin_adjustment",
      credits: adjustmentType === "credit" ? amount : -amount,
      amount: "—",
      status: "completed",
      description: reason,
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
    };
    setTransactions((prev) => [newTxn, ...prev]);
  };

  // Message Rates Action
  const handleSaveRates = (updatedRates) => {
    setRates(updatedRates);
  };

  // Dynamic Example Calculations
  const textRate = usageRates.find((u) => u.id === "text-message")?.credits ?? 1;
  const imageRate = usageRates.find((u) => u.id === "image-message")?.credits ?? 2;
  const videoRate = usageRates.find((u) => u.id === "video-message")?.credits ?? 5;
  const audioRate = usageRates.find((u) => u.id === "audio-message")?.credits ?? 3;
  const docRate = usageRates.find((u) => u.id === "document-message")?.credits ?? 3;
  const templateRate = usageRates.find((u) => u.id === "template-message")?.credits ?? 2;

  const exampleBatchTotal =
    10 * textRate + 5 * imageRate + 2 * videoRate + 1 * audioRate + 2 * docRate + 5 * templateRate;

  // Filtered Wallets
  const filteredWallets = wallets.filter(
    (w) =>
      w.vendorName.toLowerCase().includes(walletSearch.toLowerCase()) ||
      w.vendorEmail.toLowerCase().includes(walletSearch.toLowerCase()) ||
      w.id.toLowerCase().includes(walletSearch.toLowerCase())
  );

  // Filtered Transactions
  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.vendorName.toLowerCase().includes(txnSearch.toLowerCase()) ||
      t.id.toLowerCase().includes(txnSearch.toLowerCase()) ||
      t.description.toLowerCase().includes(txnSearch.toLowerCase());
    const matchesType = txnTypeFilter === "all" || t.type === txnTypeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-white text-xl font-bold tracking-tight flex items-center gap-2">
            <Coins size={20} className="text-violet-400" />
            Credit System Management
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Manage prepaid credit packages, internal usage rates, message category pricing, vendor wallets, and global transaction history.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1 bg-[#15141b] border border-slate-800 p-1 rounded-lg shrink-0 overflow-x-auto">
          {[
            { id: "packages", label: "Credit Packages", icon: Coins },
            { id: "usage", label: "Credit Usage", icon: Layers },
            { id: "rates", label: "WhatsApp Message Rates", icon: DollarSign },
            { id: "wallets", label: "Vendor Wallets", icon: Wallet },
            { id: "transactions", label: "Transaction Logs", icon: History },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-semibold transition-all whitespace-nowrap ${
                  active
                    ? "bg-violet-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                <Icon size={12} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── TAB 1: CREDIT PACKAGES ──────────────────────────── */}
      {activeTab === "packages" && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">Available Credit Packages</h3>
              <p className="text-slate-500 text-[10px]">Pre-configured packages vendors can purchase to top up their balance.</p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEditingPackage(null);
                setPackageModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
            >
              <Plus size={12} />
              Create Package
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white text-xs font-bold">{pkg.name}</span>
                    {pkg.badge && (
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20 font-semibold">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="mt-3">
                    <span className="text-2xl font-extrabold text-white tracking-tight font-mono">
                      {pkg.credits.toLocaleString()}
                    </span>
                    <span className="text-slate-400 text-[10px] ml-1">Credits</span>
                  </div>

                  <p className="text-emerald-400 text-xs font-bold mt-1 font-mono">
                    ₹{pkg.price.toLocaleString()}
                  </p>

                  <p className="text-slate-400 text-[9px] mt-2 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={pkg.active}
                      onClick={() => handleTogglePackageActive(pkg.id)}
                      className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                        pkg.active ? "bg-violet-600" : "bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${
                          pkg.active ? "translate-x-3" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="text-slate-400 text-[9px]">
                      {pkg.active ? "Active" : "Hidden"}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingPackage(pkg);
                        setPackageModalOpen(true);
                      }}
                      className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                      title="Edit Package"
                    >
                      <Edit2 size={11} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeletePackage(pkg.id)}
                      className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                      title="Delete Package"
                    >
                      <Trash2 size={11} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 2: CREDIT USAGE & CONSUMPTION RATES ─────────── */}
      {activeTab === "usage" && (
        <div className="mt-6 space-y-5">
          {/* Top Controls & Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                Credit Usage &amp; Consumption
              </h3>
              <p className="text-slate-500 text-[10px]">
                Configure how many platform credits are consumed when users perform different messaging and media actions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {usageSaved && (
                <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium mr-2">
                  <CheckCircle size={12} />
                  Configuration saved
                </span>
              )}

              <button
                type="button"
                onClick={() => setResetUsageModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white text-[10px] font-semibold transition-colors"
              >
                <RotateCcw size={11} />
                Reset Defaults
              </button>

              <button
                type="button"
                onClick={() => {
                  setEditingUsage(null);
                  setUsageModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-700 hover:bg-slate-600 text-white text-[10px] font-semibold transition-colors"
              >
                <Plus size={11} />
                Add Custom Usage
              </button>

              <button
                type="button"
                onClick={handleSaveUsageConfiguration}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
              >
                <Save size={11} />
                Save Configuration
              </button>
            </div>
          </div>

          {/* Distinction Info Card */}
          <div className="bg-[#15141b] border border-violet-500/30 rounded-sm p-4 flex items-start gap-3">
            <Info size={16} className="text-violet-400 shrink-0 mt-0.5" />
            <div className="text-[10px] text-slate-300 space-y-0.5">
              <p className="font-semibold text-white">Platform Credit Consumption vs. WhatsApp Meta Rates</p>
              <p className="text-slate-400 leading-relaxed">
                These rates represent Jetray's internal credit consumption. They are separate from Meta/WhatsApp conversation pricing. Internal credits govern vendor account balances, broadcasting quotas, and media payload processing.
              </p>
            </div>
          </div>

          {/* Interactive Calculator & Estimator Widget (Feature H) */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <Calculator size={15} className="text-violet-400" />
                <div>
                  <h4 className="text-slate-200 text-xs font-semibold">Interactive Credit Usage Estimator</h4>
                  <p className="text-slate-500 text-[9px]">Simulate credit requirements for campaigns and broadcast volumes in real-time.</p>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex items-center gap-1.5 flex-wrap text-[9px]">
                <span className="text-slate-500 font-medium">Quick Presets:</span>
                <button
                  type="button"
                  onClick={() => {
                    setCalcUsageId("text-message");
                    setCalcQuantity(1000);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  1,000 Text
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCalcUsageId("image-message");
                    setCalcQuantity(500);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  500 Images
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCalcUsageId("video-message");
                    setCalcQuantity(250);
                  }}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  250 Videos
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-5">
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Select Usage Action</label>
                <select
                  value={calcUsageId}
                  onChange={(e) => setCalcUsageId(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-[10px] text-white outline-none focus:border-violet-500/60"
                >
                  {usageRates.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.credits} {u.credits === 1 ? "credit" : "credits"}/msg) {u.enabled ? "" : "(Disabled)"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-slate-300 text-[10px] font-medium mb-1">Quantity / Volume</label>
                <input
                  type="number"
                  min="1"
                  step="10"
                  value={calcQuantity}
                  onChange={(e) => setCalcQuantity(Math.max(0, Number(e.target.value)))}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div className="sm:col-span-4 bg-[#0c0f18] border border-slate-800/80 rounded p-3 flex items-center justify-between">
                <div>
                  <span className="text-slate-500 text-[9px] uppercase font-semibold">Estimated Consumption</span>
                  <p className="text-white text-xs font-medium mt-0.5">
                    {calcQuantity.toLocaleString()} &times; {usageRates.find((u) => u.id === calcUsageId)?.credits ?? 1} credits
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 text-lg font-extrabold font-mono">
                    {((usageRates.find((u) => u.id === calcUsageId)?.credits ?? 1) * calcQuantity).toLocaleString()}
                  </span>
                  <span className="text-slate-500 text-[9px] block">Credits</span>
                </div>
              </div>
            </div>
          </div>

          {/* Usage Rates Table */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#12121a] text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3">Usage Action / Message Type</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3 text-center">Status</th>
                    <th className="px-4 py-3">Credits per Action</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-[10px]">
                  {usageRates.map((item) => {
                    const IconComp = USAGE_ICONS[item.icon] || Layers;
                    return (
                      <tr key={item.id} className="hover:bg-slate-800/20 transition-colors">
                        {/* Usage Name */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="flex items-center justify-center w-6 h-6 rounded bg-slate-800/80 border border-slate-700/60 shrink-0">
                              <IconComp size={12} className="text-violet-400" />
                            </div>
                            <span className="text-slate-200 font-semibold">{item.name}</span>
                          </div>
                        </td>

                        {/* Description */}
                        <td className="px-4 py-3 text-slate-400 text-[9px]">
                          {item.description}
                        </td>

                        {/* Builtin / Custom badge */}
                        <td className="px-4 py-3">
                          {item.type === "builtin" ? (
                            <span className="text-[8px] px-2 py-0.5 rounded-full font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                              Built-in
                            </span>
                          ) : (
                            <span className="text-[8px] px-2 py-0.5 rounded-full font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20">
                              Custom
                            </span>
                          )}
                        </td>

                        {/* Enabled / Disabled Toggle */}
                        <td className="px-4 py-3 text-center">
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              role="switch"
                              aria-checked={item.enabled}
                              onClick={() => handleToggleUsageEnabled(item.id)}
                              className={`relative inline-flex h-4 w-7 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                                item.enabled ? "bg-violet-600" : "bg-slate-700"
                              }`}
                            >
                              <span
                                className={`pointer-events-none inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${
                                  item.enabled ? "translate-x-3" : "translate-x-0"
                                }`}
                              />
                            </button>
                            <span className={`text-[8px] font-semibold ${item.enabled ? "text-emerald-400" : "text-slate-500"}`}>
                              {item.enabled ? "ON" : "OFF"}
                            </span>
                          </div>
                        </td>

                        {/* Credits Input */}
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              value={item.credits}
                              onChange={(e) => handleInlineCreditChange(item.id, e.target.value)}
                              className="w-16 h-7 bg-[#0c0f18] border border-slate-700 rounded px-2 text-[10px] text-white font-mono text-right outline-none focus:border-violet-500/60"
                            />
                            <span className="text-slate-500 text-[9px]">
                              {item.credits === 1 ? "credit" : "credits"}
                            </span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingUsage(item);
                                setUsageModalOpen(true);
                              }}
                              className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                              title="Edit Usage Type"
                            >
                              <Edit2 size={12} />
                            </button>

                            {item.type === "custom" && (
                              <button
                                type="button"
                                onClick={() => setDeletingUsage(item)}
                                className="p-1 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                                title="Delete Custom Usage Type"
                              >
                                <Trash2 size={12} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Dynamic Example Calculation Panel & Rules */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Calculation Panel */}
            <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2.5">
                <Calculator size={14} className="text-violet-400" />
                <h4 className="text-slate-200 text-xs font-semibold">Example Credit Consumption</h4>
              </div>

              <div className="space-y-2 text-[10px]">
                <div className="flex items-center justify-between text-slate-300 bg-[#0c0f18] px-3 py-1.5 rounded">
                  <span>10 Text Messages (10 &times; {textRate})</span>
                  <span className="font-mono font-semibold text-white">{10 * textRate} credits</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 bg-[#0c0f18] px-3 py-1.5 rounded">
                  <span>5 Images (5 &times; {imageRate})</span>
                  <span className="font-mono font-semibold text-white">{5 * imageRate} credits</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 bg-[#0c0f18] px-3 py-1.5 rounded">
                  <span>2 Videos (2 &times; {videoRate})</span>
                  <span className="font-mono font-semibold text-white">{2 * videoRate} credits</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 bg-[#0c0f18] px-3 py-1.5 rounded">
                  <span>1 Audio / Voice Message (1 &times; {audioRate})</span>
                  <span className="font-mono font-semibold text-white">{1 * audioRate} credits</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 bg-[#0c0f18] px-3 py-1.5 rounded">
                  <span>5 Template Messages (5 &times; {templateRate})</span>
                  <span className="font-mono font-semibold text-white">{5 * templateRate} credits</span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-bold text-emerald-400 px-1">
                  <span>Total Sample Campaign Batch:</span>
                  <span className="font-mono text-xs">{exampleBatchTotal} credits</span>
                </div>
              </div>
            </div>

            {/* How Credits Are Deducted */}
            <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4 space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2.5">
                <HelpCircle size={14} className="text-violet-400" />
                <h4 className="text-slate-200 text-xs font-semibold">How Credits Are Deducted</h4>
              </div>

              <ol className="list-decimal list-inside text-[10px] text-slate-400 space-y-2 leading-relaxed">
                <li><span className="text-slate-200">User performs an action:</span> A vendor triggers a broadcast, template message, or media upload.</li>
                <li><span className="text-slate-200">System determines usage type:</span> The payload classifier identifies whether the action is text, media, document, or template.</li>
                <li><span className="text-slate-200">System reads configured rate:</span> The active credit rate for that action is looked up from the table above.</li>
                <li><span className="text-slate-200">Wallet balance updated:</span> Required credits are deducted instantly from the vendor's wallet balance.</li>
                <li><span className="text-slate-200">Audit trail created:</span> An immutable transaction record is logged in Global Transaction Logs.</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 3: WHATSAPP MESSAGE RATES ───────────────────── */}
      {activeTab === "rates" && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">WhatsApp Message Category Rates</h3>
              <p className="text-slate-500 text-[10px]">Configure per-message deduction rates in accordance with Meta WhatsApp Cloud API categories.</p>
            </div>

            <button
              type="button"
              onClick={() => setRatesModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
            >
              <Settings size={12} />
              Configure Message Rates
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rates.map((rate) => (
              <div
                key={rate.category}
                className="bg-[#15141b] border border-slate-800/80 rounded-sm p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-white text-xs font-bold">{rate.category}</span>
                      <span className="text-[8px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {rate.metaTemplateType}
                      </span>
                    </div>
                    <span className="text-emerald-400 text-sm font-bold font-mono">
                      ₹{rate.rate.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-slate-400 text-[10px] mt-2 leading-relaxed">
                    {rate.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[9px] text-slate-500">
                  <span>Unit: {rate.unit}</span>
                  <span className="text-violet-400 font-medium">Auto-deducted on send</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#15141b] border border-slate-800/70 rounded-sm p-4 mt-4">
            <div className="flex items-start gap-3">
              <HelpCircle size={15} className="text-violet-400 shrink-0 mt-0.5" />
              <div className="text-[10px] text-slate-400 space-y-1">
                <p className="text-slate-200 font-semibold">Meta 24-Hour Service Window Rule</p>
                <p>
                  User-initiated service conversations charge once per 24-hour window. Marketing, Utility, and Authentication template messages are deducted per template dispatch based on recipient destination tier.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 4: VENDOR WALLETS ────────────────────────────── */}
      {activeTab === "wallets" && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">Vendor Wallet Balances</h3>
              <p className="text-slate-500 text-[10px]">Real-time credit balance and transaction health for all registered vendors.</p>
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search vendor name, email, or ID..."
                value={walletSearch}
                onChange={(e) => setWalletSearch(e.target.value)}
                className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-7 pr-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60"
              />
            </div>
          </div>

          {/* Wallets Table */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-[#12121a] text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3">Vendor</th>
                    <th className="px-4 py-3">Available Balance</th>
                    <th className="px-4 py-3">Total Purchased</th>
                    <th className="px-4 py-3">Total Consumed</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Last Recharge</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-[10px]">
                  {filteredWallets.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-slate-200 font-semibold">{vendor.vendorName}</p>
                        <p className="text-slate-500 text-[9px]">{vendor.vendorEmail} &bull; {vendor.id}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-emerald-400 font-bold font-mono">
                          {vendor.balance.toLocaleString()}
                        </span>
                        <span className="text-slate-500 text-[9px] ml-1">Credits</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-300">
                        {vendor.totalPurchased.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-400">
                        {vendor.totalConsumed.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        {vendor.status === "active" && (
                          <span className="text-[8px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Active
                          </span>
                        )}
                        {vendor.status === "low_balance" && (
                          <span className="text-[8px] px-2 py-0.5 rounded-full font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Low Balance
                          </span>
                        )}
                        {vendor.status === "depleted" && (
                          <span className="text-[8px] px-2 py-0.5 rounded-full font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
                            Depleted
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-[9px]">
                        {vendor.lastRecharge}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => setAdjustingVendor(vendor)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-violet-600 hover:bg-violet-500 text-white text-[9px] font-semibold transition-colors"
                        >
                          <Wallet size={10} />
                          Adjust Wallet
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 5: GLOBAL TRANSACTION LOGS ───────────────────── */}
      {activeTab === "transactions" && (
        <div className="mt-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">Global Transaction Logs</h3>
              <p className="text-slate-500 text-[10px]">Audit trail of credit purchases, message debits, and administrator adjustments.</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative w-48 sm:w-56">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search transaction..."
                  value={txnSearch}
                  onChange={(e) => setTxnSearch(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded pl-7 pr-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60"
                />
              </div>

              <select
                value={txnTypeFilter}
                onChange={(e) => setTxnTypeFilter(e.target.value)}
                className="h-8 bg-[#0c0f18] border border-slate-800 rounded px-2.5 text-[10px] text-white outline-none focus:border-violet-500/60"
              >
                <option value="all">All Types</option>
                <option value="credit_purchase">Credit Purchases</option>
                <option value="message_debit">Message Debits</option>
                <option value="admin_adjustment">Admin Adjustments</option>
              </select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800/80 bg-[#12121a] text-[9px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-3">Txn ID</th>
                    <th className="px-4 py-3">Vendor</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Credits</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-[10px]">
                  {filteredTransactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 font-mono text-slate-400 text-[9px]">
                        {txn.id}
                      </td>
                      <td className="px-4 py-3 text-slate-200 font-semibold">
                        {txn.vendorName}
                      </td>
                      <td className="px-4 py-3">
                        {txn.type === "credit_purchase" && (
                          <span className="inline-flex items-center gap-1 text-[9px] text-emerald-400 font-medium">
                            <ArrowDownLeft size={11} /> Purchase
                          </span>
                        )}
                        {txn.type === "message_debit" && (
                          <span className="inline-flex items-center gap-1 text-[9px] text-amber-400 font-medium">
                            <ArrowUpRight size={11} /> Consumption
                          </span>
                        )}
                        {txn.type === "admin_adjustment" && (
                          <span className="inline-flex items-center gap-1 text-[9px] text-violet-400 font-medium">
                            <Settings size={11} /> Adjustment
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold">
                        <span className={txn.credits > 0 ? "text-emerald-400" : "text-amber-400"}>
                          {txn.credits > 0 ? `+${txn.credits.toLocaleString()}` : txn.credits.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-300 text-[9px]">
                        {txn.amount}
                      </td>
                      <td className="px-4 py-3 text-slate-400 text-[9px] max-w-xs truncate">
                        {txn.description}
                      </td>
                      <td className="px-4 py-3 text-slate-500 font-mono text-[9px]">
                        {txn.timestamp}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[8px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {txn.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ── MODALS ──────────────────────────────────────────── */}
      {packageModalOpen && (
        <CreateCreditPackageModal
          packageData={editingPackage}
          onClose={() => {
            setPackageModalOpen(false);
            setEditingPackage(null);
          }}
          onSave={handleSavePackage}
        />
      )}

      {usageModalOpen && (
        <UsageTypeModal
          usageData={editingUsage}
          onClose={() => {
            setUsageModalOpen(false);
            setEditingUsage(null);
          }}
          onSave={handleSaveUsageModal}
        />
      )}

      {deletingUsage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#15141b] border border-red-500/40 rounded-lg w-full max-w-sm overflow-hidden shadow-2xl p-5 space-y-3">
            <div className="flex items-center gap-2.5 text-red-400">
              <AlertTriangle size={18} />
              <h4 className="text-slate-200 text-xs font-semibold">Delete Custom Usage Type?</h4>
            </div>
            <p className="text-slate-400 text-[10px]">
              Are you sure you want to delete <span className="text-white font-bold">&ldquo;{deletingUsage.name}&rdquo;</span>? This custom consumption rule will be permanently removed.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingUsage(null)}
                className="px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white text-[10px] font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteUsage(deletingUsage.id)}
                className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-500 text-white text-[10px] font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {adjustingVendor && (
        <AdjustWalletModal
          vendor={adjustingVendor}
          onClose={() => setAdjustingVendor(null)}
          onSave={handleSaveWalletAdjustment}
        />
      )}

      {ratesModalOpen && (
        <ConfigureMessageRatesModal
          rates={rates}
          onClose={() => setRatesModalOpen(false)}
          onSave={handleSaveRates}
        />
      )}

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={resetUsageModalOpen}
        title="Reset All Credit Usage Rates to Defaults?"
        message="This will revert the 11 built-in message type rates to their factory defaults (Text: 1, Image: 2, Video: 5, etc.). Any custom-created usage types will be retained."
        onConfirm={handleResetUsageDefaults}
        onCancel={() => setResetUsageModalOpen(false)}
      />
    </div>
  );
}
