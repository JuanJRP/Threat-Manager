import riskControllers from "./risk.controllers";
import { Router } from "express";

const risksRouter = Router();

risksRouter.post("/risks", riskControllers.createRisk);
risksRouter.get("/risks", riskControllers.getAllRisks);
risksRouter.get("/risks/:id", riskControllers.getRiskById);
risksRouter.put("/risks/:id", riskControllers.updateRisk);
risksRouter.delete("/risks/:id", riskControllers.deleteRisk);

export default risksRouter;