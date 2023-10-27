import express, { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";
import { aviaoController } from "../controllers/aviaoController";
import { ObjectId } from "mongodb";
import { PecaController } from "../controllers/pecaController";

const router = express.Router();
const usuarioController: UsuarioController = new UsuarioController();
const pecaController: PecaController = new PecaController();


// Rotas de usuário
router.post('/usuario/criar', async (request: express.Request, response: express.Response)=> {
    try{
        const resultado = await usuarioController.criar(request.body);
        response.json(resultado).status(201);
    } catch(error) {
        response.json({error: error.message}).status(400);
    }
});

router.get('/usuario/listar', async (request: express.Request, response: express.Response)=> {
    try{
        const resultado = await usuarioController.listar();
        response.json(resultado).status(200);
    } catch(error){
        response.json({error: error.message}).status(400);
    }
});

router.get('/usuario/buscar', async (request: express.Request, response: express.Response)=> {
    try{
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
    } catch(error){
        response.json({error: error.message}).status(400);
    }
})

router.put('/usuario/atualizar', async (request: express.Request, response: express.Response)=> {
    try{
        const resultado = await usuarioController.atualizar(request.body);
        response.json(resultado).status(200);
    } catch(error){
        response.json({error: error.message}).status(400);
    }
})

router.put('/usuario/desativar', async (request: express.Request, response: express.Response)=> {
    try{
        const resultado = await usuarioController.desativar(request.body);
        response.json(resultado).status(200);
    } catch(error){
        response.json({error: error.message}).status(400);
    }
})

router.put('/usuario/ativar', async (request: express.Request, response: express.Response)=> {
    try{
        const resultado = await usuarioController.ativar(request.body);
        response.json(resultado).status(200);
    } catch(error){
        response.json({error: error.message}).status(400);
    }
})

// Rotas de avião
router.get('/aviao', aviaoController.index);

router.post('/aviao', aviaoController.save);

router.get('/aviao/:id', aviaoController.show);

router.put('/aviao/:id', aviaoController.update);

router.delete('/aviao/:id', aviaoController.delete);

// Rotas de Peças
router.post('/pecas/adicionar', async (request: express.Request, response: express.Response)=> {
    try{
        const resultado = await pecaController.adicionar(request.body);
        response.json(resultado).status(201);
    } catch(error){
        response.json({error: error.message}).status(400);
    }
});

router.get('/pecas/listar', async (request: express.Request, response: express.Response)=> {
    try{
        const resultado = await pecaController.listar();
        response.json(resultado).status(200);
    } catch(error){
        response.json({error: error.message}).status(400);
    }
});

router.get('/pecas/buscar', async (request: express.Request, response: express.Response)=> {
    try{
        const{
            nome,
            codigo,
            classe,
            preco
        } = request.headers

        let body = {};

        if (nome && !Array.isArray(nome)) body = {...body, nome: nome};
        if(codigo && !Array.isArray(codigo)) body = {...body, codigo: codigo};
        if(classe && !Array.isArray(classe)) body = {...body, classe: classe};
        if(preco && !Array.isArray(preco)) body = {...body, preco: preco};

        const resultado = await pecaController.buscar(body);
        response.json(resultado).status(200);
    } catch(error){
        response.json({error: error.message}).status(400);
    }
})

router.get('/pecas/contar', async (request: express.Request, response: express.Response)=> {
    try{
        const{
            classe
        } = request.headers

        let body = {
            classe: classe && !Array.isArray(classe) ? classe : ""
        };

        const resultado = await pecaController.contarPecas(body);
        response.json(resultado).status(200);
    } catch(error) {
        response.json({error: error.message}).status(400);
    }
})

router.put('/pecas/desabilitar', async (request: express.Request, response: express.Response)=> {
    try{
        const resultado = await pecaController.desabilitar(request.body);
        response.json(resultado).status(200);
    } catch(error){
        response.json({error: error.message}).status(400);
    }
})

router.put('/pecas/habilitar', async (request: express.Request, response: express.Response)=> {
    try{
        const resultado = await pecaController.habilitar(request.body);
        response.json(resultado).status(200);
    } catch(error){
        response.json({error: error.message}).status(400);
    }
})


export default router;