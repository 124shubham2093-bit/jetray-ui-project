import React, { useState, useMemo } from "react";
import {
  Save,
  RotateCcw,
  Coins,
  LayoutTemplate,
  CheckCircle,
} from "lucide-react";

/* ─── Currency catalogue ──────────────────────────────────── */
const CURRENCIES = [
  { code: "USD", label: "USD — US Dollar",         symbol: "$"  },
  { code: "EUR", label: "EUR — Euro",               symbol: "€"  },
  { code: "GBP", label: "GBP — British Pound",      symbol: "£"  },
  { code: "INR", label: "INR — Indian Rupee",        symbol: "₹"  },
  { code: "AUD", label: "AUD — Australian Dollar",  symbol: "A$" },
  { code: "CAD", label: "CAD — Canadian Dollar",    symbol: "C$" },
  { code: "JPY", label: "JPY — Japanese Yen",       symbol: "¥"  },
];

/* ─── Default configuration ──────────────────────────────── */
const DEFAULTS = {
  currencyCode:       "USD",
  symbol:             "$",
  symbolPosition:     "before",  // "before" | "after"
  decimalPlaces:      2,
  decimalSeparator:   ".",        // "." | ","
  thousandsSeparator: ",",        // "," | "." | " "
};

/* ─── Format preview ─────────────────────────────────────── */
function buildPreview(values) {
  const amount = 1234.56;

  // Round to requested decimal places
  const fixed = amount.toFixed(values.decimalPlaces);

  // Split integer and fractional parts
  const [intPart, fracPart] = fixed.split(".");

  // Apply thousands separator to the integer part
  const sepMap = { ",": ",", ".": ".", " ": "\u00a0" };
  const tSep = sepMap[values.thousandsSeparator] ?? ",";
  const formattedInt = intPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    tSep
  );

  // Combine with decimal separator
  let number;
  if (values.decimalPlaces === 0) {
    number = formattedInt;
  } else {
    const dSep = values.decimalSeparator === "," ? "," : ".";
    number = `${formattedInt}${dSep}${fracPart}`;
  }

  // Apply symbol position
  if (values.symbolPosition === "before") {
    return `${values.symbol}${number}`;
  }
  return `${number}\u00a0${values.symbol}`;
}

/* ─── Reusable form-row divider ─────────────────────────── */
function Divider() {
  return <div className="border-t border-slate-800/50" />;
}

/* ─── Main Page ─────────────────────────────────────────── */
export default function CurrencyConfigurationPage() {
  const [values, setValues]   = useState({ ...DEFAULTS });
  const [saved,  setSaved]    = useState(false);

  /* Generic field updater */
  const handleChange = (key, value) => {
    setSaved(false);
    setValues((prev) => {
      const next = { ...prev, [key]: value };

      /* Auto-update symbol when currency changes */
      if (key === "currencyCode") {
        const found = CURRENCIES.find((c) => c.code === value);
        if (found) next.symbol = found.symbol;
      }

      return next;
    });
  };

  const handleReset = () => {
    setValues({ ...DEFAULTS });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend-only — backend persistence will be added later.
    console.log("Currency configuration:", values);
    setSaved(true);
  };

  /* Live preview string */
  const preview = useMemo(() => buildPreview(values), [values]);

  return (
    <div className="p-6">
      {/* ── Page Header ─────────────────────────────────────── */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Currency Configuration
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Configure the default currency and display formatting for your
          platform.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">

        {/* ── A. CURRENCY SETTINGS ──────────────────────────── */}
        <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/70">
            <Coins size={15} className="text-violet-400" />
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                Currency Settings
              </h3>
              <p className="text-slate-500 text-[10px] mt-0.5">
                Select the default currency and configure its symbol and
                placement.
              </p>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Row 1: Default Currency + Symbol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Default Currency */}
              <div>
                <label
                  htmlFor="currencyCode"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Default Currency
                </label>
                <select
                  id="currencyCode"
                  value={values.currencyCode}
                  onChange={(e) =>
                    handleChange("currencyCode", e.target.value)
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60 transition-colors"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Currency Symbol */}
              <div>
                <label
                  htmlFor="symbol"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Currency Symbol
                  <span className="text-slate-600 font-normal ml-1">
                    (auto-filled, editable)
                  </span>
                </label>
                <input
                  id="symbol"
                  type="text"
                  value={values.symbol}
                  onChange={(e) =>
                    handleChange("symbol", e.target.value)
                  }
                  maxLength={4}
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>
            </div>

            <Divider />

            {/* Row 2: Symbol Position + Decimal Places */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Symbol Position */}
              <div>
                <label
                  htmlFor="symbolPosition"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Currency Position
                </label>
                <select
                  id="symbolPosition"
                  value={values.symbolPosition}
                  onChange={(e) =>
                    handleChange("symbolPosition", e.target.value)
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60 transition-colors"
                >
                  <option value="before">Before amount</option>
                  <option value="after">After amount</option>
                </select>
              </div>

              {/* Decimal Places */}
              <div>
                <label
                  htmlFor="decimalPlaces"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Decimal Places
                </label>
                <input
                  id="decimalPlaces"
                  type="number"
                  min={0}
                  max={4}
                  value={values.decimalPlaces}
                  onChange={(e) =>
                    handleChange(
                      "decimalPlaces",
                      Math.max(0, Math.min(4, Number(e.target.value)))
                    )
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
                />
              </div>
            </div>

            <Divider />

            {/* Row 3: Decimal Separator + Thousands Separator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Decimal Separator */}
              <div>
                <label
                  htmlFor="decimalSeparator"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Decimal Separator
                </label>
                <select
                  id="decimalSeparator"
                  value={values.decimalSeparator}
                  onChange={(e) =>
                    handleChange("decimalSeparator", e.target.value)
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60 transition-colors"
                >
                  <option value=".">Dot (.)</option>
                  <option value=",">Comma (,)</option>
                </select>
              </div>

              {/* Thousands Separator */}
              <div>
                <label
                  htmlFor="thousandsSeparator"
                  className="block text-slate-300 text-[10px] font-medium mb-1.5"
                >
                  Thousands Separator
                </label>
                <select
                  id="thousandsSeparator"
                  value={values.thousandsSeparator}
                  onChange={(e) =>
                    handleChange("thousandsSeparator", e.target.value)
                  }
                  className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60 transition-colors"
                >
                  <option value=",">Comma (,)</option>
                  <option value=".">Dot (.)</option>
                  <option value=" ">Space</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* ── B. FORMATTING PREVIEW ─────────────────────────── */}
        <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/70">
            <LayoutTemplate size={15} className="text-violet-400" />
            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                Display Preview
              </h3>
              <p className="text-slate-500 text-[10px] mt-0.5">
                Live preview of how amounts will appear with your selected
                settings.
              </p>
            </div>
          </div>

          <div className="px-5 py-6 flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Example label */}
            <div className="flex-1">
              <p className="text-slate-500 text-[10px] font-medium mb-1">
                Example amount
              </p>
              <p className="text-slate-400 text-[10px]">
                Input value: 1234.56
              </p>
            </div>

            {/* Arrow separator — desktop only */}
            <div
              className="hidden sm:flex items-center text-slate-700 text-lg font-bold select-none"
              aria-hidden
            >
              →
            </div>

            {/* Live preview */}
            <div className="flex-1 flex items-center justify-end sm:justify-start">
              <div className="bg-[#0c0f18] border border-slate-800 rounded-md px-4 py-2.5 inline-block">
                <span className="text-emerald-400 text-sm font-bold tracking-wide font-mono">
                  {preview}
                </span>
              </div>
            </div>
          </div>

          {/* Settings summary row */}
          <div className="flex flex-wrap gap-2 px-5 pb-5">
            {[
              { label: "Currency",  value: values.currencyCode },
              { label: "Symbol",    value: values.symbol || "—" },
              { label: "Position",  value: values.symbolPosition === "before" ? "Before" : "After" },
              { label: "Decimals",  value: String(values.decimalPlaces) },
              { label: "Dec. sep",  value: values.decimalSeparator === "." ? "Dot (.)" : "Comma (,)" },
              {
                label: "1000 sep",
                value:
                  values.thousandsSeparator === ","
                    ? "Comma (,)"
                    : values.thousandsSeparator === "."
                    ? "Dot (.)"
                    : "Space",
              },
            ].map((item) => (
              <span
                key={item.label}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800/60 border border-slate-800 text-[9px]"
              >
                <span className="text-slate-500">{item.label}:</span>
                <span className="text-slate-300 font-medium">
                  {item.value}
                </span>
              </span>
            ))}
          </div>
        </section>

        {/* ── C. ACTIONS ────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-2">
          {saved && (
            <span className="flex items-center gap-1 text-emerald-400 text-[10px] font-medium mr-2">
              <CheckCircle size={12} />
              Configuration saved
            </span>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-[10px] font-semibold transition-colors"
          >
            <RotateCcw size={12} />
            Reset
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
          >
            <Save size={12} />
            Save Configuration
          </button>
        </div>

      </form>
    </div>
  );
}
