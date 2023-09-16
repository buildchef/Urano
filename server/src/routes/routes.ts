import express, { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";
import { aviaoController } from "../controllers/aviaoController";
import { ObjectId } from "mongodb";

const router = express.Router();
const usuarioController: UsuarioController = new UsuarioController();

// Rotas de usuário
router.post('/criar', async (request: express.Request, response: express.Response)=> {
    const resultado = await usuarioController.criar(request.body);
    response.json(resultado).status(200);
});

router.get('/listar', async (request: express.Request, response: express.Response)=> {
    const resultado = await usuarioController.listar();
    response.json(resultado).status(200);
});

router.get('/buscar', async (request: express.Request, response: express.Response)=> {
    const{
        _id,
        cpf,
        email,
        cargo
    } = request.headers

    let body = {};

    if (cpf && !Array.isArray(cpf)) body = {...body, cpf: cpf};
    if(email && !Array.isArray(cpf)) body = {...body, email: email};
    if(_id && !Array.isArray(cpf)) body = {...body, _id: new ObjectId(_id.toString())};
    if(cargo && !Array.isArray(cargo)) body = {...body, cargo: cargo};

    const resultado = await usuarioController.buscar(body);
    response.json(resultado).status(200);
})

router.put('/atualizar', async (request: express.Request, response: express.Response)=> {
    const resultado = await usuarioController.atualizar(request.body);
    response.json(resultado).status(200);
})

router.put('/desativar', async (request: express.Request, response: express.Response)=> {
    const resultado = await usuarioController.desativar(request.body);
    response.json(resultado).status(200);
})

router.put('/ativar', async (request: express.Request, response: express.Response)=> {
    const resultado = await usuarioController.ativar(request.body);
    response.json(resultado).status(200);
})

// Rotas de avião
router.get('/aviao', aviaoController.index);

router.post('/aviao', aviaoController.save);

router.get('/aviao/:id', aviaoController.show);

router.put('/aviao/:id', aviaoController.update);

router.delete('/aviao/:id', aviaoController.delete);

export default router;