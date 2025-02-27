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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db = require("../DAO/models");
const router = (0, express_1.Router)();
const accessLogPath = "/access-logs";
const getAccessLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = yield db.AccessLog.findAll({
            include: [
                {
                    model: db.Usuario,
                    as: "Usuario",
                    attributes: ["nombre", "correo"]
                }
            ]
        });
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener logs de acceso" });
    }
});
const logOut = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const historial = yield db.AccessLog.create({
        id: null,
        usuario_id: data.id,
        access_time: new Date(),
        action: "LogOut",
        firstaccess: false,
    });
    resp.json({
        msg: "",
        historial: historial
    });
});
router.get("/", getAccessLogs);
router.post("/logOut", logOut);
exports.default = () => [accessLogPath, router];
