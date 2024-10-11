import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear control
export const createControl = async (data: any) => {
    return prisma.control.create({
        data,
    });
};

// Importar varios controles
export const importControls = async (data: any[]) => {
    return prisma.control.createMany({
        data,
    });
};

// Consultar controles asociados a vulnerabilidades
export const getControls = async () => {
    return prisma.control.findMany({
        include: {
            vulnerability: true,  // Incluir las vulnerabilidades asociadas
        },
    });
};

// Modificar control
export const updateControl = async (id: number, data: any) => {
    return prisma.control.update({
        where: { id },
        data,
    });
};

// Eliminar control
export const deleteControl = async (id: number) => {
    return prisma.control.delete({
        where: { id },
    });
};

// Eliminar varios controles
export const deleteControls = async (ids: number[]) => {
    return prisma.control.deleteMany({
        where: {
            id: {
                in: ids,
            },
        },
    });
};
