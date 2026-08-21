import React, { useState } from "react";
import {
  FileSpreadsheet,
  CheckCircle,
  RotateCcw,
  Save,
  Plus,
  Trash2,
  RefreshCw,
  ArrowLeft,
  Check,
  Eye,
  Download,
} from "lucide-react";

export default function GoogleSheetImportModulePage({ onBack }) {
  // Connection
  const [googleAccount, setGoogleAccount] = useState("admin@atozmarketing.shop");
  const [spreadsheetId, setSpreadsheetId] = useState(
    "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
  );
  const [sheetName, setSheetName] = useState("Customers_2026");
  const [testingConnection, setTestingConnection] = useState(false);
  const [connected, setConnected] = useState(true);

  // Import Settings
  const [autoSync, setAutoSync] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState("hourly"); // "manual" | "15min" | "hourly" | "daily"
  const [newRowsOnly, setNewRowsOnly] = useState(true);
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [updateExisting, setUpdateExisting] = useState(false);

  // Column Mappings
  const [mappings, setMappings] = useState([
    { id: 1, googleCol: "Full Name", jetrayField: "Name" },
    { id: 2, googleCol: "WhatsApp Number", jetrayField: "Phone" },
    { id: 3, googleCol: "Email Address", jetrayField: "Email" },
    { id: 4, googleCol: "Company Name", jetrayField: "Company" },
    { id: 5, googleCol: "Customer Tag", jetrayField: "Tags" },
  ]);

  // Import Simulation
  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  const [saved, setSaved] = useState(false);

  const sampleRows = [
    { name: "Aarav Sharma", phone: "+919876543210", email: "aarav@gmail.com", company: "Apex Tech", tags: "VIP, Lead" },
    { name: "Pooja Patel", phone: "+919812345678", email: "pooja@patel.in", company: "Patel Traders", tags: "Wholesale" },
    { name: "Rahul Verma", phone: "+919711223344", email: "rahul@verma.co", company: "Verma Logistics", tags: "New" },
  ];

  const handleTestConnection = () => {
    setTestingConnection(true);
    setTimeout(() => {
      setTestingConnection(false);
      setConnected(true);
    }, 1000);
  };

  const handleAddMapping = () => {
    setMappings((prev) => [
      ...prev,
      { id: Date.now(), googleCol: `Column_${prev.length + 1}`, jetrayField: "Custom" },
    ]);
  };

  const handleRemoveMapping = (id) => {
    if (mappings.length <= 1) return;
    setMappings((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUpdateMapping = (id, field, val) => {
    setMappings((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: val } : m))
    );
  };

  const handleImportNow = () => {
    setImporting(true);
    setImportSuccess(false);
    setTimeout(() => {
      setImporting(false);
      setImportSuccess(true);
    }, 1500);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  const handleReset = () => {
    setGoogleAccount("admin@atozmarketing.shop");
    setSpreadsheetId("1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms");
    setSheetName("Customers_2026");
    setAutoSync(true);
    setSyncFrequency("hourly");
    setNewRowsOnly(true);
    setSkipDuplicates(true);
    setUpdateExisting(false);
    setSaved(false);
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
              <FileSpreadsheet size={20} className="text-violet-400" />
              Google Sheet Import Configuration
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Synchronize contacts, customer tags, and lead data directly from connected Google Spreadsheets.
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
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 hover:text-white text-[10px] font-semibold transition-colors"
          >
            <RotateCcw size={11} />
            Reset Defaults
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
          >
            <Save size={11} />
            Save Configuration
          </button>
        </div>
      </div>

      {importSuccess && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded p-3 flex items-center gap-2 text-emerald-400 text-[10px] font-medium">
          <CheckCircle size={13} />
          Import completed successfully (Simulated). 142 new contacts synchronized from Google Sheets.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left: Google Sheet Connection & Settings ─────────── */}
        <div className="space-y-5">
          {/* Connection Card */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-slate-200 text-xs font-semibold">Google Sheets Connection</h3>
              {connected && (
                <span className="text-[8px] px-2 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Connected &bull; Active
                </span>
              )}
            </div>

            <div className="space-y-3 text-[10px]">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Google Service Account / Email</label>
                <input
                  type="email"
                  value={googleAccount}
                  onChange={(e) => setGoogleAccount(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Spreadsheet ID</label>
                <input
                  type="text"
                  value={spreadsheetId}
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                  className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white font-mono outline-none focus:border-violet-500/60"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-end">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Sheet / Tab Name</label>
                  <input
                    type="text"
                    value={sheetName}
                    onChange={(e) => setSheetName(e.target.value)}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-3 text-[10px] text-white outline-none focus:border-violet-500/60"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={testingConnection}
                  className="h-8 inline-flex items-center justify-center gap-1.5 px-3 rounded bg-slate-800 hover:bg-slate-700 text-violet-400 hover:text-violet-300 text-[10px] font-semibold transition-colors disabled:opacity-50"
                >
                  <RefreshCw size={11} className={testingConnection ? "animate-spin" : ""} />
                  {testingConnection ? "Testing..." : "Test Connection"}
                </button>
              </div>
            </div>
          </div>

          {/* Import Policies */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <h3 className="text-slate-200 text-xs font-semibold border-b border-slate-800 pb-3">
              Synchronization Schedule &amp; Ingestion Rules
            </h3>

            <div className="space-y-3.5 text-[10px]">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-200 font-medium">Automatic Periodic Sync</p>
                    <p className="text-slate-500 text-[9px]">Run background sync.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoSync}
                    onChange={(e) => setAutoSync(e.target.checked)}
                    className="accent-violet-600 rounded"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Sync Frequency</label>
                  <select
                    value={syncFrequency}
                    onChange={(e) => setSyncFrequency(e.target.value)}
                    className="w-full h-8 bg-[#0c0f18] border border-slate-800 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="manual">Manual trigger only</option>
                    <option value="15min">Every 15 minutes</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily digest</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Import newly added rows only</span>
                  <input
                    type="checkbox"
                    checked={newRowsOnly}
                    onChange={(e) => setNewRowsOnly(e.target.checked)}
                    className="accent-violet-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Skip duplicate phone numbers</span>
                  <input
                    type="checkbox"
                    checked={skipDuplicates}
                    onChange={(e) => setSkipDuplicates(e.target.checked)}
                    className="accent-violet-600 rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Update existing customer fields</span>
                  <input
                    type="checkbox"
                    checked={updateExisting}
                    onChange={(e) => setUpdateExisting(e.target.checked)}
                    className="accent-violet-600 rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right: Column Mapping & Sample Preview ──────────── */}
        <div className="space-y-5">
          {/* Column Mapping Card */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-slate-200 text-xs font-semibold">Column Field Mapping</h3>
              <button
                type="button"
                onClick={handleAddMapping}
                className="inline-flex items-center gap-1 text-[9px] text-violet-400 hover:text-violet-300 font-semibold"
              >
                <Plus size={11} /> Add Mapping
              </button>
            </div>

            <div className="space-y-2.5">
              {mappings.map((m) => (
                <div
                  key={m.id}
                  className="bg-[#0c0f18] border border-slate-800 rounded p-2.5 flex items-center gap-2 text-[10px]"
                >
                  <input
                    type="text"
                    value={m.googleCol}
                    onChange={(e) => handleUpdateMapping(m.id, "googleCol", e.target.value)}
                    placeholder="Sheet Column Header"
                    className="flex-1 h-7 bg-[#15141b] border border-slate-700 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                  />

                  <span className="text-slate-500 text-[10px] font-mono">&rarr;</span>

                  <select
                    value={m.jetrayField}
                    onChange={(e) => handleUpdateMapping(m.id, "jetrayField", e.target.value)}
                    className="flex-1 h-7 bg-[#15141b] border border-slate-700 rounded px-2 text-[10px] text-white outline-none focus:border-violet-500/60"
                  >
                    <option value="Name">Jetray Name</option>
                    <option value="Phone">Jetray Phone (Required)</option>
                    <option value="Email">Jetray Email</option>
                    <option value="Company">Jetray Company</option>
                    <option value="Tags">Jetray Tags</option>
                    <option value="Custom">Custom Property</option>
                  </select>

                  {mappings.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMapping(m.id)}
                      className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={11} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sample Data Preview & Manual Trigger */}
          <div className="bg-[#15141b] border border-slate-800/80 rounded-sm p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-200 text-xs font-semibold">Live Ingestion Preview (First 3 Rows)</h3>
              <button
                type="button"
                disabled={importing}
                onClick={handleImportNow}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-semibold transition-colors disabled:opacity-50"
              >
                <Download size={11} className={importing ? "animate-bounce" : ""} />
                {importing ? "Importing Data (Simulated)..." : "Import Now (Simulated)"}
              </button>
            </div>

            <div className="bg-[#0c0f18] border border-slate-800 rounded overflow-hidden">
              <table className="w-full text-left text-[9px]">
                <thead>
                  <tr className="border-b border-slate-800 bg-[#12121a] text-slate-400 font-semibold">
                    <th className="px-3 py-2">Name</th>
                    <th className="px-3 py-2">Phone</th>
                    <th className="px-3 py-2">Email</th>
                    <th className="px-3 py-2">Tags</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {sampleRows.map((r, i) => (
                    <tr key={i} className="text-slate-300">
                      <td className="px-3 py-2 font-medium">{r.name}</td>
                      <td className="px-3 py-2 font-mono text-slate-400">{r.phone}</td>
                      <td className="px-3 py-2 text-slate-400">{r.email}</td>
                      <td className="px-3 py-2">
                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          {r.tags}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
