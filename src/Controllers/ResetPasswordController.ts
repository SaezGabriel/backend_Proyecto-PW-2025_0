import express, { Request, Response } from "express"
const db = require("../DAO/models")
const jwt = require('jsonwebtoken');
const { SHA256 } = require("sha2");

const ResetPasswordController = () => {
    const path = "/ResetPassword"

    const router = express.Router()

    const generarToken = (userId: number) => {
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        return jwt.sign({ userId },process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    }

    
    router.post("/solicitar", async (req : Request, resp : Response) => {

        const {correo} = req.body
        const usuario = await db.Usuario.findOne(
            {
                where : {
                    correo : correo
                }
            }
        )
        if (!usuario) {
            resp.status(404).json({ msg: "Usuario no encontrado" });
        }
        console.log(usuario.id)
        const token = generarToken(usuario.id);
        await db.ResetPassword.create({
            UsuarioId: usuario.id,
            token : token,
            fecha_creacion: new Date(), 
        });
        resp.json({ msg: "", token : token }); 
    })

    router.put("/cambiar", async (req: Request, resp: Response) => {
        const { token, contraseña } = req.body;
    
        const resetEntry = await db.ResetPassword.findOne({
            where: { token },
        });
        console.log(resetEntry)
        if (!resetEntry) {
            resp.status(400).json({ msg: "Token inválido" });
        }
    
        
        const tiempoCreacion = new Date(resetEntry.fecha_creacion);
        const ahora = new Date();
        const diferenciaHoras = (ahora.getTime() - tiempoCreacion.getTime()) / (1000 * 60 * 60);
    
        if (diferenciaHoras > 1) {
            await resetEntry.destroy()
        }
    
        
        const usuario = await db.Usuario.findByPk(resetEntry.UsuarioId);
        if (!usuario) {
            resp.status(404).json({ msg: "Usuario no encontrado" });
        }
        
        console.log(usuario)
        console.log("Contra no HASH:" + contraseña)

        const hashContra = SHA256(contraseña).toString("hex")
        await db.Usuario.update(
            { contraseña: hashContra },
            { where: { id: usuario.id } } 
        );
    
        
        await resetEntry.destroy();
    
        resp.json({ msg: "" });
    });

    return [ path, router ]
}

export default ResetPasswordController
