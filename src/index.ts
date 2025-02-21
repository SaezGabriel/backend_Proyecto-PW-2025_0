import express, {Express, Request, Response, Router} from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import ProyectoController from "./Controllers/ProyectoController"
import UsuarioController from "./Controllers/UsuarioController"
import CategoriaController from "./Controllers/CategoriaController"
import PresupuestoController from "./Controllers/PresupuestoController"

dotenv.config()

const app : Express = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(express.static("assets")) // Carpeta archivos estaticos
app.use(cors()) // TODO: Incrementar la seguridad

const port = process.env.PORT || 3000

const [proyectoPath, proyectoRouter] = ProyectoController()
const [usuarioPath, usuarioRouter] = UsuarioController()
const [categoriaPath, categoriaRouter] = CategoriaController()
const [presupuestoPath, presupuestoRouter] = PresupuestoController()


app.use(proyectoPath as string , proyectoRouter as Router)
app.use(usuarioPath as string , usuarioRouter as Router)
app.use(categoriaPath as string, categoriaRouter as Router)
app.use(presupuestoPath as string, presupuestoRouter as Router)


app.listen(port, () => {
    console.log(`[Server]: Servidor ejecutandose en puerto ${port}`)
})