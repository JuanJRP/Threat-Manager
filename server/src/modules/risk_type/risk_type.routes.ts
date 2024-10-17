import { Router } from "express";
import { RiskTypeController } from "./risk_type.controllers";

const router = Router();
const riskTypeController = new RiskTypeController();

router.post("/risk-type", riskTypeController.createRiskType);
router.get("/risk-type", riskTypeController.getAllRiskTypes);
router.get("/risk-type/:id", riskTypeController.getRiskTypeById);
router.put("/risk-type/:id", riskTypeController.updateRiskTypeById);
router.delete("/risk-type/:id", riskTypeController.deleteRiskTypeById);

export { router as risk_typeRouter };
