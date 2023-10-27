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
exports.PecaController = void 0;
const pecaService_1 = require("../services/pecaService");
class PecaController {
    constructor() {
        this.pecaService = new pecaService_1.PecaService();
    }
    adicionar(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pecaService.adicionar(body);
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pecaService.listar();
        });
    }
    buscar(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pecaService.buscar(body);
        });
    }
    contarPecas(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pecaService.contarPecas(body);
        });
    }
    desabilitar(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pecaService.desabilitar(body);
        });
    }
    habilitar(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pecaService.habilitar(body);
        });
    }
}
exports.PecaController = PecaController;
//# sourceMappingURL=pecaController.js.map