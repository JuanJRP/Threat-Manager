import { AssetRepository } from './assets.repository';
import { AssetDTO } from './assets.models';

export class AssetService {
  private assetRepository = new AssetRepository();

  async createAsset(asset: AssetDTO) {
    return this.assetRepository.createAsset(asset);
  }

  async GetAssetById(id: number) {
    return this.assetRepository.GetAssetById(id);
  }

  async GetAssetByName(nameString: string) {
    return this.assetRepository.GetAssetByName(nameString);
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

  async DeleteManyAssetById(array: number[]) {
    await Promise.all(
      array.map(async (item) => {
        await this.assetRepository.DeleteAssetById(item);
      })
    );
  }
}
