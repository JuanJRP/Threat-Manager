import { Request, Response } from 'express';
import * as controlService from './control.services';

// Crear control
export const createControl = async (req: Request, res: Response) => {
    try {
        const control = await controlService.createControl(req.body);
        res.status(201).json(control);
    } catch (error) {
        console.error("Error al crear el control:", error);  // Log del error
        res.status(500).json({ message: 'Error al crear el control', error });
    }
};

// Importar varios controles
export const importControls = async (req: Request, res: Response) => {
    try {
        const controls = await controlService.importControls(req.body);
        res.status(201).json(controls);
    } catch (error) {
        res.status(500).json({ message: 'Error al importar los controles', error });
    }
};

// Consultar controles asociados a vulnerabilidades
export const getControls = async (req: Request, res: Response) => {
    try {
        const controls = await controlService.getControls();
        res.status(200).json(controls);
    } catch (error) {
        res.status(500).json({ message: 'Error al consultar los controles', error });
    }
};

// Modificar control
export const updateControl = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id); 
        const control = await controlService.updateControl(id, req.body);
        res.status(200).json(control);
    } catch (error) {
        res.status(500).json({ message: 'Error al modificar el control', error });
    }
};

// Eliminar control
export const deleteControl = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);  // Convertir req.params.id a número
        await controlService.deleteControl(id);
        res.status(200).json({ message: 'Control eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el control', error });
    }
};

// Eliminar varios controles
export const deleteControls = async (req: Request, res: Response) => {
    try {
        const ids = req.body.ids.map((id: string) => parseInt(id));  // Convertir a número cada id
        await controlService.deleteControls(ids);
        res.status(200).json({ message: 'Controles eliminados' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar los controles', error });
    }
};
