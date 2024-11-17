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
  controls:[
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

export default updateFormConfig;