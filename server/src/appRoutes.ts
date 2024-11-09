import { Router } from "express";
import { userRoutes } from "./modules/user/user.routes";
import { assetsRouter } from "./modules/assets/assets.routes";
import { threathsRouter } from "./modules/threats/threats.routes";
import { risk_typeRouter } from "./modules/risk_type/risk_type.routes";
import { assetTypeRoutes } from "./modules/assets_type/assets_type.routes";
import Auth from "./middlewares/Auth";
import { Role } from "@prisma/client";
import { AuthRoutes } from "./modules/auth/AuthRoutes";
import { actionPlanRouter } from "./modules/action_plan/action_plan.routes";
import { risksRouter } from "./modules/risk/risk.routes";
import { vulnerabilitiesRouter } from "./modules/vulnerability/vulnerability.routes";
import { controlsRouter } from "./modules/control/control.routes";

const router = Router();
const authMiddleware = new Auth();

router.use("/risks", risksRouter);
router.use("/risk_type", risk_typeRouter);
router.use("/assets", assetsRouter);
router.use("/threats", threathsRouter);
router.use("/action-plans", actionPlanRouter);
router.use("/assets_type", assetTypeRoutes);
router.use("/auth", AuthRoutes);
router.use("/vulnerability", vulnerabilitiesRouter);
router.use("/control", controlsRouter);
router.use("/users", authMiddleware.verifyToken, userRoutes);

export { router as appRoutes };
