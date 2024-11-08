// risk_type.routes.ts
import { Router } from "express";
import { RiskTypeController } from "./risk_type.controllers";

const router = Router();
const riskTypeController = new RiskTypeController();

router.post("/", riskTypeController.createRiskType);
router.get("/", riskTypeController.getAllRiskTypes);
router.get("/:id", riskTypeController.getRiskTypeById);
router.delete("/:id", riskTypeController.deleteRiskType);

export { router as riskTypeRouter };



