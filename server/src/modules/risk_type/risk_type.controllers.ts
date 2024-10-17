import { Request, Response } from "express";
import riskTypeService from "./risk_type.services";
import { RiskTypeDTO } from "./risk_type.models";

export class RiskTypeController {
  async createRiskType(req: Request, res: Response): Promise<void> {
    const RiskTypeDTO: RiskTypeDTO = req.body;
    try {
      const riskType = await riskTypeService.createRiskType(RiskTypeDTO);
      res.status(201).json(riskType);
    } catch (error) {
      res.status(500).json({ message: "Error al crear el tipo de riesgo" });
    }
  }

  async getAllRiskTypes(req: Request, res: Response): Promise<void> {
    try {
      const riskTypes = await riskTypeService.getAllRiskTypes();
      res.status(200).json(riskTypes);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los tipos de riesgo" });
    }
  }

  async getRiskTypeById(req: Request, res: Response): Promise<void> {
    try {
      const riskType = await riskTypeService.getRiskTypeById(
        Number(req.params.id)
      );
      if (!riskType) {
        res.status(404).json({ message: "Tipo de riesgo no encontrado" });
      }
      res.status(200).json(riskType);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el tipo de riesgo" });
    }
  }

  async updateRiskTypeById(req: Request, res: Response): Promise<void> {
    try {
      const updatedRiskType = await riskTypeService.updateRiskType(
        Number(req.params.id),
        req.body
      );
      res.status(200).json(updatedRiskType);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al actualizar el tipo de riesgo" });
    }
  }

  async deleteRiskTypeById(req: Request, res: Response): Promise<void> {
    try {
      await riskTypeService.deleteRiskType(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el tipo de riesgo" });
    }
  }
}
