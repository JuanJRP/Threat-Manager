# Express.js Security Risk Management API

A robust Express.js application for managing security risks, assets, threats, and controls, built with TypeScript and Prisma.

## Features

- User authentication and role-based authorization
- Asset and asset type management
- Threat assessment and tracking
- Risk type categorization
- Vulnerability management
- Control implementation tracking
- Action plan management

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (since Prisma is being used)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/DavidChicaH/gestorDeAmenazas.git
cd ./server
```

2. Install dependencies:

```bash
npm install
```

3. Set up the database and run migrations:

```bash
npx prisma generate
```

## Project Structure

```
├── src/
│   ├── modules/
│   │   ├── action_plan/
│   │   ├── assets/
│   │   ├── assets_type/
│   │   ├── auth/
│   │   ├── control/
│   │   ├── risk_type/
│   │   ├── threats/
│   │   ├── user/
│   │   └── vulnerability/
│   ├── middlewares/
│   │   ├── Auth.ts
│   │   └── ErrorHandler.ts
│   ├── utils/
│   ├── app.ts
│   ├── appRoutes.ts
│   └── index.ts
```

## API Routes

- `/api/auth` - Authentication endpoints
- `/api/users` - User management
- `/api/assets` - Asset management
- `/api/assets_type` - Asset type management
- `/api/threat` - Threat management
- `/api/risk_type` - Risk type management
- `/api/vulnerability` - Vulnerability management
- `/api/control` - Control management
- `/api/action-plans` - Action plan management

## Middleware

The application includes several middleware functions:

- CORS handling
- Request logging (morgan)
- JSON body parsing
- Cookie parsing
- Authentication
- Role-based authorization
- Error handling

## Development

Start the development server:

```bash
npm run dev
```

The server will start at `http://localhost:3000` (or the specified PORT in your environment variables).

## Error Handling

The application includes a centralized error handling mechanism using the `ErrorHandler` middleware. All routes are wrapped with error handling that returns appropriate HTTP status codes and error messages.

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Protected routes require a valid token and appropriate role permissions.

## Support

For support, please open an issue in the repository or contact the development team.
