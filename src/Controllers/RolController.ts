import express, { Request, Response } from "express"
const db = require("../DAO/models")

const RolController = () => {
    const path = "/rol"

    const router = express.Router()

    router.get("/", async (req : Request, resp : Response) => {
        
        const roles = await db.Rol.findAll()
        resp.json({
            msg : "",
            roles : roles
        }) 
        
    })

    return [ path, router ]
}

export default RolController