import { Router } from "express";
import { ActionPlanController } from "./action_plan.controllers";

const router = Router();
const actionPlanController = new ActionPlanController();

router.post(
  "/",
  actionPlanController.CreateActionPlan.bind(actionPlanController)
);
router.get(
  "/",
  actionPlanController.GetAllActionPlans.bind(actionPlanController)
);
router.get(
  "/:id",
  actionPlanController.GetPlanActionById.bind(actionPlanController)
);
router.put(
  "/:id",
  actionPlanController.UpdateActionPlan.bind(actionPlanController)
);
router.delete(
  "/:id",
  actionPlanController.DeleteActionPlan.bind(actionPlanController)
);

export { router as actionPlanRouter };
