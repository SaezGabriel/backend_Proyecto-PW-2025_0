import express, { Request, Response } from "express"
const db = require("../DAO/models")

const RolController = () => {
    const path = "/rol"

    const router = express.Router()

    router.get("/", async (req : Request, resp : Response) => {
        ///const categorias = await db.Categoria.findAll()
        ///const categorias = [
            
            ///{ CategoriaId: 1, nombre: "Servicio"},
            ///{ CategoriaId: 2, nombre: "Alimentacion"},
            ///{ CategoriaId: 3, nombre: "Ocio"}
        ///];
        const roles = await db.Rol.findAll()
        resp.json({
            msg : "",
            roles : roles
        }) 
        
    })

    return [ path, router ]
}

export default RolController