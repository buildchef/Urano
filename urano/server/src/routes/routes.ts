import express, { Router } from "express";
import { UsuarioController } from "../controllers/usuarioController";
import { aviaoController } from "../controllers/aviaoController";
import { ObjectId } from "mongodb";
import { PecaController } from "../controllers/pecaController";
import { chamadoController } from "../controllers/chamadoController";
import { PontoController } from "../controllers/pontoController";
import Chamado from "../models/chamadoModel";

import jwt from 'jsonwebtoken';
import { hash, compare } from 'bcryptjs';

import { authMiddleware } from '../middleware/auth';
import Usuario from "../models/usuarioModel";

const router = express.Router();
const usuarioController: UsuarioController = new UsuarioController();
const pecaController: PecaController = new PecaController();
const pontoController: PontoController = new PontoController();


// Rotas de usuário
router.post('/usuario/criar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await usuarioController.criar(request.body);
        response.json(resultado).status(201);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
});

router.get('/usuario/listar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await usuarioController.listar();
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
});

router.get('/usuario/buscar', async (request: express.Request, response: express.Response) => {
    try {
        const {
            _id,
            cpf,
            email,
            cargo
        } = request.headers

        let body = {};

        if (cpf && !Array.isArray(cpf)) body = { ...body, cpf: cpf };
        if (email && !Array.isArray(cpf)) body = { ...body, email: email };
        if (_id && !Array.isArray(cpf)) body = { ...body, _id: new ObjectId(_id.toString()) };
        if (cargo && !Array.isArray(cargo)) body = { ...body, cargo: cargo };

        const resultado = await usuarioController.buscar(body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

router.put('/usuario/atualizar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await usuarioController.atualizar(request.body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

router.put('/usuario/desativar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await usuarioController.desativar(request.body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

router.put('/usuario/ativar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await usuarioController.ativar(request.body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

// Rotas de avião
router.get('/aviao', aviaoController.index);

router.post('/aviao', aviaoController.save);

router.get('/aviao/:id', aviaoController.show);

router.put('/aviao/:id', aviaoController.update);

router.delete('/aviao/:id', aviaoController.delete);

// Rotas de chamados
router.get('/chamado', chamadoController.index);

router.post('/chamado', chamadoController.save);

router.get('/chamado/:id', chamadoController.show);

router.put('/chamado/:id', chamadoController.update);

router.delete('/chamado/:id', chamadoController.delete);

router.get('/manutencao/filtrar',  async (request: express.Request, response: express.Response)=> {
    try{
        console.log("Chegou aqui");

        const{
            titulo,
            codigo,
            status,
            prioridade,
            categoria,
            responsavel
        } = request.headers

        let body = {};

        if (titulo && !Array.isArray(titulo)) body = {...body, titulo: titulo};
        if(codigo && !Array.isArray(codigo)) body = {...body, codigo: codigo};
        if(status && !Array.isArray(status)) body = {...body, status: status};
        if(prioridade && !Array.isArray(prioridade)) body = {...body, prioridade: prioridade};
        if(categoria && !Array.isArray(categoria)) body = {...body, categoria: categoria};
        if(responsavel && !Array.isArray(responsavel)) body = {...body, responsavel: responsavel};

        const resultado = await Chamado.find(body);
        response.status(200).json(resultado);
    }catch(error){
        response.json({error: error.message}).status(400);
    }
});

// Rotas de Peças
router.post('/pecas/adicionar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await pecaController.adicionar(request.body);
        response.json(resultado).status(201);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
});

router.get('/pecas/listar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await pecaController.listar();
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
});

router.get('/pecas/buscar', async (request: express.Request, response: express.Response) => {
    try {
        const {
            nome,
            codigo,
            classe,
            preco
        } = request.headers;

        let body = {};

        if (nome && !Array.isArray(nome)) body = { ...body, nome: nome };
        if (codigo && !Array.isArray(codigo)) body = { ...body, codigo: codigo };
        if (classe && !Array.isArray(classe)) body = { ...body, classe: classe };
        if (preco && !Array.isArray(preco)) body = { ...body, preco: preco };

        const resultado = await pecaController.buscar(body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

router.get('/pecas/contar', async (request: express.Request, response: express.Response) => {
    try {
        const {
            classe
        } = request.headers

        let body = {
            classe: classe && !Array.isArray(classe) ? classe : ""
        };

        const resultado = await pecaController.contarPecas(body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

router.put('/pecas/desabilitar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await pecaController.desabilitar(request.body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

router.put('/pecas/habilitar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await pecaController.habilitar(request.body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

// Rotas de Ponto
router.post('/ponto/registrar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await pontoController.registrarPonto(request.body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }

})

router.get('/ponto/listar', async (request: express.Request, response: express.Response) => {
    try {
        const resultado = await pontoController.listar();
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

router.get('/ponto/buscar', async (request: express.Request, response: express.Response) => {
    try {
        const {
            identificador_unico,
            data,
            status,
            marcador
        } = request.headers;

        let body = {};

        if (identificador_unico && !Array.isArray(identificador_unico)) body = { ...body, identificadorUnico: identificador_unico };
        if (data && !Array.isArray(data)) body = { ...body, data: data };
        if (status && !Array.isArray(status)) body = { ...body, status: status };
        if (marcador && !Array.isArray(marcador)) body = { ...body, marcador: marcador };

        const resultado = await pontoController.buscar(body);
        response.json(resultado).status(200);
    } catch (error) {
        response.json({ error: error.message }).status(400);
    }
})

router.post('/user/signup', async (req: express.Request, res: express.Response) => {
    try {
        const { nome, email, senha } = req.body;
        const existingUser = await Usuario.findOne({ email });

        if (existingUser) return res.status(400).json({ msg: "Usuário já existe" });

        const hashedPassword = await hash(senha, 8);

        const usuario = await Usuario.create({
            nome,
            email,
            senha: hashedPassword,
        });

        return res.json(usuario).status(201);
    } catch (error) {
        return res.json({ error: error.message }).status(500);
    }
});

router.post('/user/signin', async (req: express.Request, res: express.Response) => {
    try {
        const { email, senha } = req.body;
        const usuario = await Usuario.findOne({ email });

        if (!usuario) return res.status(400).json({ msg: "Usuário não encontrado" });

        const senhaValida = await compare(senha, usuario.senha);

        if (!senhaValida) return res.status(400).json({ msg: "Senha inválida" });

        const token = jwt.sign({ id: usuario._id }, 'passwordKey');

        return res.json({ token, ...usuario._doc }).status(200);
    } catch (error) {
        return res.json({ error: error.message }).status(500);
    }
});

router.post('/user/checkToken', async (req: express.Request, res: express.Response) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) return res.json(false)

        const verified = jwt.verify(token, 'passwordKey') as { id: string };

        if (!verified) return res.json(false);

        const usuario = await Usuario.findById(verified.id);

        if (!usuario) return res.json(false);

        return res.json(true);
    } catch (error) {
        res.json({ error: error.message }).status(500);
    }
});

router.get('/user/me', authMiddleware, async (req: express.Request, res: express.Response) => {
    try {
        const usuario = await Usuario.findById(req.body.user);
        return res.json({ ...usuario?._doc, token: req.body.token }).status(200);
    } catch (error) {
        return res.json({ error: error.message }).status(500);
    }
});

router.get('/user/', async (req: express.Request, res: express.Response) => {
    try {
        const usuarios = await Usuario.find();
        return res.json(usuarios).status(200);
    } catch (error) {
        return res.json({ error: error.message }).status(500);
    }
});

router.delete('/user/:id', async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findByIdAndDelete(id);
        return res.json(usuario).status(200);
    } catch (error) {
        return res.json({ error: error.message }).status(500);
    }
});

export default router;