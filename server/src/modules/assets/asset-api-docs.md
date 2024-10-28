# Documentación API de Gestión de Activos

## Descripción General

Esta API proporciona endpoints para gestionar activos en el sistema. Sigue los principios REST y utiliza JSON para el intercambio de datos.

## URL Base

```
api/assets
```

## Modelo de Datos

### Estructura del Modelo Asset

```typescript
interface Asset {
  // Campos de Identificación
  id: number; // @id @default(autoincrement())

  // Campos Obligatorios de Clasificación
  process: string; // Misional, Estrategico, apoyo, Evaluacion y mejora
  name: string; // Nombre del activo
  description: string; // Descripción del activo
  format: string; // CSV, TXT
  software_version: string; // Versión del software
  manufacturer: string; // Fabricante
  electronic_location: string; // Ubicación electrónica
  responsible: string; // Responsable del activo
  user_access: string; // Acceso de usuario

  // Campos Obligatorios de Estado
  state: boolean; // true = Activo, false = Inactivo
  availability: boolean; // true = Disponible, false = No Disponible

  // Campos Obligatorios de Seguridad
  integrity: string; // Nivel de integridad (texto)
  confidentiality: string; // Nivel de confidencialidad (texto)
  criticality: string; // Nivel de criticidad (texto)

  // Campos Obligatorios de Fechas
  access_date: Date; // Fecha de acceso
  entry_date: Date; // Fecha de entrada

  // Campos Obligatorios de Relaciones
  asset_type_id: number; // Relación con Asset_type
  user_id: number; // Relación con User

  // Campos Opcionales
  physical_location?: string; // Ubicación física
  retirement_date?: Date; // Fecha de retiro
  extra_atributes?: Json; // Atributos adicionales en formato JSON
}
```

### Estructura del Modelo Asset_type

```typescript
interface Asset_type {
  id: number; // @id @default(autoincrement())
  name: string; // Hardware, Software, Información
  description: string; // Descripción del tipo de activo
  category: string; // Categoría del tipo de activo
}
```

## Endpoints

### 1. Crear Activo

Crea un nuevo activo en el sistema.

**Endpoint:** `POST /`  
**Content-Type:** `application/json`

#### Cuerpo de la Petición

```json
{
  // Campos Obligatorios
  "process": "Misional",
  "name": "Servidor Principal",
  "description": "Servidor principal de aplicaciones",
  "format": "CSV",
  "software_version": "2.0",
  "manufacturer": "Dell",
  "electronic_location": "/servers/main",
  "responsible": "Juan Pérez",
  "user_access": "Admin",
  "access_date": "2024-03-20T00:00:00Z",
  "state": true,
  "entry_date": "2024-03-20T00:00:00Z",
  "availability": true,
  "integrity": "Alta",
  "confidentiality": "Alta",
  "criticality": "Alta",
  "asset_type_id": 1,
  "user_id": 1,

  // Campos Opcionales
  "physical_location": "Sala de Servidores",
  "retirement_date": "2025-03-20T00:00:00Z",
  "extra_atributes": {
    "marca": "Dell",
    "modelo": "PowerEdge R740",
    "capacidad": "32GB RAM",
    "procesador": "Intel Xeon"
  }
}
```

#### Respuestas

- `201 Created`: Activo creado exitosamente

```json
{
  "id": 1,
  // ... todos los campos del activo ...
  "asset_type": {
    "id": 1,
    "name": "Hardware",
    "description": "Equipos físicos",
    "category": "Infraestructura"
  }
}
```

### 2. Obtener Todos los Activos

Recupera todos los activos del sistema.

**Endpoint:** `GET /`

#### Respuesta Exitosa (200 OK)

```json
[
  {
    "id": 1,
    // ... campos del activo ...
    "asset_type": {
      "id": 1,
      "name": "Hardware",
      "description": "Equipos físicos",
      "category": "Infraestructura"
    }
  }
]
```

### 3. Obtener Activo por ID

Recupera un activo específico por su ID.

**Endpoint:** `GET /:id`

#### Parámetros de Ruta

- `id`: ID numérico del activo

#### Respuesta Exitosa (200 OK)

```json
{
  "id": 1,
  // ... campos del activo ...
  "asset_type": {
    "id": 1,
    "name": "Hardware",
    "description": "Equipos físicos",
    "category": "Infraestructura"
  }
}
```

### 4. Obtener Activos por Tipo

Recupera todos los activos de un tipo específico.

**Endpoint:** `GET /type/:assetTypeId`

#### Parámetros de Ruta

- `assetTypeId`: ID numérico del tipo de activo

### 5. Obtener Activos por Nombre

Recupera activos por coincidencia exacta del nombre.

**Endpoint:** `GET /name/:name`

#### Parámetros de Ruta

- `name`: Nombre del activo

### 6. Actualizar Activo

Actualiza un activo existente por ID.

**Endpoint:** `PATCH /:id`

#### Parámetros de Ruta

- `id`: ID numérico del activo a actualizar

#### Cuerpo de la Petición

```json
{
  // Incluir solo los campos que se desean actualizar
  "state": false,
  "availability": false,
  "physical_location": "Nueva ubicación",
  "extra_atributes": {
    // Nuevos atributos
  }
}
```

### 7. Eliminar Activo

Elimina un único activo por ID.

**Endpoint:** `DELETE /:id`

### 8. Eliminar Múltiples Activos

Elimina múltiples activos por sus IDs.

**Endpoint:** `DELETE /deleteAssets/ids`

#### Cuerpo de la Petición

```json
{
  "ids": [1, 2, 3]
}
```

## Validaciones y Restricciones

### Restricciones de Campos

- Campos de texto (VarChar): máximo 255 caracteres

  - `process`
  - `name`
  - `description`
  - `format`
  - `software_version`
  - `manufacturer`
  - `physical_location`
  - `electronic_location`
  - `responsible`
  - `user_access`

- Campos de texto largo (Text):
  - `integrity`
  - `confidentiality`
  - `criticality`

### Valores Enumerados

- **Process**:

  - Misional
  - Estrategico
  - Apoyo
  - Evaluacion y mejora

- **Format**:

  - CSV
  - TXT

- **State**:

  - true (Activo)
  - false (Inactivo)

- **Availability**:
  - true (Disponible)
  - false (No Disponible)

### Validaciones de Fechas

- `entry_date`: Obligatoria
- `retirement_date`: Opcional, debe ser posterior a `entry_date`
- `access_date`: Obligatoria

### Relaciones

- `asset_type_id`: Debe existir en la tabla `Asset_type`
- `user_id`: Debe existir en la tabla `User`

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
- `500`: Error interno del servidor
