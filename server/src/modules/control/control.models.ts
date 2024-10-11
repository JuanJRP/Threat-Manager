import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

// Modelo de Control
export const controlModel = prisma.control;  // Mejor nombrar como controlModel para más claridad

// Definición de tipos adicionales, si es necesario
export type ControlCreateInput = Prisma.ControlCreateInput;
