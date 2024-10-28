import riskControllers from "./risk.controllers";
import { Router } from "express";

const riskController = new riskControllers();
const router = Router();


router.post("/", riskController.createRisk.bind(riskController));
router.get("/", riskController.getAllRisks.bind(riskController));
router.get("/:id", riskController.getRiskById.bind(riskController));
router.put("/:id", riskController.updateRisk.bind(riskController));
router.delete("/:id", riskController.deleteRisk.bind(riskController));

export { router as risksRouter };