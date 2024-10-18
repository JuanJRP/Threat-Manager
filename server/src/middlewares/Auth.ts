import type { Role } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";
import { HttpException } from "../utils/HttpExceptions";
import { JwtService } from "../services/JwtService";
import { getPermissionsByRoles } from "../config/permissions";
import dotenv from "dotenv";

dotenv.config()

export interface AuthRequest extends Request {
  user?: {
    email: string;
    role: Role[];
  };
}
const jwtService = new JwtService();
const ACCES_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export default class Auth {
  private readonly jwtService: JwtService;
  constructor() {
    this.jwtService = jwtService;
  }
  async verifyToken(
    req: AuthRequest,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new HttpException(401, "No autorizado");
      const [type, token] = authorization.split(" ");
      if (type !== "Bearer") throw new HttpException(401, "No autorizado");
      const decoded = await this.jwtService.verify(token, ACCES_TOKEN_SECRET);
      req.user = decoded as { email: string; role: Role[] };
      next();
    } catch (err) {
      next(err);
    }
  }

  verifyRole(allowedRoles: Role[]) {
    return (req: AuthRequest, _res: Response, next: NextFunction) => {
      if (!req.user || !req.user?.role)
        throw new HttpException(403, "Forbidden");
      const hasRole = req.user.role.some((role) => allowedRoles.includes(role));
      if (!hasRole) throw new HttpException(403, "Forbidden");
      next();
    };
  }
  verifyPermissions(permission: string) {
    return (req: AuthRequest, _res: Response, next: NextFunction): void => {
      if (!req.user || !req.user?.role)
        throw new HttpException(403, "Forbidden");
      const userPermissions = getPermissionsByRoles(req.user.role);
      if (!userPermissions || !userPermissions.includes(permission))
        throw new HttpException(403, `No tienes permisos para ${permission}`);
      next();
    };
  }
}
