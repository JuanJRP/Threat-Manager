import { AssetRepository } from "./assets.repository";
import type { Prisma } from "@prisma/client";

class AssetService {
  private assetRepository = new AssetRepository();

  async createAsset(assetDTO: Prisma.AssetCreateInput) {
    return this.assetRepository.createAsset(assetDTO);
  }
  async getAllAssets() {
    return this.assetRepository.getAllAssets();
  }

  async GetAssetById(id: number) {
    return this.assetRepository.GetAssetById(id);
  }

  async GetAssetByName(name: string) {
    return this.assetRepository.GetAssetByName(name);
  }

  async GetAssetByType(assetTypeId: number) {
    return this.assetRepository.GetAssetByType(assetTypeId);
  }

  async UpdateAssetById(id: number, data: Prisma.AssetUpdateInput) {
    return this.assetRepository.UpdateAssetById(id, data);
  }

  async DeleteAssetById(id: number) {
    return this.assetRepository.DeleteAssetById(id);
  }

  async DeleteManyAssetById(array: number[]): Promise<void> {
    await Promise.all(
      array.map(async (id) => {
        try {
          await this.assetRepository.DeleteAssetById(id);
        } catch (err) {
          console.error(`Error deleting asset with id ${id}`);
        }
      })
    );
  }
}

export default new AssetService();
