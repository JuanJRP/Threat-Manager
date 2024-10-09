import morgan from "morgan";
import cors from "cors";
import express, { Express } from "express";
import risksRouter from "./modules/risk/risk.routes";
import assetsRouter from "./modules/assets/assets.routes";
import threathsRouter from "./modules/threats/threats.routes";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//app.use("/", risksRouter);
app.use("/", assetsRouter);
app.use("/", threathsRouter);


export default app;
