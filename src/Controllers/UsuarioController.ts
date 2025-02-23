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
                    id: usuario.id,
                    rol: usuario.rol, // Enviamos el rol_id
                    nombre: usuario.nombre, // (Opcional) Enviar el nombre del usuario
                    correo : usuario.correo
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
        const rol = req.query.rol ? Number(req.query.rol) : null;
        console.log(rol)
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
        }else if(rol){
        /// else if(usuarioid){
        ///   resp.json({
        ///        msg: "",
        ///        usuarios: usuarioid
        ///  });
        ///}
            const usuariosEncontrados = await db.Usuario.findAll({
                where : {
                    rol : rol,
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
                usuarios: usuariosEncontrados
            });
        
        }else
        {
            resp.json({
                msg: "",
                usuarios: usuarios
            })
        }
    });

    router.post("/", async (req : Request, resp : Response) => {

        const nuevoUsuario = req.body

        const usuarioCreado = await db.Usuario.create({
            id : null,
            nombre : nuevoUsuario.nombre,
            correo : nuevoUsuario.correo,
            contraseña : nuevoUsuario.contraseña,
            rol : nuevoUsuario.rol
            
        })
        resp.json({
            msg : "",
            usuario : usuarioCreado
        })
        });
    
    

    router.put("/", async (req : Request, resp : Response) => {

        const EditarUsuario = req.body
        const id = Number(req.query.id)

        const usuarioEncontrado = await db.Usuario.findAll({
            where : {
                id : id,
            },
            include : {
                model : db.Rol,
                as : "Rol",
                attributes : ["nombre"],
                required : true
            }
            
        })

        if (!usuarioEncontrado) {
            resp.status(404).json({ msg: "Usuario no encontrado" })}
        else{
            if(EditarUsuario.rol)
            {const UsuarioEditar = await db.Usuario.update({
                    nombre: EditarUsuario.nombre,
                    correo: EditarUsuario.correo,
                    contraseña: EditarUsuario.contraseña,
                    rol: EditarUsuario.rol
                },
                {
                    where:{id}
                }
            )

            resp.json({
                msg : "",
                usuario : UsuarioEditar
            })    
            }
            else{
                const UsuarioEditar = await db.Usuario.update({
                    nombre: EditarUsuario.nombre,
                    correo: EditarUsuario.correo,
                    contraseña: EditarUsuario.contraseña,
                },
                {
                    where:{id}
                }
            )

            resp.json({
                msg : "",
                usuario : UsuarioEditar
            })     
            }
        }
    });
    
    router.delete("/", async (req : Request, resp : Response) => {
        const id = Number(req.query.id) 
    
        await db.Usuario.destroy({
            where : {
                id : id
            }
        })
    
        resp.json({
            msg : ""
        })
    })
        
    return [ path, router ]
}

export default UsuarioController