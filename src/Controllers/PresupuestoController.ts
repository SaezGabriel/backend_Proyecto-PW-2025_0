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
        const UsuarioId = Number(req.query.UsuarioId)
        console.log(EditarPresupuesto)

        const PresupuestoEncontrado = await db.Presupuesto.findOne({
            where : {
                UsuarioId : UsuarioId,
                monto_Mensual : Number(EditarPresupuesto.PresupuestoSeleccionado.monto_Mensual),
                categoriaId : EditarPresupuesto.PresupuestoSeleccionado.categoriaId
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
                {where :
                    {
                        UsuarioId : UsuarioId,
                        monto_Mensual : Number(EditarPresupuesto.PresupuestoSeleccionado.monto_Mensual),
                        categoriaId : EditarPresupuesto.PresupuestoSeleccionado.categoriaId
                    }
                }
                
            )
            console.log(PresupuestoEditar)
            resp.json({
                msg : "",
                Presupuesto : PresupuestoEditar
            })    

            }
            
            
                 
            
        }
    });

    router.delete("/", async (req : Request, resp : Response) => {
        const id = Number(req.query.id)
        const UsuarioId = Number(req.query.UsuarioId)
        const monto_Mensual = Number(req.query.monto_Mensual)
        const categoriaId = Number(req.query.categoriaId)
    
        console.log(monto_Mensual)
        console.log(categoriaId)

        await db.Presupuesto.destroy({
            where : {
                id : id,
                UsuarioId : UsuarioId,
                monto_Mensual : monto_Mensual,
                categoriaId : categoriaId
            }
        })

        await db.Categoria.destroy({
            where : {
                id : categoriaId,
                UsuarioId : UsuarioId
            }
        })
 
    
        resp.json({
            msg : ""
        })
    })
        
    return [ path, router ]
}

export default PresupuestoController