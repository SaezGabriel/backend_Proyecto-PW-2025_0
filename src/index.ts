import express, {Express, Request, Response, Router} from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import UsuarioController from "./Controllers/UsuarioController"
import CategoriaController from "./Controllers/CategoriaController"
import PresupuestoController from "./Controllers/PresupuestoController"
import RolController from "./Controllers/RolController"
import EgresosController from "./Controllers/EgresosController"
import ResetPasswordController from "./Controllers/ResetPasswordController"
import AccessLogController from "./Controllers/AccessLogController"


dotenv.config()

const app : Express = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(express.static("assets")) // Carpeta archivos estaticos
app.use(cors()) // TODO: Incrementar la seguridad

const port = process.env.PORT || 3000

    
const [usuarioPath, usuarioRouter] = UsuarioController()
const [categoriaPath, categoriaRouter] = CategoriaController()
const [presupuestoPath, presupuestoRouter] = PresupuestoController()
const [egresosPath, egresosRouter] = EgresosController()
const [rolPath, rolRouter] = RolController()
const [ResetPasswordPath, ResetPasswordRouter] = ResetPasswordController()
const [accessLogPath,accessLogRouter] = AccessLogController()


app.use(usuarioPath as string , usuarioRouter as Router)
app.use(categoriaPath as string, categoriaRouter as Router)
app.use(presupuestoPath as string, presupuestoRouter as Router)
app.use(egresosPath as string, egresosRouter as Router)
app.use(rolPath as string, rolRouter as Router)
app.use(ResetPasswordPath as string, ResetPasswordRouter as Router)
app.use(accessLogPath as string , accessLogRouter as Router)

app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutandose en puerto ${port}`)
})