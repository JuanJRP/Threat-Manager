import { AssetTypeRepository } from "./assets_type.repository";
import { AssetTypeDTO } from "./assets_type.models";

const repository = new AssetTypeRepository();

export class AssetTypeService {
  // Crear un nuevo tipo de activo
  async createAssetType(data: Omit<AssetTypeDTO, "id">): Promise<AssetTypeDTO> {
    return await repository.createAssetType(data);
  }

  // Obtener un tipo de activo por su ID
  async getAssetTypeById(id: number): Promise<AssetTypeDTO | null> {
    return await repository.getAssetTypeById(id);
  }

  // Obtener todos los tipos de activos
  async getAllAssetTypes(): Promise<AssetTypeDTO[]> {
    return await repository.getAllAssetTypes();
  }

  // Actualizar un tipo de activo
  async updateAssetType(
    id: number,
    data: Partial<AssetTypeDTO>
  ): Promise<AssetTypeDTO> {
    return await repository.updateAssetType(id, data);
  }

  // Eliminar un tipo de activo
  async deleteAssetType(id: number): Promise<void> {
    return await repository.deleteAssetType(id);
  }
}
