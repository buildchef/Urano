import express, { Router, response } from "express";
import { UsuarioController } from "../controllers/usuarioController";

const router: Router = express.Router();
const usuarioController: UsuarioController = new UsuarioController();

router.post('/criar', async (request: express.Request, response: express.Response)=> {
    const resultado = await usuarioController.criar(request.body);
    response.json(resultado).status(200);
});

router.get('/listar', async (request: express.Request, response: express.Response)=> {
    const resultado = await usuarioController.listar();
    response.json(resultado).status(200);
});

export default router;