import { Request, Response } from "express";
import { AssetTypeService } from "./assets_type.services";

const service = new AssetTypeService();

export class AssetTypeController {
  // Crear un nuevo tipo de activo
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const assetType = await service.createAssetType(data);
      res.status(201).json(assetType);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear el tipo de activo", error });
    }
  }

  // Obtener un tipo de activo por su ID
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const assetType = await service.getAssetTypeById(id);
      if (assetType) {
        res.status(200).json(assetType);
      } else {
        res.status(404).json({ message: "Tipo de activo no encontrado" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener el tipo de activo", error });
    }
  }

  // Obtener todos los tipos de activos
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const assetTypes = await service.getAllAssetTypes();
      res.status(200).json(assetTypes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener los tipos de activos", error });
    }
  }

  // Actualizar un tipo de activo
  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const data = req.body;
      const updatedAssetType = await service.updateAssetType(id, data);
      res.status(200).json(updatedAssetType);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar el tipo de activo", error });
    }
  }

  // Eliminar un tipo de activo
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      await service.deleteAssetType(id);
      res.status(200).json({ message: "El id fue borrado correctamente" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al eliminar el tipo de activo", error });
    }
  }
}
