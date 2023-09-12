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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const usuarioService_1 = require("../services/usuarioService");
class UsuarioController {
    constructor() {
        this.usuarioService = new usuarioService_1.UsuarioService();
    }
    criar(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioService.criar(body);
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioService.listar();
        });
    }
    buscar(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioService.buscar(body);
        });
    }
    atualizar(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioService.atualizar(body);
        });
    }
    desativar(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usuarioService.desativar(body);
        });
    }
}
exports.UsuarioController = UsuarioController;
//# sourceMappingURL=usuarioController.js.map