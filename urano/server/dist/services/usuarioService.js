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
exports.UsuarioService = void 0;
const cargos_1 = require("../models/enums/cargos");
const usuarioModel_1 = __importDefault(require("../models/usuarioModel"));
class UsuarioService {
    retornarUsuarioPorEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioLogado = yield usuarioModel_1.default.findOne({ email: email });
                return usuarioLogado ? usuarioLogado : {};
            }
            catch (error) {
                return {};
            }
        });
    }
    criar(inputCriarUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarioLogado = yield this.retornarUsuarioPorEmail(inputCriarUsuario.emailUsuarioLogado);
                if (Object.keys(usuarioLogado).length > 0) {
                    const usuario = new usuarioModel_1.default({
                        nome: inputCriarUsuario.nome,
                        email: inputCriarUsuario.email,
                        cpf: inputCriarUsuario.cpf,
                        cargo: inputCriarUsuario.cargo || cargos_1.Cargos.ESTAGIARIO,
                        salario: inputCriarUsuario.salario || 2000.00,
                        status: true
                    });
                    const usuarioSalvo = yield usuario.save();
                    return usuarioSalvo;
                }
                throw new Error("Usuario logado não encontrado na base de dados.");
            }
            catch (error) {
                return {};
            }
        });
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield usuarioModel_1.default.find();
                return usuarios;
            }
            catch (error) {
                return {};
            }
        });
    }
}
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuarioService.js.map