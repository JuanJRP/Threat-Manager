import { Router } from "express";
import { ThreathController } from "./threats.controllers";

const router = Router();
const threathController = new ThreathController();

router.post("/", threathController.createThreath);
router.get("/", threathController.getAllThreath);
router.get("/:id", threathController.GetThreathById);
router.get("/name/:name", threathController.GetThreathByName);
router.put("/:id", threathController.UpdateThreathById);
router.delete("//:id", threathController.DeleteThreathById);
router.delete("/deletethreaths", threathController.DeleteManyThreathById);

export { router as threathsRouter };
