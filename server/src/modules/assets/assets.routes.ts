import { Router } from "express";
import { AssetController } from "./assets.controllers";

const router = Router();
const assetController = new AssetController();

router.post("/", assetController.createAsset);
router.get("/", assetController.getAllAssets);
router.get("/:id", assetController.GetAssetById);
router.get("/type/:assetTypeId", assetController.GetAssetByType);
router.get("/name/:name", assetController.GetAssetByName);
router.patch("/:id", assetController.UpdateAssetById);
router.delete("/:id", assetController.DeleteAssetById);
router.delete("/deleteAssets/ids", assetController.DeleteManyAssetById);

export { router as assetsRouter };
