import { Router } from "express";
import { AssetTypeController } from "./assets_type.controllers";

const router = Router();
const controller = new AssetTypeController();

router.post("/", controller.create); // Crear un nuevo tipo de activo
router.get("/:id", controller.getById); // Obtener un tipo de activo por su ID
router.get("/", controller.getAll); // Obtener todos los tipos de activos
router.put("/:id", controller.update); // Actualizar un tipo de activo
router.delete("/:id", controller.delete); // Eliminar un tipo de activo

export { router as assetTypeRoutes };
