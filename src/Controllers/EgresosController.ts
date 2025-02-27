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
            include: {
                model: db.Categoria,
                as: "Categoria",
                attributes: ["nombre"],
                required: true
            }
        });
        
        resp.json({
            msg : "",
            egresos : egresos
        })
    })

    router.get("/todo/:id", async (req : Request, resp : Response ) => {
        const UsuarioId = Number(req.params.id)

        const egresos = await db.Egresos.findAll({
            where: {
                UsuarioId: UsuarioId
            },
            include: {
                model: db.Categoria,
                as: "Categoria",
                attributes: ["nombre"],
                required: true
            },
            order: [
                ['fecha', 'DESC']
            ]
        });
        
        resp.json({
            msg : "",
            egresos : egresos
        })
    })

    function mesesEntre(fechaOrigen : Date, fechaFin : Date) {
        return (fechaFin.getMonth() - fechaOrigen.getMonth()) + 
          (12 * (fechaFin.getFullYear() - fechaOrigen.getFullYear()))
    }

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
            UsuarioId : nuevoEgreso.UsuarioId,
            monto : nuevoEgreso.monto,
            fecha : nuevoEgreso.fecha,
            descripcion : nuevoEgreso.descripcion,
            recursivo : nuevoEgreso.recurrente,
            categoriaId : nuevoEgreso.categoriaId
        })

        const egresosRecur : {UsuarioId : number, monto : number, fecha : Date, descripcion : string, recursivo : boolean, categoriaId : number}[] = []

        if (nuevoEgreso.recurrente) {
            
            const fechaBase = new Date(nuevoEgreso.fecha);
            const fechaHoy = new Date()

            const meses = mesesEntre(fechaBase, fechaHoy) // Un año de egresos
            
            console.log("================================================")
            console.log("Meses entre: "+meses)
            console.log("================================================")

            for (let i = 1; i <= meses; i++) {
                const nuevaFecha = new Date(fechaBase);
                nuevaFecha.setMonth(nuevaFecha.getMonth() + i); // Sumar meses

                const egresoRecurrente = await db.Egresos.create({
                    UsuarioId: nuevoEgreso.UsuarioId,
                    monto: nuevoEgreso.monto,
                    fecha: nuevaFecha,
                    descripcion: nuevoEgreso.descripcion,
                    recursivo: nuevoEgreso.recurrente,
                    categoriaId: nuevoEgreso.categoriaId
                });

                egresosRecur.push(egresoRecurrente);
            }
        }
        console.log("Egreso creado: " + egresoCreado)

        resp.json({
            msg : "",
            egreso : egresoCreado,
            egresosRecur : egresosRecur
        })
    })

    router.delete("/", async (req : Request, resp : Response) => {
        const id = Number(req.query.id)

        await db.Egresos.destroy({
            where : {
                id : id
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

    router.post("/editar", async (req : Request, resp : Response) => {
        const egresoEditar = req.body
        const egresoEditado = await db.Egresos.update({
            monto : egresoEditar.monto,
            fecha : egresoEditar.fecha,
            descripcion : egresoEditar.descripcion,
            recursivo : egresoEditar.recurrente,
            categoriaId : egresoEditar.categoriaId
        }, {
            where : {
                id : egresoEditar.id
            }
        })

        console.log("Egreso editado: " + egresoEditado)

        resp.json({
            msg : "",
            egreso : egresoEditado
        })
    })

    return [ path, router ]
}

export default EgresosController