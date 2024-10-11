import * as controlRepository from './control.repository';

// Crear control
export const createControl = async (data: any) => {
    return controlRepository.createControl(data);
};

// Importar varios controles
export const importControls = async (data: any[]) => {
    return controlRepository.importControls(data);
};

// Consultar controles asociados a vulnerabilidades
export const getControls = async () => {
    return controlRepository.getControls();
};

// Modificar control
export const updateControl = async (id: number, data: any) => {
    return controlRepository.updateControl(id, data);
};

// Eliminar control
export const deleteControl = async (id: number) => {
    return controlRepository.deleteControl(id);
};

// Eliminar varios controles
export const deleteControls = async (ids: number[]) => {
    return controlRepository.deleteControls(ids);
};
