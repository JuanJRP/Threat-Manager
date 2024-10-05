import morgan from "morgan";
import cors from "cors";
import express, { Express } from "express";

const app: Express = express();

app.use(cors());
app.use(morgan("dev"));


export default app;