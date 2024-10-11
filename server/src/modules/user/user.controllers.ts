import type { NextFunction, Request, Response } from "express";
import UserService from "./user.services";

const userService = new UserService();

class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = userService;
  }

  async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await this.userService.getAll();
      res.status(200).json({ users });
    } catch (err) {
      next(err);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.getById(Number(req.params.id));
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.create(req.body);
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.update(
        Number(req.params.id),
        req.body
      );
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.userService.delete(Number(req.params.id));
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
