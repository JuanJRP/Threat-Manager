import  prisma  from '../../database/prisma';
import { AssetDTO } from './assets.models';

export class AssetRepository {
  async createAsset(asset: AssetDTO) {
    return prisma.asset.create({ data: asset});
  }

  async getAllAssets() {
    return prisma.asset.findMany();
  }

  async GetAssetById(id: number) {
    return prisma.asset.findUnique({ where: { id } });
  }

  async GetAssetByName(name: string) {
    return prisma.asset.findMany({ 
      where: {
        name: {
          equals: name, 
        },
      },
    });
  }

  async GetAssetByType(assetTypeId: number) {
    return prisma.asset.findMany({ where: { asset_type_id: assetTypeId },include: { asset_type: true } });
  }

  async UpdateAssetById(id: number, data: Partial<AssetDTO>) {
    return prisma.asset.update({ where: { id }, data });
  }

  async DeleteAssetById(id: number) {
    return prisma.asset.delete({ where: { id } });
  }
}
