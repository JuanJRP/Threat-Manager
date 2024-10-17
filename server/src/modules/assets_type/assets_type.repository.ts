import { PrismaClient } from "@prisma/client";
import { AssetTypeDTO } from "./assets_type.models";

const prisma = new PrismaClient();

export class AssetTypeRepository {
  // Agregar un nuevo tipo de activo
  async createAssetType(data: Omit<AssetTypeDTO, "id">): Promise<AssetTypeDTO> {
    return await prisma.asset_type.create({
      data,
    });
  }

  // Obtener un tipo de activo por su ID
  async getAssetTypeById(id: number): Promise<AssetTypeDTO | null> {
    return await prisma.asset_type.findUnique({
      where: { id },
    });
  }

  // Obtener todos los tipos de activos
  async getAllAssetTypes(): Promise<AssetTypeDTO[]> {
    return await prisma.asset_type.findMany();
  }

  // Editar un tipo de activo
  async updateAssetType(
    id: number,
    data: Partial<AssetTypeDTO>
  ): Promise<AssetTypeDTO> {
    return await prisma.asset_type.update({
      where: { id },
      data,
    });
  }

  // Eliminar un tipo de activo
  async deleteAssetType(id: number): Promise<void> {
    await prisma.asset_type.delete({
      where: { id },
    });
  }
}
