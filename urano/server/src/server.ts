import express from "express";
import cors from 'cors';

import { environment } from "./environment";
import router from "./routes/routes";
import Database from "./database/connection";

const app = express();

app.use(cors());
app.use(express.json());

app.use('/urano/api', router);

app.listen(environment.app.port, async ()=> {
    console.log(`Api rodando na porta => ${environment.app.port}`);
    await Database.conectar();
});