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
const ProyectoController = () => {
    const path = "/proyectos";
    const router = express_1.default.Router();
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
    router.get("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const usuarios = yield db.Proyecto.findAll({
            include: {
                model: db.Categoria,
                as: "Categoria",
                attributes: ["nombre"],
                required: true
            }
        });
        resp.json({
            msg: "",
            usuarios: usuarios
        });
    }));
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
    router.post("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const nuevoProyecto = req.body;
        const proyectoCreado = yield db.Proyecto.create({
            id: null,
            nombre: nuevoProyecto.nombre,
            nro_pom: 0,
            categoriaId: nuevoProyecto.categoria,
            status: 0
        });
        resp.json({
            msg: "",
            proyecto: proyectoCreado
        });
    }));
    router.delete("/", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const id = req.query.id;
        yield db.Proyecto.destroy({
            where: {
                id: id
            }
        });
        resp.json({
            msg: ""
        });
    }));
    // Operacion para obtener un proyecto segun id
    router.get("/:id", (req, resp) => {
        const id = req.params.id;
        resp.json({
            msg: "",
            proyecto: {
                id: id,
                nombre: "Proyecto 1",
                nro_pom: 5,
                categoria: 1,
                status: 1
            }
        });
    });
    return [path, router];
};
exports.default = ProyectoController;
