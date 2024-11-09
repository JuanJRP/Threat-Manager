# API de Tipos de Riesgo

Esta API proporciona endpoints para la gestión de tipos de riesgo, permitiendo crear, leer, y eliminar (CRUD) diferentes tipos de riesgos en el sistema.

## Estructura del Proyecto

El proyecto sigue una arquitectura en capas:
- **Controllers**: Maneja las peticiones HTTP y respuestas
- **Services**: Contiene la lógica de negocio
- **Repository**: Gestiona las operaciones con la base de datos
- **Models**: Define las interfaces y tipos de datos
- **Routes**: Define las rutas de la API

## Base URL

```
http://localhost:3001/api/risk_type/
```

## Modelo de Datos

```typescript
interface RiskTypeDTO {
  name: string;          // Nombre del tipo de riesgo
  integrity: boolean | null; // Indica si el riesgo afecta la integridad 
  confidentiality: boolean | null; // Indica si el riesgo afecta la confidencialidad
  availability: boolean | null; // Indica si el riesgo afecta la disponibilidad
}
```

## Endpoints

### 1. Crear Tipo de Riesgo
**POST /** 

Crea un nuevo tipo de riesgo.

**Request Body:**
```json
{
    "name": "Riesgo Operacional",
    "integrity": true,
    "confidentiality": false,
    "availability": true
}
```

**Respuestas:**
- `201`: Tipo de riesgo creado exitosamente
- `500`: Error al crear el tipo de riesgo

### 2. Obtener Todos los Tipos de Riesgo
**GET /**

Retorna todos los tipos de riesgo existentes.

**Respuestas:**
- `200`: Lista de tipos de riesgo
- `500`: Error al obtener los tipos de riesgo

### 3. Obtener Tipo de Riesgo por ID
**GET /:id**

Retorna un tipo de riesgo específico por su ID.

**Parámetros de URL:**
- `id`: ID del tipo de riesgo (número)

**Respuestas:**
- `200`: Tipo de riesgo encontrado
- `404`: Tipo de riesgo no encontrado
- `500`: Error al obtener el tipo de riesgo

### 4. Eliminar Tipo de Riesgo
**DELETE /:id**

Elimina un tipo de riesgo existente.

**Parámetros de URL:**
- `id`: ID del tipo de riesgo (número)

**Respuestas:**
- `204`: Tipo de riesgo eliminado exitosamente
- `500`: Error al eliminar el tipo de riesgo

## Manejo de Errores

La API implementa un manejo de errores consistente:

- Errores de servidor (500) incluyen un mensaje descriptivo
- Recursos no encontrados (404) incluyen un mensaje específico

## Tecnologías Utilizadas

- Express.js: Framework web
- Prisma: ORM para la gestión de base de datos
- TypeScript: Lenguaje de programación tipado

## Notas de Implementación

- La API implementa una arquitectura en capas clara y mantenible
- Utiliza TypeScript para proporcionar tipado estático
- Las operaciones de base de datos están abstraídas en el repositorio
- Los servicios manejan la lógica de negocio
- Los controladores se encargan de la gestión de peticiones HTTP
