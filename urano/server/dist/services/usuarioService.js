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
const validators_1 = require("../validators/validators");
class UsuarioService {
    constructor() {
        this.validator = new validators_1.Validators();
    }
    criar(inputCriarUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = this.validator.validarInputCriarUsuario(inputCriarUsuario);
                console.log(error);
                if (!error) {
                    console.log('Passei do error');
                    const usuarioLogado = yield this.buscar({ email: inputCriarUsuario.emailUsuarioLogado });
                    if (usuarioLogado.length > 0) {
                        console.log('Passei do usuarioLogado');
                        const usuario = new usuarioModel_1.default({
                            nome: inputCriarUsuario.nome,
                            email: inputCriarUsuario.email,
                            telefone: inputCriarUsuario.telefone,
                            cpf: inputCriarUsuario.cpf,
                            cargo: inputCriarUsuario.cargo || cargos_1.Cargos.ESTAGIARIO,
                            status: true
                        });
                        console.log(usuario);
                        const usuarioSalvo = yield usuario.save();
                        console.log(usuarioSalvo);
                        return usuarioSalvo;
                    }
                    throw new Error("Informações inválidas.");
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
    buscar(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = this.validator.validarQuery(query);
            try {
                if (!error) {
                    const usuarioEncontrado = yield usuarioModel_1.default.find(query);
                    return usuarioEncontrado;
                }
                throw new Error('Erro ao buscar no banco de dados.');
            }
            catch (error) {
                return [];
            }
        });
    }
    atualizar(inputAtualizarUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = this.validator.validarInputAtualizarUsuario(inputAtualizarUsuario);
                if (!error) {
                    const buscaUsuarioDB = yield this.buscar({ cpf: inputAtualizarUsuario.cpf });
                    const usuarioLogado = yield this.buscar({ email: inputAtualizarUsuario.emailUsuarioLogado });
                    if (buscaUsuarioDB.length > 0 && usuarioLogado.length > 0) {
                        const usuarioMongo = buscaUsuarioDB[0];
                        usuarioMongo.nome = inputAtualizarUsuario.nome ? inputAtualizarUsuario.nome : usuarioMongo.nome;
                        usuarioMongo.email = inputAtualizarUsuario.email ? inputAtualizarUsuario.email : usuarioMongo.email;
                        usuarioMongo.telefone = inputAtualizarUsuario.telefone ? inputAtualizarUsuario.telefone : usuarioMongo.telefone;
                        usuarioMongo.cargo = inputAtualizarUsuario.cargo ? inputAtualizarUsuario.cargo : usuarioMongo.cargo;
                        const usuarioAtualizado = yield usuarioMongo.save();
                        return usuarioAtualizado;
                    }
                    throw new Error("Informações inválidas.");
                }
                throw new Error('Não foi possível atualizar o usuário.');
            }
            catch (error) {
                return {};
            }
        });
    }
    desativar(inputAlterarStatusUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = this.validator.validarInputAlterarStatusUsuario(inputAlterarStatusUsuario);
                if (!error) {
                    const buscaUsuario = yield this.buscar({ cpf: inputAlterarStatusUsuario.cpf });
                    const usuarioLogado = yield this.buscar({ email: inputAlterarStatusUsuario.emailUsuarioLogado });
                    if (buscaUsuario.length > 0 && usuarioLogado.length > 0 && buscaUsuario[0].status) {
                        const usuarioDb = buscaUsuario[0];
                        usuarioDb.status = false;
                        const usuarioAtualizado = yield usuarioDb.save();
                        return usuarioAtualizado;
                    }
                    throw new Error("Informações inválidas.");
                }
                throw new Error('Não foi possível desativar o usuário.');
            }
            catch (error) {
                return {};
            }
        });
    }
    ativar(inputAlterarStatusUsuario) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, value } = this.validator.validarInputAlterarStatusUsuario(inputAlterarStatusUsuario);
                if (!error) {
                    const buscaUsuario = yield this.buscar({ cpf: inputAlterarStatusUsuario.cpf });
                    const usuarioLogado = yield this.buscar({ email: inputAlterarStatusUsuario.emailUsuarioLogado });
                    if (buscaUsuario.length > 0 && usuarioLogado.length > 0 && !buscaUsuario[0].status) {
                        const usuarioDb = buscaUsuario[0];
                        usuarioDb.status = true;
                        const usuarioAtualizado = yield usuarioDb.save();
                        return usuarioAtualizado;
                    }
                    throw new Error("Informações inválidas.");
                }
                throw new Error('Não foi possível desativar o usuário.');
            }
            catch (error) {
                return {};
            }
        });
    }
}
exports.UsuarioService = UsuarioService;
//# sourceMappingURL=usuarioService.js.map