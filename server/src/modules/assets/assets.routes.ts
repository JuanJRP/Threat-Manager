import { Router } from 'express';
import { AssetController } from './assets.controllers';

const router = Router();
const assetController = new AssetController();

router.post('/assets', assetController.createAsset.bind(assetController));
router.get('/assets/:id', assetController.GetAssetById.bind(assetController));
router.get('/assets/type/:assetTypeId', assetController.GetAssetByType.bind(assetController));
router.put('/assets/:id', assetController.UpdateAssetById.bind(assetController));
router.delete('/assets/:id', assetController.DeleteAssetById.bind(assetController));
//router.delete('/assets/type/:assetTypeId', assetController.eliminarVariosAssetsPorTipo.bind(assetController));

export default router;
