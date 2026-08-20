import React, { useState } from "react";
import {
  Save,
  RotateCcw,
  Globe2,
  Building2,
  Phone,
  Mail,
} from "lucide-react";

export default function GeneralConfigurationPage() {
  const [formValues, setFormValues] = useState({
    siteName: "",
    siteUrl: "",
    companyName: "",
    supportEmail: "",
    supportPhone: "",
    timezone: "Asia/Kolkata",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormValues({
      siteName: "",
      siteUrl: "",
      companyName: "",
      supportEmail: "",
      supportPhone: "",
      timezone: "Asia/Kolkata",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Frontend UI only for now.
    // Backend/database saving will be added later.
    console.log("General configuration:", formValues);
  };

  return (
    <div className="p-6">
      {/* Page Header */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          General Configuration
        </h2>

        <p className="text-slate-400 text-xs mt-1">
          Manage the basic platform-wide settings and company information.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        {/* General Information */}
        <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/70">
            <Globe2
              size={15}
              className="text-violet-400"
            />

            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                General Information
              </h3>

              <p className="text-slate-500 text-[10px] mt-0.5">
                Configure the basic information of your platform.
              </p>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Site Name */}
            <div>
              <label
                htmlFor="siteName"
                className="block text-slate-300 text-[10px] font-medium mb-1.5"
              >
                Site Name
              </label>

              <input
                id="siteName"
                name="siteName"
                type="text"
                value={formValues.siteName}
                onChange={handleChange}
                placeholder="Enter site name"
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>

            {/* Site URL */}
            <div>
              <label
                htmlFor="siteUrl"
                className="block text-slate-300 text-[10px] font-medium mb-1.5"
              >
                Site URL
              </label>

              <input
                id="siteUrl"
                name="siteUrl"
                type="url"
                value={formValues.siteUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Company Information */}
        <section className="bg-[#15141b] border border-slate-800/70 rounded-sm">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800/70">
            <Building2
              size={15}
              className="text-violet-400"
            />

            <div>
              <h3 className="text-slate-200 text-xs font-semibold">
                Company Information
              </h3>

              <p className="text-slate-500 text-[10px] mt-0.5">
                Manage company and support contact information.
              </p>
            </div>
          </div>

          <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label
                htmlFor="companyName"
                className="block text-slate-300 text-[10px] font-medium mb-1.5"
              >
                Company Name
              </label>

              <input
                id="companyName"
                name="companyName"
                type="text"
                value={formValues.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>

            {/* Support Email */}
            <div>
              <label
                htmlFor="supportEmail"
                className="flex items-center gap-1.5 text-slate-300 text-[10px] font-medium mb-1.5"
              >
                <Mail size={10} />
                Support Email
              </label>

              <input
                id="supportEmail"
                name="supportEmail"
                type="email"
                value={formValues.supportEmail}
                onChange={handleChange}
                placeholder="support@example.com"
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>

            {/* Support Phone */}
            <div>
              <label
                htmlFor="supportPhone"
                className="flex items-center gap-1.5 text-slate-300 text-[10px] font-medium mb-1.5"
              >
                <Phone size={10} />
                Support Phone
              </label>

              <input
                id="supportPhone"
                name="supportPhone"
                type="tel"
                value={formValues.supportPhone}
                onChange={handleChange}
                placeholder="Enter support phone"
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
              />
            </div>

            {/* Timezone */}
            <div>
              <label
                htmlFor="timezone"
                className="block text-slate-300 text-[10px] font-medium mb-1.5"
              >
                Timezone
              </label>

              <select
                id="timezone"
                name="timezone"
                value={formValues.timezone}
                onChange={handleChange}
                className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white outline-none focus:border-violet-500/60 transition-colors"
              >
                <option value="Asia/Kolkata">
                  Asia/Kolkata
                </option>
                <option value="UTC">
                  UTC
                </option>
                <option value="America/New_York">
                  America/New_York
                </option>
                <option value="Europe/London">
                  Europe/London
                </option>
              </select>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2">
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