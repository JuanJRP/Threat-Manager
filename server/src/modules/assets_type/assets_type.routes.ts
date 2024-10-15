import { Router } from "express";
import { AssetTypeController } from "./assets_type.controllers";

const router = Router();
const controller = new AssetTypeController();

router.post("/asset-types", controller.create);     // Crear un nuevo tipo de activo
router.get("/asset-types/:id", controller.getById); // Obtener un tipo de activo por su ID
router.get("/asset-types", controller.getAll);      // Obtener todos los tipos de activos
router.put("/asset-types/:id", controller.update);  // Actualizar un tipo de activo
router.delete("/asset-types/:id", controller.delete); // Eliminar un tipo de activo

export { router as assetTypeRoutes };
