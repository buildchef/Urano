import express, { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";

const router: Router = express.Router();
const usuarioController = new UsuarioController();

router.get('/criar', (req, res)=> {
    res.json('Nesta rota, criaremos usuarios.').status(200);
})

export default router;