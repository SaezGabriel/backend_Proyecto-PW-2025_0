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
        console.log("Nuevo egreso: "+ nuevoEgreso.recursivo)
        const egresoCreado = await db.Egresos.create({
            id : null,
            UsuarioId : nuevoEgreso.UsuarioId,
            monto : nuevoEgreso.monto,
            fecha : nuevoEgreso.fecha,
            descripcion : nuevoEgreso.descripcion,
            recurrente : nuevoEgreso.recurrente,
            categoriaId : nuevoEgreso.categoriaId
        })

        console.log("Egreso creado: " + egresoCreado)

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

    // Operacion para obtener un egreso segun id
    router.get("/:id", async (req : Request, resp : Response ) => {
        const idBuscada = req.params.id
        const egreso = await db.Egresos.findAll({
            where : {id : idBuscada},
            include : {
                model : db.Categoria,
                as : "Categoria",
                attributes : ["nombre"],
                required : true
            }
        })
        if(!egreso){
            resp.json({
                msg : "Egreso no encontrado"
            })
        }else{
            resp.json({
                msg : "",
                egreso :  egreso[0]
            })
        }
    })

    return [ path, router ]
}

export default EgresosController