import express, { Request, Response } from "express"
const db = require("../DAO/models")

const CategoriaController = () => {
    const path = "/categorias"

    const router = express.Router()

    router.get("/", async (req : Request, resp : Response) => {
        const categorias = await db.Categoria.findAll({
            attributes: ["id", "nombre"]
        })
        resp.json({
            msg : "",
            categorias : categorias
        }) 
    })

    return [ path, router ]
}

export default CategoriaController