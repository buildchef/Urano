import express from "express";
import { environment } from "./environment";
import router from "./routes/usuarioRoutes";

const app = express();
app.use('/urano/usuario', router);

app.listen(environment.app.port, ()=> {
    console.log(`Api rodando na porta => ${environment.app.port}`);
});