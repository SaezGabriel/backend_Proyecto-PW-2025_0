import express, { Request, Response } from "express";
const db = require("../DAO/models");

const UsuarioController = () => {
    const path = "/usuarios";
    const router = express.Router();

    router.post("/login", async (req: Request, resp: Response) => {
        console.log(req.body);
        const { correo, contraseña } = req.body;

        try {
            const usuario = await db.Usuario.findOne({
                where: { correo, contraseña },
            });

            if (usuario) {
                console.log("Login correcto");
                resp.json({
                    msg: "Login exitoso",
                    rol: usuario.rol, // Enviamos el rol_id
                    nombre: usuario.nombre, // (Opcional) Enviar el nombre del usuario
                });
            } else {
                console.log("Login incorrecto");
                resp.status(401).json({ msg: "Error en login" });
            }
        } catch (error) {
            console.error("Error en la autenticación:", error);
            resp.status(500).json({ msg: "Error en el servidor" });
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