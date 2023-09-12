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
const usuarioController_1 = require("../controllers/usuarioController");
const mongodb_1 = require("mongodb");
const router = express_1.default.Router();
const usuarioController = new usuarioController_1.UsuarioController();
router.post('/criar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield usuarioController.criar(request.body);
    response.json(resultado).status(200);
}));
router.get('/listar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield usuarioController.listar();
    response.json(resultado).status(200);
}));
router.get('/buscar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, cpf, email, cargo } = request.headers;
    let body = {};
    if (cpf && !Array.isArray(cpf))
        body = Object.assign(Object.assign({}, body), { cpf: cpf });
    if (email && !Array.isArray(cpf))
        body = Object.assign(Object.assign({}, body), { email: email });
    if (_id && !Array.isArray(cpf))
        body = Object.assign(Object.assign({}, body), { _id: new mongodb_1.ObjectId(_id.toString()) });
    if (cargo && !Array.isArray(cargo))
        body = Object.assign(Object.assign({}, body), { cargo: cargo });
    const resultado = yield usuarioController.buscar(body);
    response.json(resultado).status(200);
}));
router.put('/atualizar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield usuarioController.atualizar(request.body);
    response.json(resultado).status(200);
}));
router.put('/desativar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield usuarioController.desativar(request.body);
    response.json(resultado).status(200);
}));
router.put('/ativar', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const resultado = yield usuarioController.ativar(request.body);
    response.json(resultado).status(200);
}));
exports.default = router;
//# sourceMappingURL=usuarioRoutes.js.map