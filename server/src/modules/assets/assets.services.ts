import { AssetRepository } from './assets.repository';
import { AssetDTO } from './assets.models';

class AssetService {
  private assetRepository = new AssetRepository();

  async createAsset(asset: AssetDTO) {
    return this.assetRepository.createAsset(asset);
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

  async UpdateAssetById(id: number, data: Partial<AssetDTO>) {
    return this.assetRepository.UpdateAssetById(id, data);
  }

  async DeleteAssetById(id: number) {
    return this.assetRepository.DeleteAssetById(id);
  }

  async DeleteManyAssetById(array: number[]): Promise<void> {
    await Promise.all(
      array.map(async (item) => {
        await this.assetRepository.DeleteAssetById(item);
      })
    );
  }
}

export default new AssetService();