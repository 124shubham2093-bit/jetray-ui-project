import React, { useEffect, useState } from "react";
import {
  LayoutDashboard,
  List,
  Globe2,
} from "lucide-react";
import { LEAD_INTEGRATIONS } from "../data/leadIntegrations";
import {
  LeadConnectorCard,
  LeadConnectorConfigModal,
} from "../components/leads";
import {
  getConnectorConfiguration,
  saveConnectorConfiguration,
  enableConnector,
  disableConnector,
} from "../services/leadConnectorService";

export default function LeadIntegrationsPage() {
  const [connectors, setConnectors] = useState(
    LEAD_INTEGRATIONS
  );

  const [selectedConnector, setSelectedConnector] =
    useState(null);

  const [savedValues, setSavedValues] = useState(null);

  /*
   * Load saved connector configurations when
   * the page is opened.
   */
  useEffect(() => {
    const configuredConnectors = LEAD_INTEGRATIONS.map(
      (connector) => {
        const configuration =
          getConnectorConfiguration(connector.id);

        if (configuration) {
          return {
            ...connector,
            configured: true,
            status: configuration.enabled
              ? "active"
              : "disabled",
          };
        }

        return {
          ...connector,
          configured: false,
          status: "disabled",
        };
      }
    );

    setConnectors(configuredConnectors);
  }, []);

  /*
   * Open connector configuration.
   */
  const handleConfigure = (connector) => {
    const configuration =
      getConnectorConfiguration(connector.id);

    setSelectedConnector(connector);
    setSavedValues(configuration);
  };

  /*
   * Close configuration modal.
   */
  const handleCloseModal = () => {
    setSelectedConnector(null);
    setSavedValues(null);
  };

  /*
   * Save connector configuration.
   */
  const handleSaveConfiguration = ({
    connector,
    values,
  }) => {
    saveConnectorConfiguration(
      connector.id,
      values
    );

    setConnectors((currentConnectors) =>
      currentConnectors.map((currentConnector) =>
        currentConnector.id === connector.id
          ? {
              ...currentConnector,
              configured: true,
              status: "active",
            }
          : currentConnector
      )
    );

    setSelectedConnector(null);
    setSavedValues(null);
  };
  /*
   * Toggle connector enabled / disabled state.
   */
  const handleToggleConnector = (connector) => {
    if (!connector.configured) {
      return;
    }

    const isActive = connector.status === "active";

    if (isActive) {
      disableConnector(connector.id);
    } else {
      enableConnector(connector.id);
    }

    setConnectors((currentConnectors) =>
      currentConnectors.map((currentConnector) =>
        currentConnector.id === connector.id
          ? {
              ...currentConnector,
              status: isActive
                ? "disabled"
                : "active",
            }
          : currentConnector
      )
    );
  };
  return (
    <div className="p-6">
      {/* Page Header */}
      <div>
        <h2 className="text-white text-xl font-bold tracking-tight">
          Global CRM Source Connectors
        </h2>

        <p className="text-slate-400 text-xs mt-1">
          Configure platform-wide integration credentials and webhook
          endpoints to sync leads automatically.
        </p>
      </div>

      {/* CRM Tabs */}
      <div className="bg-[#12121a] border border-slate-800/70 rounded-sm p-2 mt-6">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 text-[10px] font-semibold"
          >
            <LayoutDashboard size={11} />
            Dashboard
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-700 text-slate-400 text-[10px] font-semibold"
          >
            <List size={11} />
            All Leads
          </button>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-violet-600 text-white text-[10px] font-semibold"
          >
            <Globe2 size={11} />
            Global Connectors
          </button>
        </div>
      </div>

      {/* Connector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
        {connectors.map((connector) => (
          <LeadConnectorCard
            key={connector.id}
            connector={connector}
            onConfigure={handleConfigure}
            onToggle={handleToggleConnector}
          />
        ))}
      </div>

      {/* Configuration Modal */}
      <LeadConnectorConfigModal
        connector={selectedConnector}
        savedValues={savedValues}
        onClose={handleCloseModal}
        onSave={handleSaveConfiguration}
      />
    </div>
  );
}
