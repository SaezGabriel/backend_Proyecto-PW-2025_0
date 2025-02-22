import express, { Express, Router } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import EgresoContoller from "./Controllers/EgresoContoller";

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 5000;

const [egresoPath, egresoRouter] = EgresoContoller();
app.use(egresoPath as string, egresoRouter as Router);

app.listen(port, () => {
console.log(`[Server]: Servidor ejecutándose en el puerto ${port}`);
});
