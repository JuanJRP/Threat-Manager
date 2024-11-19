import AssetService from "./assets.services";
import { Request, Response } from "express";
import type { Prisma } from "@prisma/client";

const VALID_ASSET_FIELDS = [
  'process',
  'name',
  'description',
  'format',
  'software_version',
  'manufacturer',
  'physical_location',
  'electronic_location',
  'responsible',
  'user_access',
  'access_date',
  'state',
  'entry_date',
  'retirement_date',
  'availability',
  'integrity',
  'confidentiality',
  'criticality',
  'asset_type_id',
  'user_id'
];

const EXCLUDED_FIELDS = ['id', 'extra_atributes'];

export class AssetController {
  async createAsset(req: Request, res: Response): Promise<void> {
    try {
      const incomingData = req.body;
      const assetDTO: Partial<Prisma.AssetCreateInput> = {};
      const extraAttributes: Record<string, any> = {};

      // Solo procesar campos que existen en los datos entrantes
      for (const [key, value] of Object.entries(incomingData)) {
        // Ignorar campos con valores null, undefined o cadenas vacías
        if (value === null || value === undefined || value === '') {
          continue;
        }

        if (VALID_ASSET_FIELDS.includes(key)) {
          if (['access_date', 'entry_date', 'retirement_date'].includes(key) && value) {
            (assetDTO as any)[key] = new Date(value as string);
          } else {
            (assetDTO as any)[key] = value;
          }
        } else {
          extraAttributes[key] = value;
        }
      }

      // Solo incluir extra_atributes si realmente hay atributos extra
      if (Object.keys(extraAttributes).length > 0) {
        assetDTO.extra_atributes = extraAttributes;
      }

      // Solo crear el asset si hay al menos un campo válido
      if (Object.keys(assetDTO).length > 0) {
        const asset = await AssetService.createAsset(assetDTO as Prisma.AssetCreateInput);
        res.status(201).json(asset);
      } else {
        res.status(400).json({ message: "No se proporcionaron campos válidos para crear el activo" });
      }
    } catch (err) {
      console.error('Error creating asset:', err);
      res.status(500).json({ message: "Error al crear el Activo", err });
    }
  }

  async getAllAssets(req: Request, res: Response): Promise<void> {
    try {
      const assets = await AssetService.getAllAssets();
      res.status(200).json(assets);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener los Activos", err });
    }
  }

  async GetAssetById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const asset = await AssetService.GetAssetById(id);
      
      res.status(200).json(asset);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener el Activo", err });
    }
  }

  async GetAssetByType(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.assetTypeId);
    try {
      const assets = await AssetService.GetAssetByType(id);
      res.status(200).json(assets);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener el Activo", err });
    }
  }

  async GetAssetByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    try {
      const asset = await AssetService.GetAssetByName(name);
      res.status(200).json(asset);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener el Activo", err });
    }
  }

  async UpdateAssetById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const incomingData = req.body;
      const assetDTO: Partial<Prisma.AssetUpdateInput> = {};
      const extraAttributes: Record<string, any> = {};

      // Eliminar campos excluidos y extra_atributes de los datos entrantes
      const cleanedData = { ...incomingData };
      EXCLUDED_FIELDS.forEach(field => delete cleanedData[field]);

      // Procesar campos que existen en los datos entrantes
      for (const [key, value] of Object.entries(cleanedData)) {
        // Ignorar campos con valores null, undefined o cadenas vacías
        if (value === null || value === undefined || value === '') {
          continue;
        }

        if (VALID_ASSET_FIELDS.includes(key)) {
          if (['access_date', 'entry_date', 'retirement_date'].includes(key) && value) {
            (assetDTO as any)[key] = new Date(value as string);
          } else {
            (assetDTO as any)[key] = value;
          }
        } else {
          // Solo agregar a extra_attributes si no es un campo excluido
          if (!EXCLUDED_FIELDS.includes(key)) {
            extraAttributes[key] = value;
          }
        }
      }

      // Solo incluir extra_atributes si hay nuevos atributos extra
      if (Object.keys(extraAttributes).length > 0) {
        assetDTO.extra_atributes = extraAttributes;
      }

      // Solo actualizar el asset si hay al menos un campo para actualizar
      if (Object.keys(assetDTO).length > 0) {
        const asset = await AssetService.UpdateAssetById(id, assetDTO as Prisma.AssetUpdateInput);
        res.status(200).json(asset);
      } else {
        res.status(400).json({ message: "No se proporcionaron campos válidos para actualizar el activo" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error al actualizar el Activo", err });
    }
  }

  async DeleteAssetById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      await AssetService.DeleteAssetById(id);
      res.status(200).json({ message: "Activo eliminado correctamente" });
    } catch (err) {
      res.status(500).json({ message: "Error al eliminar el Activo" });
    }
  }

  async DeleteManyAssetById(req: Request, res: Response): Promise<void> {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        res
          .status(400)
          .json({ message: "Invalid array format or empty array" });
      } else {
        await AssetService.DeleteManyAssetById(ids);
        res.status(200).json({ message: "Assets deleted successfully" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error deleting one or more assets" });
    }
  }
}
