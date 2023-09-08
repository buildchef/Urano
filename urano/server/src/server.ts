import express from "express";
import { environment } from "./environment";

const app = express();

app.listen(environment.app.port, ()=> {
    console.log(`Api rodando na porta => ${environment.app.port}`);
});