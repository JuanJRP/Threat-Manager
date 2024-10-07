import  prisma  from '../../database/prisma';
import { AssetDTO } from './assets.models';

export class AssetRepository {
  async createAsset(asset: AssetDTO) {
    return prisma.asset.create({ data: asset});
  }

  async GetAssetById(id: number) {
    return prisma.asset.findUnique({ where: { id } });
  }

  async GetAssetByName(nameString: string) {
    return prisma.asset.findFirst({ where: { name: nameString } });
  }

  async GetAssetByType(assetTypeId: number) {
    return prisma.asset.findMany({ where: { asset_type_id: assetTypeId } });
  }

  async UpdateAssetById(id: number, data: Partial<AssetDTO>) {
    return prisma.asset.update({ where: { id }, data });
  }

  async DeleteAssetById(id: number) {
    return prisma.asset.delete({ where: { id } });
  }

  async DeleteMany(assetTypeId: number) {
    return prisma.asset.deleteMany({ where: { asset_type_id: assetTypeId } });
  }
}
