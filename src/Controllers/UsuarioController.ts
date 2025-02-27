import express, { Request, Response } from "express";
import { access } from "fs";
import { where } from "sequelize";
const db = require("../DAO/models");

const verificarPrimerAcceso = async (id:number) => {
    const logins = await db.AccessLog.findAll({
        where : {
            usuario_id : id
        }
    })

    if(logins.length == 0){
        return true
    }else{
        return false
    }

}

const UsuarioController = () => {
    const path = "/usuarios";
    const router = express.Router();

    router.post("/login", async (req: Request, resp: Response) => {
        const { correo, contraseña } = req.body;
    
        const usuario = await db.Usuario.findOne({
            where: { correo, contraseña },
        });
    
        if (usuario) {

            console.log ("✅ Login correcto");
            if(usuario.rol == 1){
                const primerAcceso = await verificarPrimerAcceso(usuario.id)
                const historial = await db.AccessLog.create({
                    id : null,
                    usuario_id: usuario.id,
                    access_time : new Date(),
                    action : "login",
                    firstaccess : primerAcceso,
                })
            }
            
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

        router.get("/contar", async (req: Request, resp: Response) => {
        try {
            const cantidadUsuarios = await db.Usuario.count(); // Cuenta los usuarios en la BD
            resp.json({ totalUsuarios: cantidadUsuarios });
        } catch (error) {
            console.error("Error al obtener la cantidad de usuarios:", error);
            resp.status(500).json({ msg: "Error interno del servidor" });
        }
    });

    router.get("/usuarios-por-mes", async (req: Request, resp: Response) => {
        try {
            console.log("Modelos en db:", Object.keys(db));
            console.log("¿Existe db.access_logs?", db.access_logs ? "Sí" : "No");
    
            const usuariosPorMes = await db.AccessLog.findAll({
                attributes: [
                    [db.sequelize.fn("EXTRACT", db.sequelize.literal("MONTH FROM access_time")), "Mes"], // Extrae el número del mes
                    [db.sequelize.fn("COUNT", db.sequelize.col("usuario_id")), "cantidad"]
                ],
                where: { firstaccess: true }, // Solo contar los primeros accesos
                group: [db.sequelize.literal("EXTRACT(MONTH FROM access_time)")], // Agrupa por número de mes
                order: [[db.sequelize.literal("EXTRACT(MONTH FROM access_time)"), "ASC"]], // Ordena los meses correctamente
            });
    
            resp.json({ usuariosPorMes });
        } catch (error) {
            console.error("Error al obtener usuarios por mes:", error);
            resp.status(500).json({ 
                error: "Error al obtener usuarios por mes", 
                details: error instanceof Error ? error.message : String(error) 
            });
            
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
                    contraseña: EditarUsuario.contraseña,
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
                    contraseña: EditarUsuario.contraseña,
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