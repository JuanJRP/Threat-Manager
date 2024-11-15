import { Router } from "express";
import AuthController from "./AuthController";
import ValidateRequest from "../../middlewares/ValidateRequest";
import {
  loginUserSchema,
  registerUserSchema,
} from "../../validations/UserValidations";

const router = Router();
const authController = new AuthController();

router.post(
  "/login",
  ValidateRequest(loginUserSchema),
  authController.login.bind(authController)
);
router.post(
  "/register",
  ValidateRequest(registerUserSchema),
  authController.register.bind(authController)
);
router.post("/refresh", authController.refresh.bind(authController));
router.post("/logout", authController.logout.bind(authController));

export { router as AuthRoutes };
