import express, { Request, Response } from "express";
const db = require("../DAO/models");

const EgresoController = () => {
    const path = "/egresos";
    const router = express.Router();

    router.get("/", async (req: Request, res: Response) => {
        const egresos = await db.Egreso.findAll();
        res.json({ msg: "", egresos });
    });

    router.post("/", async (req: Request, res: Response) => {
        const nuevoEgreso = req.body;
        const egresoCreado = await db.Egreso.create({
            fecha: nuevoEgreso.fecha,
            categoria: nuevoEgreso.categoria,
            descripcion: nuevoEgreso.descripcion,
            monto: nuevoEgreso.monto,
            recurrente: nuevoEgreso.recurrente ? true : false  // Aquí se define si es recurrente o no
        });
        res.json({ msg: "", egreso: egresoCreado });
    });

    router.delete("/", async (req: Request, res: Response) => {
        const id = req.query.id;
        await db.Egreso.destroy({ where: { id: id } });
        res.json({ msg: "" });
    });

    router.get("/:id", async (req: Request, res: Response) => {
        const id = req.params.id;
        const egreso = await db.Egreso.findByPk(id);
        res.json({ msg: "", egreso });
    });

    return [path, router];
};

export default EgresoController;
