import { Router } from "express";
import { userRoutes } from "./modules/user/user.routes";
import { assetsRouter } from "./modules/assets/assets.routes";
import { threathsRouter } from "./modules/threats/threats.routes";
import Auth from "./middlewares/Auth";
import { Role } from "@prisma/client";
import { AuthRoutes } from "./modules/auth/AuthRoutes";
import  vulnerabilityRoutes  from "./modules/vulnerability/vulnerability.routes";
import  controlRoutes  from "./modules/control/control.routes";

const router = Router();
const authMiddleware = new Auth();

router.use("/vulnerabilities", vulnerabilityRoutes);  // Rutas de vulnerabilidades
router.use("/controls", controlRoutes);  // Rutas de controles



router.use("/assets", assetsRouter);
router.use("/threat", threathsRouter);
router.use(
  "/users",
  authMiddleware.verifyToken,
  authMiddleware.verifyRole([Role.ADMIN]),
  userRoutes
);
router.use("/auth", AuthRoutes);

//app.use("/", risksRouter);

export { router as appRoutes };
