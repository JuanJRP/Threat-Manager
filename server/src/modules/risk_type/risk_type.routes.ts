import { Router } from "express";
import { RiskTypeController } from "./risk_type.controllers";

const router = Router();
const riskTypeController = new RiskTypeController();

router.post("/", riskTypeController.createRiskType);
router.get("/", riskTypeController.getAllRiskTypes);
router.get("/:id", riskTypeController.getRiskTypeById);
router.put("/:id", riskTypeController.updateRiskTypeById);
router.delete("/:id", riskTypeController.deleteRiskTypeById);

export { router as risk_typeRouter };
