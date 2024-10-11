import { Router } from "express";
import UserController from "./user.controllers";
import ValidateRequest from "../../middlewares/ValidateRequest";
import {
  createUserSchema,
  updateUserSchema,
} from "../../validations/UserValidations";
import Auth from "../../middlewares/Auth";

const userController = new UserController();
const authMiddleware = new Auth();
const router = Router();

router.get("/", userController.getAll.bind(userController));
router.get("/:id", userController.getById.bind(userController));
router.post(
  "/",
  ValidateRequest(createUserSchema),
  userController.create.bind(userController)
);
router.patch(
  "/:id",
  ValidateRequest(updateUserSchema),
  userController.update.bind(userController)
);
router.delete(
  "/:id",
  authMiddleware.verifyPermissions("delete"),
  userController.delete.bind(userController)
);

export { router as userRoutes };
