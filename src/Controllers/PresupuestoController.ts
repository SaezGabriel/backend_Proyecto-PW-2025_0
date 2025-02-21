import express, {Request, Response} from "express"
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
        const presupuestos = [
            
            { id: 1, CategoriaId: 0, Monto: 129.99},
            { id: 2, CategoriaId: 1, Monto: 1229.99},
            { id: 3, CategoriaId: 2, Monto: 779.99}
        ];

        resp.json({
            msg: "",
            presupuestos: presupuestos
        })
        
    });
        
    return [ path, router ]
}

export default PresupuestoController