import express, { Request, Response } from "express";
const db = require("../DAO/models");
const { SHA256 } = require("sha2");

const UsuarioController = () => {
    const path = "/usuarios";
    const router = express.Router();

    router.post("/login", async (req: Request, resp: Response) => {
        const { correo, contraseña } = req.body;
        const hashContra = SHA256(contraseña).toString("hex")
        console.log("================================")
        console.log("Hash contra+", hashContra)
        console.log("================================")
        const usuario = await db.Usuario.findOne({
            where: { correo: correo, contraseña: hashContra },
        });
    
        if (usuario) {
            console.log("✅ Login correcto");
            resp.json({
                msg: "Login exitoso",
                id: usuario.id,
                rol: usuario.rol, // Enviamos el rol_id
                nombre: usuario.nombre, 
                correo: usuario.correo
            });
        } else {
            console.log("❌ Login incorrecto");
            resp.status(401).json({ msg: "Error en login" });
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
            contraseña : SHA256(nuevoUsuario.contraseña).toString("hex"),
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

        const usuarioEncontrado = await db.Usuario.findOne({
            where : {
                id : id,
            }
            
        })

        if (!usuarioEncontrado) {
            resp.status(404).json({ msg: "Usuario no encontrado" })}
        else{
            if(EditarUsuario.rol)
            {await db.Usuario.update({
                    nombre: EditarUsuario.nombre,
                    correo: EditarUsuario.correo,
                    contraseña: SHA256(EditarUsuario.contraseña).toString("hex"),
                    rol: EditarUsuario.rol
                },
                {
                    where:{id : id}
                }
            )
            const usuarioActualizado = await db.Usuario.findOne({ where: { id: id } });
            resp.json({
                msg : "",
                usuario : usuarioActualizado
            })    
            }
            else{
                await db.Usuario.update({
                    nombre: EditarUsuario.nombre,
                    correo: EditarUsuario.correo,
                    contraseña: SHA256(EditarUsuario.contraseña).toString("hex"),
                },
                {
                    where:{id : id}
                }
            )
            const usuarioActualizado = await db.Usuario.findOne({ where: { id: id } });
            resp.json({
                msg : "",
                usuario : usuarioActualizado
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

    router.post("/ingresar-codigo", async (req: Request, resp: Response) => {
        let { codigo } = req.body;
    
        codigo = String(codigo);
    
        const nuevoCodigo = await db.codigovef.create({ codigo });
    
        resp.json({ message: "Código ingresado correctamente.", codigo: nuevoCodigo });
    });
    
   
    router.post("/verificar-codigo", async (req: Request, resp: Response) => {
        let { codigo } = req.body; // Ahora tomamos el código desde body
    
        codigo = String(codigo);
    
        const registro = await db.codigovef.findOne({
            where: { codigo }
        });
    
        if (!registro) {
            resp.status(400).json({ error: "Código incorrecto." });
        } else {
            resp.json({ message: "Código válido." });
        }
    });
        
    return [ path, router ]
}

export default UsuarioController