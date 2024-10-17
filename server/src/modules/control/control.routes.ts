import { Router } from "express";
import { ControlController } from "./control.controllers";

const router = Router();
const controlController = new ControlController();

router.post("/", controlController.createControl);
router.get("/", controlController.getAllControls);
router.get("/:id", controlController.getControlById);
router.put("/:id", controlController.updateControlById);
router.delete("/:id", controlController.deleteControlById);

export { router as controlsRouter };
