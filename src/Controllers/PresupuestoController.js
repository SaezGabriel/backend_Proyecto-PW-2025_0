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
//import db from "../DAO/models"
const db = require("../DAO/models");
const PresupuestoController = () => {
    const path = "/presupuestos";
    const router = express_1.default.Router();
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        ///    const proyectos = await db.Proyecto.findAll({
        ///        include : {
        ///           model : db.Categoria,
        ///            as : "Categoria",
        ///            attributes : ["nombre"],
        ///            required : true
        ///        }
        ///    })
        const UsuarioId = Number(req.query.UsuarioId);
        console.log(UsuarioId);
        const presupuestos = yield db.Presupuesto.findAll({
            include: {
                model: db.Categoria,
                as: "Categoria",
                attributes: ["nombre"],
                required: true
            },
            where: {
                UsuarioId: UsuarioId
            }
        });
        resp.json({
            msg: "",
            presupuestos: presupuestos
        });
        console.log(presupuestos);
    }));
    router.put("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const EditarPresupuesto = req.body;
        const id = Number(req.query.id);
        const PresupuestoEncontrado = yield db.Presupuesto.findOne({
            where: {
                id: id,
            }
        });
        console.log(PresupuestoEncontrado);
        if (!PresupuestoEncontrado) {
            resp.status(404).json({ msg: "Usuario no encontrado" });
        }
        else {
            if (EditarPresupuesto) {
                const PresupuestoEditar = yield db.Presupuesto.update({
                    monto_Mensual: EditarPresupuesto.monto_Mensual,
                    categoriaId: EditarPresupuesto.categoriaId,
                }, {
                    where: { id: id }
                });
                console.log(PresupuestoEditar);
                resp.json({
                    msg: "",
                    Presupuesto: PresupuestoEditar,
                });
            }
        }
    }));
    router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const presupuesto = req.body;
        const presupuestoCreado = yield db.Presupuesto.create({
            id: null,
            UsuarioId: presupuesto.UsuarioId,
            monto_Mensual: presupuesto.monto_Mensual,
            categoriaId: presupuesto.categoriaId
        });
        resp.json({
            msg: "",
            presupuesto: presupuestoCreado
        });
    }));
    router.delete("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const id = Number(req.query.id);
        yield db.Presupuesto.destroy({
            where: {
                id: id,
            }
        });
        resp.json({
            msg: ""
        });
    }));
    return [path, router];
};
exports.default = PresupuestoController;
