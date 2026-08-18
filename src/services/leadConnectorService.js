const STORAGE_KEY = "jetray_lead_connector_configurations";

/*
 * Read all saved connector configurations.
 */
const getStoredConfigurations = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return {};
    }

    return JSON.parse(stored);
  } catch (error) {
    console.error(
      "Failed to read lead connector configurations:",
      error
    );

    return {};
  }
};

/*
 * Save all connector configurations.
 */
const saveStoredConfigurations = (configurations) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(configurations)
  );
};

/*
 * Get configuration for one connector.
 */
export const getConnectorConfiguration = (connectorId) => {
  const configurations = getStoredConfigurations();

  return configurations[connectorId] || null;
};

/*
 * Save configuration for one connector.
 */
export const saveConnectorConfiguration = (
  connectorId,
  values
) => {
  const configurations = getStoredConfigurations();

  configurations[connectorId] = {
    ...(configurations[connectorId] || {}),
    ...values,
    configured: true,
    enabled: true,
    updatedAt: new Date().toISOString(),
  };

  saveStoredConfigurations(configurations);

  return configurations[connectorId];
};
/*
 * Test connector configuration.
 *
 * This is currently a frontend validation layer.
 * Real API/backend connection testing will be added later.
 */
export const testConnectorConnection = (
    connectorId,
    values
  ) => {
    if (!connectorId) {
      return {
        success: false,
        message: "Connector information is missing.",
      };
    }
  
    if (!values || Object.keys(values).length === 0) {
      return {
        success: false,
        message: "Please enter the connector configuration.",
      };
    }
  
    const hasValue = Object.values(values).some(
      (value) => String(value || "").trim() !== ""
    );
  
    if (!hasValue) {
      return {
        success: false,
        message: "Please enter at least one configuration value.",
      };
    }
  
    return {
      success: true,
      message:
        "Configuration validation successful. Backend connection testing will be added later.",
    };
  };
/*
 * Enable connector.
 */
export const enableConnector = (connectorId) => {
  const configurations = getStoredConfigurations();

  if (!configurations[connectorId]) {
    return null;
  }

  configurations[connectorId] = {
    ...configurations[connectorId],
    enabled: true,
    updatedAt: new Date().toISOString(),
  };

  saveStoredConfigurations(configurations);

  return configurations[connectorId];
};

/*
 * Disable connector.
 */
export const disableConnector = (connectorId) => {
  const configurations = getStoredConfigurations();

  if (!configurations[connectorId]) {
    return null;
  }

  configurations[connectorId] = {
    ...configurations[connectorId],
    enabled: false,
    updatedAt: new Date().toISOString(),
  };

  saveStoredConfigurations(configurations);

  return configurations[connectorId];
};

/*
 * Check whether a connector has been configured.
 */
export const isConnectorConfigured = (connectorId) => {
  return Boolean(
    getConnectorConfiguration(connectorId)
  );
};

/*
 * Check whether a connector is enabled.
 */
export const isConnectorEnabled = (connectorId) => {
  const configuration =
    getConnectorConfiguration(connectorId);

  return Boolean(
    configuration?.configured &&
    configuration?.enabled
  );
};

/*
 * Remove configuration for one connector.
 */
export const removeConnectorConfiguration = (
  connectorId
) => {
  const configurations = getStoredConfigurations();

  delete configurations[connectorId];

  saveStoredConfigurations(configurations);
};