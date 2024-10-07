import { Request, Response } from "express";
import riskServices from "./risk.services";
import Risk from "./risk.models";

class RiskController {
  async createRisk(req: Request, res: Response): Promise<void> {
    const risk: Risk = req.body;
    try {
      await riskServices.createRisk(risk);
      res.status(201).json({ message: "Riesgo creado correctamente" });
    } catch (err) {
      res.status(500).json({ message: "Error al crear el riesgo", err });
    }
  }

  async getAllRisks(req: Request, res: Response): Promise<void> {
    try {
      const risks = await riskServices.getAllRisks();
      res.status(200).json(risks);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener los riesgos" , err});
    }
  }

  async getRiskById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      const risk = await riskServices.getRiskById(id);
      res.status(200).json(risk);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener el riesgo" });
    }
  }

  async updateRisk(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const frequency = parseInt(req.body.frequency);

    try {
      await riskServices.updateRisk(id, frequency);
      res.status(200).json({ message: "Riesgo actualizado correctamente" });
    } catch (err) {
      res.status(500).json({ message: "Error al actualizar el riesgo" });
    }
  }

  async deleteRisk(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);

    try {
      await riskServices.deleteRisk(id);
      res.status(200).json({ message: "Riesgo eliminado correctamente" });
    } catch (err) {
      res.status(500).json({ message: "Error al eliminar el riesgo" });
    }
  }
}

export default new RiskController();
