import express, { Request, Response, Router } from "express";

const db = require("../DAO/models");

const router = Router();
const accessLogPath = "/access-logs";

const getAccessLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const logs = await db.AccessLog.findAll({
            include: [
                {
                    model: db.Usuario,
                    as: "Usuario",
                    attributes: ["nombre", "correo"]
                }
            ]
        });

        res.status(200).json(logs); 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener logs de acceso" });
    }
};


const logOut = async (req:Request , resp: Response) => {
    const data = req.body
    const historial = await db.AccessLog.create({
            id : null,
            usuario_id: data.id,
            access_time : new Date(),
            action : "LogOut",
            firstaccess : false,
        })
        resp.json({
            msg : "",
            historial:historial
        })

}



router.get("/", getAccessLogs);
router.post("/logOut" , logOut);

export default () => [accessLogPath, router];
