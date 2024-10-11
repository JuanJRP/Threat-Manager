import { Router } from "express";
import { userRoutes } from "./modules/user/user.routes";
import { assetsRouter } from "./modules/assets/assets.routes";
import { threathsRouter } from "./modules/threats/threats.routes";
import Auth from "./middlewares/Auth";
import { Role } from "@prisma/client";
import { AuthRoutes } from "./modules/auth/AuthRoutes";

const router = Router();
const authMiddleware = new Auth();

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
