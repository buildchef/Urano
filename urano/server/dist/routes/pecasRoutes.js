"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pecaController_1 = require("../controllers/pecaController");
const routerPecas = express_1.default.Router();
const pecaController = new pecaController_1.PecaController();
routerPecas.post('/adicionar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield pecaController.adicionar(request.body);
    response.json(resultado).status(200);
}));
routerPecas.get('/listar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield pecaController.listar();
    response.json(resultado).status(200);
}));
routerPecas.get('/buscar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, codigo, classe, preco } = request.headers;
    let body = {};
    if (nome && !Array.isArray(nome))
        body = Object.assign(Object.assign({}, body), { nome: nome });
    if (codigo && !Array.isArray(codigo))
        body = Object.assign(Object.assign({}, body), { codigo: codigo });
    if (classe && !Array.isArray(classe))
        body = Object.assign(Object.assign({}, body), { classe: classe });
    if (preco && !Array.isArray(preco))
        body = Object.assign(Object.assign({}, body), { preco: preco });
    const resultado = yield pecaController.buscar(body);
    response.json(resultado).status(200);
}));
routerPecas.get('/contarPecas', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { classe } = request.headers;
    let body = {
        classe: classe && !Array.isArray(classe) ? classe : ""
    };
    const resultado = yield pecaController.contarPecas(body);
    response.json(resultado).status(200);
}));
routerPecas.put('/desabilitar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield pecaController.desabilitar(request.body);
    response.json(resultado).status(200);
}));
routerPecas.put('/habilitar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield pecaController.habilitar(request.body);
    response.json(resultado).status(200);
}));
exports.default = routerPecas;
//# sourceMappingURL=pecasRoutes.js.map