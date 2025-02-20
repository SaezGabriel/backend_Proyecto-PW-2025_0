import express, {Request, Response} from "express"
const db = require("../DAO/models")

const ProyectoController = () => {
    const path : string = "/proyectos"

    const router = express.Router()

    // Operacion para listar proyectos
    // Endpoint Listar Proyectos
    // Ruta : "/proyectos"
    // Method: GET
    // Input
    // Output:
    //  En el caso que login sea correcto:
    //  {
    //      "msg" : "",
    //      "proyectos" : [
    //          {
    //              "id" : 1,
    //              "nombre" : "Proyecto 1",
    //              "nro_pom" : 5,
    //              "categoria" : 1,
    //              "status" : 1
    //          },
    //          {
    //              "id" : 2,
    //              "nombre" : "Proyecto 2",
    //              "nro_pom" : 2,
    //              "categoria" : 2,
    //              "status" : 1
    //          }
    //  }
    //  En el caso de error:
    //  {
    //      "msg" : "Error: ..."  
    //  }
    router.get("/", async (req : Request, resp : Response ) => {
        const proyectos = await db.Proyecto.findAll({
            include : {
                model : db.Categoria,
                as : "Categoria",
                attributes : ["nombre"],
                required : true
            }
        })

        resp.json({
            msg : "",
            proyectos : proyectos
        })
    })

    /*
    Endpoint de registro de Proyecto
    Path : "/proyectos"
    Metodo: POST
    Input :
        {
            nombre: "",
            categoria : 1
        }
    Output:
        {
            msg : "",
            proyecto : {
                ...
            }
        }
    */
    router.post("/", async (req : Request, resp : Response) => {
        const nuevoProyecto = req.body

        const proyectoCreado = await db.Proyecto.create({
            id : null,
            nombre : nuevoProyecto.nombre,
            nro_pom : 0,
            categoriaId : nuevoProyecto.categoria,
            status : 0
        })

        resp.json({
            msg : "",
            proyecto : proyectoCreado
        })
    })

    router.delete("/", async (req : Request, resp : Response) => {
        const id = req.query.id

        await db.Proyecto.destroy({
            where : {
                id : id
            }
        })

        resp.json({
            msg : ""
        })
    })

    // Operacion para obtener un proyecto segun id
    router.get("/:id", (req : Request, resp : Response ) => {
        const id = req.params.id
        resp.json({
            msg : "",
            proyecto : {
                id : id,
                nombre : "Proyecto 1",
                nro_pom : 5,
                categoria : 1,
                status : 1
            }
        })
    })

    return [ path, router ]
}

export default ProyectoController;