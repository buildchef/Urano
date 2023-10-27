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
exports.PecaService = void 0;
const classePeca_1 = require("../models/enums/classePeca");
const pecaModel_1 = __importDefault(require("../models/pecaModel"));
const validators_1 = require("../validators/validators");
const usuarioService_1 = require("./usuarioService");
class PecaService {
    constructor() {
        this.validator = new validators_1.Validators();
        this.usuarioService = new usuarioService_1.UsuarioService();
    }
    listar() {
        return __awaiter(this, void 0, void 0, function* () {
            const resultado = pecaModel_1.default.find();
            return resultado;
        });
    }
    adicionar(inputAdicionarPeca) {
        return __awaiter(this, void 0, void 0, function* () {
            inputAdicionarPeca.classe = inputAdicionarPeca.classe.toUpperCase();
            const { error, value } = this.validator.validarInputAdicionarPeca(inputAdicionarPeca);
            const pecaVerificar = yield this.buscar({ classe: inputAdicionarPeca.classe, codigo: inputAdicionarPeca.codigo });
            if (error || pecaVerificar.length > 0) {
                throw new Error("Erro na validacao. Os dados informados sao invalidos.");
            }
            ;
            // @ts-ignore
            const novaPeca = new pecaModel_1.default({
                nome: inputAdicionarPeca.nome,
                codigo: inputAdicionarPeca.codigo,
                // @ts-ignore
                classe: classePeca_1.ClassePeca[inputAdicionarPeca.classe.toUpperCase()],
                preco: inputAdicionarPeca.preco,
                status: true
            });
            const pecaSalva = yield novaPeca.save();
            return pecaSalva;
        });
    }
    buscar(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query.classe) {
                query.classe = query.classe.toUpperCase();
            }
            ;
            const { error, value } = this.validator.validarQueryPecas(query);
            if (error) {
                throw new Error('Erro na validacao. Os dados informados sao invalidos.');
            }
            ;
            // @ts-ignore
            if (query.classe) {
                query.classe = classePeca_1.ClassePeca[query.classe];
            }
            const pecas = yield pecaModel_1.default.find(query);
            return pecas;
        });
    }
    contarPecas(inputContarPecas) {
        return __awaiter(this, void 0, void 0, function* () {
            inputContarPecas.classe = inputContarPecas.classe.toUpperCase();
            const { error, value } = this.validator.validarInpuContarPecas(inputContarPecas);
            if (error) {
                throw new Error('Erro na validacao. Os dados informados sao invalidos.');
            }
            ;
            const pecas = yield this.buscar({ classe: inputContarPecas.classe });
            let contador = 0;
            pecas.forEach((peca) => {
                if (peca.status) {
                    contador++;
                }
                ;
            });
            return contador;
        });
    }
    desabilitar(inputDesabilitarPeca) {
        return __awaiter(this, void 0, void 0, function* () {
            inputDesabilitarPeca.classe = inputDesabilitarPeca.classe.toUpperCase();
            const { error, value } = this.validator.validarInputDesabilitarPeca(inputDesabilitarPeca);
            if (error) {
                throw new Error('Erro na validacao. Os dados informados sao invalidos.');
            }
            ;
            const query = {
                codigo: inputDesabilitarPeca.codigo,
                // @ts-ignore
                classe: classePeca_1.ClassePeca[inputDesabilitarPeca.classe.toUpperCase()]
            };
            const peca = yield pecaModel_1.default.findOne(query);
            if (peca) {
                peca.status = peca.status ? false : peca.status;
                yield peca.save();
                return true;
            }
            throw new Error("Peca não encontrada");
        });
    }
    habilitar(inputHabilitarPeca) {
        return __awaiter(this, void 0, void 0, function* () {
            inputHabilitarPeca.classe = inputHabilitarPeca.classe.toUpperCase();
            const { error, value } = this.validator.validarInputDesabilitarPeca(inputHabilitarPeca);
            if (error) {
                throw new Error('Erro na validacao. Os dados informados sao invalidos.');
            }
            ;
            const query = {
                codigo: inputHabilitarPeca.codigo,
                // @ts-ignore
                classe: classePeca_1.ClassePeca[inputHabilitarPeca.classe.toUpperCase()]
            };
            const peca = yield pecaModel_1.default.findOne(query);
            if (peca) {
                peca.status = !peca.status ? true : peca.status;
                yield peca.save();
                return true;
            }
            throw new Error("Peca não encontrada");
        });
    }
}
exports.PecaService = PecaService;
//# sourceMappingURL=pecaService.js.map