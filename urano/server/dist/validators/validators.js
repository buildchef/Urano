"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const Joi = __importStar(require("joi"));
class Validators {
    constructor() {
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.telefoneRegex = /^[0-9]+$/;
        this.nomeRegex = /^[A-Za-z]+$/;
    }
    validarInputCriarUsuario(inputCriarUsuario) {
        const bodySchema = Joi.object({
            nome: Joi.string().min(1).max(99).pattern(this.nomeRegex).required(),
            email: Joi.string().pattern(this.emailRegex).required(),
            telefone: Joi.string().min(11).max(11).pattern(this.telefoneRegex).required(),
            cargo: Joi.string().min(1).max(50),
            cpf: Joi.string().min(11).max(11).required(),
            emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required()
        });
        return bodySchema.validate(inputCriarUsuario);
    }
    validarQuery(query) {
        const bodySchema = Joi.object({
            id: Joi.string().min(24).max(24),
            cpf: Joi.string().min(11).max(11),
            email: Joi.string().pattern(this.emailRegex),
            cargo: Joi.string().min(1).max(50)
        });
        return bodySchema.validate(query);
    }
    validarInputAtualizarUsuario(inputAtualizarUsuario) {
        const bodySchema = Joi.object({
            cpf: Joi.string().min(11).max(11).required(),
            nome: Joi.string().min(1).max(99).pattern(this.nomeRegex),
            telefone: Joi.string().min(11).max(11).pattern(this.telefoneRegex),
            email: Joi.string().pattern(this.emailRegex),
            cargo: Joi.string().min(1).max(50),
            emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required()
        });
        return bodySchema.validate(inputAtualizarUsuario);
    }
    validarInputAlterarStatusUsuario(inputAlterarStatusUsuario) {
        const bodySchema = Joi.object({
            cpf: Joi.string().min(11).max(11).required(),
            emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required(),
        });
        return bodySchema.validate(inputAlterarStatusUsuario);
    }
}
exports.Validators = Validators;
//# sourceMappingURL=validators.js.map