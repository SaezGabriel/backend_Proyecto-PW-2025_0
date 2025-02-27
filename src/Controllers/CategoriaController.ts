import express, { Request, Response } from "express"
const db = require("../DAO/models")

const CategoriaController = () => {
    const path = "/categorias"

    const router = express.Router()

    router.get("/", async (req : Request, resp : Response) => {

    
        const categorias = await db.Categoria.findAll()
        ///const categorias = [
            
            ///{ CategoriaId: 1, nombre: "Servicio"},
            ///{ CategoriaId: 2, nombre: "Alimentacion"},
            ///{ CategoriaId: 3, nombre: "Ocio"}
        ///];
        resp.json({
            msg : "",
            categorias : categorias
        }) 
    })

    return [ path, router ]
}

export default CategoriaController