# Documentación API de Gestión de Activos - planes de acción

## Descripción General

Esta API proporciona endpoints para gestionar activos en el sistema. Sigue los principios REST y utiliza JSON para el intercambio de datos.

## URL Base

```
http://localhost:3000/api/action-plans
```

## Modelo de Datos

### Estructura del Modelo Control

```typescript
interface Action_planDTO {
  residual_risk: string;
  treatment: string;
  action_plan: string;
  responsible: string;
  implementation_date: Date;
  control_tracking: string;
  state: ActionPlanState; // Pendiente, En proceso, Finalizado ENUM
  monitoring: string;
  monitoring_date: Date;
  indicator: string;
  risk_id: number; // Relación con el riesgo
}

enum ActionPlanState {
  Pending = "Pendiente",
  InProgress = "En proceso",
  Finished = "Finalizado",
}
```

## Endpoints

### 1. Crear plan de acción

Crea una nueva vulnerabilidad en el sistema.

**Endpoint:** `POST /`  
**Content-Type:** `application/json`

#### Cuerpo de la Petición

```json
{
    "residual_risk": "riesgo residual",
    "treatment": "tratamiento",
    "action_plan": "Plan de accion",
    "responsible": "responsable",
    "control_tracking": "rastreo de control",
    "state": "Pending",
    "monitoring": "Monitoreo",
    "indicator": "indicador",
    "risk_id": 1
}
```

#### Respuestas

- `201 Created`: plan de acción creado exitosamente

```json
{
  "id": 1,
  "residual_risk": "riesgo residual",
  "treatment": "tratamiento",
  "action_plan": "Plan de accion",
  "responsible": "responsable",
  "control_tracking": "rastreo de control",
  "state": "Pending",
  "monitoring": "Monitoreo",
  "indicator": "indicador",
  "risk_id": 1
}
```

### 2. Obtener Todos los planes de acción

Recupera todos los planes de acción del sistema.

**Endpoint:** `GET /`

#### Respuesta Exitosa (200 OK)

```json
[
  {
  "id": 1,
  "residual_risk": "riesgo residual",
  "treatment": "tratamiento",
  "action_plan": "Plan de accion",
  "responsible": "responsable",
  "control_tracking": "rastreo de control",
  "state": "Pending",
  "monitoring": "Monitoreo",
  "indicator": "indicador",
  "risk_id": 1
  }
]
```

### 3. Obtener plan de acción por ID

Recupera un plan de acción específico por su ID.

**Endpoint:** `GET /:id`

#### Parámetros de Ruta

- `id`: ID numérico del plan de acción

#### Respuesta Exitosa (200 OK)

```json
{
  "id": 1,
  "residual_risk": "riesgo residual",
  "treatment": "tratamiento",
  "action_plan": "Plan de accion",
  "responsible": "responsable",
  "control_tracking": "rastreo de control",
  "state": "Pending",
  "monitoring": "Monitoreo",
  "indicator": "indicador",
  "risk_id": 1
}
```

### 4. Actualizar plan de acción por id

Actualiza un plan de acción por un id específico.

**Endpoint:** `PUT /:id`

#### Parámetros de Ruta

- `id`: ID numérico del plan de acción

### Ejemplo

```json
{
  "treatment": "Updated treatment",
  "action_plan": "Updated action plan"
}
```

### Resultado

```json
{
  "id": 1,
  "residual_risk": "riesgo residual",
  "treatment": "Updated treatment",
  "action_plan": "Updated action plan",
  "responsible": "responsable",
  "control_tracking": "rastreo de control",
  "state": "Pending",
  "monitoring": "Monitoreo",
  "indicator": "indicador",
  "risk_id": 1
}
```
#### Respuesta Exitosa (200 OK)

### 5. Eliminar  un plan de acción por id

Elimina un único plan de acción por ID.

**Endpoint:** `DELETE /:id`

#### Parámetros de Ruta

- `id`: ID numérico del plan de acción

### Respuesta

```json
{
  "message": "action plan deleted successfully"
}
```

### Relaciones

- `risk`: Debe existir en la tabla `Risk`

## Manejo de Errores

Todos los endpoints devuelven errores en el siguiente formato:

```json
{
  "message": "Descripción del error",
  "err": "Detalles técnicos del error (opcional)"
}
```

### Códigos de Estado HTTP

- `200`: Operación exitosa
- `201`: Creación exitosa
- `400`: Error de validación o solicitud incorrecta
- `404`: Si no existe
- `409`: Si hay datos duplicados
- `500`: Error interno del servidor