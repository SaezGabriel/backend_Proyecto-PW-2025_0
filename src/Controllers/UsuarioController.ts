import express, {Request, Response} from "express"
//import db from "../DAO/models"
const db = require("../DAO/models")

const UsuarioController = () => {
    const path = "/usuarios"

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
        const correo = req.query.correo
        // Lista de usuarios quemados (hardcoded)
        const usuarios = [
            { id: 1, nombre: "Jose", correo: "jose@example.com", contraseña: "1234", rol: 0 },
            { id: 2, nombre: "Maria", correo: "maria@example.com", contraseña: "1234", rol: 0 },
            { id: 3, nombre: "Pepe", correo: "pepe@example.com", contraseña: "abcd", rol: 1 }
        ];

        const usuarioEncontrado = usuarios.find(user => user.correo === correo);

        if (usuarioEncontrado) {
            resp.json({
                msg: "",
                usuarios: usuarioEncontrado
            });
        }else
        {
            resp.json({
                msg: "",
                usuarios: usuarios
            })
        }
        
           

        
    });
        
    return [ path, router ]
}

export default UsuarioController