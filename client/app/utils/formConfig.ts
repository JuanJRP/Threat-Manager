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
      name: "control_type",
      label: "Tipo de control",
      type: "select",
      staticOptions: [
        { id: 1, name: "Preventivo" },
        { id: 2, name: "Detectivo" },
        { id: 3, name: "Correctivo" },
      ],
    },
    {
      name: "implementation",
      label: "Implementación",
      type: "select",
      staticOptions: [
        { id: 1, name: "Manual" },
        { id: 2, name: "Automatico" },
      ],
    },
    {
      name: "threat_id",
      label: "Amenaza",
      type: "select",
      options: "threats",
      required: true,
    },
    {
      name: "vulnerability_id",
      label: "Vulnerabilidad",
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

  threats:[{
    name: "name",
    label: "Nombre",
    type: "text",
    placeholder: "Ingresa un nombre",
    required: true,
  },
  {
    name: "description",
    label: "Descripción",
    type: "text",
    placeholder: "Ingresa una descripeción",
    required: true,
  }],
  controls:[{
    name: "code",
    label: "codigo",
    type: "number",
    placeholder: "Ingresa el codigo",
    required: true,
  },
  {
    name: "description_iso",
    label: "Descripción iso",
    type: "text",
    placeholder: "Ingresa una descripción",
    required: true,
  },
  {
    name: "description_city_hall",
    label: "Descripción de la alcaldía",
    type: "text",
    placeholder: "Ingresa la descripción de la alcaldía",
    required: true,
  }]

};
