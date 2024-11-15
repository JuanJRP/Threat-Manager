import ControlService from "./control.services";
import { ControlDTO, UpdateControlDTO } from "./control.models";
import { Request, Response } from "express";

export class ControlController {
  async createControl(req: Request, res: Response): Promise<void> {
    const controlDTO: ControlDTO = req.body;
    try {
      const control = await ControlService.createControl(controlDTO);
      res.status(201).json(control);
    } catch (err) {
      res.status(500).json({ message: "Error creating Control", err });
    }
  }

  async getAllControls(req: Request, res: Response): Promise<void> {
    try {
      const controls = await ControlService.getAllControls();
      res.status(200).json(controls);
    } catch (err) {
      res.status(500).json({ message: "Error fetching Controls", err });
    }
  }

  async getControlById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const control = await ControlService.getControlById(id);
      res.status(200).json(control);
    } catch (err) {
      res.status(500).json({ message: "Error fetching Control", err });
    }
  }

  async updateControlById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    const data: Partial<UpdateControlDTO> = req.body;
    try {
      const control = await ControlService.updateControlById(id, data);
      res.status(200).json(control);
    } catch (err) {
      res.status(500).json({ message: "Error updating Control", err });
    }
  }

  async deleteControlById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      await ControlService.deleteControlById(id);
      res.status(200).json({ message: "Control deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting Control", err });
    }
  }
}
