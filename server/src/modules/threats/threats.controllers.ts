import ThreathService from './threats.services';
import { ThreathDTO } from './threats.models';
import { Request, Response } from 'express';

export class ThreathController {

  async createThreath(req: Request, res: Response): Promise<void> {
    const threathDTO: ThreathDTO = req.body;
    try {
      const threath = await ThreathService.createThreath(threathDTO);
      res.status(201).json(threath);
    } catch (err) {
      res.status(500).json({ message: "Error al crear la Amenaza", err });
    }
  }

  async getAllThreath(req: Request, res: Response): Promise<void> {
    try {
      const threath = await ThreathService.getAllThreath();
      res.status(200).json(threath);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener las Amenaza", err });
    }
  }

  async GetThreathById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const threath = await ThreathService.GetThreathById(id);
      console.log(id);
      res.status(200).json(threath);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener la Amenaza", err });
    }
  }

  async GetThreathByName(req: Request, res: Response): Promise<void> {
    const name = req.params.name;
    try {
      const threath = await ThreathService.GetThreathByName(name);
      res.status(200).json(threath);
    } catch (err) {
      res.status(500).json({ message: "Error al obtener la Amenaza", err });
    }
  }

  async UpdateThreathById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      const threathDTO: Partial<ThreathDTO> = req.body;
      const threath = await ThreathService.UpdateThreathById(id, threathDTO);
      res.status(200).json(threath);
    } catch (err) {
      res.status(500).json({ message: "Error al actualizar la Amenaza", err });
    }
  }

  async DeleteThreathById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    try {
      await ThreathService.DeleteThreathById(id);
      res.status(200).json({ message: "Activo eliminado correctamente" });
    } catch (err) {
      res.status(500).json({ message: "Error al eliminar la Amenaza" });
    }
  }

  async DeleteManyThreathById(req: Request, res: Response): Promise<void> {
    try {
      const { ids } = req.body;
      if (!Array.isArray(ids) || ids.length === 0) {
        res.status(400).json({ message: "Invalid array format or empty array" });
      }else{
        await ThreathService.DeleteManyThreathById(ids);
        res.status(200).json({ message: "Threath deleted successfully" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error deleting one or more Threaths" });
    }
  }
}
