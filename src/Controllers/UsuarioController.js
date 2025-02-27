"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db = require("../DAO/models");
const { SHA256 } = require("sha2");
const UsuarioController = () => {
    const path = "/usuarios";
    const router = express_1.default.Router();
    router.post("/login", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const { correo, contraseña } = req.body;
        const hashContra = SHA256(contraseña).toString("hex");
        console.log("================================");
        console.log("Hash contra+", hashContra);
        console.log("================================");
        const usuario = yield db.Usuario.findOne({
            where: { correo: correo, contraseña: hashContra },
        });
        if (usuario) {
            console.log("✅ Login correcto");
            resp.json({
                msg: "Login exitoso",
                id: usuario.id,
                rol: usuario.rol, // Enviamos el rol_id
                nombre: usuario.nombre,
                correo: usuario.correo,
                contraseña: contraseña
            });
        }
        else {
            console.log("❌ Login incorrecto");
            resp.status(401).json({ msg: "Error en login" });
        }
    }));
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log(rol);
        // Lista de usuarios quemados (hardcoded)
        const usuarios = yield db.Usuario.findAll({
            include: {
                model: db.Rol,
                as: "Rol",
                attributes: ["nombre"],
                required: true
            }
        });
        ///const usuarioid = usuarios.find(id)
        if (correo != null) {
            const usuarioEncontrado = yield db.Usuario.findAll({
                where: {
                    correo: correo,
                },
                include: {
                    model: db.Rol,
                    as: "Rol",
                    attributes: ["nombre"],
                    required: true
                }
            });
            resp.json({
                msg: "",
                usuarios: usuarioEncontrado
            });
        }
        else if (rol) {
            /// else if(usuarioid){
            ///   resp.json({
            ///        msg: "",
            ///        usuarios: usuarioid
            ///  });
            ///}
            const usuariosEncontrados = yield db.Usuario.findAll({
                where: {
                    rol: rol,
                },
                include: {
                    model: db.Rol,
                    as: "Rol",
                    attributes: ["nombre"],
                    required: true
                }
            });
            resp.json({
                msg: "",
                usuarios: usuariosEncontrados
            });
        }
        else {
            resp.json({
                msg: "",
                usuarios: usuarios
            });
        }
    }));
    router.get("/contar", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const cantidadUsuarios = yield db.Usuario.count(); // Cuenta los usuarios en la BD
            resp.json({ totalUsuarios: cantidadUsuarios });
        }
        catch (error) {
            console.error("Error al obtener la cantidad de usuarios:", error);
            resp.status(500).json({ msg: "Error interno del servidor" });
        }
    }));
    router.get("/usuarios-por-mes", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("Modelos en db:", Object.keys(db));
            console.log("¿Existe db.access_logs?", db.access_logs ? "Sí" : "No");
            const usuariosPorMes = yield db.AccessLog.findAll({
                attributes: [
                    [db.sequelize.fn("EXTRACT", db.sequelize.literal("MONTH FROM access_time")), "Mes"], // Extrae el número del mes
                    [db.sequelize.fn("COUNT", db.sequelize.col("usuario_id")), "cantidad"]
                ],
                where: { firstaccess: true }, // Solo contar los primeros accesos
                group: [db.sequelize.literal("EXTRACT(MONTH FROM access_time)")], // Agrupa por número de mes
                order: [[db.sequelize.literal("EXTRACT(MONTH FROM access_time)"), "ASC"]], // Ordena los meses correctamente
            });
            resp.json({ usuariosPorMes });
        }
        catch (error) {
            console.error("Error al obtener usuarios por mes:", error);
            resp.status(500).json({
                error: "Error al obtener usuarios por mes",
                details: error instanceof Error ? error.message : String(error)
            });
        }
    }));
    router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const nuevoUsuario = req.body;
        const usuarioCreado = yield db.Usuario.create({
            id: null,
            nombre: nuevoUsuario.nombre,
            correo: nuevoUsuario.correo,
            contraseña: SHA256(nuevoUsuario.contraseña).toString("hex"),
            rol: nuevoUsuario.rol
        });
        resp.json({
            msg: "",
            usuario: usuarioCreado
        });
    }));
    router.put("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const EditarUsuario = req.body;
        const id = Number(req.query.id);
        const usuarioEncontrado = yield db.Usuario.findOne({
            where: {
                id: id,
            }
        });
        if (!usuarioEncontrado) {
            resp.status(404).json({ msg: "Usuario no encontrado" });
        }
        else {
            if (EditarUsuario.rol) {
                yield db.Usuario.update({
                    nombre: EditarUsuario.nombre,
                    correo: EditarUsuario.correo,
                    contraseña: SHA256(EditarUsuario.contraseña).toString("hex"),
                    rol: EditarUsuario.rol
                }, {
                    where: { id: id }
                });
                const usuarioActualizado = yield db.Usuario.findOne({ where: { id: id } });
                resp.json({
                    msg: "",
                    usuario: usuarioActualizado
                });
            }
            else {
                yield db.Usuario.update({
                    nombre: EditarUsuario.nombre,
                    correo: EditarUsuario.correo,
                    contraseña: SHA256(EditarUsuario.contraseña).toString("hex"),
                }, {
                    where: { id: id }
                });
                const usuarioActualizado = yield db.Usuario.findOne({ where: { id: id } });
                resp.json({
                    msg: "",
                    usuario: usuarioActualizado
                });
            }
        }
    }));
    router.delete("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const id = Number(req.query.id);
        yield db.Usuario.destroy({
            where: {
                id: id
            }
        });
        resp.json({
            msg: ""
        });
    }));
    router.post("/ingresar-codigo", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        let { codigo } = req.body;
        codigo = String(codigo);
        const nuevoCodigo = yield db.codigovef.create({ codigo });
        resp.json({ message: "Código ingresado correctamente.", codigo: nuevoCodigo });
    }));
    router.post("/verificar-codigo", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        let { codigo } = req.body; // Ahora tomamos el código desde body
        codigo = String(codigo);
        const registro = yield db.codigovef.findOne({
            where: { codigo }
        });
        if (!registro) {
            resp.status(400).json({ error: "Código incorrecto." });
        }
        else {
            resp.json({ message: "Código válido." });
        }
    }));
    return [path, router];
};
exports.default = UsuarioController;
