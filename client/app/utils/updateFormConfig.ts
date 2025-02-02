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
  }],

  action_plan:[{
    name: "residual_risk",
    label: "Riesgo residual",
    type: "text",
    placeholder: "Ingresa el riesgo residual",
    required: true,
  },
  {
    name: "treatment",
    label: "Tratamiento",
    type: "text",
    placeholder: "Ingresa el Tratamiento",
    required: true,
  },
  {
    name: "action_plan",
    label: "Plan de accion",
    type: "text",
    placeholder: "Ingresa el Plan de accion",
    required: true,
  },
  {
    name: "responsible",
    label: "Responsable",
    type: "text",
    placeholder: "Ingresa el responsable",
    required: true,
  },
  {
    name: "implementation_date",
    label: "Fecha de implementacion",
    type: "date",
    placeholder: "Ingresa la fecha de implementacion",
    required: true,
  },
  {
    name: "control_tracking",
    label: "Rastreo de control",
    type: "text",
    placeholder: "Ingresa la fecha de rastreo de control",
    required: true,
  },

  {
    name: "state",
    label: "Estado",
    type: "select",
    staticOptions: [
      { id: 1, name: "Pendiente" },
      { id: 2, name: "En proceso" },
      { id: 3, name: "Finalizado" },
    ],
  },
  {
    name: "monitoring",
    label: "Monitoreo",
    type: "text",
    placeholder: "Ingresa el monitoreo",
    required: true,
  },
  {
    name: "monitoring_date",
    label: "Fecha de Monitoreo",
    type: "date",
    placeholder: "Selecciona la fecha de monitoreo",
    required: true,
  },
  {
    name: "indicator",
    label: "Indicador",
    type: "text",
    placeholder: "Ingresa el indicador",
    required: true,
  },
  ],
  assets_type:[
    {
      name: "name",
      label: "Nombre",
      type: "text",
      placeholder: "Ingresa el Nombre",
      required: true,
    },
    {
      name: "description",
      label: "Descripcion",
      type: "text",
      placeholder: "Ingresa una descripcion",
      required: true,
    },
    {
      name: "category",
      label: "Categoria",
      type: "text",
      placeholder: "Ingresa una categoria",
      required: true,
    },
  ]
};

export default updateFormConfig;