import express, {Request, Response} from "express"
import { where } from "sequelize"
//import db from "../DAO/models"
const db = require("../DAO/models")

const EgresosController = () => {
    const path = "/egresos"

    const router = express.Router()

    // Operacion para listar egresos
    // Endpoint Listar egresos
    // Ruta : "/egresos"
    // Method: GET
    // Input
    // Output:
    //  En el caso que login sea correcto:
    //  {
    //      "msg" : "",
    //      "egresos" : [
    //          {
    //              "id" : n,
    //              "UsuarioId" : x,
    //              "monto" : xx.xx,
    //              "fecha" : DD/MM/YYYY,
    //              "descripcion" : "...",
    //              "recurrente" : True/False,
    //              "categoria" : "...",
    //          },...
    //  }
    //  En el caso de error:
    //  {
    //      "msg" : "Error: ..."  
    //  }
    router.get("/", async (req : Request, resp : Response ) => {
        const egresos = await db.Egresos.findAll({
            include : {
                model : db.Categoria,
                as : "Categoria",
                attributes : ["nombre"],
                required : true
            }
        })
        resp.json({
            msg : "",
            egresos : egresos
        })
    })

    /*
    Endpoint de registro de Egreso
    Path : "/egresos"
    Metodo: POST
    Input :
        {
            "UsuarioId" : n,
            "monto" : xx.xx,
            "fecha" : DD/MM/YYYY,
            "descripcion" : "...",
            "recurrente" : True/False,
            "categoriaId" : n
        }
    Output:
        {
            msg : "",
            egreso : {
                ...
            }
        }
    */
    router.post("/", async (req : Request, resp : Response) => {
        const nuevoEgreso = req.body

        const egresoCreado = await db.Egresos.create({
            id : null,
            monto : nuevoEgreso.monto,
            fecha : nuevoEgreso.fecha,
            descripcion : nuevoEgreso.descripcion,
            recurrente : nuevoEgreso.recurrente,
            categoriaId : nuevoEgreso.categoria
        })

        resp.json({
            msg : "",
            egreso : egresoCreado
        })
    })

    router.delete("/", async (req : Request, resp : Response) => {
        const id = Number(req.query.id)
        const UsuarioId = Number(req.query.UsuarioId)

        await db.Egresos.destroy({
            where : {
                id : id,
                UsuarioId : UsuarioId
            }
        })
    
        resp.json({
            msg : ""
        })
    })
        
    return [ path, router ]
}

export default EgresosController