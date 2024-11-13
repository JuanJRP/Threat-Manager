# API Documentation - Asset Types

Esta documentación describe los endpoints disponibles para la gestión de tipos de activos.

## Base URL
```
/api/asset-types
```

## Estructura de Datos

### AssetTypeDTO
```typescript
{
  name: string;        // Nombre del tipo de activo
  description: string; // Descripción del tipo de activo
  category: string;    // Categoría del tipo de activo
}
```

## Endpoints

### 1. Crear Tipo de Activo
Crea un nuevo tipo de activo en el sistema.

**Endpoint:** `POST /asset-types`

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "category": "string"
}
```

**Respuestas:**
- `201 Created`: Tipo de activo creado exitosamente
  ```json
  {
    "name": "string",
    "description": "string",
    "category": "string"
  }
  ```
- `500 Internal Server Error`: Error en el servidor
  ```json
  {
    "message": "Error al crear el tipo de activo",
    "error": {}
  }
  ```

### 2. Obtener Tipo de Activo por ID
Recupera un tipo de activo específico usando su ID.

**Endpoint:** `GET /asset-types/:id`

**Parámetros URL:**
- `id`: ID numérico del tipo de activo

**Respuestas:**
- `200 OK`: Tipo de activo encontrado
  ```json
  {
    "name": "string",
    "description": "string",
    "category": "string"
  }
  ```
- `404 Not Found`: Tipo de activo no encontrado
  ```json
  {
    "message": "Tipo de activo no encontrado"
  }
  ```
- `500 Internal Server Error`: Error en el servidor

### 3. Listar Todos los Tipos de Activos
Obtiene una lista de todos los tipos de activos disponibles.

**Endpoint:** `GET /asset-types`

**Respuestas:**
- `200 OK`: Lista de tipos de activos
  ```json
  [
    {
      "name": "string",
      "description": "string",
      "category": "string"
    }
  ]
  ```
- `500 Internal Server Error`: Error en el servidor

### 4. Actualizar Tipo de Activo
Actualiza un tipo de activo existente.

**Endpoint:** `PUT /asset-types/:id`

**Parámetros URL:**
- `id`: ID numérico del tipo de activo

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "category": "string"
}
```

**Respuestas:**
- `200 OK`: Tipo de activo actualizado exitosamente
- `500 Internal Server Error`: Error en el servidor

### 5. Eliminar Tipo de Activo
Elimina un tipo de activo del sistema.

**Endpoint:** `DELETE /asset-types/:id`

**Parámetros URL:**
- `id`: ID numérico del tipo de activo

**Respuestas:**
- `200 OK`: Tipo de activo eliminado exitosamente
  ```json
  {
    "message": "El id fue borrado correctamente"
  }
  ```
- `500 Internal Server Error`: Error en el servidor

## Manejo de Errores
Todos los endpoints pueden retornar un error 500 con la siguiente estructura:
```json
{
  "message": "Mensaje descriptivo del error",
  "error": {}
}
```

## Notas Técnicas
- La API está implementada usando Express.js y TypeScript
- Utiliza Prisma como ORM para la gestión de la base de datos
- Sigue una arquitectura en capas (Controlador -> Servicio -> Repositorio)
- Todos los endpoints son asíncronos
