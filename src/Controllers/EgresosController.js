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
const EgresosController = () => {
    const path = "/egresos";
    const router = express_1.default.Router();
    // Operacion para listar egresos
    // Endpoint Listar egresos
    // Ruta : "/egresos"
    // Method: GET
    // Input
    // Output:
    //  {
    //      "msg" : "",
    //      "egresos" : [
    //          {
    //              "id" : n,
    //              "UsuarioId" : x,
    //              "monto" : xx.xx,
    //              "fecha" : DD/MM/YYYY,
    //              "descripcion" : "...",
    //              "recurrente" : True/False,
    //              "categoria" : "...",
    //          },...
    //  }
    //  En el caso de error:
    //  {
    //      "msg" : "Error: ..."  
    //  }
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const egresos = yield db.Egresos.findAll({
            include: {
                model: db.Categoria,
                as: "Categoria",
                attributes: ["nombre"],
                required: true
            }
        });
        resp.json({
            msg: "",
            egresos: egresos
        });
    }));
    router.get("/todo/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const UsuarioId = Number(req.params.id);
        const egresos = yield db.Egresos.findAll({
            where: {
                UsuarioId: UsuarioId
            },
            include: {
                model: db.Categoria,
                as: "Categoria",
                attributes: ["nombre"],
                required: true
            },
            order: [
                ['fecha', 'DESC']
            ]
        });
        resp.json({
            msg: "",
            egresos: egresos
        });
    }));
    function mesesEntre(fechaOrigen, fechaFin) {
        return (fechaFin.getMonth() - fechaOrigen.getMonth()) +
            (12 * (fechaFin.getFullYear() - fechaOrigen.getFullYear()));
    }
    /*
    Endpoint de registro de Egreso
    Path : "/egresos"
    Metodo: POST
    Input :
        {
            "UsuarioId" : n,
            "monto" : xx.xx,
            "fecha" : DD/MM/YYYY,
            "descripcion" : "...",
            "recurrente" : True/False,
            "categoriaId" : n
        }
    Output:
        {
            msg : "",
            egreso : {
                ...
            }
        }
    */
    router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const nuevoEgreso = req.body;
        const egresoCreado = yield db.Egresos.create({
            id: null,
            UsuarioId: nuevoEgreso.UsuarioId,
            monto: nuevoEgreso.monto,
            fecha: nuevoEgreso.fecha,
            descripcion: nuevoEgreso.descripcion,
            recursivo: nuevoEgreso.recurrente,
            categoriaId: nuevoEgreso.categoriaId
        });
        const egresosRecur = [];
        if (nuevoEgreso.recurrente) {
            const fechaBase = new Date(nuevoEgreso.fecha);
            const fechaHoy = new Date();
            const meses = mesesEntre(fechaBase, fechaHoy); // Un año de egresos
            console.log("================================================");
            console.log("Meses entre: " + meses);
            console.log("================================================");
            for (let i = 1; i <= meses; i++) {
                const nuevaFecha = new Date(fechaBase);
                nuevaFecha.setMonth(nuevaFecha.getMonth() + i); // Sumar meses
                const egresoRecurrente = yield db.Egresos.create({
                    UsuarioId: nuevoEgreso.UsuarioId,
                    monto: nuevoEgreso.monto,
                    fecha: nuevaFecha,
                    descripcion: nuevoEgreso.descripcion,
                    recursivo: nuevoEgreso.recurrente,
                    categoriaId: nuevoEgreso.categoriaId
                });
                egresosRecur.push(egresoRecurrente);
            }
        }
        console.log("Egreso creado: " + egresoCreado);
        resp.json({
            msg: "",
            egreso: egresoCreado,
            egresosRecur: egresosRecur
        });
    }));
    router.delete("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const id = Number(req.query.id);
        yield db.Egresos.destroy({
            where: {
                id: id
            }
        });
        resp.json({
            msg: ""
        });
    }));
    // Operacion para obtener un egreso segun id
    router.get("/:id", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const idBuscada = req.params.id;
        const egreso = yield db.Egresos.findAll({
            where: { id: idBuscada },
            include: {
                model: db.Categoria,
                as: "Categoria",
                attributes: ["nombre"],
                required: true
            }
        });
        if (!egreso) {
            resp.json({
                msg: "Egreso no encontrado"
            });
        }
        else {
            resp.json({
                msg: "",
                egreso: egreso[0]
            });
        }
    }));
    router.post("/editar", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const egresoEditar = req.body;
        const egresoEditado = yield db.Egresos.update({
            monto: egresoEditar.monto,
            fecha: egresoEditar.fecha,
            descripcion: egresoEditar.descripcion,
            recursivo: egresoEditar.recurrente,
            categoriaId: egresoEditar.categoriaId
        }, {
            where: {
                id: egresoEditar.id
            }
        });
        console.log("Egreso editado: " + egresoEditado);
        resp.json({
            msg: "",
            egreso: egresoEditado
        });
    }));
    return [path, router];
};
exports.default = EgresosController;
