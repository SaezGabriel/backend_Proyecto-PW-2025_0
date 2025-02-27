"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const UsuarioController_1 = __importDefault(require("./Controllers/UsuarioController"));
const CategoriaController_1 = __importDefault(require("./Controllers/CategoriaController"));
const PresupuestoController_1 = __importDefault(require("./Controllers/PresupuestoController"));
const RolController_1 = __importDefault(require("./Controllers/RolController"));
const EgresosController_1 = __importDefault(require("./Controllers/EgresosController"));
const ResetPasswordController_1 = __importDefault(require("./Controllers/ResetPasswordController"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.static("assets")); // Carpeta archivos estaticos
app.use((0, cors_1.default)()); // TODO: Incrementar la seguridad
const port = process.env.PORT || 3000;
const [usuarioPath, usuarioRouter] = (0, UsuarioController_1.default)();
const [categoriaPath, categoriaRouter] = (0, CategoriaController_1.default)();
const [presupuestoPath, presupuestoRouter] = (0, PresupuestoController_1.default)();
const [egresosPath, egresosRouter] = (0, EgresosController_1.default)();
const [rolPath, rolRouter] = (0, RolController_1.default)();
const [ResetPasswordPath, ResetPasswordRouter] = (0, ResetPasswordController_1.default)();
app.use(usuarioPath, usuarioRouter);
app.use(categoriaPath, categoriaRouter);
app.use(presupuestoPath, presupuestoRouter);
app.use(egresosPath, egresosRouter);
app.use(rolPath, rolRouter);
app.use(ResetPasswordPath, ResetPasswordRouter);
app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutandose en puerto ${port}`);
});
