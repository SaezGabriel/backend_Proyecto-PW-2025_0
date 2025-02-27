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
const jwt = require('jsonwebtoken');
const ResetPasswordController = () => {
    const path = "/ResetPassword";
    const router = express_1.default.Router();
    const generarToken = (userId) => {
        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        return jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
    };
    router.post("/solicitar", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const { correo } = req.body;
        const usuario = yield db.Usuario.findOne({
            where: {
                correo: correo
            }
        });
        if (!usuario) {
            resp.status(404).json({ msg: "Usuario no encontrado" });
        }
        console.log(usuario.id);
        const token = generarToken(usuario.id);
        yield db.ResetPassword.create({
            UsuarioId: usuario.id,
            token: token,
            fecha_creacion: new Date(),
        });
        resp.json({ msg: "", token: token });
    }));
    router.put("/cambiar", (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
        const { token, contraseña } = req.body;
        const resetEntry = yield db.ResetPassword.findOne({
            where: { token },
        });
        console.log(resetEntry);
        if (!resetEntry) {
            resp.status(400).json({ msg: "Token inválido" });
        }
        const tiempoCreacion = new Date(resetEntry.fecha_creacion);
        const ahora = new Date();
        const diferenciaHoras = (ahora.getTime() - tiempoCreacion.getTime()) / (1000 * 60 * 60);
        if (diferenciaHoras > 1) {
            yield resetEntry.destroy();
        }
        const usuario = yield db.Usuario.findByPk(resetEntry.UsuarioId);
        if (!usuario) {
            resp.status(404).json({ msg: "Usuario no encontrado" });
        }
        console.log(usuario);
        console.log(contraseña);
        yield db.Usuario.update({ contraseña: contraseña }, { where: { id: usuario.id } });
        yield resetEntry.destroy();
        resp.json({ msg: "" });
    }));
    return [path, router];
};
exports.default = ResetPasswordController;
