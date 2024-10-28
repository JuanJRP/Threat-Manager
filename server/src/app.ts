import morgan from "morgan";
import cors from "cors";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import ErrorHandler from "./middlewares/ErrorHandler";
import { HttpException } from "./utils/HttpExceptions";
import { Request, Response, NextFunction } from "express";
import { appRoutes } from "./appRoutes";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api", appRoutes);

// handling not existing routes
app.use((_req: Request, res: Response, next: NextFunction) => {
  next(new HttpException(404, "Not found"));
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  ErrorHandler(err, req, res, next);
});

export default app;
