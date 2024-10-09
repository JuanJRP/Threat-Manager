import { Router } from 'express';
import { AssetController } from './assets.controllers';

const router = Router();
const assetController = new AssetController();

router.post('/assets', assetController.createAsset);
router.get('/assets', assetController.getAllAssets);
router.get('/assets/:id', assetController.GetAssetById);
router.get('/assets/type/:assetTypeId', assetController.GetAssetByType);
router.get('/assets/name/:name', assetController.GetAssetByName);
router.put('/assets/:id', assetController.UpdateAssetById);
router.delete('/assets/:id', assetController.DeleteAssetById);
router.delete('/deleteAssets', assetController.DeleteManyAssetById);

export default router;
