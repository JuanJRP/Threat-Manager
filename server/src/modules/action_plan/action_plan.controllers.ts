import type { NextFunction, Request, Response } from "express";
import ActionPlanService from "./action_plan.services";

const actionPlanService = new ActionPlanService();

export class ActionPlanController {
  private readonly actionPlanService: ActionPlanService;
  constructor() {
    this.actionPlanService = actionPlanService;
  }

  async GetAllActionPlans(_req: Request, res: Response, next: NextFunction) {
    try {
      const actionPlans = await this.actionPlanService.getAll();
      res.status(200).json({ actionPlans });
    } catch (err) {
      next(err);
    }
  }

  async GetPlanActionById(req: Request, res: Response, next: NextFunction) {
    try {
      const actionPlan = await this.actionPlanService.getById(Number(req.params.id));
      res.status(200).json({ actionPlan });
    } catch (err) {
      next(err);
    }
  }

  async CreateActionPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const actionPlan = await this.actionPlanService.create(req.body);
      res.status(201).json({ actionPlan });
    } catch (err) {
      next(err);
    }
  }

  async UpdateActionPlan(req: Request, res: Response, next: NextFunction) {
    try {
      const actionPlan = await this.actionPlanService.update(
        Number(req.params.id),
        req.body
      );
      res.status(200).json({ actionPlan });
    } catch (err) {
      next(err);
    }
  }

  async DeleteActionPlan(req: Request, res: Response, next: NextFunction) {
    try {
      await this.actionPlanService.delete(Number(req.params.id));
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
