import express, {Request, Response} from "express"
import { where } from "sequelize"
//import db from "../DAO/models"
const db = require("../DAO/models")

const PresupuestoController = () => {
    const path = "/presupuestos"

    const router = express.Router()

    router.get("/", async (req : Request, resp : Response ) => {
    ///    const proyectos = await db.Proyecto.findAll({
    ///        include : {
    ///           model : db.Categoria,
    ///            as : "Categoria",
    ///            attributes : ["nombre"],
    ///            required : true
    ///        }
    ///    })
        const UsuarioId = Number(req.query.UsuarioId)
        console.log(UsuarioId)
        const presupuestos = await db.Presupuesto.findAll({
            include : {
                model : db.Categoria,
                as : "Categoria",
                attributes : ["nombre"],
                required : true
            },
            where : {
                UsuarioId : UsuarioId
            }
        })

        resp.json({
            msg: "",
            presupuestos: presupuestos
            
        })
        console.log(presupuestos)
    });

    router.put("/", async (req : Request, resp : Response) => {

        const EditarPresupuesto = req.body
        const id = Number(req.query.id)

        const PresupuestoEncontrado = await db.Presupuesto.findOne({
            where : {
                id : id,
            }
            
        })


        console.log(PresupuestoEncontrado)

        if (!PresupuestoEncontrado) {
            resp.status(404).json({ msg: "Usuario no encontrado" })}
        else{
            if(EditarPresupuesto)
            {const PresupuestoEditar = await db.Presupuesto.update({
                monto_Mensual: EditarPresupuesto.monto_Mensual,
                categoriaId: EditarPresupuesto.categoriaId,
                },
                {
                    where : { id : id}
                }
            )
            console.log(PresupuestoEditar) 
            
            
            resp.json({
                msg : "",
                Presupuesto : PresupuestoEditar,
            })
            }
            
            
                 
            
        }
    });

    router.post("/", async (req : Request, resp : Response) => {

        const presupuesto = req.body

        const presupuestoCreado = await db.Presupuesto.create({
            id : null,
            UsuarioId : presupuesto.UsuarioId,
            monto_Mensual : presupuesto.monto_Mensual,
            categoriaId : presupuesto.categoriaId
        })
        resp.json({
            msg : "",
            presupuesto : presupuestoCreado
        })
        });

    router.delete("/", async (req : Request, resp : Response) => {
        const id = Number(req.query.id)

        await db.Presupuesto.destroy({
            where : {
                id : id,
            }
        })

    
        resp.json({
            msg : ""
        })
    })
        
    return [ path, router ]
}

export default PresupuestoController