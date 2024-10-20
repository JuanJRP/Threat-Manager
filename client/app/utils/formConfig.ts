export const formConfig = {
  risks: [
    {
      name: "frequency",
      label: "Frecuencia",
      type: "number",
      placeholder: "Frecuencia con la que ocurre  el  riesgo",
      required: true,
    },
    {
      name: "penalty",
      label: "Penalización",
      type: "number",
      placeholder: "Penalización del riesgo",
      required: true,
    },
    {
      name: "threat_id",
      label: "Threat",
      type: "select",
      options: "threats",
      required: true,
    },
    {
      name: "vulnerability_id",
      label: "Vulnerability",
      type: "select",
      options: "vulnerabilities",
      required: true,
    },
    {
      name: "risk_type_id",
      label: "Tipo de riesgo",
      type: "select",
      options: "riskTypes",
      required: true,
    },
    {
      name: "asset_type_id",
      label: "Tipo de activo",
      type: "select",
      options: "assetTypes",
      required: true,
    },
  ],

  threats: [
    {
      name: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Nombre del threat",
      required: true,
    },
    {
      name: "description",
      label: "Descripción",
      type: "text",
      placeholder: "Descripción del threat",
      required: true,
    },
  ],
};
