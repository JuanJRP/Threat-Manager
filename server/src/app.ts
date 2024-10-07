import morgan from "morgan";
import cors from "cors";
import express, { Express } from "express";
import risksRouter from "./modules/risk/risk.routes";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/", risksRouter);

export default app;
