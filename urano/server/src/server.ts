import express from "express";
import { environment } from "./environment";
import router from "./routes/usuarioRoutes";
import Database from "./database/connection";

const app = express();
app.use(express.json());
app.use('/urano/usuario', router);

app.listen(environment.app.port, async ()=> {
    console.log(`Api rodando na porta => ${environment.app.port}`);
    await Database.conectar();
});