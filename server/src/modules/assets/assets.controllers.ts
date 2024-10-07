import { Request, Response } from 'express';
import { AssetService } from './assets.services';
import { AssetDTO } from './assets.models';

export class AssetController {
  private assetService = new AssetService();

  async createAsset(req: Request, res: Response) {
    const assetDTO: AssetDTO = req.body;
    const asset = await this.assetService.createAsset(assetDTO);
    res.json(asset);
  }

  async GetAssetById(req: Request, res: Response) {
    const asset = await this.assetService.GetAssetById(+req.params.id);
    if (asset) {
      res.json(asset);
    } else {
      res.status(404).send("Asset no encontrado");
    }
  }

  async GetAssetByType(req: Request, res: Response) {
    const assets = await this.assetService.GetAssetByType(+req.params.assetTypeId);
    res.json(assets);
  }

  async UpdateAssetById(req: Request, res: Response) {
    const assetDTO: Partial<AssetDTO> = req.body;
    const asset = await this.assetService.UpdateAssetById(+req.params.id, assetDTO);
    res.json(asset);
  }

  async DeleteAssetById(req: Request, res: Response) {
    await this.assetService.DeleteAssetById(+req.params.id);
    res.sendStatus(204);
  }

  /*async eliminarVariosAssetsPorTipo(req: Request, res: Response) {
    const { assetTypeId } = req.body;
    await this.assetService.eliminarVariosAssetsPorTipo(assetTypeId);
    res.sendStatus(204);
  }*/
}
