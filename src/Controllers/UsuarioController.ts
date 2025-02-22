import express, {Request, Response} from "express"
//import db from "../DAO/models"
const db = require("../DAO/models")

const UsuarioController = () => {
    const path : string= "/usuarios"

    const router = express.Router()

    // Endpoint Login
    // Ruta : "/login"
    // Method: POST
    // Form : usuario, password
    // Output:
    //  En el caso que login sea correcto:
    //  {
    //      "msg" : ""  
    //  }
    //  En el caso de error en el login:
    //  {
    //      "msg" : "Error en login"  
    //  }
    router.post("/login", async (req : Request, resp : Response) => {
        console.log(req.body)
        const usuario = req.body.usuario
        const password = req.body.password

        const usuarios = await db.Usuario.findAll({
            where : {
                username : usuario,
                password : password,
                estado : true
            }
        })
        //console.log(usuarios)

        if (usuarios.length > 0) {
            // Login correcto
            resp.json({
                msg : ""
            })
        }else {
            // Login es incorrecto
            resp.json({
                msg : "Error en login"
            })
        }
    })
    

    router.get("/", async (req : Request, resp : Response ) => {
    ///    const proyectos = await db.Proyecto.findAll({
    ///        include : {
    ///           model : db.Categoria,
    ///            as : "Categoria",
    ///            attributes : ["nombre"],
    ///            required : true
    ///        }
    ///    })
        ///const id = Number(req.query.id)
        const correo = req.query.correo ? String(req.query.correo) : null;
        // Lista de usuarios quemados (hardcoded)
        const usuarios = await db.Usuario.findAll({
            include : {
                model : db.Rol,
                as : "Rol",
                attributes : ["nombre"],
                required : true
            }
        })
        
        ///const usuarioid = usuarios.find(id)
        

        if (correo!=null) {
            const usuarioEncontrado = await db.Usuario.findAll({
                where : {
                    correo : correo,
                },
                include : {
                    model : db.Rol,
                    as : "Rol",
                    attributes : ["nombre"],
                    required : true
                }
                
            })
            resp.json({
                msg: "",
                usuarios: usuarioEncontrado
            });
        }else{
        /// else if(usuarioid){
        ///   resp.json({
        ///        msg: "",
        ///        usuarios: usuarioid
        ///  });
        ///}
        
        
            resp.json({
                msg: "",
                usuarios: usuarios
            })
        }
        
           

        
    });
        
    return [ path, router ]
}

export default UsuarioController