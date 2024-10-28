# Documentación API de Gestión de Activos - Controles

## Descripción General

Esta API proporciona endpoints para gestionar activos en el sistema. Sigue los principios REST y utiliza JSON para el intercambio de datos.

## URL Base

```
http://localhost:3000/api/control
```

## Modelo de Datos

### Estructura del Modelo Control

```typescript
interface ControlDTO {
  code: number; // @id @default(autoincrement())
  description_iso: string; //Descripciòn de la iso
  description_city_hall: string; //Descripciòn adicional
}

```

### Estructura del Modelo UpdateControl 

```typescript
interface UpdateControlDTO {
  description_iso: string; //Descripciòn de la iso
  description_city_hall: string; //Descripciòn adicional
}
```

## Endpoints

### 1. Crear Control

Crea un nuevo control en el sistema.

**Endpoint:** `POST /`  
**Content-Type:** `application/json`

#### Cuerpo de la Petición

```json
{
  "code": 101,
  "description_iso": "ISO description example",
  "description_city_hall": "City hall description example"
}
```

#### Respuestas

- `201 Created`: Control creado exitosamente

```json
{
  "id": 1,
  "code": 101,
  "description_iso": "ISO description example",
  "description_city_hall": "City hall description example"
}
```

### 2. Obtener Todos los controles

Recupera todos los controles del sistema.

**Endpoint:** `GET /`

#### Respuesta Exitosa (200 OK)

```json
[
  {
    "id": 1,
    "code": 101,
    "description_iso": "ISO description example",
    "description_city_hall": "City hall description example"
  }
]
```

### 3. Obtener control por ID

Recupera un control específico por su ID.

**Endpoint:** `GET /:id`

#### Parámetros de Ruta

- `id`: ID numérico del control

#### Respuesta Exitosa (200 OK)

```json
{
  "id": 1,
  "code": 101,
  "description_iso": "ISO description example",
  "description_city_hall": "City hall description example"
}
```

### 4. Actualizar control por id

Actualiza un control por un id específico.

**Endpoint:** `PUT /:id`

#### Parámetros de Ruta

- `id`: ID numérico del control

### Ejemplo

```json
{
  "description_iso": "Updated ISO description",
  "description_city_hall": "Updated city hall description"
}
```

### Resultado

```json
{
  "id": 1,
  "code": 101,
  "description_iso": "Updated ISO description",
  "description_city_hall": "Updated city hall description"
}
```
#### Respuesta Exitosa (200 OK)

### 5. Eliminar  un Control por id

Elimina un único control por ID.

**Endpoint:** `DELETE /:id`

#### Parámetros de Ruta

- `id`: ID numérico del control

### Respuesta

```json
{
  "message": "Control deleted successfully"
}
```



### Relaciones

- `vulnerability`: Debe existir en la tabla `Vulnerability`

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


