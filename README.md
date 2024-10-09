# Gestor de Amenazas

Este proyecto es un sistema de gestión de amenazas que permite a los usuarios registrar y administrar amenazas de manera efectiva. Está construido utilizando Next.js para el frontend y Node.js para el backend, junto con Prisma como ORM para la gestión de bases de datos.

## Estructura del Proyecto

El proyecto está dividido en dos partes principales: `client` y `server`.

### client

- `.next`: Contiene archivos generados por Next.js.
- `app`: Carpeta principal de la aplicación Next.js.
  - `fonts`: Fuentes utilizadas en la aplicación.
  - `store`: Estado global de la aplicación.
  - `globals.css`: Estilos globales.
  - `layout.tsx`: Diseño principal de la aplicación.
  - `page.tsx`: Página principal.

### server

- `node_modules`: Dependencias del servidor.
- `prisma`: Carpeta para la gestión de base de datos con Prisma.
  - `migrations`: Migraciones de base de datos.
  - `schema.prisma`: Definición del esquema de la base de datos.
- `src`: Código fuente del servidor.
  - `database`: Configuración de la base de datos.
  - `middlewares`: Middlewares utilizados en la aplicación.
  - `modules`: Módulos de la aplicación.
    - `app.ts`: Archivo principal del servidor.
    - `index.ts`: Archivo donde se inicia el servidor
- `.env`: Variables de entorno.
- `README.md`: Este archivo.

## Instalación

Para instalar las dependencias del proyecto, ejecuta los siguientes comandos en la raíz del proyecto:

# Instalar dependencias del cliente
```bash
cd client
npm install
```

# Instalar dependencias del servidor
```bash
cd server
npm install
npx prisma generate
```

## Prisma Studio

Prisma Studio es una herramienta de interfaz gráfica que te permite explorar y editar tus datos en la base de datos de manera visual.

### Instalación y Uso

Para utilizar Prisma Studio, asegúrate de que tus dependencias de Prisma estén correctamente instaladas. Luego, puedes iniciar Prisma Studio con el siguiente comando:

# En la carpeta del servidor
```bash
cd server
npx prisma studio
```

## Desarrolladores

### Front-End
- **Daniel ALzate Zapata**
- **Manuela Martínez loaiza**
- **David Alejandro Chica**

### Back-End
- **Jorge Alejandro Zapata Sanchez**
- **Juan Jose Restrepo Pabon**
- **David Alejandro Chica**
