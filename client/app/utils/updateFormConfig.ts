export const updateFormConfig = {
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
      options: [
        { id: 1, name: "Preventivo" },
        { id: 2, name: "Detectivo" },
        { id: 3, name: "Correctivo" },
      ],
    },
    {
      name: "implementation",
      label: "Implementación",
      type: "select",
      options: [
        { id: 1, name: "Manual" },
        { id: 2, name: "Automatico" },
      ],
    },
  ],
};

export default updateFormConfig;