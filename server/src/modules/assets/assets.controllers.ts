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

export class AssetController {
  async createAsset(req: Request, res: Response): Promise<void> {
    try {
      const incomingData = req.body;
      const assetDTO: Prisma.AssetCreateInput = {} as Prisma.AssetCreateInput;
      const extraAttributes: Record<string, any> = {};

      Object.entries(incomingData).forEach(([key, value]) => {
        if (VALID_ASSET_FIELDS.includes(key)) {
          if (['access_date', 'entry_date', 'retirement_date'].includes(key)) {
            (assetDTO as any)[key] = new Date(value as string);
          } else {
            (assetDTO as any)[key] = value;
          }
        } else {
          extraAttributes[key] = value;
        }
      });

      if (Object.keys(extraAttributes).length > 0) {
        assetDTO.extra_atributes = extraAttributes;
      }

      const asset = await AssetService.createAsset(assetDTO);
      res.status(201).json(asset);
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
      console.log(id);
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
      const assetDTO: Prisma.AssetUpdateInput = req.body;
      const asset = await AssetService.UpdateAssetById(id, assetDTO);
      res.status(200).json(asset);
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
