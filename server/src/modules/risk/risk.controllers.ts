import { NextFunction, Request, Response } from "express";
import RiskService from "./risk.services";
import { Prisma } from "@prisma/client";

const riskService = new RiskService();

class RiskController {
  private readonly riskService: RiskService;
  constructor() {
    this.riskService = riskService;
  }

  async createRisk(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const risk: Prisma.RiskCreateInput = req.body;
    try {
      await this.riskService.createRisk(risk);
      res.status(201).json({ risk });
    } catch (err) {
      next(err);
    }
  }

  async getAllRisks(
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const risks = await this.riskService.getAllRisks();
      res.status(200).json({ risks });
    } catch (err) {
      next(err);
    }
  }

  async getRiskById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const risk = await this.riskService.getRiskById(id);
      res.status(200).json({ risk });
    } catch (err) {
      next(err);
    }
  }

  async updateRisk(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id: number = parseInt(req.params.id);
    const risk: Prisma.RiskUpdateInput = req.body;
    try {
      const newRisk = await this.riskService.updateRisk(id, risk);
      res.status(200).json({ newRisk });
    } catch (err) {
      next(err);
    }
  }

  async deleteRisk(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      await this.riskService.deleteRisk(id);
      res.status(204).json({ message: "Riesgo eliminado correctamente" });
    } catch (err) {
      next(err);
    }
  }
}

export default RiskController;
