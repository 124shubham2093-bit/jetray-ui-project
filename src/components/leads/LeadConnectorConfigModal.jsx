import React, { useEffect, useState } from "react";
import {
  X,
  Eye,
  EyeOff,
  PlugZap,
  Save,
  RotateCcw,
} from "lucide-react";
import { testConnectorConnection } from "../../services/leadConnectorService";

const FIELD_CONFIG = {
  "meta-lead-ads": [
    { key: "webhookUrl", label: "Global Webhook URL", type: "url" },
    { key: "verifyToken", label: "Verify Token", type: "text" },
    { key: "appId", label: "App ID", type: "text" },
    { key: "appSecret", label: "App Secret", type: "password" },
    { key: "accessToken", label: "Access Token", type: "password" },
    { key: "pageId", label: "Page ID", type: "text" },
    { key: "adAccountId", label: "Ad Account ID", type: "text" },
    { key: "leadFormId", label: "Lead Form ID", type: "text" },
  ],

  "facebook-lead-ads": [
    { key: "webhookUrl", label: "Global Webhook URL", type: "url" },
    { key: "verifyToken", label: "Verify Token", type: "text" },
    { key: "appId", label: "App ID", type: "text" },
    { key: "appSecret", label: "App Secret", type: "password" },
    { key: "accessToken", label: "Access Token", type: "password" },
    { key: "pageId", label: "Page ID", type: "text" },
    { key: "leadFormId", label: "Lead Form ID", type: "text" },
  ],

  "instagram-ads": [
    { key: "webhookUrl", label: "Global Webhook URL", type: "url" },
    { key: "verifyToken", label: "Verify Token", type: "text" },
    { key: "appId", label: "App ID", type: "text" },
    { key: "appSecret", label: "App Secret", type: "password" },
    { key: "accessToken", label: "Access Token", type: "password" },
    { key: "adAccountId", label: "Ad Account ID", type: "text" },
  ],

  indiamart: [
    { key: "webhookUrl", label: "Global Webhook URL", type: "url" },
    { key: "apiKey", label: "API Key", type: "password" },
    { key: "accessToken", label: "Access Token", type: "password" },
  ],

  justdial: [
    { key: "webhookUrl", label: "Global Webhook URL", type: "url" },
    { key: "apiKey", label: "API Key", type: "password" },
    { key: "accessToken", label: "Access Token", type: "password" },
  ],

  tradeindia: [
    { key: "webhookUrl", label: "Global Webhook URL", type: "url" },
    { key: "apiKey", label: "API Key", type: "password" },
    { key: "accessToken", label: "Access Token", type: "password" },
  ],

  "website-forms": [
    { key: "webhookUrl", label: "Global Webhook URL", type: "url" },
    { key: "verifyToken", label: "Verify Token", type: "text" },
  ],

  "google-forms": [
    { key: "webhookUrl", label: "Global Webhook URL", type: "url" },
    { key: "spreadsheetId", label: "Google Spreadsheet ID", type: "text" },
    { key: "accessToken", label: "Access Token", type: "password" },
  ],

  "custom-webhook": [
    { key: "webhookUrl", label: "Global Webhook URL", type: "url" },
    { key: "verifyToken", label: "Verify Token", type: "text" },
  ],

  "custom-api": [
    { key: "apiEndpoint", label: "API Endpoint", type: "url" },
    { key: "apiKey", label: "API Key", type: "password" },
    { key: "verifyToken", label: "Verify Token", type: "text" },
  ],
};

const createInitialValues = (connector, savedValues = null) => {
    const fields = FIELD_CONFIG[connector?.id] || [];

  return fields.reduce((values, field) => {
    values[field.key] = savedValues?.[field.key] || "";
    return values;
  }, {});
};

export default function LeadConnectorConfigModal({
  connector,
  savedValues,
  onClose,
  onSave,
}) {
  const [formValues, setFormValues] = useState({});
  const [visibleFields, setVisibleFields] = useState({});
  const [testStatus, setTestStatus] = useState("");
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (!connector) {
      return;
    }

    setFormValues(
      createInitialValues(connector, savedValues)
    );

    setVisibleFields({});
    setTestStatus("");
    setIsTesting(false)
  }, [connector, savedValues]);

  if (!connector) {
    return null;
  }

  const fields = FIELD_CONFIG[connector.id] || [];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setTestStatus("");
  };

  const toggleVisibility = (fieldKey) => {
    setVisibleFields((current) => ({
      ...current,
      [fieldKey]: !current[fieldKey],
    }));
  };

  const handleTestConnection = async () => {
    if (isTesting) {
      return;
    }
  
    setTestStatus("");
    setIsTesting(true);
  
    try {
      const result = await testConnectorConnection(
        connector.id,
        formValues
      );
  
      setTestStatus(
        result.success
          ? `success:${result.message}`
          : `error:${result.message}`
      );
    } catch (error) {
      console.error(
        "Connector test failed:",
        error
      );
  
      setTestStatus(
        "error:Unable to test the connection."
      );
    } finally {
      setIsTesting(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (onSave) {
      onSave({
        connector,
        values: formValues,
      });
    }
  };

  const handleReset = () => {
    setFormValues(
      createInitialValues(connector, savedValues)
    );
    setVisibleFields({});
    setTestStatus("");
    setIsTesting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden bg-[#11131d] border border-slate-800 rounded-xl shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-800">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <PlugZap
                size={17}
                className="text-violet-400 shrink-0"
              />

              <h2 className="text-white text-sm font-semibold truncate">
                Configure {connector.name}
              </h2>
            </div>

            <p className="text-slate-500 text-[10px] leading-4 mt-1">
              Configure the global connection settings for this CRM
              source.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-md text-slate-500 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
            aria-label="Close configuration modal"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[calc(90vh-125px)]"
        >
          <div className="p-5">
            {/* Connector information */}
            <div className="bg-[#171925] border border-slate-800 rounded-lg p-3 mb-5">
              <p className="text-slate-300 text-[10px] font-semibold">
                {connector.name}
              </p>

              <p className="text-slate-500 text-[10px] leading-4 mt-1">
                {connector.description}
              </p>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((field) => {
                const isPassword = field.type === "password";
                const isVisible = visibleFields[field.key];

                return (
                  <div
                    key={field.key}
                    className={
                      field.key === "webhookUrl" ||
                      field.key === "apiEndpoint"
                        ? "md:col-span-2"
                        : ""
                    }
                  >
                    <label
                      htmlFor={field.key}
                      className="block text-slate-300 text-[10px] font-medium mb-1.5"
                    >
                      {field.label}
                    </label>

                    <div className="relative">
                      <input
                        id={field.key}
                        name={field.key}
                        type={
                          isPassword && !isVisible
                            ? "password"
                            : field.type === "url"
                              ? "url"
                              : "text"
                        }
                        value={formValues[field.key] || ""}
                        onChange={handleChange}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                        className="w-full h-9 bg-[#0c0f18] border border-slate-800 rounded-md px-3 text-[10px] text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 transition-colors"
                      />

                      {isPassword && (
                        <button
                          type="button"
                          onClick={() =>
                            toggleVisibility(field.key)
                          }
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                          aria-label={
                            isVisible
                              ? `Hide ${field.label}`
                              : `Show ${field.label}`
                          }
                        >
                          {isVisible ? (
                            <EyeOff size={13} />
                          ) : (
                            <Eye size={13} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Test status */}
            {testStatus && (
                <div
                    className={`mt-4 rounded-md px-3 py-2 border ${
                    testStatus.startsWith("success:")
                        ? "bg-emerald-500/10 border-emerald-500/20"
                        : "bg-red-500/10 border-red-500/20"
                    }`}
                >
                    <p
                    className={`text-[10px] ${
                        testStatus.startsWith("success:")
                        ? "text-emerald-300"
                        : "text-red-300"
                    }`}
                    >
                    {testStatus.replace(
                        /^(success:|error:)/,
                        ""
                    )}
                    </p>
                </div>
                )}
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-3 border-t border-slate-800 bg-[#0e1018]">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-1.5 text-slate-400 hover:text-white text-[10px] font-medium transition-colors"
            >
              <RotateCcw size={12} />
              Reset
            </button>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 rounded-md border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 text-[10px] font-semibold transition-colors"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleTestConnection}
                disabled={isTesting}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md border border-violet-500/40 text-violet-300 hover:bg-violet-500/10 text-[10px] font-semibold transition-colors"
              >
                <PlugZap size={12} 
                className={isTesting ? "animate-pulse" : ""}
                />
                {isTesting ? "Testing..." : "Test Connection"}
                
              </button>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-semibold transition-colors"
              >
                <Save size={12} />
                Save Configuration
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}