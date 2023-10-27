import express, { Router, response } from "express";
import { PecaController } from "../controllers/pecaController";

const routerPecas: Router = express.Router();
const pecaController: PecaController = new PecaController();

routerPecas.post('/adicionar', async (request: express.Request, response: express.Response)=> {
    const resultado = await pecaController.adicionar(request.body);
    response.json(resultado).status(200);
});

routerPecas.get('/listar', async (request: express.Request, response: express.Response)=> {
    const resultado = await pecaController.listar();
    response.json(resultado).status(200);
});

routerPecas.get('/buscar', async (request: express.Request, response: express.Response)=> {
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
})

routerPecas.get('/contarPecas', async (request: express.Request, response: express.Response)=> {
    const{
        classe
    } = request.headers

    let body = {
        classe: classe && !Array.isArray(classe) ? classe : ""
    };

    const resultado = await pecaController.contarPecas(body);
    response.json(resultado).status(200);
})

routerPecas.put('/desabilitar', async (request: express.Request, response: express.Response)=> {
    const resultado = await pecaController.desabilitar(request.body);
    response.json(resultado).status(200);
})

routerPecas.put('/habilitar', async (request: express.Request, response: express.Response)=> {
    const resultado = await pecaController.habilitar(request.body);
    response.json(resultado).status(200);
})

export default routerPecas;